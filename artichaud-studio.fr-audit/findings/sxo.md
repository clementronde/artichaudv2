# SXO Analysis: artichaud-studio.fr

Date: 2026-10-17. Scope: 5 target queries mapped to 5 site pages (plus homepage and /tarifs as supporting pages).
Score label: **SXO Gap Score** (separate from the SEO Health Score).

## Headline finding

**One HIGH page-type mismatch: "refonte site internet".** About 71% of the commercial/editorial SERP is long-form guides (Codeur, Invox, Noiise, Business Antidote, Inbound Value). Only 2 of 7 results are agency service pages (Youdemus, AmphiBee). The site targets this head term with a **Service Page** (/refonte-site-internet). It already has the matching guide format (/blog/refonte-site-internet-quand-et-comment), but that post is not the page positioned on the head term.

The other four query/page pairs are type-ALIGNED. Their gaps are in **depth, consistency and trust**, not in format:

1. **The FAQ answers are not in the DOM** on /creation-site-internet-boulogne-billancourt, /creation-site-internet-paris and /refonte-site-internet. The rendered HTML (Playwright, `--mode always`) contains only the questions. The accordion injects the answers on click. So the questions buyers ask most ("Quel est le tarif...", "Combien de temps...", "Vais-je perdre mon référencement ?") have answers that neither Google nor AI engines can read.
2. **The site gives three different price stories.**
   - /tarifs: "Site vitrine dès 3000€".
   - /blog/prix-site-vitrine-iledefrance-2025: "Studio / Agence : 5 000 € - 15 000 €+", 2 to 4 months.
   - The Boulogne, Paris and vitrine pages show pack cards with no price and three different pack naming schemes ("Vitrine essentiel/créatif/Site + branding", "Lancement/Croissance/Transformation", "Site Vitrine/E-commerce/Sur-mesure").
3. **The NAP contradicts itself on /creation-site-internet-paris.** The copy says "Artichaud est un studio web créatif basé à Paris" and "studio web parisien", but the address everywhere else is 18 rue d'Aguesseau, 92100 Boulogne-Billancourt.
4. **"agence web Boulogne-Billancourt" has 4 competing URLs:**
   - the homepage (title "Agence web, branding & SEO à Boulogne-Billancourt")
   - /creation-site-internet-boulogne-billancourt (meta "Agence web basée à Boulogne-Billancourt", H2 "Une agence web à Boulogne-Billancourt...")
   - /blog/agence-web-boulogne-billancourt-comment-choisir
   - /boulogne-billancourt (a city info page)

---

## 1. SERP analysis (per query)

Method: WebSearch (extended). The top organic results were classified with the 8-type taxonomy. Wikipedia entity results are listed but left out of the consensus, because they are query-ambiguity noise for the city name.

### Q1 "création site internet Boulogne-Billancourt"
| # | Result | Type |
|---|---|---|
| 1 | digitalunicorn.fr/agence-web-boulogne-billancourt | Service (local city page) |
| 2 | transacts.fr/service/creation-site-internet-boulogne-billancourt-92100 | Service (local city page) |
| 3 | sw-siteinternet.com/creation-de-site-internet-a-boulogne-billancourt | Service (local city page) |
| 4 | en.wikipedia.org Boulogne-Billancourt | Entity (noise) |
| 5 | novatechweb.fr/creation-site-boulogne-billancourt | Service (local city page) |
| 6 | ideaxe.fr/creation-site-internet-boulogne-billancourt | Service (local city page) |
| 7 | epixelic.com/creation-site-internet-boulogne-billancourt | Service (local city page) |
| + | 2 more Wikipedia pages (AC Boulogne, Billancourt Studios) | Noise |

- Consensus: **Local Service page, 6/6 commercial results (100%)**.
- Signals from the SERP summary:
  - Competitors anchor on visible prices: "1 490€", "1690€ HT", "abonnement dès 200€/mois".
  - They make speed claims: "7 jours", "48h ouvrées", "3 semaines".
  - They list what is included (SEO local, hébergement).
  - "92100" appears in titles.
- Local pack: probably present for this query but **not observable** here (see Limitations).

### Q2 "agence web Boulogne-Billancourt"
| # | Result | Type |
|---|---|---|
| 1 | net-concept.fr/agence-web/boulogne-billancourt | Service (local city page; ~964 days old) |
| 2 | futurdigital.fr/agence-web-marketing-digital-boulogne-billancourt | Service (local city page) |
| 3 | newp.fr/meilleure-agence-web/boulogne-billancourt | Comparison / listicle ("Les 10 meilleures") |
| 4-8 | 5 Wikipedia pages | Noise |

