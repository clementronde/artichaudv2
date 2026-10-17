# Content Quality & E-E-A-T: artichaud-studio.fr

**Audit date:** 2026-10-17 | **Baseline:** FULL-AUDIT-REPORT.md (2026-08-06, E-E-A-T 35/100, Content 62/100)
**Method:** live fetch of 44 URLs (16 main pages, 16 blog posts, 12 case studies) via `render_page.py --mode never`, trafilatura `extracted_text` plus `<main>` word counts, 5-gram shingle overlap for duplication, Kandel-Moles readability (French Flesch, approximate), `metadata_template.py` over all 44 title/description pairs, and a read of the source in `src/` and `content/blog/`.

## Scores

| Metric | Score | Previous (08-06) |
|---|---|---|
| **Content quality (overall)** | **57/100** | 62 |
| **E-E-A-T (weighted)** | **46/100** | 35 |
| AI citation readiness | 60/100 | n/a (GEO was 88, a file-level score) |
| Templated metadata risk | low (0/44 templated) | n/a |

E-E-A-T breakdown (this skill's internal weights, not Google's):

| Factor | Weight | Score | Rationale |
|---|---|---|---|
| Experience | 20% | 45 | 12 case studies, but each has only 130-280 words, no results or metrics, no client quote. One (Comon) is unfinished. |
| Expertise | 25% | 50 | A named author byline and Person schema now appear on every post. The author entity points to /about, which never names him in visible text. There are factual errors and unsourced statistics. |
| Authoritativeness | 25% | 30 | 1 Google review, no press, almost no outbound citations. The Caisse d'Épargne Île-de-France project is the strongest authority asset and is under-used. |
| Trustworthiness | 30% | 58 | SIRET, address, phone and transparent pricing are present. Against that: the review claim is inflated, the Paris page misstates the location, and the legal notice is missing required fields. |
| **Weighted** | | **46** | 9.0 + 12.5 + 7.5 + 17.4 |

Content quality fell slightly even though E-E-A-T improved. The blog has now been stalled for 7 months instead of 5, and the case studies (12 indexable URLs) are thin, with one broken rendering defect.

---

## What improved since 2026-08-06

1. **Authorship (fixed for the blog).** `src/app/blog/[slug]/page.tsx` now renders a visible byline ("Clément Rondepierre, CEO & Co-fondateur", with photo and alt text). BlogPosting JSON-LD now carries an `author` Person with `jobTitle` and `worksFor`, and `og:article:author` is set. Previously no post had an author.
2. **Team photo alt text** in `VisionSection.tsx` now names the people ("Clément, Artichaud Studio", "Charlotte, ...").
3. **A real Google review** (Victoria Lauro, Chez June) replaced the placeholder testimonials on the live site. It appears on the home page and the Boulogne page and is marked up as `Review` + `AggregateRating`.
4. **The orphaned Paris article is live.** `creation-site-internet-paris-erreur.mdx` was renamed (commit 960084e) and is now in the sitemap. The site has 16 posts live.
5. **Substantive refresh of 5 posts on 2026-06-08** (+500/-136 lines). These are real rewrites, not just a date bump. Artisan and restaurant guides got `modifiedDate: 2026-08-07`.
6. **Local pages are genuinely distinct.** Shingle containment between `/creation-site-internet-paris` and `/creation-site-internet-boulogne-billancourt` is 11%, and no other main-page pair exceeds 13% (excluding /works boilerplate). This is not doorway duplication.
7. **Contextual internal links** were added inside posts (for example the prix post now links to the Boulogne and Paris pages), and a `ContactCTA` was added to all 16 posts.
8. **Legal notice** now shows SIRET 93470685400015, address, phone and host.

## Still open from the previous audit

