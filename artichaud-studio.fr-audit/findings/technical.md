# Technical SEO and On-page findings - artichaud-studio.fr (2026-10-17)

Verified live with curl on all 48 sitemap URLs plus redirects, robots.txt, headers.

## TECHNICAL SCORE: 86/100

| Category | Status | Notes |
|---|---|---|
| Crawlability | PASS | robots.txt valid, sitemap 48 URLs all 200, no noindex on indexable pages |
| Indexability | PASS (minor) | Self canonicals on all 48 pages, no duplicates; sitemap lastmod unreliable |
| Security | PASS (minor) | HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy present; HSTS lacks includeSubDomains/preload; CSP uses unsafe-inline; X-XSS-Protection obsolete |
| URL structure / redirects | PASS | .com, www.com, www.fr all -> https://artichaud-studio.fr/ in one 301 hop; http -> https 308; trailing slash -> 308 to non-slash; wrong case -> 404 |
| Mobile | PASS | viewport set, html lang=fr, responsive |
| Core Web Vitals (source only) | NOT MEASURED | Fonts and hero images preloaded; 15 eager images on home; no field data, check PSI/CrUX |
| Structured data | PASS (minor) | JSON-LD on all pages; FAQPage gone; AggregateRating 5/1 review on home is risky |
| JS rendering | PASS | Full SSR/SSG HTML (40-240 KB raw), titles/meta/H1 in raw source, no SPA shell |
| IndexNow | PASS | Key file /1484784033661957.txt returns 200 with the key; /api/indexnow route is secret-protected, POST only (GET returns 405) |
| AI/GEO | PASS | llms.txt and llms-full.txt return 200; 15 AI crawlers explicitly allowed in robots.txt |

### Redirects (live)
- http://artichaud-studio.fr -> 308 -> https://artichaud-studio.fr/ (200)
- https://www.artichaud-studio.fr -> 301 -> apex (1 hop)
- https://artichaud-studio.com and https://www.artichaud-studio.com -> 301 -> https://artichaud-studio.fr/ (1 hop)
- /services/ -> 308 /services; /Services -> 404
- Unknown URLs return a real 404 status with noindex.

### Issues by severity
**Critical:** none.

**High**
1. Broken internal links: /blog/refonte-site-internet-quand-et-comment links to /blog/prix-site-vitrine-idf-2026 and /services/refonte-site-web, both 404. Correct targets: /blog/prix-site-vitrine-iledefrance-2025 and /refonte-site-internet.
2. Sitemap lastmod is hard-coded: 32 of 48 URLs show 2026-05-29; blog posts carry weekly dates Dec 2025 to Mar 2026. Google discounts lastmod when it is not trustworthy. Use real content dates. changefreq/priority are ignored by Google; "daily" on / and /blog is untrue (no post since March 2026). `dynamic = 'force-dynamic'` in sitemap.ts is unnecessary.

**Medium**
3. Homepage JSON-LD includes AggregateRating (5.0, 1 review). Self-served single rating risks a structured-data penalty; remove until real visible reviews exist.
4. 404 page emits two robots metas (noindex plus a leaked "index, follow") and two titles. Status is 404 so low risk, but clean up.
5. og:image is /icon.png (512x512 square) on home, services, tarifs, works while twitter:card is summary_large_image. Contact, faq, simulateur, works/all, boulogne-billancourt have no og:image in raw HTML. Use a 1200x630 image site-wide.
6. Core Web Vitals not measured. Check LCP on home with PSI/CrUX.
7. src/app has opengraph-image.jpg, .jpeg and .tsx at once; keep one.

**Low**
8. HSTS max-age=63072000 without includeSubDomains; preload.
9. CSP script-src 'unsafe-inline'; X-XSS-Protection is deprecated (remove or set 0).
10. next.config.ts has typescript.ignoreBuildErrors: true.
11. robots.txt "Host:" directive is ignored by Google (harmless).

### Previous audit (2026-08-06) status, technical items
| # | Item | Status |
|---|---|---|
| 4 | Blog article without .mdx extension invisible | FIXED (live 200, in sitemap) |
| 6 | og-paris.jpg / og-boulogne.jpg 404 on www | FIXED (opengraph-image routes on apex; no www refs in HTML) |
| 7 | Alt text missing | MOSTLY FIXED (about 1 empty alt per page left) |
| 8 | FAQPage schema misuse | FIXED (no FAQPage on any page) |
| 9 | Orphan / weakly linked pages | PARTLY OPEN (see internal linking below); blog posts now 3-19 inbound links |
| 11 | Home og:title 61 chars | FIXED (57 chars) |
| 12 | AI crawlers not explicit | FIXED |
| 13 | CSP absent | FIXED |
| - | Domain redirects, IndexNow, llms.txt | STILL OK |
| 3 | Blog stalled | STILL OPEN (last lastmod 2026-03-16) |
| - | Core Web Vitals not measured | STILL OPEN |
Items 1, 2, 5, 10 (reviews, named authors, backlinks, testimonials) are not technical and were not assessed.

---

## ON-PAGE SCORE: 74/100

### Titles
- Brand suffix duplicated: "X | Artichaud Studio | Artichaud Studio" on contact, faq, mentions-legales, simulateur, works/all, all 13 /works/* pages and /creation-site-internet-boulogne-billancourt. Worst: "Caisse d'Épargne - Identité visuelle du podcast Génération Impact | Artichaud Studio | Artichaud Studio" (103 chars).
- Over ~60 characters (likely truncated): about 30 pages including home (68), /about (68), orthographe (83), most blog posts (70-99).
- Generic, keyword-poor: "Tous nos projets", "Cherico - Photography", "Comon - Brand Identity".
- Slug/year mismatch: prix-site-vitrine-iledefrance-2025 and guide-rebranding-2025 (title says 2026; guide-rebranding H1 is about "agence branding Paris", not rebranding).

### Meta descriptions
All 48 present and unique. Over 160 chars: /services 178, branding 186, /blog 184, several blog posts 165-174. Under 120: contact 115, simulateur 114, mentions-legales 100, orthographe 102, works/all 118.

### Headings
- 13 of 15 blog posts render two H1s (hero plus one inside article body). Keep one.
- /works/all repeats the exact H1 of /works.
- /simulateur H1 text concatenates without a space ("...futur site internet ?site int...").
- /works/* H1 is only the project name (no keyword).
- H2 structure otherwise good (4-18 per page); home H1 is good.

### Canonicals and robots meta
Self-referencing absolute canonicals on all 48 pages (apex, no trailing slash). No conflicts. Possible cannibalisation between /boulogne-billancourt and /creation-site-internet-boulogne-billancourt.

### Internal linking (raw HTML, 48 pages, includes nav/footer)
- Hubs: /tarifs 41 inbound, /blog 37, /creation-site-internet-paris 33, /refonte-site-internet 23.
- Weak: /faq 1, /artichaud-studio-orthographe 1, /works/cherico 1, /simulateur 2, /boulogne-billancourt 2, /works/comon, multiface, yumdeal 2, /blog/creation-site-internet-paris-erreur 2.
- 2 broken links (High 1).

### Recommendations
1. Fix title template (title.absolute or no manual suffix), cap at ~60 chars.
2. One H1 per blog post; unique H1 on /works/all.
3. Fix the two 404 links.
4. Trim descriptions over 160, enrich those under 120.
5. Link /faq, /simulateur, /boulogne-billancourt from services/tarifs/footer; add sibling links between /works/* pages.