- Consensus: **Local Service page, 2/3 (67%)**, plus a Comparison listicle.
- The SERP is thin and stale: a 964-day-old page ranks, and half the results are Wikipedia. That makes this the **easiest query to win** with a strong local page plus GBP.

### Q3 "création site internet Paris"
| # | Result | Type |
|---|---|---|
| 1 | adveris.fr/page-art/creation-site-internet-paris | Service |
| 2 | pilot-in.com/hub/agence-web-paris | Service (hub) |
| 3 | smart-hoster.fr/creation-site-internet-paris | Service |
| 4 | beyonds.fr | Agency homepage (Service) |
| 5 | pixel-online.fr/agence-web-ile-de-france-creation-site-internet-paris | Service |
| 6 | lenobot.com/blog/creation-site-internet-paris | Blog Post (prix, délais, conseils) |
| 7 | agence-web-paris.com | Agency homepage (Service) |
| 8 | beecomy.com/ville/paris | Service (city page) |
| 9 | paris.jalis.fr/... | Local Service (arrondissement page, Paris 18e) |

- Consensus: **Service Page, 8/9 (89%)**.
- Strong incumbents: Adveris, Pilot'in, Jalis.
- Price and delay anchors in the SERP: "1 000 - 5 000 €" and "3 à 6 semaines" (guide), "à partir de 4 000 € HT", "abonnement 19 €/mois".
- One guide advises targeting an **arrondissement/quartier** rather than "Paris".

### Q4 "prix site vitrine"
| # | Result | Type |
|---|---|---|
| 1 | octolio.io/articles-de-blog/prix-site-vitrine (2024) | Blog Post |
| 2 | trend-design.fr/post/prix-site-vitrine ("2026 : les tarifs réels") | Blog Post |
| 3 | margaux-teste.fr/articles/prix-site-vitrine | Blog Post |
| 4 | seedweb.fr/prix-site-internet ("Guide complet des tarifs 2026") | Blog Post |
| 5 | adekoite.fr/combien-coute-creation-site-vitrine ("Tarifs 1 500 à 8 000 €") | Blog Post |
| 6 | kailimer.com/prix-site-internet-vitrine | Blog Post |
| 7 | studioparici.com/prix-site-vitrine ("en 2026") | Blog Post / Hybrid |
| 8 | toonetcreation.com/blog/.../combien-coute-un-site-vitrine-en-2025 | Blog Post |
| 9 | mysiteagency.info/blog/prix-site-vitrine ("en 2026") | Blog Post |

- Consensus: **Blog Post (price guide), 9/9 (100%)**.
- 5 of 9 titles carry the year "2026", and one carries the price range in the title.
- Recurring sub-topics:
  - freelance vs agency ranges (800-4 000 € vs 3 000-15 000 €)
  - one-page vs 5-20 pages
  - recurring costs (domain 10-15 €/an, hosting)
  - monthly subscription models (49-149 €/mois)

### Q5 "refonte site internet"
| # | Result | Type |
|---|---|---|
| 1 | codeur.com/blog/refonte-site-internet ("Guide 2026") | Blog Post |
| 2 | invox.fr/refonte-site-internet ("guide complet") | Blog Post |
| 3 | noiise.com/ressources/.../en-quoi-consiste-une-refonte-de-site-web | Blog Post |
| 4 | youdemus.fr/services/refonte-site-internet | Service |
| 5 | amphibee.fr/votre-projet/refonte-de-site-internet | Service |
| 6 | business-antidote.com/refonte-site-internet ("Le guide complet") | Blog Post |
| 7 | inboundvalue.com/blog/etapes-refonte-site-web ("10 étapes") | Blog Post (list) |
| 8-9 | Wikipedia (Refback, Meta refresh) | Noise |

- Consensus: **Blog Post / guide, 5/7 (71%)**. Service pages make up 2/7 (29%).
- Content themes:
  - definition
  - phased steps (cahier des charges > maquettes > intégration > SEO > recette > mise en ligne)
  - an audit of the existing site first
  - cost ("difficile de donner un prix fixe", from a few hundred €)

---

## 2. Page-type mismatch detection