- **No founder names in visible /about text.** The rendered page text contains 0 occurrences of "Rondepierre", "Clément" or "Charlotte". Names exist only in image alt text. The page says "l'alliance d'un développeur-marketeur et d'une directrice artistique" without naming either.
- **Reviews.** There is still exactly 1 review (`reviewCount: "1"` in `src/components/seo/JsonLD.tsx`).
- **Blog cadence.** The last new post was 2026-03-16 (Webflow), 7 months ago. Meanwhile `/blog` keeps `changefreq: daily` and a hard-coded `lastmod 2026-05-29`.
- **Testimonials do not match the portfolio.** The only testimonial (Chez June) has no matching case study.

---

## Findings by severity

### Critical / High

**H1. Case-study text is rendered without spaces, so crawlers and AI extractors read concatenated words.**
`ProjectIntro.tsx`, `home/Intro.tsx` and `about/AboutIntro.tsx` split text into `<span class="title-word inline-block mr-[0.25em]">` elements. The spacing comes from CSS margin only, and the DOM has no whitespace text nodes. Extracted text on all 12 `/works/*` pages, the home intro and the about intro reads like this:
`Jobmirapprochelestalentsetlesopportunitésavecuneidentitédemarqueclaire...`
`NoussommesArtichaudStudio,l'allianced'undéveloppeur-marketeuretd'unedirectriceartistique...`
That sentence is the main positioning statement on /about and the lead paragraph of every case study. Fix: render `{word}{' '}` (a real space after each span), or keep a visually hidden full-text copy and mark the animated spans `aria-hidden`.

**H2. The 12 case studies are thin, and one is unfinished.**
- Rendered main-content words range from 187 to 282. About 60% of that is shared boilerplate (palette, blog teaser, CTA): shingle containment between any two works pages is 45-71%.
- None of them states a measurable outcome (traffic, leads, conversion, delivery time), a client quote, or a link to the live site.
- `src/data/project.ts:341` (Comon) ends mid-sentence: `"Le projet part d'un constat : "`. Comon's colour palette is also copied from Cherico ("Coffee Bean", "Latte Foam", "Dark Roast", "Chicory"), and the code comment still says `// Palette suggérée (Café/Nature)`.
- The Cherico description says "Charico" (typo for the client name).
- The Caisse d'Épargne Île-de-France "Génération Impact" project is the most authoritative proof on the site, yet it is not referenced on the home page, the local pages or /about.

These pages are the main **Experience** evidence for an agency. Expand each to 500+ words using a context, problem, approach, deliverables, result, client-quote structure, and fix or noindex Comon until it is complete.

**H3. The author entity chain is broken.**
The blog byline and Person schema point to `url: /about`. /about does not name Clément Rondepierre in its text, has no bio, no LinkedIn profile link (the only LinkedIn link is the company footer), and no Person schema. The Organization schema has no `founder`. Google and LLMs therefore cannot corroborate the author. Fix:
- Add a visible founders block on /about: full names, roles, years of experience, background, and personal LinkedIn links.
- Add `founder: [Person, Person]` to the Organization schema, with `sameAs` LinkedIn.
- Point the BlogPosting `author.url` to `/about#clement-rondepierre`.
- Show Charlotte as the author or reviewer of the branding posts (guide-rebranding, impact-ui-confiance).

**H4. Inflated or misleading trust claims (Trustworthiness).**
- The `/creation-site-internet-boulogne-billancourt` meta description says "notée 5/5 sur Google". That rests on a single review. Either state "1 avis" or remove the claim until there are 10 or more reviews.
- `AggregateRating` (5/5, 1 review) is emitted on the Organization/LocalBusiness node on every page. Self-serving reviews on LocalBusiness/Organization are not eligible for review rich results, and a 1-review aggregate is a weak trust signal. Keep the `Review`, and drop `AggregateRating` until real volume exists.
- `/creation-site-internet-paris` says "Artichaud est un studio web créatif **basé à Paris**" and "un studio web parisien". The company is at 18 rue d'Aguesseau, Boulogne-Billancourt, and every other page (and the schema) says so. Rephrase as "basé à Boulogne-Billancourt, aux portes de Paris (16e)".

