import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { GoogleGenAI } from "@google/genai";

const ROOT = process.cwd();
const TOPICS_PATH = path.join(ROOT, "content", "blog-topics.json");
const QUEUE_DIR = path.join(ROOT, "content", "queue");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Missing GEMINI_API_KEY (GitHub Secret).");

if (!fs.existsSync(QUEUE_DIR)) fs.mkdirSync(QUEUE_DIR, { recursive: true });

const topics = JSON.parse(fs.readFileSync(TOPICS_PATH, "utf-8"));

function parisISODate(d) {
  // YYYY-MM-DD in Europe/Paris
  const parts = new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const y = parts.find(p => p.type === "year").value;
  const m = parts.find(p => p.type === "month").value;
  const day = parts.find(p => p.type === "day").value;
  return `${y}-${m}-${day}`;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function nextTueThuDates(count = 4) {
  // prochaines dates Paris : mar/jeu (09:15) -> on stocke juste YYYY-MM-DD
  const out = [];
  const now = new Date();
  let cursor = new Date(now);
  while (out.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    const day = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short" }).format(cursor);
    if (day === "Tue" || day === "Thu") out.push(parisISODate(cursor));
  }
  return out;
}

const dates = nextTueThuDates(4); // 2 semaines * 2
const ready = topics.filter(t => t.status === "READY").slice(0, dates.length);

if (ready.length === 0) {
  console.log("No READY topic. Exiting.");
  process.exit(0);
}

const ai = new GoogleGenAI({ apiKey });

// Openverse (images externes) – sans clé, best-effort
async function pickOpenverseImage(query) {
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "1");
  // Priorité CC0, sinon on laissera sans image si aucun résultat
  url.searchParams.set("license", "cc0");
  const res = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  const img = data?.results?.[0];
  if (!img) return null;
  return {
    src: img.url || img?.source,
    altHint: img.title || query,
    license: img.license,
    licenseUrl: img.license_url,
    creator: img.creator,
    creatorUrl: img.creator_url,
    attribution: img.attribution,
  };
}

async function generateOne({ topic, dateISO }) {
  const brand = {
    site: "artichaud-studio.com",
    tone: "cool, énergique, humain, expert, phrases courtes, zéro blabla",
    audience: "PME, artisans, freelances (Paris/IDF/Boulogne)",
    moneyLinks: [
      { label: "nos services", url: "https://www.artichaud-studio.com/services" },
      { label: "nous contacter", url: "https://www.artichaud-studio.com/contact" }
    ],
    cta: "Nous contacter"
  };

  const image = await pickOpenverseImage(topic.keyword);

  const system = `
Tu es rédacteur SEO senior pour ${brand.site}.
Tu réponds en JSON STRICT (pas de backticks, pas de texte autour).
Tu écris en français.
`;

  const prompt = `
Mot-clé principal: ${topic.keyword}
Angle: ${topic.angle}
Zone: Paris / Île-de-France / Boulogne-Billancourt
Cible: ${brand.audience}
Style: ${brand.tone}

Contraintes SEO:
- Longueur: 1200 à 1800 mots (optimisé SEO)
- H1 unique, puis H2/H3 propres
- Ajouter une FAQ (3 à 6 questions) + JSON-LD FAQ à la fin
- Inclure naturellement "Paris", "Île-de-France" et/ou "Boulogne-Billancourt" (sans spam)
- Maillage interne obligatoire:
  1 lien vers ${brand.moneyLinks[0].url} (ancre: "${brand.moneyLinks[0].label}")
  1 lien vers ${brand.moneyLinks[1].url} (ancre: "${brand.moneyLinks[1].label}")
- CTA unique: "${brand.cta}" vers ${brand.moneyLinks[1].url}
- Ajouter 2 liens externes vers sources fiables (Google/Vercel/Next.js, etc.)
- Proposer 1 micro-section "Prix / délais (fourchettes)" adaptée PME/artisans

Image:
- Si image_src est fourni, intégrer une image HTML <img> (pas next/image) avec alt
- Ajouter un petit bloc "Crédits image" si attribution non vide

Retour JSON:
{
  "title": "...",
  "slug": "...",
  "meta_description": "...(150-160 caractères)...",
  "tags": ["..."],
  "category": "${topic.category}",
  "image_src": "${image?.src ?? ""}",
  "image_alt": "...",
  "image_attribution": "${image?.attribution ?? ""}",
  "content_mdx": "..."
}
`;

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: system + "\n" + prompt }] }],
  });

  const raw = res.text;
  let data;
  try { data = JSON.parse(raw); }
  catch {
    throw new Error("Gemini did not return valid JSON.\n" + raw);
  }

  const slug = slugify(data.slug || data.title);
  const filename = `${dateISO}-${slug}.mdx`;
  const outPath = path.join(QUEUE_DIR, filename);

  const mdx = matter.stringify(data.content_mdx || "", {
    title: data.title,
    slug,
    date: dateISO,
    description: data.meta_description,
    tags: data.tags || [],
    category: data.category || topic.category,
    image: data.image_src || "",
    imageAlt: data.image_alt || "",
    imageAttribution: data.image_attribution || "",
    cityTargets: ["Paris", "Île-de-France", "Boulogne-Billancourt"]
  });

  fs.writeFileSync(outPath, mdx, "utf-8");

  topic.status = "SCHEDULED";
  topic.scheduledFor = dateISO;
  topic.generatedFile = `content/queue/${filename}`;
}

for (let i = 0; i < ready.length; i++) {
  await generateOne({ topic: ready[i], dateISO: dates[i] });
}

fs.writeFileSync(TOPICS_PATH, JSON.stringify(topics, null, 2));
console.log(`Generated ${ready.length} post(s) into content/queue.`);
