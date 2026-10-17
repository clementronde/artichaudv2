# Sitemap audit - https://artichaud-studio.fr/sitemap.xml (2026-10-17)

Source: src/app/sitemap.ts (force-dynamic). 48 URLs: 5 main, 3 services, 7 secondary, 5 local, 12 projects, 16 blog.

| Check | Result |
|---|---|
| XML valid, Content-Type application/xml, 200 | PASS |
| URL count (48, limit 50k) / size | PASS |
| Status codes of all 48 URLs | PASS: all 200, no redirects |
| Canonical matches sitemap URL | PASS: 48/48 self-canonical (no trailing slash) |
| Noindex URLs in sitemap | PASS: none (pages "index, follow" or no robots meta on blog = default index) |
| robots.txt references sitemap | PASS: `Sitemap: https://artichaud-studio.fr/sitemap.xml`, /sitemap.xml explicitly allowed |
| Missing pages | PASS: all 16 content/blog MDX posts, all 12 projects, every page.tsx route are present. Only intentional omissions are dynamic route templates. |
| Deprecated tags priority/changefreq | INFO (low): emitted on all URLs; ignored by Google, can be removed |
| lastmod accuracy | FAIL (medium): see below |
| Local page quality gate | PASS with note |

## lastmod
- 32 non-blog URLs all share a hard-coded `new Date('2026-05-29')` (sitemap.ts line 7). Identical lastmod on everything is not a real signal, and is stale (about 4.5 months before today, 2026-10-17) if pages changed since (recent commits touch portfolio/home/projects).
- Blog lastmod = frontmatter `date` (2025-12-08 to 2026-03-16, one per week); matches publish date, but any later edit is not reflected. Consider an optional `updated` field.
- Format: full ISO datetime with `T00:00:00.000Z`: valid W3C, fine.
- Fix: derive lastmod per page from git commit date / file mtime at build, or per-page constants updated on real content change. Note `force-dynamic` makes the sitemap regenerate each request; static generation would be cheaper (lastmod is static anyway).

## Local page quality gate (5 location-oriented pages, below the 30-page warning threshold)
Word counts (rendered text): creation-site-internet-paris 627, creation-site-internet-boulogne-billancourt 949, boulogne-billancourt 948, refonte-site-internet 883, wordpress-webflow-wix page not counted. Well under 30/50 thresholds: no doorway-page risk from volume.
Risk: /boulogne-billancourt (948 words) and /creation-site-internet-boulogne-billancourt (949 words) are nearly identical in length and target the same intent; verify content is not duplicated, otherwise merge (301 one into the other) or differentiate to avoid cannibalization. /creation-site-internet-paris is the thinnest (627) - ok, but could be enriched with Paris-specific proof.

## Other notes
- Sitemap is not split/indexed: unnecessary at 48 URLs.
- /llms.txt and /llms-full.txt are allowed in robots but not relevant to sitemap.
- No image/news sitemap; optional.
