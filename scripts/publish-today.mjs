import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const QUEUE_DIR = path.join(ROOT, "content", "queue");
const BLOG_DIR = path.join(ROOT, "content", "blog");

// Vérification de sécurité
if (!fs.existsSync(QUEUE_DIR)) {
  console.log("No queue directory found.");
  process.exit(0);
}
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

function getParisDateISO() {
  const d = new Date();
  // Utilisation de fr-CA pour avoir le format YYYY-MM-DD directement
  return new Intl.DateTimeFormat("fr-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

const today = getParisDateISO();
console.log(`Checking for posts to publish (Date: ${today} or older)...`);

// Regex pour capturer la date au début du fichier (YYYY-MM-DD)
const dateRegex = /^(\d{4}-\d{2}-\d{2})/;

const files = fs.readdirSync(QUEUE_DIR).filter(file => {
  if (!file.endsWith(".mdx")) return false;
  
  const match = file.match(dateRegex);
  if (!match) return false;

  const fileDate = match[1];
  // Comparaison de chaines ISO : "2025-12-23" <= "2025-12-24" est vrai.
  // Cela publie l'article s'il est daté d'aujourd'hui OU d'avant (rattrapage).
  return fileDate <= today;
});

if (files.length === 0) {
  console.log("No post to publish.");
  process.exit(0);
}

for (const file of files) {
  const oldPath = path.join(QUEUE_DIR, file);
  const newPath = path.join(BLOG_DIR, file);
  
  // Sécurité pour ne pas écraser un fichier existant sans log
  if (fs.existsSync(newPath)) {
      console.warn(`Warning: File ${file} already exists in blog folder. Skipping.`);
      continue;
  }

  fs.renameSync(oldPath, newPath);
  console.log(`✅ Published: ${file}`);
}