### Medium

**M1. Factual errors and unsourced statistics (Expertise).**
- `/boulogne-billancourt`: "ligne 9 du métro (stations Marcel Sembat et **Boulogne – Jean Jaurès**)" is wrong. Jean Jaurès is on line 10, and the line 9 stations are Marcel Sembat, Billancourt and Pont de Sèvres. "La ligne 10 du tramway T2" mixes up metro and tram. The claims "Campus Bouygues" (Manufacture district) and "1er pôle audiovisuel francilien" are unsourced. This page is framed as "un guide factuel", so errors there do outsized damage.
- `webflow-avantages-inconvenients-pme.mdx` says multilingual Webflow works "via des solutions tierces". Webflow has shipped native Localization since 2023. The same post says Webflow is used "pour une majorité de nos projets", while `notre-stack-technique.mdx` and the site itself are Next.js, so the two posts contradict each other. Its "détection de langue" link goes to `/blog/piliers-seo-2026`, which is unrelated.
- Across 16 posts there is **1 external citation in total**, yet the posts carry about 15 percentage statistics with no source. Examples: "87 % des clients recherchent un restaurant...", "3 secondes ... 40 % des visiteurs", "facturer 20 à 30 % plus cher", "40 % des artisans" (attributed to the CMA but not linked), "WordPress 40 %" (W3Techs is about 43%). Link a primary source for each statistic or remove it. This is also the single biggest lever for AI citation.

**M2. Freshness and cadence.**
- New posts: Dec 2025 to Mar 2026 was roughly weekly, then **0 since 2026-03-16**.
- The sitemap uses `post.meta.date` as `lastModified` (`src/app/sitemap.ts:83`), so the June and August refreshes are invisible to crawlers. Use `modifiedDate ?? date`.
- The post template displays only the publication date. Add a visible "Mis à jour le ...".
- Commit 3c61e4f (2026-04-30) rewrote publication dates. For example `guide-rebranding-2025` moved from 2025-02-14 to 2025-12-08, and `choisir-nom-de-domaine` from 2026-04-09 to 2026-02-23. Keep publication dates stable from now on and signal changes through `modifiedDate` only.
- `mentions-legales` shows "En vigueur au {new Date()}", which is today's date on every request. That is a synthetic freshness signal and not legally meaningful. Hard-code the real revision date.
- Slugs still say 2025 (`prix-site-vitrine-iledefrance-2025`, `guide-rebranding-2025`) while titles say 2026. Do not change the slugs (they carry equity), but avoid year-stamped slugs in new posts.

**M3. Duplicated brand in titles on 16 of 44 URLs.**
The layout template is `"%s | Artichaud Studio"` and the pages also append the brand themselves, which produces titles like:
`Création site internet Boulogne-Billancourt (92) — Devis gratuit | Artichaud Studio | Artichaud Studio` (102 chars)
This affects all 12 `/works/*` pages (`src/app/works/[slug]/page.tsx:32-34` appends `| ${SITE_NAME}`), `/works/all`, `/faq` and `/blog/bienvenue-chez-artichaud`. Fix: remove the manual suffix or use `title: { absolute: ... }`. Also, 40 of 44 titles are over 60 characters and 15 of 44 descriptions are over 160.

**M4. Double H1 on 10 of 16 posts.**
The MDX body starts with `# Title` and the template also renders an H1. Affected posts: agence-web-boulogne, choisir-nom-de-domaine, delai, erreurs-site-vitrine, prix, refonte, artisan, restaurant, vitrine-ou-ecommerce, webflow. Demote the MDX heading or delete it.

**M5. Thin commercial pages (against topical-coverage floors).**