| Query | SERP dominant type (confidence) | Site page | Page type | Severity |
|---|---|---|---|---|
| création site internet Boulogne-Billancourt | Local Service (100%) | /creation-site-internet-boulogne-billancourt | Local Page (address + Maps iframe + Service schema) | **ALIGNED** |
| agence web Boulogne-Billancourt | Local Service (67%) + listicle | homepage / LP / blog / city page (4 URLs) | Service + Local | **ALIGNED in type, MEDIUM cannibalization** |
| création site internet Paris | Service (89%) | /creation-site-internet-paris | Service Page | **ALIGNED in type, HIGH depth/trust gap** |
| prix site vitrine | Blog Post (100%) | /blog/prix-site-vitrine-iledefrance-2025 | Blog Post | **ALIGNED** (geo-modifier narrows it; freshness gap) |
| prix site vitrine (if Google picks /tarifs) | Blog Post (100%) | /tarifs | Product/pricing page | **MEDIUM** (must not be the ranking URL) |
| refonte site internet | Blog Post (71%) | /refonte-site-internet | Service Page | **HIGH mismatch** |

**Mismatch detail for "refonte site internet" (HIGH).** The taxonomy rule "Service Page targeting informational-dominant keyword" applies. The SERP rewards explanatory guides: steps, when to redesign, cost, SEO preservation. /refonte-site-internet is a conversion page.

- What it does well: it has "Quand faut-il refondre" cards and a 5-step process.
- What it lacks:
  - its 4 FAQ answers are not rendered
  - there is no cost range
  - there is no checklist or step-by-step depth
- The guide-format content lives on /blog/refonte-site-internet-quand-et-comment.

Two fix options:
- **(a) Preferred:** position the blog guide on the head term "refonte site internet". Re-target the service page to "agence refonte site internet" / "refonte site internet Boulogne / Paris". Cross-link both.
- **(b)** Turn the service page into a Hybrid. Add 800-1,200 words of guide content: steps, a cost table, SEO-migration checklist, timeline. Merge or redirect the blog guide into it.

---

## 3. User stories (derived from SERP signals)

1. **Local TPE/PME owner in the 92 (Decision).** As a business owner in Boulogne, I want a nearby agency I can meet in person, because I want an accountable partner. But I'm blocked by a **trust gap**: every result looks the same, and the ratings are self-reported.
   *(Source: Q1 has 6/6 "[service] Boulogne-Billancourt 92100" city pages; the SERP summary warns that "notes affichées (4,8/5 ou 5/5) proviennent des sites eux-mêmes"; Q2 includes the newp "10 meilleures agences" listicle.)*
2. **Budget-conscious buyer (Consideration).** As a small business, I want to know what a site vitrine really costs and what is included, because I fear hidden costs. But I'm blocked by **price sensitivity**: quotes range from 800 € to 15 000 €.
   *(Source: Q4 is 100% price guides; Q1 competitors show "1 490€", "1690€ HT", "200€/mois"; Q3 shows "1 000 - 5 000 €", "dès 4 000 € HT", "19 €/mois".)*
3. **Owner of an ageing site (Awareness to Consideration).** As someone whose site is dated, I want to understand when and how to redesign without losing Google traffic. Redesigning feels risky. I'm blocked by an **information gap**: steps, cost, and SEO impact.
   *(Source: Q5 is 71% guides with "étapes", "audit de l'existant", "difficile de donner un prix fixe".)*
4. **Time-pressured buyer (Decision).** As a business launching soon, I want my site live quickly. I'm blocked by **time pressure**: competitors promise 48h, 7 days or 3 weeks.
   *(Source: Q1 summary lists "7 jours", "48h ouvrées", "3 semaines"; Q3 lists "2 à 4 semaines".)*
