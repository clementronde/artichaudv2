# Content Architecture: Topic Clusters for "création site internet"

Site: https://artichaud-studio.fr. Analysis date: 2026-10-17. This is a plan only; no articles were written.
Inputs: the live sitemap (48 URLs, **16** blog posts rather than 15), the MDX sources in `content/blog/`, `src/components/seo/relatedLinksData.ts`, and 21 WebSearch SERP samples.

## 1. Key findings (by priority)

| # | Severity | Finding | Fix |
|---|----------|---------|-----|
| 1 | Critical | `/blog/refonte-site-internet-quand-et-comment` links to two URLs that return **404**: `/blog/prix-site-vitrine-idf-2026` and `/services/refonte-site-web`. Both were checked live. It does not link to `/refonte-site-internet`. | Point the links to `/blog/prix-site-vitrine-iledefrance-2025` and `/refonte-site-internet`. Add 301 redirects for both dead paths in `next.config.ts`. Note that `src/lib/mdx.ts` also references the old slugs (`prix-site-vitrine-idf-2026`, `refonte-site-internet-guide`, `quel-stack-nous-utilisons`, `impact-ui-design`, `guide-rebranding`) for cover images. |
| 2 | High | Cannibalization: `/blog/creation-site-internet-paris-erreur` has a title that starts with "Création site internet Paris", which is the head term of the `/creation-site-internet-paris` landing page. The post also never links to that page or to `/contact`. | Merge it into `/blog/erreurs-site-vitrine-professionnel` (both are "erreurs" listicles, and this one has only 978 words). Then add a 301 from the old URL to the erreurs post. |
| 3 | High | Cannibalization: the `/blog/agence-web-boulogne-billancourt-comment-choisir` post targets a commercial local query. The SERPs for "agence web Boulogne-Billancourt" and "création site internet Boulogne-Billancourt" are both directory and commercial results and share the same directory URLs. The post competes with `/creation-site-internet-boulogne-billancourt`. A third Boulogne page, `/boulogne-billancourt`, also exists. | Change the post's primary keyword to the non-local informational query "comment choisir une agence web" (criteria and questions to ask). Keep one contextual link to the Boulogne landing page with the exact anchor "agence web à Boulogne-Billancourt". |
| 4 | Medium | Cannibalization: the blog refonte guide and the `/refonte-site-internet` landing page are both titled "Refonte de site internet ...". The SERP for "refonte site internet" is made of informational guides. The SERP for "agence refonte site internet Paris" is made of directories and commercial pages. | Give the blog post "quand et comment refaire son site / étapes d'une refonte". Give the landing page "agence refonte site internet". |
| 5 | Medium | Slug/title mismatch: the `/blog/guide-rebranding-2025` post now has the title "Agence branding à Paris : studio créatif ou grande agence", which is a commercial query owned by `/services/branding-identite-visuelle`. | Change the title to "Studio créatif ou grande agence de branding : comment choisir". Optionally move it to an evergreen slug with a 301. |
| 6 | Medium | Year in slug: `prix-site-vitrine-iledefrance-2025` has a 2026 title. Old links to it already 404 (finding 1). | Optionally move it to `/blog/prix-site-vitrine` with a 301 and update the year in the title only. |
| 7 | High | Orphan or near-orphan posts. `erreurs-site-vitrine-professionnel` and `creation-site-internet-paris-erreur` get **0** contextual links from any page; only `/blog` and the sitemap reach them. `impact-ui-confiance`, `bienvenue-chez-artichaud` and `site-internet-restaurant-guide` each get 1. | Apply the link matrix in section 5. |
| 8 | High | No money page links into the editorial content. `/services/creation-site-internet` uses `relatedLinkGroups.serviceWeb`, which contains no blog posts. The local pages link only to `/blog`. Every post shows the same static `editorial` block of 8 links, whatever its topic. | Build the RelatedLinks block per cluster: add a `cluster` field to the frontmatter and filter on it. Add a "Guides" block of 4 to 6 cluster posts on the service page. |
| 9 | Low | `src/app/works/page.tsx` renders `serviceBranding` twice, and `src/app/contact/page.tsx` renders `editorial` twice. | Remove the duplicates. |
| 10 | Medium | Gaps: there is no informational pillar for the seed term, and no posts on cahier des charges, maintenance, homepage content, or professions libérales and associations. | See section 4. |

## 2. Method and SERP overlap (read the caveat)

Keywords were grouped by intent first, then compared pairwise within each group using the URLs WebSearch returned. **The overlap scores are low-confidence.** The search tool returns only about 9 results, and they are domain-clustered (for example 8 lafabriquedunet.fr URLs or 9 kolonell.com URLs for one query), not Google's real top 10. Every pair scored 0 or 1 shared URLs, so the 4+ threshold could not be applied. The groupings below therefore rest on intent, the type of SERP (guides vs directories vs reviews) and domain-level overlap. **Validate them with a real SERP API or GSC query data before you merge any URL.** No search volume data was available, so `volume` is `null`.