| Page | Main words | Floor | Note |
|---|---|---|---|
| /creation-site-internet-paris | 563 (331 extracted) | 800 service / 500-600 local | Generic ("capitale mondiale du style"). No Paris projects, no Paris-specific proof. |
| /services/creation-site-internet | 682 | 800 | Core money page |
| /creation-site-vitrine-wordpress-webflow-wix | 528 | 800 | |
| /tarifs | 588 | 800 | Good transparency. Internal inconsistency: "20 pages ... 8 000 €" for a "5-10 pages" vitrine tier. |
| /works (index) | 202 | n/a | |
| /creation-site-internet-boulogne-billancourt | 884 | OK | Best local page: process, local context, testimonial |
| /services/seo, /services/branding | 1,439 / 1,326 | OK | |

**M6. Legal notice is incomplete for a French micro-entreprise.** It lacks the name of the individual entrepreneur and the *directeur de la publication* (LCEN art. 6-III). It lists `hello@artichaud-studio.com` while the site is `.fr` (consistent across the site but worth aligning). This is a trust and legal gap.

### Low

- `src/components/home/Testimonials.tsx` (unused; the live site uses `Testimonials2`) still contains 4 fabricated testimonials with Unsplash avatars ("Kiera Monaghan, CEO Disobey", "Elena Rodriguez, CMO TechFlow"). They are not live, but delete the file so they never get re-imported.
- `/boulogne-billancourt` reports `publication_date: 2017-01-01`. This comes from the "Seine Musicale inaugurée en 2017" text, which shows date extraction is ambiguous. Add `datePublished`/`dateModified` to that page's schema.
- The home page H1 slogan ("qui fait monter la température") is distinctive. Keep it.

---

## Readability

Kandel-Moles (French Flesch, approximate vowel-group syllables): blog 57-77 ("assez facile" to "facile"), commercial pages 56-62. Sentences are short, H2 density is good (6-12 per post), and there are tables in prix, tarifs and vitrine-vs-ecommerce. **No readability issues.** The lowest scorers (`guide-rebranding-2025` 57, `piliers-seo-2026` 59) are acceptable for B2B.

## AI-generated content assessment (QRG 2025-09-11)

The blog does not read as mass-produced. Generic AI phrasing is rare (4 hits across 16 posts for terms like "incontournable", "crucial", "machine à clients"), and posts contain some first-person agency statements. Low-quality markers that are present:
- Repetitive title patterns ("... en 2026 : le guide complet" ×4).
- Unsourced statistics (M1).
- Few concrete client anecdotes: experience markers per post range from 0 to 4, and 7 of 16 posts have none.
- A factual inaccuracy (Webflow localization) of the kind LLM drafts produce.

Verdict: **acceptable, not flagged as scaled content abuse**. Add one real project anecdote with numbers per post.

## Templated metadata

`metadata_template.py` over 44 pairs: `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Secondary flags:
- `brand_suffix_in_description` on /blog/bienvenue-chez-artichaud, /blog/notre-stack-technique, /services/branding-identite-visuelle and /works/all.
- `description_echoes_title` on /services/creation-site-internet.

No high-severity finding.

## AI citation readiness: 60/100

Strengths: llms.txt; clear H2 hierarchy; FAQ blocks; price tables with explicit € ranges (/tarifs, prix post), which are very quotable; local facts on /boulogne-billancourt.
Weaknesses: unsourced statistics; concatenated text in case studies and the about intro (H1); double H1s; author entity not corroborated; case studies have no numeric outcomes to quote.

---

## Prioritised recommendations

1. Fix word-span spacing in `ProjectIntro.tsx`, `Intro.tsx` and `AboutIntro.tsx` (15 min, affects 14 URLs).
2. Add a founders block with names, bios and LinkedIn to /about, plus `founder` Person schema, and link the blog author to it.
3. Correct "basé à Paris" on the Paris page and the "notée 5/5" claim. Drop `AggregateRating` until there are 10 or more reviews.
4. Complete Comon (or noindex it), fix the Comon palette and the "Charico" typo. Expand the top 4 case studies (Caisse d'Épargne first) with results and client quotes.
5. Fix the double-brand titles (`works/[slug]/page.tsx`, the Boulogne page, faq, bienvenue).
6. Fix the factual errors: metro lines on /boulogne-billancourt; Webflow Localization and the stack contradiction in the Webflow post.
7. Source every statistic in the blog with an outbound link to the primary source.
8. Restart publishing (minimum 2 posts per month), each with one first-hand project example. Use `modifiedDate` in the sitemap and show "Mis à jour le" on posts.
9. Remove the duplicate `#` H1 from 10 MDX files.
10. Expand /creation-site-internet-paris and /services/creation-site-internet to 900+ words with real projects and specifics.
11. Complete the legal notice (entrepreneur name, directeur de publication, fixed revision date).
12. Delete the unused `home/Testimonials.tsx` with its fabricated reviews.

