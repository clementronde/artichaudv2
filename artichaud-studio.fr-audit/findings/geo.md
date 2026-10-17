# GEO / AI Search Readiness: artichaud-studio.fr

Audit date: 2026-10-17. Method: live fetch of robots.txt, llms.txt, llms-full.txt, sitemap.xml and about 20 key pages, using raw SSR HTML and trafilatura `extracted_text`. Findings were checked against the source in `src/` and `content/blog/`.

## GEO Readiness Score: 62 / 100

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 62 | 15.5 |
| Structural Readability | 20% | 72 | 14.4 |
| Multi-Modal Content | 15% | 45 | 6.8 |
| Authority & Brand Signals | 20% | 40 | 8.0 |
| Technical Accessibility | 20% | 85 | 17.0 |
| **Total** | | | **~62** |

The technical foundations are strong. The weak points are off-site entity presence (authority), sourced facts (citability) and a few consistency bugs that send AI systems conflicting signals.

## 1. AI crawler access (robots.txt)

Each crawler has an explicit group with `Allow: /`. The only disallowed paths are `/api/`, `/admin/` and `/private/`. The `Sitemap` directive is present.

| Crawler | What it governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| ChatGPT-User | ChatGPT user-triggered fetches | Allowed |
| GPTBot | OpenAI model training only (does not affect ChatGPT Search) | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| Claude-User | Claude user-triggered fetches | Allowed |
| ClaudeBot | Anthropic training only | Allowed |
| anthropic-ai | Legacy token, no current effect | Allowed (harmless) |
| PerplexityBot | Perplexity index and citations | Allowed |
| Perplexity-User | Perplexity user fetches | Allowed |
| Googlebot (via `*`) | Google Search and AI Overviews / AI Mode inclusion | Allowed |
| Google-Extended | Gemini/Vertex training and grounding, plus training of the Search gen-AI models. Has no effect on AI Overviews inclusion | Allowed |
| Applebot (via `*`) | Siri / Spotlight / Safari | Allowed |
| Applebot-Extended | Apple Intelligence training only | Allowed |
| Bingbot (via `*`) | Bing and Copilot grounding | Allowed |
| CCBot, Bytespider, Amazonbot, FacebookBot, cohere-ai (via `*`) | Training / other | Allowed |

Verdict: fully open, with no blocking issues. Allowing every training crawler is a business choice. It helps brand recall in models, and nothing needs to change. `Host:` is a non-standard Yandex directive. It is harmless.

## 2. llms.txt / llms-full.txt / RSL

- `/llms.txt`: **present**, 200, text/plain, 9.5 KB, and well-formed (H1, blockquote summary, H2 sections, link lists). It is rich: NAP, services, a pricing table, 11 conversational FAQs, page lists and a "Notes pour les assistants IA" section.
- `/llms-full.txt`: **present**, 17 KB, with a full content digest of the key pages.
- RSL 1.0: **missing** (`/.well-known/rsl.xml` and `/license.xml` return 404, and robots.txt has no `License:` line). This is optional and low priority.