| Pair | Shared URLs (tool) | Shared domains | SERP type | Reading |
|------|---|---|---|---|
| création site internet / création site internet paris | 1 (superprof) | 1 | guides vs directories | separate (intents differ) |
| création site internet / étapes création site internet | 0 | 2 (codeur, lafabriquedunet) | guides / guides | same cluster (pillar) |
| prix création site vitrine / combien coûte site internet pro | 1 (hellopro) | 2 | price guides | same post (one price article) |
| prix site vitrine IDF / prix création site vitrine | 0 | 1 (kolonell) | price guides | same post |
| délai création site / prix site vitrine | 0 | 1 (kolonell) | guides | same cluster |
| cahier des charges / refonte site internet | 0 | 1 (lafabriquedunet) | templates / guides | interlink |
| erreurs site vitrine / erreurs création site conversion | 1 (digitiz) | 2 | listicles | **same post**, which supports the merge in finding 2 |
| agence web Boulogne / création site internet Boulogne | 1 (118712 Hauts-de-Seine) | 2 | directories / directories | **same commercial intent**, which supports finding 3 |
| agence web Boulogne / création site internet paris | 1 (118712) | 1 | directories | local siblings |
| refonte site internet / refonte quand et comment | 0 | 0 | guides | same post |
| refonte site internet / agence refonte Paris | 0 | 1 | guides vs directories | separate pages, which supports finding 4 |
| webflow avantages inconvénients / WordPress Webflow Wix | 0 | 0 | reviews vs comparisons | separate posts, interlink |
| site vitrine ou e-commerce / création site vitrine pro | 0 | 1 (kolonell family) | definitions vs offers | interlink |
| agence branding Paris / (service branding) | n/a | n/a | directories | commercial, so not a blog query (finding 5) |
| maintenance site internet prix | n/a | kolonell | price guides | gap |

## 3. Architecture

**Two-layer hub:**
- **Commercial hub:** `/services/creation-site-internet`. It owns "création site internet" and "agence création site internet". `/creation-site-internet-paris` and `/creation-site-internet-boulogne-billancourt` are local children of this hub. `/tarifs` and `/simulateur` are conversion support pages.
- **Editorial pillar (gap, planned):** `/blog/creer-site-internet-professionnel-guide`, titled "Créer un site internet professionnel : étapes, budget, délais (guide 2026)". It targets "comment créer un site internet professionnel" and "étapes création site internet". Template: ultimate-guide, 3,000-3,500 words. It uses a different primary keyword from the service page, so the two do not cannibalize.

| Cluster | Posts (status) | Template / intent | Words now, then target |
|---|---|---|---|
| **C0 Budget et cadrage** | `prix-site-vitrine-iledefrance-2025` (written), "prix site vitrine" | cost guide / commercial investigation | 1740, keep |
| | `delai-creation-site-internet` (written), "délai création site internet" | how-to / informational | 1679, keep |
| | **gap:** `cahier-des-charges-site-internet`, "cahier des charges site internet" (+ downloadable template) | how-to + template / informational | 1500 |
| | **gap:** `maintenance-site-internet-prix`, "maintenance site internet prix" | cost guide / commercial investigation | 1400 |
| **C1 Format, plateforme, socle technique** | `site-vitrine-ou-ecommerce-quelle-difference` (written) | comparison / informational | 1334, keep |
| | `webflow-avantages-inconvenients-pme` (written) | review / commercial investigation | 1456, keep |
| | `notre-stack-technique` (written), reposition to "Next.js pour un site vitrine : quand est-ce pertinent" | comparison / informational | 1053, expand to 1300 |
| | `choisir-nom-de-domaine` (written) | how-to / informational | 1004, expand to 1300 |
| **C2 Conversion et crédibilité** | `erreurs-site-vitrine-professionnel` (written, absorbs `creation-site-internet-paris-erreur`) | listicle / informational | 1168, rises to about 1600 after the merge |
| | `impact-ui-confiance` (written) | listicle / informational | 1007, expand to 1300 |
| | **gap:** `page-accueil-site-vitrine`, "que mettre sur la page d'accueil d'un site vitrine" | how-to / informational | 1400 |
| **C3 Sites par métier** | `site-internet-artisan-guide-complet` (written) | vertical guide / commercial investigation | 1848, keep |
| | `site-internet-restaurant-guide` (written) | vertical guide / commercial investigation | 1626, keep |
| | **gap:** `site-internet-profession-liberale`, "site internet profession libérale" (avocat, cabinet, santé) | vertical guide | 1600 |
| | **gap:** `site-internet-association`, "créer un site internet pour une association" (use the Charitio case) | vertical guide | 1500 |