---

## Structured findings (audit-data.json: Content Quality)

```json
{
  "category": "Content Quality",
  "score": 57,
  "eeat": {"overall": 46, "experience": 45, "expertise": 50, "authoritativeness": 30, "trustworthiness": 58, "previous_overall": 35},
  "ai_citation_readiness": 60,
  "metadata_template": {"site_risk": "low", "templated_ratio": 0.0, "shared_cta_phrases": {}, "pages_checked": 44},
  "findings": [
    {"id": "content-word-spans", "severity": "high", "title": "Animated word spans have no whitespace; extracted text is concatenated on 12 /works pages, home and /about intros", "files": ["src/components/Project/ProjectIntro.tsx", "src/components/home/Intro.tsx", "src/components/about/AboutIntro.tsx"]},
    {"id": "content-thin-case-studies", "severity": "high", "title": "Case studies 187-282 words, no outcomes/quotes; Comon unfinished with copied palette", "files": ["src/data/project.ts"]},
    {"id": "eeat-author-entity", "severity": "high", "title": "Blog author Person links to /about which never names the founders; no founder schema"},
    {"id": "trust-inflated-claims", "severity": "high", "title": "'notée 5/5 sur Google' on 1 review; site-wide AggregateRating reviewCount 1; Paris page says 'basé à Paris'"},
    {"id": "content-factual-errors", "severity": "medium", "title": "Metro line errors on /boulogne-billancourt; outdated Webflow localization claim; stack contradiction"},
    {"id": "content-unsourced-stats", "severity": "medium", "title": "~15 statistics across blog, 1 outbound citation total"},
    {"id": "content-freshness", "severity": "medium", "title": "No new post since 2026-03-16; sitemap ignores modifiedDate; publication dates rewritten; dynamic legal date"},
    {"id": "onpage-double-brand-title", "severity": "medium", "title": "16/44 titles contain '| Artichaud Studio | Artichaud Studio'", "files": ["src/app/works/[slug]/page.tsx", "src/app/creation-site-internet-boulogne-billancourt/page.tsx", "src/app/faq/page.tsx"]},
    {"id": "content-double-h1", "severity": "medium", "title": "10/16 blog posts render two H1s (MDX '# ' + template)"},
    {"id": "content-thin-commercial", "severity": "medium", "title": "Paris local page 563 words and generic; /services/creation-site-internet 682; vitrine CMS page 528"},
    {"id": "trust-legal-notice", "severity": "medium", "title": "Mentions légales missing entrepreneur name and directeur de publication"},
    {"id": "trust-dead-fake-testimonials", "severity": "low", "title": "Unused Testimonials.tsx contains fabricated reviews", "files": ["src/components/home/Testimonials.tsx"]}
  ],
  "improved_since_2026_08_06": ["visible author byline + Person schema on posts", "named alt text on team photos", "real Google review replaces placeholders", "Paris article published", "5 posts substantively refreshed", "legal notice with SIRET"]
}
```