Problems found:
1. **Every URL in both files uses `https://www.artichaud-studio.fr/...`**. That host returns a 301 to the apex `https://artichaud-studio.fr`, which is the canonical host and the one used by the sitemap and JSON-LD. Every link the file gives to agents goes through a redirect and does not match the canonical, and the "Site :" NAP line names a non-canonical host. Fix this in `public/llms.txt` and `public/llms-full.txt`.
2. **Placeholder left in production**: `**[Directrice artistique]** — Co-fondatrice` appears in `public/llms.txt:18` and `public/llms-full.txt:28`. The About page image alt names her ("Clément et Charlotte, l'équipe d'Artichaud Studio"). An unnamed co-founder in an "E-E-A-T" section weakens entity trust and may be quoted literally by an LLM.
3. **Founder name inconsistency**: llms.txt says "Clément R." while blog bylines and the BlogPosting schema say "Clément Rondepierre". Use the full name everywhere.
4. **Client references do not match the portfolio**. llms.txt lists Chez June, Atelier Nova, Studio Lignes, Lumyn, Keleti and Jobmi. The live case studies are Remembraance, Caisse d'Épargne, Charit.IO, Keleti, Lumyn, Jobmi, Multiface, Disobey and others. Caisse d'Épargne is the strongest recognizable entity on the site, and it is missing from llms.txt. Atelier Nova and Studio Lignes, plus their testimonials from "Nicolas Perrin" and "Sophie Lambert", have no case study or external trace. Only cite clients that can be verified. AI systems and Google's review policies penalize testimonials they cannot corroborate.
5. **Price inconsistency**: hosting is "40 – 150 €/an" in the pricing section but "40–100 €/an" in the FAQ of the same file. LLMs surface contradictions like this, or drop the fact.
6. The file lists only 6 of the 16 blog posts. Newer guides are missing, including restaurant, domain name, délai, vitrine vs e-commerce, stack and rebranding.

## 3. Technical accessibility

- Every audited page is server-rendered by Next.js and served by Vercel (`is_spa: false`). The full text is in the initial HTML, so no JS execution is needed.
- Canonical apex host, and www redirects with a 301.
- The sitemap has 48 URLs and includes every blog post and case study.
- Organization/LocalBusiness JSON-LD is on every page. Blog posts carry BlogPosting (with a Person author), BreadcrumbList and visible `<time>` dates. Service pages have Service/OfferCatalog.

Issue: the word-by-word reveal components (`HighlightTitle` in `src/components/about/AboutIntro.tsx:11-21`, and probably the same pattern in `src/components/home/Intro.tsx` and `src/components/Project/ProjectIntro.tsx`) render each word in its own `<span>` with CSS margin but **no whitespace text node**. Extractors therefore see:

`NoussommesArtichaudStudio,l'allianced'undéveloppeur-marketeuretd'unedirectriceartistique...`

This is the About page's central entity sentence, and it cannot be cited in its current form. The fix is to render `{word}{" "}` inside or after each span. The same bug produces "Ce que nos clientsdisent de nous" (home H2), "Parlons de votrefutur site." and "Soyez au courant  De nos dernières actus".

## 4. Citability (passage level)

Strengths:
- Blog posts are long (1,100 to 1,700 words), with question H2/H3s, FAQ blocks, numbered criteria and comparison tables (prix-site-vitrine, agence-web-boulogne).
- The SEO, branding and FAQ pages each have 8 to 11 question headings with short direct answers.
- Concrete figures are good citation bait: price brackets, delays, the 30/40/30 payment split, and 2,400 € for 3 months of SEO. These are consistent between /tarifs, /faq and llms.txt (apart from the hosting figure above).
- The `/boulogne-billancourt` page is a factual local guide (ZAC Seguin, Seine Musicale 2017, and more). This is good entity-anchoring content.

Weaknesses:
- **No outbound sources anywhere.** None of the audited blog posts links to an external source. "Les 5 piliers du SEO 2026" has no statistics and does not cite Google documentation. "Prix site vitrine" has no market data source. Perplexity and AI Overviews favor passages that include attributed numbers ("selon X, 2026").
- **Few self-contained answer blocks.** In the extracted text, only 1 paragraph of 40 words or more appears in piliers-seo, 5 in prix-site-vitrine and 7 in agence-web-boulogne. Most content is short lines plus bullet lists, which do not lift well as a standalone answer. Add a 2-4 sentence direct-answer paragraph (about 50-120 words) right under each H2.
- **The home page (370 words) and About page (312 words) are slogan-led.** "qui fait monter la température" is fine as a hook, but neither page has a short factual "Artichaud Studio est..." paragraph with the founding year, founders, location, team size and notable clients. That is the passage an LLM needs to answer "qui est Artichaud Studio ?".
- **Duplicate H1 on some blog posts.** The template H1 plus a `# ...` H1 in the MDX shows up on prix-site-vitrine-iledefrance-2025 and agence-web-boulogne-billancourt-comment-choisir. Demote the MDX H1 to plain text or H2.
- **Freshness mismatch**: the slug `prix-site-vitrine-iledefrance-2025` carries a "2026" title, with datePublished and dateModified of 2025-12-15. Update `modifiedDate` when the content is refreshed. The year in the slug is fine to keep, because changing it would need a redirect.