**Adjacent hubs** (outside this cluster but linked as cross-cluster or optional links):
- **Refonte:** `/refonte-site-internet` (commercial hub) and `refonte-site-internet-quand-et-comment` (spoke). Gap: `refonte-site-sans-perdre-seo` (301s, migration).
- **SEO:** `/services/seo-referencement-naturel` and `piliers-seo-2026` (1146 words, expand).
- **Branding:** `/services/branding-identite-visuelle` and `guide-rebranding-2025` (retitle as in finding 5).
- **Local:** `agence-web-boulogne-billancourt-comment-choisir` (reposition as in finding 3), which links to both local landing pages.
- **Brand/about:** `bienvenue-chez-artichaud` (846 words; overlaps `/about`). Keep it, link it from `/about`, and do not target any keyword with it.

Totals: 1 pillar (gap), 4 clusters, 15 spokes (10 existing and 5 gaps). Pillar target: 2500-4000 words. Spoke target: 1200-1800 words. Five existing spokes are under 1200 and are flagged for expansion above.

## 4. Content gaps (in priority order)
1. Editorial pillar "créer un site internet professionnel" (P1, unblocks the whole link matrix).
2. Cahier des charges site internet, with a template lead magnet (P1, high commercial-assist value; competitors such as La Fabrique du Net and Digitiz rank with templates).
3. Maintenance site internet prix (P2; the SERP is dominated by one thin multi-city publisher, so it is beatable).
4. Que mettre sur la page d'accueil d'un site vitrine (P2).
5. Site internet profession libérale (P2), then site internet association (P3).
6. Adjacent: refonte sans perdre son SEO (P2, supports `/refonte-site-internet`).

## 5. Internal link matrix (adjacency list)
Abbreviations: P = pillar `/blog/creer-site-internet-professionnel-guide`, S = `/services/creation-site-internet`. Paths are under `/blog/` unless they start with `/`.

**Mandatory (bidirectional):**
- P links to every spoke, and every spoke links to P (anchor = spoke primary keyword / "guide création site internet").
- Every spoke links to S (anchor "création de site internet"). S links to P and to the top spoke in each cluster: prix, site-vitrine-ou-ecommerce, erreurs, artisan.
- P links to S, `/tarifs`, `/simulateur`, `/creation-site-internet-paris` and `/creation-site-internet-boulogne-billancourt`.

**Recommended (within each cluster):**
- C0: prix to delai, prix to `/tarifs` and `/simulateur`, delai to prix, cahier-des-charges to prix and delai, maintenance to prix, delai to cahier-des-charges.
- C1: vitrine-ou-ecommerce to webflow and prix. Webflow to stack and to `/creation-site-vitrine-wordpress-webflow-wix`. Stack to webflow. Nom-de-domaine to vitrine-ou-ecommerce and stack. `/creation-site-vitrine-wordpress-webflow-wix` to webflow and stack.
- C2: erreurs to impact-ui and page-accueil. Impact-ui to erreurs and page-accueil. Page-accueil to erreurs and impact-ui.
- C3: artisan to restaurant and profession-liberale. Restaurant to artisan and association. Profession-liberale to artisan. Association to restaurant and `/works/charitio`.

**Optional (cross-cluster):**
- erreurs to nom-de-domaine. Webflow to piliers-seo. Artisan and restaurant to prix and erreurs. Prix to vitrine-ou-ecommerce. Delai to refonte-quand-et-comment.
- refonte-quand-et-comment to `/refonte-site-internet` and prix (this replaces the 404 links).
- agence-web-boulogne to `/creation-site-internet-boulogne-billancourt` and cahier-des-charges.
- impact-ui to `/services/branding-identite-visuelle`. guide-rebranding to impact-ui.

**Incoming contextual links per spoke after applying the matrix:** every spoke gets at least 3 (P plus 2 or more cluster peers, plus S for the cluster leads). There are no orphans.

## 6. Validation checklist
- [x] No two posts share a primary keyword, once the merge (finding 2), the repositioning (findings 3 and 5) and the refonte split (finding 4) are applied.
- [x] Every spoke links to P, and P links to every spoke (planned).
- [x] Every spoke has at least 3 incoming links planned; there are no orphans.
- [x] Templates match intent.
- [~] Word counts: 5 spokes are under 1200 (expansion is planned for each).
- [x] Size: 4 clusters of 3-4 posts.
- [ ] SERP overlap support: **not verifiable** with the current tool (all pairs scored 0 or 1). The groupings rest on intent and SERP type. Re-run with DataForSEO or GSC before you merge or 301 anything.

