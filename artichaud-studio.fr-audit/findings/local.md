# Local SEO findings - artichaud-studio.fr (2026-10-17)

Score: 63/100 (estimate; GBP and citations not verifiable without paid tools)
- GBP signals 17/25, Reviews 6/20, Local on-page 15/20, NAP and citations 9/15, Schema 7/10, Links/authority 5/10 (est.)

Business type: hybrid (visible address 18 rue d'Aguesseau, 92100 Boulogne-Billancourt + areaServed Paris / Ile-de-France). Vertical: creative/web agency (no dedicated vertical in the reference set).

## NAP
| Source | Name | Address | Phone | Email |
|---|---|---|---|---|
| JSON-LD (all pages) | Artichaud Studio | 18 rue d'Aguesseau, 92100 Boulogne-Billancourt | +33766489982 | hello@artichaud-studio.com |
| Visible HTML (home, local pages) | same | same | 07 66 48 99 82 | .com |
| Mentions legales | | "18 rue d'aguesseau, Boulogne-Billancourt" (lowercase, no postcode); SIRET 93470685400015 | | |
Findings: NAP consistent. Phone formats differ only cosmetically. Email domain is .com while the site is .fr (19 .com vs 9 .fr references in source): confirm intentional, and make sure the mailbox works. Mentions legales lacks postcode and has lowercase street name. Phone is a mobile number (07), fine for SAB but check that it matches GBP.

## Schema
- Same sitewide block on every page: @type [Organization, DesignAgency, LocalBusiness], @id /#organization. Good: address, telephone, url, openingHoursSpecification (Mon-Fri 9-18), hasMap, sameAs incl. Google Maps CID link, priceRange.
- Issues: geo lat/long are strings with 7 decimals (use numbers, 5 decimals is enough); openingHoursSpecification is a single object (fine); multiple types including generic Organization (drop Organization, keep DesignAgency/ProfessionalService + LocalBusiness); areaServed lists only Paris and IDF (add Boulogne-Billancourt, Issy, Neuilly, Hauts-de-Seine); aggregateRating 5.0 with 1 review is self-serving on the business's own entity (Google ignores or may penalize for LocalBusiness self-reviews); ContactPoint areaServed "FR" only.
- /creation-site-internet-boulogne-billancourt and /creation-site-internet-paris add a second LocalBusiness/Service block with its own PostalAddress and GeoCoordinates (two address blocks on the page): verify they use the same @id or are Service nodes with provider -> /#organization, to avoid duplicate entities.

## GBP signals
- Google Maps place link (CID 0xa0fe1ccef548cf3f) in sameAs/hasMap: GBP exists. Maps iframe present on /creation-site-internet-boulogne-billancourt only (BoulogneClient.tsx:453); not on home or contact (check /contact).
- Cannot verify primary category (#1 factor), photos, posts, Q&A, hours match, service-area settings. Action: confirm primary category is "Agence de design Web"/"Agence de web design" or equivalent, hours = site hours, address shown (hybrid) and service areas set.

## Reviews
- Schema: 1 review (Victoria Lauro, 5/5, Google). Total visible: 1. Review count is very low: biggest local weakness. No velocity data, no review widget, no response pattern visible. Target 10-15 Google reviews from past clients (June / Chez June etc.), then show them on-page.

## Citations (French directories)
- Yelp: search only returns "near Boulogne-Billancourt" pages; no confirmed listing.
- PagesJaunes and Societe.com: blocked (403/Cloudflare challenge), not verified. annuaire-entreprises.data.gouv.fr returned a redirect, not verified.
- Not verified: Pappers, Societe.com, Infogreffe, PagesJaunes, Bing Places, Apple Business Connect, Cylex, Hoodspot, Malt, Clutch/Sortlist/Agences-web (agency-specific), Trustpilot, Boulogne-Billancourt CCI/local business associations. Check manually; ensure the exact NAP and SIRET match.

## Local landing pages
- /boulogne-billancourt: ~1,500 words in source, includes address, Marcel Sembat metro, neighbourhood detail: strong local content.
- /creation-site-internet-boulogne-billancourt (~435 words in page.tsx + client component) and /creation-site-internet-paris (~364 words): shorter; text nodes in page.tsx share 0 identical long strings with each other or with /boulogne-billancourt (no copy-paste duplication detected in static strings; client components not diffed).
- Risk: three pages target overlapping intent for Boulogne (/boulogne-billancourt vs /creation-site-internet-boulogne-billancourt): keyword cannibalisation. Consolidate or differentiate (one = agency/studio/contact intent, other = service intent) and cross-link with clear anchors.
- /creation-site-internet-paris: Paris page while physical address is in Boulogne; acceptable as service-area page but needs Paris-specific proof (clients in Paris, arrondissements, case studies, transit), not just a swapped city name. Swap test: passes at string level, verify rendered client content.
- Titles/canonical OK (Paris: title, description, canonical, single H1 present).
- Also exist: /refonte-site-internet, /creation-site-vitrine-wordpress-webflow-wix with LocalBusiness-type schema (dedicated service pages: good; the #1 local organic factor).

## Top actions
1. Critical: Get 10+ Google reviews; add a review request link; respond to all.
2. Critical: Verify GBP primary category, hours, service areas, photos, weekly posts, services list.
3. High: Fix schema: numeric geo, drop redundant Organization type, remove self-serving aggregateRating until >= 5 real reviews with visible on-page source, extend areaServed.
4. High: Resolve cannibalisation between /boulogne-billancourt and /creation-site-internet-boulogne-billancourt.
5. High: Add Paris-specific proof to /creation-site-internet-paris (clients, arrondissements, case studies).
6. High: Claim/verify listings: PagesJaunes, Bing Places, Apple Business Connect, Yelp, Pappers/Societe.com with identical NAP.
7. Medium: Decide .com vs .fr email; align mentions legales address formatting (postcode, capitalisation).
8. Medium: Add Maps embed + directions link to home/contact; add more dedicated service pages + suburb pages (Issy, Neuilly, Levallois) if real work exists.
9. Medium: Agency directories (Sortlist, Clutch, Malt, Agences-web) for backlinks and citations.
10. Low: Add the Google Maps profile review link to footer; consider LocalBusiness `sameAs` for new profiles.

## Limitations
No DataForSEO or GBP access: GBP category, photos, posts, review velocity, local pack rankings, and directory listings (PagesJaunes, Societe.com blocked) were not verified. Proximity (about 55% of ranking variance) is outside control. Client-component text of local pages not fully diffed.