## 5. Authority & entity signals

On-site:
- Strong: consistent NAP across schema, llms.txt and pages. The Google Maps CID is in `sameAs`/`hasMap`. sameAs links LinkedIn, Instagram and TikTok. A dedicated `/artichaud-studio-orthographe` page separates the brand from "artichaut", which is a smart entity move.
- Blog posts have a visible byline with a photo ("Clément Rondepierre, CEO & Co-fondateur") and Person schema. However, `author.url` points to `/about`, which never shows his full name or bio (only image alts say "Clément"). There is no Person page and no `sameAs` to his LinkedIn.
- The co-founder ("Charlotte", per an image alt) is not named anywhere in visible text.
- The Organization schema has no `founder`, `foundingDate` or `numberOfEmployees`.
- `aggregateRating` with `reviewCount: 1` plus a self-hosted `review` on LocalBusiness: Google ignores self-serving reviews for rich results, and a count of 1 is a weak trust signal. Either drop it or link a real Google review count.

Off-site (brand mention correlation):

| Platform | Finding |
|---|---|
| Wikipedia (fr) | No article (API search: 0 hits) |
| Wikidata | No entity |
| YouTube | No channel or videos found for "Artichaud Studio". This is the strongest AI-citation correlate (~0.737), and it is empty |
| Reddit | Not verifiable (API blocked). No evidence of presence |
| LinkedIn | Company page exists (200) |
| Google Business Profile | Exists (CID in schema) |

The entity is effectively invisible outside its own site, Google Maps and social profiles. LLMs that have not crawled the site have no corroborating source for it.

## 6. Multi-modal

The site uses many images, with alt text present (one empty alt per page, probably decorative). Tables appear on /tarifs and two blog posts. There is no video, no embedded YouTube and no diagrams or infographics with descriptive captions. Case studies are image-led, with little text (portfolio index: 106 words).

## 7. Platform scores (estimated)

| Platform | Score | Rationale |
|---|---|---|
| Google AI Overviews / AI Mode | 60 | Good SSR, schema, FAQs and local relevance. Limited by thin E-E-A-T (no author page, no sources) and few backlinks or mentions |
| ChatGPT Search | 52 | Crawlers open, but no Wikipedia, Wikidata or Reddit corroboration. Bing index depth not verified |
| Perplexity | 64 | Rewards fresh, question-structured pages and llms.txt. Held back by no external citations or stats |
| Bing Copilot | 55 | Depends on Bing indexing. Bing Webmaster Tools and IndexNow were not verified |

## 8. Top 5 highest-impact changes