5. **Parisian startup / brand (Consideration).** As a Paris startup, I want a creative studio that can match the big Paris agencies. I'm blocked by **comparison fatigue** against established players.
   *(Source: Q3 is led by Adveris, Pilot'in and Beyonds; a guide recommends targeting the arrondissement or quartier.)*

These stories cover all three journey stages.

---

## 4. SXO Gap Score per page (100 pts)

| Dimension (max) | Boulogne LP | Paris LP | Prix blog | Refonte | Notes |
|---|---|---|---|---|---|
| Page Type (15) | 14 | 11 | 13 | 6 | Paris: a "basé à Paris" claim with no Paris address. Refonte: HIGH mismatch. |
| Content Depth (15) | 9 | 5 | 12 | 9 | Word counts below. FAQ answers are not in the DOM on 3 pages. |
| UX Signals (15) | 11 | 10 | 10 | 11 | All 4 have CTAs. No on-page form anywhere (0 `<form>`). Blog has a double H1. |
| Schema (15) | 10 | 8 | 11 | 9 | Details below. |
| Media (15) | 9 | 8 | 7 | 10 | Details below. |
| Authority (15) | 8 | 6 | 9 | 6 | Details below. |
| Freshness (10) | 5 | 4 | 5 | 4 | Details below. |
| **SXO Gap Score** | **66** | **52** | **67** | **55** | |

Score details:

- **Content Depth.** Main-content words: Boulogne 733, Paris 331, Prix blog 1,692, Refonte 735.
- **Schema.**
  - Boulogne and Paris: Service + OfferCatalog with no prices.
  - Paris: no BreadcrumbList.
  - Blog: BlogPosting + BreadcrumbList, but the `image` uses a relative URL (`/blog/prix-site-vitrine-idf-2026/cover.avif`).
- **Media.**
  - Boulogne: 8 images plus a Google Maps embed.
  - Refonte: a before/after slider, but the "Refonte Startup Tech" card has no text.
  - Blog: 6 images and a comparison table.
- **Authority.**
  - Boulogne and Paris: one testimonial (Victoria Lauro, Chez June) and 4 named projects.
  - Refonte: its case studies are anonymous ("Cabinet Avocat", "+40% de demandes" is unverifiable).
  - Blog: named author with jobTitle (Clément Rondepierre, CEO), but no external sources cited.
- **Freshness.**
  - No dates are shown on the service pages.
  - Blog: datePublished and dateModified are both 2025-12-15. The slug says "2025" while the title says "2026". The dates are 10 months old, while competitors show "2026".

Other page-level facts:
- **Boulogne LP:** its title is duplicated: "... Devis gratuit | Artichaud Studio | Artichaud Studio".
- **/tarifs** (supporting page, not scored against a query):
  - prices are transparent (3 000 / 8 000 / 15 000 €, add-ons, hosting 40-100 €/an, payment milestones 30/40/30)
  - it has DesignAgency + PriceSpecification schema
  - the quote delay contradicts itself: the meta says "Devis gratuit en 24h", the FAQ and CTA say "sous 48h"

---

## 5. Persona scoring

Weighting: the SERPs are commercial-local for Q1-Q3 and informational for Q4-Q5. Local and budget personas are weighted highest.

| Persona (evidence) | Page evaluated | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Local TPE/PME owner 92 (Q1/Q2 city pages) | Boulogne LP | 21 | 17 | 16 | 18 | **72** | Good |
| Budget-conscious buyer (Q4 100% price guides, Q1/Q3 price anchors) | Prix blog + /tarifs + LPs | 20 | 12 | 14 | 16 | **62** | Good (low) |
| Agency evaluator / comparison shopper (newp listicle, "avis indépendants") | Homepage + Boulogne LP | 15 | 14 | 12 | 15 | **56** | Needs Work |
| Owner of ageing site (Q5 guides) | /refonte-site-internet | 14 | 15 | 11 | 19 | **59** | Needs Work |
| Time-pressured buyer (Q1 "48h / 7 jours / 3 semaines") | Boulogne LP + Prix blog | 10 | 8 | 14 | 15 | **47** | Needs Work |
| Parisian startup / brand (Q3 big agencies) | /creation-site-internet-paris | 13 | 14 | 10 | 17 | **54** | Needs Work |

### Weakest persona: Time-pressured buyer (47/100)

**Top issue.** No visible delivery time on any money page.
- The only delay question ("Combien de temps faut-il pour créer mon site ?") sits in a FAQ whose answer is not in the DOM.
- The blog table says agencies take "2 à 4 mois", which signals slowness against competitors' "7 jours" and "3 semaines".

**Fix.**
- Add a "Délais" line to each pack card on the Boulogne and Paris LPs, e.g. "Vitrine essentiel : 3 à 4 semaines".
- Add a 4-step timeline with week markers to the "Un processus clair" section.
- Server-render the FAQ answers.

### Next: Parisian startup / brand (54/100)

**Top issue.** The page is thin (331 words). It also claims "basé à Paris" while the NAP is in Boulogne, which undermines trust.

**Fix.**
- Rewrite the claim as "studio basé à Boulogne-Billancourt, aux portes de Paris (Paris 16e/15e à 10 min)".
- Add 600-900 words:
  - startup/brand case studies (Lumyn Paris, Disobey, Caisse d'Épargne, Remembraance)
  - a section per arrondissement served (16e, 15e, 8e)
  - delays and prices
- Add BreadcrumbList.
- Add 2-3 testimonials from Paris clients.

### Agency evaluator (56/100)

**Fix.**
- Show the Google review count and link it to the GBP, not just "5.0 sur Google".
- Add 3 or more testimonials with company names on the Boulogne LP.
- Add a "Pourquoi nous plutôt qu'une grande agence" comparison block.
- Turn /blog/agence-web-boulogne-billancourt-comment-choisir into a criteria checklist that links to the LP.

### Owner of ageing site (59/100)

**Fix.** Apply mismatch option (a) or (b) above. Also:
- Render the FAQ answers.
- Add a cost range: "Refonte vitrine : à partir de X €".
- Name the case-study clients, or label them as anonymised with consent.
- Add a downloadable "Checklist migration SEO".

### Budget-conscious buyer (62/100)

**Fix.** Unify the price story across the site:
- /tarifs vitrine "dès 3 000 €"
- blog agency range "5 000-15 000 €+": reconcile it, e.g. by adding a line that "Artichaud : dès 3 000 € HT"
- pack cards on the LPs: show "à partir de" prices and use one naming scheme
- add the Offer `price` / `priceSpecification` to the Service schemas on the LPs
- align "24h" vs "48h" for the quote

### Local owner 92 (72/100)

**Fix.**
- Render the FAQ answers.
- Add an on-page contact form, or a booking widget, next to the Maps block.
- Fix the duplicated title suffix.
- Add the number of local clients and Boulogne client logos.

### Systemic issues

- **Clarity (lowest dimension on average).** Key answers (price, delay, SEO risk) are hidden in FAQ accordions that are not in the HTML. Prices are inconsistent across pages.
- **Trust.** Social proof is thin and repeated: one testimonial reused, anonymous refonte cases, a rating with no count.
- **No form on any money page.** Every CTA routes to /contact, which adds a step for decision-stage personas.

### Priority actions

1. **Server-render the FAQ answers** on /creation-site-internet-boulogne-billancourt, /creation-site-internet-paris and /refonte-site-internet. Keep the accordion styling but ship the answer text in the HTML, e.g. `<details>` or CSS hide. This fixes the systemic clarity issue and gives AI engines answers they can cite.
2. **Add delays and "à partir de" prices to the pack cards.** Unify pack names and prices with /tarifs and the prix blog. This serves the weakest persona and the budget persona.
3. **Resolve the refonte mismatch.** Position /blog/refonte-site-internet-quand-et-comment on "refonte site internet". Re-target /refonte-site-internet to "agence refonte site internet". Or hybridize the service page.
4. **Paris LP.** Fix the "basé à Paris" claim, expand to 900+ words, and add Paris case studies and breadcrumbs.
5. **Resolve the "agence web Boulogne" cannibalization.**
   - Homepage takes "agence web Boulogne-Billancourt".
   - The LP takes "création site internet Boulogne-Billancourt": change its meta, which currently opens with "Agence web basée à...".
   - The blog post stays a supporting "comment choisir" piece.
   - /boulogne-billancourt stays informational, with no "agence web" in the title.
6. **Refresh the prix blog.**
   - Update dateModified and add a visible "Mis à jour le".
   - Add the price range to the title, e.g. "Prix site vitrine 2026 : de 500 € à 15 000 € (Île-de-France)".
   - Remove the double H1.
   - Make the schema image URL absolute.
   - Consider a slug without "2025", with a 301.
   - Add a section on subscription models (49-149 €/mois), which competitors cover.
   - Consider a de-geolocalized angle for the head term "prix site vitrine".

---

## 6. Cross-skill recommendations

- `/seo local`: Q1/Q2 are local-intent. Audit the GBP, review count and NAP consistency, which the Paris LP contradicts.
- `/seo schema`: add Offer prices to the LP Service schemas, BreadcrumbList on the Paris LP, and an absolute image URL in BlogPosting.
- `/seo content`: E-E-A-T on the refonte case studies and the prix blog (no cited sources).
- `/seo page`: the Paris LP is thin (331 words of main content).

## 7. Limitations

- WebSearch is a US-based endpoint returning summarized organic results, not a live google.fr SERP. The following could **not be observed**:
  - local pack / map pack
  - Ads
  - People Also Ask
  - featured snippets
  - AI Overview citations
  - exact positions
  - whether artichaud-studio.fr ranks at all
  Rankings should be confirmed with GSC, or a FR-located SERP API / DataForSEO.
- Competitor pages were classified from their titles, URLs and SERP summaries, not fetched individually. Depth comparisons are estimates.
- Word counts come from trafilatura extraction (`extracted_text`). Accordion content is excluded because it is not in the DOM.
- No Core Web Vitals, field data or GBP data were assessed.
- Search volume weights for the personas are qualitative; no keyword volume data was available.

---

## Structured findings (audit-data.json, category "Search Experience")

```json
{
  "category": "Search Experience",
  "sxo_gap_scores": {
    "/creation-site-internet-boulogne-billancourt": 66,
    "/creation-site-internet-paris": 52,
    "/blog/prix-site-vitrine-iledefrance-2025": 67,
    "/refonte-site-internet": 55
  },
  "findings": [
    {"id": "sxo-01", "severity": "high", "title": "Page-type mismatch on 'refonte site internet'", "detail": "SERP 71% guides (5/7); target is a Service page. Blog guide /blog/refonte-site-internet-quand-et-comment should own the head term or service page must become Hybrid.", "urls": ["/refonte-site-internet", "/blog/refonte-site-internet-quand-et-comment"]},
    {"id": "sxo-02", "severity": "high", "title": "FAQ answers not present in rendered DOM", "detail": "Only questions are in HTML; answers injected on click. Price/delay/SEO answers invisible to Google and AI engines.", "urls": ["/creation-site-internet-boulogne-billancourt", "/creation-site-internet-paris", "/refonte-site-internet"]},
    {"id": "sxo-03", "severity": "high", "title": "Inconsistent pricing and pack naming across pages", "detail": "/tarifs vitrine des 3000 EUR; prix blog says agency 5000-15000+ EUR and 2-4 months; LP pack cards have no prices and 3 different naming schemes; quote delay 24h vs 48h.", "urls": ["/tarifs", "/blog/prix-site-vitrine-iledefrance-2025", "/creation-site-internet-boulogne-billancourt", "/creation-site-internet-paris"]},
    {"id": "sxo-04", "severity": "high", "title": "Paris LP thin and contradicts NAP", "detail": "331 words main content; claims 'base a Paris' while address is Boulogne-Billancourt; no BreadcrumbList. SERP 89% strong agency Service pages.", "urls": ["/creation-site-internet-paris"]},
    {"id": "sxo-05", "severity": "medium", "title": "Cannibalization on 'agence web Boulogne-Billancourt'", "detail": "Homepage, Boulogne LP (meta/H2), blog 'agence-web-boulogne-billancourt-comment-choisir' and /boulogne-billancourt compete.", "urls": ["/", "/creation-site-internet-boulogne-billancourt", "/blog/agence-web-boulogne-billancourt-comment-choisir", "/boulogne-billancourt"]},
    {"id": "sxo-06", "severity": "medium", "title": "Prix blog freshness and structure", "detail": "dateModified 2025-12-15, slug '2025' vs title '2026', double H1, relative image URL in BlogPosting; competitors show 2026 and price range in title.", "urls": ["/blog/prix-site-vitrine-iledefrance-2025"]},
    {"id": "sxo-07", "severity": "medium", "title": "No visible delivery times (weakest persona 47/100)", "detail": "Competitors advertise 48h/7 days/3 weeks; Artichaud shows none on money pages.", "urls": ["/creation-site-internet-boulogne-billancourt", "/creation-site-internet-paris"]},
    {"id": "sxo-08", "severity": "medium", "title": "Thin social proof on money pages", "detail": "Single reused testimonial, anonymous refonte case studies, Google 5.0 without review count; no on-page form.", "urls": ["/creation-site-internet-boulogne-billancourt", "/refonte-site-internet"]},
    {"id": "sxo-09", "severity": "low", "title": "Duplicated brand in title", "detail": "'... Devis gratuit | Artichaud Studio | Artichaud Studio'", "urls": ["/creation-site-internet-boulogne-billancourt"]}
  ],
  "personas": [
    {"name": "Time-pressured buyer", "score": 47},
    {"name": "Parisian startup/brand", "score": 54},
    {"name": "Agency evaluator", "score": 56},
    {"name": "Owner of ageing site", "score": 59},
    {"name": "Budget-conscious buyer", "score": 62},
    {"name": "Local TPE/PME owner 92", "score": 72}
  ]
}
```

Generate a PDF report? Use `/seo google report`.