## 7. Structured findings (audit-data.json, category "Content Architecture")
```json
{
  "category": "Content Architecture",
  "seed_keyword": "création site internet",
  "created_at": "2026-10-17",
  "pillar": {"title": "Créer un site internet professionnel : étapes, budget, délais", "keyword": "comment créer un site internet professionnel", "volume": null, "template": "ultimate-guide", "wordCount": 3500, "url": "/blog/creer-site-internet-professionnel-guide", "status": "planned", "commercial_hub": "/services/creation-site-internet"},
  "clusters": [
    {"name": "Budget et cadrage", "posts": [
      {"keyword": "prix site vitrine", "url": "/blog/prix-site-vitrine-iledefrance-2025", "template": "cost-guide", "wordCount": 1740, "status": "written"},
      {"keyword": "délai création site internet", "url": "/blog/delai-creation-site-internet", "template": "how-to", "wordCount": 1679, "status": "written"},
      {"keyword": "cahier des charges site internet", "url": "/blog/cahier-des-charges-site-internet", "template": "how-to", "wordCount": 1500, "status": "planned"},
      {"keyword": "maintenance site internet prix", "url": "/blog/maintenance-site-internet-prix", "template": "cost-guide", "wordCount": 1400, "status": "planned"}]},
    {"name": "Format, plateforme, socle technique", "posts": [
      {"keyword": "site vitrine ou e-commerce", "url": "/blog/site-vitrine-ou-ecommerce-quelle-difference", "template": "comparison", "wordCount": 1334, "status": "written"},
      {"keyword": "webflow avantages inconvénients", "url": "/blog/webflow-avantages-inconvenients-pme", "template": "review", "wordCount": 1456, "status": "written"},
      {"keyword": "next.js site vitrine", "url": "/blog/notre-stack-technique", "template": "comparison", "wordCount": 1300, "status": "written-expand"},
      {"keyword": "choisir nom de domaine", "url": "/blog/choisir-nom-de-domaine", "template": "how-to", "wordCount": 1300, "status": "written-expand"}]},
    {"name": "Conversion et crédibilité", "posts": [
      {"keyword": "erreurs site vitrine", "url": "/blog/erreurs-site-vitrine-professionnel", "template": "listicle", "wordCount": 1600, "status": "written-merge"},
      {"keyword": "design UI confiance site web", "url": "/blog/impact-ui-confiance", "template": "listicle", "wordCount": 1300, "status": "written-expand"},
      {"keyword": "page d'accueil site vitrine", "url": "/blog/page-accueil-site-vitrine", "template": "how-to", "wordCount": 1400, "status": "planned"}]},
    {"name": "Sites par métier", "posts": [
      {"keyword": "site internet artisan", "url": "/blog/site-internet-artisan-guide-complet", "template": "vertical-guide", "wordCount": 1848, "status": "written"},
      {"keyword": "site internet restaurant", "url": "/blog/site-internet-restaurant-guide", "template": "vertical-guide", "wordCount": 1626, "status": "written"},
      {"keyword": "site internet profession libérale", "url": "/blog/site-internet-profession-liberale", "template": "vertical-guide", "wordCount": 1600, "status": "planned"},
      {"keyword": "site internet association", "url": "/blog/site-internet-association", "template": "vertical-guide", "wordCount": 1500, "status": "planned"}]}
  ],
  "cannibalization": [
    {"severity": "high", "urls": ["/blog/creation-site-internet-paris-erreur", "/creation-site-internet-paris"], "action": "merge into /blog/erreurs-site-vitrine-professionnel + 301"},
    {"severity": "high", "urls": ["/blog/agence-web-boulogne-billancourt-comment-choisir", "/creation-site-internet-boulogne-billancourt"], "action": "retarget post to 'comment choisir une agence web'"},
    {"severity": "medium", "urls": ["/blog/refonte-site-internet-quand-et-comment", "/refonte-site-internet"], "action": "split intents: guide vs agence"},
    {"severity": "medium", "urls": ["/blog/guide-rebranding-2025", "/services/branding-identite-visuelle"], "action": "retitle away from 'agence branding Paris'"}
  ],
  "broken_internal_links": [
    {"from": "/blog/refonte-site-internet-quand-et-comment", "to": "/blog/prix-site-vitrine-idf-2026", "status": 404},
    {"from": "/blog/refonte-site-internet-quand-et-comment", "to": "/services/refonte-site-web", "status": 404}
  ],
  "orphans": ["/blog/erreurs-site-vitrine-professionnel", "/blog/creation-site-internet-paris-erreur"],
  "scorecard": {"coverage": 0.67, "linkDensity": 0.94, "orphanPages": 2, "cannibalization": 4, "contentGaps": 6},
  "serp_overlap_confidence": "low (tool returns ~9 domain-clustered results; all pairs scored 0-1)"
}
```
Scorecard notes: coverage is 10 existing spokes out of 15 planned spokes plus the pillar. linkDensity is the number of in-content blog-to-blog links per post today (15 edges across 16 posts).