1. **Fix the llms.txt / llms-full.txt consistency bugs** (effort: 30 min). Switch every URL to the apex host, name the co-founder fully, use "Clément Rondepierre", align the client list with the real case studies (add Caisse d'Épargne, remove unverifiable references), fix the 40-100 vs 40-150 € contradiction, and list all 16 posts.
2. **Fix the word-split headings** in `HighlightTitle` and its siblings in Intro and ProjectIntro (effort: 15 min). Render a real space between word spans so the About entity sentence and several H2s can be extracted.
3. **Build a citable entity block and founder pages** (effort: 0.5-1 day). Add a 60-120 word factual "Artichaud Studio est..." paragraph to the home and About pages (founded in, founders by full name, Boulogne-Billancourt, specialties, notable clients). Add a visible team section, or `/about/clement-rondepierre` and a page for the co-founder, with bios and LinkedIn `sameAs`. Point `author.url` there, and add `founder`, `foundingDate` and `numberOfEmployees` to the Organization schema.
4. **Add attributed facts and a direct-answer paragraph per H2 on the blog** (effort: 2-3 days for the 6 key posts). Open each H2 with a 2-4 sentence self-contained answer and cite 2-4 external sources per post (Google Search Central, INSEE / CCI 92 data, Webflow docs, market surveys). Publish original data where possible, such as "prix moyen de nos 40 derniers projets", because first-party statistics are highly citable. Fix the duplicate H1s and refresh `modifiedDate`.
5. **Start off-site entity building** (effort: ongoing, 2-4 h/week). Open a YouTube channel with short case-study and "combien coûte un site" videos, which is the strongest AI-mention correlate. Create a Wikidata item (agency, location, founders, website, sameAs). Get listed on French agency directories (Sortlist, La Fabrique du Net, Clutch) and local Boulogne press or CCI. Take part genuinely in r/france, r/entrepreneur_fr and Webflow communities. Grow Google reviews beyond 1.

Lower priority: add an RSL 1.0 license file, and verify Bing Webmaster Tools and IndexNow so Copilot and ChatGPT can discover new posts.

## Structured findings (audit-data.json: AI Search Readiness)

```json
{
  "category": "AI Search Readiness",
  "score": 62,
  "dimensions": {"citability": 62, "structural_readability": 72, "multimodal": 45, "authority_brand": 40, "technical_accessibility": 85},
  "platform_scores": {"google_aio": 60, "chatgpt": 52, "perplexity": 64, "bing_copilot": 55},
  "ai_crawlers": {"OAI-SearchBot": "allowed", "ChatGPT-User": "allowed", "GPTBot": "allowed", "Claude-SearchBot": "allowed", "Claude-User": "allowed", "ClaudeBot": "allowed", "PerplexityBot": "allowed", "Perplexity-User": "allowed", "Googlebot": "allowed", "Google-Extended": "allowed", "Applebot-Extended": "allowed", "Bingbot": "allowed", "CCBot": "allowed"},
  "llms_txt": {"status": "present", "llms_full_txt": "present", "rsl": "missing"},
  "findings": [
    {"id": "geo-llms-www-host", "severity": "high", "title": "llms.txt/llms-full.txt URLs use www host which 301s to apex canonical", "files": ["public/llms.txt", "public/llms-full.txt"]},
    {"id": "geo-llms-placeholder", "severity": "high", "title": "Placeholder '[Directrice artistique]' co-founder name in llms files", "files": ["public/llms.txt:18", "public/llms-full.txt:28"]},
    {"id": "geo-llms-inconsistency", "severity": "medium", "title": "Founder name, client list and hosting price inconsistent with site content"},
    {"id": "geo-word-split", "severity": "high", "title": "Word-by-word animated headings render without whitespace; extracted text is concatenated", "files": ["src/components/about/AboutIntro.tsx", "src/components/home/Intro.tsx", "src/components/Project/ProjectIntro.tsx"]},
    {"id": "geo-no-sources", "severity": "medium", "title": "Blog posts contain no outbound source citations or attributed statistics"},
    {"id": "geo-thin-entity-block", "severity": "medium", "title": "Home/About lack a factual self-contained brand definition paragraph"},
    {"id": "geo-author-entity", "severity": "medium", "title": "Author URL points to /about which does not name the author; no Person page, no founder schema"},
    {"id": "geo-duplicate-h1", "severity": "low", "title": "Duplicate H1 on blog posts with an H1 in MDX"},
    {"id": "geo-offsite-entity", "severity": "high", "title": "No Wikipedia/Wikidata/YouTube presence; Reddit unverified"},
    {"id": "geo-self-review", "severity": "low", "title": "Self-serving aggregateRating (reviewCount 1) on LocalBusiness"},
    {"id": "geo-rsl", "severity": "low", "title": "No RSL 1.0 license"}
  ]
}
```
