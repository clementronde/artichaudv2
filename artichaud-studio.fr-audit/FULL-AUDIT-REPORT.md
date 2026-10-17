# Audit SEO complet — Artichaud Studio
**Domaine :** artichaud-studio.fr | **Date :** 17 octobre 2026 | **Type détecté :** agence web & branding, hybride locale (Boulogne-Billancourt, service Paris / Île-de-France)
**Audit précédent :** 6 août 2026 (`../FULL-AUDIT-REPORT.md`)

> Méthode : 12 analyses spécialisées (technique, contenu, on-page, schema, sitemap, performance, visuel, GEO, agentic, SXO, local, backlinks, clusters) sur les 48 URL du sitemap, vérifiées en live et dans le code source. Détails par catégorie dans `findings/*.md`, captures dans `screenshots/`.
>
> **Limites :** pas de Google Search Console / GA4 / CrUX (aucune donnée terrain ni positions réelles) ; PageSpeed Insights en rate-limit → mesures Lighthouse locales (lab) ; backlinks limités à Common Crawl (domaine absent du graphe) ; SERP analysées via un outil de recherche non localisé google.fr.

---

## Score de santé SEO : **71 / 100** — « Correct, à consolider »

| Catégorie | Poids | Score | Évolution vs août |
|---|---|---|---|
| Technique | 22 % | 86 | ↑ (78) |
| Contenu (E-E-A-T 46) | 23 % | 57 | ↓ (62) — E-E-A-T ↑ (35 → 46) |
| On-page | 20 % | 74 | ≈ (75) |
| Schema / données structurées | 10 % | 66 | ↑ (60) |
| Performance (CWV, lab) | 10 % | 70 | nouvelle mesure |
| Préparation recherche IA (GEO 62 + agentic 100) | 10 % | 72 | ↓ (88, méthode plus stricte) |
| Images | 5 % | 68 | ↑ (45) |

Backlinks : **données insuffisantes** (non noté). Local : 63/100 (estimé, hors pondération).

---

## Synthèse

Les fondations techniques sont désormais très saines (redirections, canonicals, sitemap complet, en-têtes de sécurité, SSR, llms.txt). Le frein principal n'est plus technique : c'est **la confiance et la preuve** (1 seul avis Google, études de cas minces, auteurs non vérifiables, quasi aucune autorité externe) et une série de **bugs de cohérence** qui envoient des signaux contradictoires à Google et aux moteurs IA (texte sans espaces, réponses FAQ absentes du HTML, prix et délais incohérents, « basé à Paris »).

### Ce qui a été corrigé depuis août
- Article MDX invisible publié (16 articles en ligne), images OG Paris/Boulogne réparées, FAQPage retiré.
- CSP ajoutée, crawlers IA listés explicitement, alt text largement corrigés.
- Byline + Person schema sur tous les articles, vrai avis Google à la place des faux témoignages, SIRET dans les mentions légales.

### Toujours ouvert
- Blog à l'arrêt depuis le 16/03/2026 (7 mois).
- Core Web Vitals jamais mesurés en données terrain.
- Pages faiblement maillées.

---

## Top 5 problèmes critiques / élevés

1. **Texte sans espaces lu par les crawlers** *(vérifié)* — `HighlightTitle` (`src/components/about/AboutIntro.tsx:11-21`) et les composants équivalents de `home/Intro.tsx` et `Project/ProjectIntro.tsx` découpent les mots en `<span>` espacés uniquement par `mr-[0.25em]`. Le HTML donne « Noussommes Artichaud… », « Jobmirapprocheles… » : les 12 pages /works et les intros home/about sont illisibles pour Google et les IA.
2. **Réponses FAQ absentes du HTML** *(vérifié)* — `AccordionItem` (`src/app/refonte-site-internet/RedesignClient.tsx:86-102`, idem Boulogne et Paris) ne rend la réponse que si `isOpen`. « Zéro minute… » : 0 occurrence dans le HTML servi. Les réponses prix / délais / risque SEO ne sont ni indexées ni citables.
3. **Liens internes cassés** — `/blog/refonte-site-internet-quand-et-comment` pointe vers `/blog/prix-site-vitrine-idf-2026` et `/services/refonte-site-web` (404). Cibles correctes : `/blog/prix-site-vitrine-iledefrance-2025` et `/refonte-site-internet`.
4. **LCP mobile en échec (7–8 s)** — sur home et services, l'élément LCP est le H1, rendu côté serveur en `opacity:0` (état initial d'animation) : ~2,2 s de délai de rendu. Desktop OK (97–100).
5. **Signaux de confiance faibles ou gonflés** — AggregateRating 5.0 sur **1** avis dans le schema de toutes les pages et « notée 5/5 sur Google » en meta description ; la page Paris dit « basé à Paris » alors que l'adresse est à Boulogne ; les fondateurs ne sont nommés nulle part en texte sur /about.

## Top 5 quick wins

1. Ajouter `{" "}` après chaque mot dans les composants d'animation mot par mot (15 min).
2. Rendre les réponses FAQ toujours dans le DOM (masquées en CSS / `<details>`) (30 min).
3. Corriger les 2 liens cassés de l'article refonte (5 min).
4. Supprimer le double suffixe « | Artichaud Studio | Artichaud Studio » sur ~20 pages (`works/[slug]/page.tsx:32-34` + template) (15 min).
5. Nettoyer `llms.txt` / `llms-full.txt` : liens `www` → apex, placeholder « [Directrice artistique] », fourchettes d'hébergement contradictoires, articles manquants (30 min).

---

## Technique — 86/100
- ✅ Redirections .com / www → apex en un seul 301, http → https, 404 réelles, canonicals auto-référents, SSR complet, IndexNow fonctionnel, en-têtes de sécurité complets.
- **Élevé :** 2 liens cassés (ci-dessus). `lastmod` codé en dur (`src/app/sitemap.ts:7`, 32 URL au 2026-05-29) ; les articles utilisent la date de publication (`sitemap.ts:83`).
- **Moyen :** og:image = icône carrée 512 px sur beaucoup de pages avec `twitter:card` large ; 5 pages sans og:image (contact, faq, simulateur, works/all, boulogne-billancourt) ; deux balises robots contradictoires sur la 404.
- **Faible :** HSTS sans includeSubDomains/preload, `unsafe-inline` en script-src, X-XSS-Protection obsolète, `ignoreBuildErrors` actif, `priority`/`changefreq` inutiles dans le sitemap.

## Contenu — 57/100 (E-E-A-T 46)
| Facteur | Score | Constat |
|---|---|---|
| Expérience | 45 | Études de cas de 130–280 mots, aucun résultat chiffré |
| Expertise | 50 | Bylines OK, mais erreurs factuelles et stats non sourcées |
| Autorité | 30 | 1 avis, pas de presse, quasi aucune citation externe |
| Confiance | 58 | SIRET/adresse/prix présents, mais claims gonflés |

- Études de cas minces ; **Comon** s'arrête en pleine phrase (`src/data/project.ts:341`) et reprend la palette de Cherico ; Caisse d'Épargne, la meilleure preuve, est sous-exploitée.
- Auteur non vérifiable : la byline renvoie vers /about qui ne nomme pas Clément Rondepierre en texte, pas de bio ni de LinkedIn.
- Erreurs factuelles : lignes de métro sur /boulogne-billancourt ; article Webflow (multilingue, « la plupart de nos projets en Webflow » vs article stack Next.js).
- ~15 statistiques pour 1 seule source externe sur 16 articles.
- Blog à l'arrêt depuis 7 mois ; pas de date de mise à jour affichée.
- Pages commerciales minces : Paris (~560 mots), /services/creation-site-internet (~680), WordPress/Webflow/Wix (~530).
- Mentions légales sans nom de l'entrepreneur ni directeur de publication.
- Code mort : `src/components/home/Testimonials.tsx` contient 4 faux témoignages (non affichés) — à supprimer.
- ✅ Lisibilité correcte (Flesch FR 57–77), pages locales réellement uniques (11 % de recouvrement).

## On-page — 74/100
- Double suffixe de marque sur ~20 titres (13 /works, contact, faq, simulateur, mentions-legales, works/all, Boulogne — 102 caractères).
- ~30 titres > 60 caractères.
- **Deux H1** sur 10 à 13 articles (le MDX commence par un `#` en plus du titre du template) ; /works/all répète le H1 de /works.
- Meta descriptions uniques partout ; certaines > 160 ou < 120 caractères ; /tarifs promet un devis en 24 h (meta) vs 48 h (FAQ).
- Maillage faible : /faq, /artichaud-studio-orthographe, /works/cherico, /simulateur, /boulogne-billancourt (1–2 liens entrants) ; 2 articles orphelins (`erreurs-site-vitrine-professionnel`, `creation-site-internet-paris-erreur`) ; bloc « éditorial » identique de 8 liens sur tous les articles ; blocs rendus deux fois sur /works et /contact.

## Schema — 66/100
- **Élevé :** AggregateRating (5.0, reviewCount 1) + Review auto-hébergés dans le bloc global → à retirer du schema (garder le témoignage visible).
- **Élevé :** aucun `Service` sur /services et ses 3 sous-pages.
- **Moyen :** BreadcrumbList absent sur ~20 pages (le composant `BreadcrumbsJsonLd` existe déjà) ; LocalBusiness des pages locales non reliés à `/#organization` ; pas de `WebSite` sur la home ; pas de `Person`/`founder`/`foundingDate`.
- **Faible :** email `hello@artichaud-studio.com` (site en .fr — à confirmer), lat/long et ratingValue en chaînes, descriptions CreativeWork tronquées.
- ✅ BlogPosting + BreadcrumbList complets sur les articles ; FAQPage correctement retiré.

## Sitemap
- ✅ 48 URL en 200, canonicals identiques, aucune noindex, XML valide, déclaré dans robots.txt, aucune page manquante.
- `lastmod` non fiable (voir Technique). 5 pages locales seulement (sous les seuils qualité).

## Performance — 70/100 (lab Lighthouse, pas de données terrain)
| Page | Mobile | LCP mobile | Desktop | LCP desktop |
|---|---|---|---|---|
| Home | 66 | 8,2 s | 99 | 0,8 s |
| /services/creation-site-internet | 68 | 7,1 s | 97 | 1,2 s |
| Article prix | 79 | 4,7 s | 100 | 0,8 s |

- CLS 0 partout ✅ ; TTFB 0,2–0,3 s ✅ ; INP à risque (TBT mobile 200–240 ms, ~2,7 s de travail main-thread).
- H1 en `opacity:0` côté serveur (≈2,2 s de délai LCP).
- JS : 125–149 KiB inutilisés, ~14 KiB de polyfills legacy.
- Tags `/metrics` (GTM + gtag/Ads) ≈ 330 KB et 0,25–0,3 s de main-thread → charger après idle/interaction. Le pixel Meta, non chargé en test (consentement refusé), alourdit encore en réel.
- 5 polices préchargées (~218 KB) + 12 images du hero préchargées sur la home.

## Images — 68/100
- ✅ AVIF/WebP, alt text descriptifs, lazy-loading sous la ligne de flottaison.
- Logos nav/footer en lazy au-dessus de la ligne de flottaison ; `sizes` manquant (fallback w=3840) ; 12 images du hero sans dimensions.
- Sources énormes dans `public/` : `blog/artichaud-ui-design.jpg` 18,6 Mo, `blog/artichaud-seo-strategy.jpg` 4 Mo, `projects/Tautu1.png` 4,1 Mo. `minimumCacheTTL` = 60 s.

## Préparation recherche IA — 72/100
**GEO 62/100** — Citabilité 62, structure 72, multimodal 45, autorité 40, accès technique 85.
- ✅ Tous les crawlers IA autorisés, SSR, llms.txt riche.
- llms.txt : liens `www`, placeholder « **[Directrice artistique]** » (`public/llms.txt:18`, `public/llms-full.txt:28`), « Clément R. » vs « Clément Rondepierre », clients sans trace (Atelier Nova, Studio Lignes), Caisse d'Épargne absente, 6/16 articles listés.
- Pas de paragraphe factuel « Artichaud Studio est… », articles sans sources, peu de passages autonomes de 50–120 mots.
- Présence externe quasi nulle (pas de Wikidata, YouTube ; seuls LinkedIn et le profil Google confirmés).

**Agentic 100/100 (heuristique Agent-UX)** — arbre d'accessibilité propre sur /, /contact, /simulateur. Fraction Lighthouse Agentic Browsing non mesurée (quota PSI). Turnstile bloque les agents sur le formulaire → afficher un mailto/téléphone à côté. Pas de livraison Markdown (opportunité, pas un défaut).

## SXO (expérience de recherche)
| Requête | Ce que Google classe | Page du site | Verdict |
|---|---|---|---|
| création site internet Boulogne-Billancourt | Pages service locales | /creation-site-internet-boulogne-billancourt | ✅ Aligné |
| agence web Boulogne-Billancourt | Pages service locales + listes | 4 pages en concurrence | ⚠ Cannibalisation |
| création site internet Paris | Pages service de grandes agences | /creation-site-internet-paris | ⚠ Écart de profondeur/preuve |
| prix site vitrine | Guides de prix | /blog/prix-site-vitrine-iledefrance-2025 | ✅ mais vieillissant (slug 2025, titre 2026, daté 2025-12-15) |
| refonte site internet | Guides (5/7) | /refonte-site-internet (page service) | ❌ **Mismatch** |

- Prix incohérents : /tarifs « dès 3 000 € », article prix « 5 000–15 000 €+ », FAQ refonte « 2 500–6 000 € », noms de packs différents selon les pages.
- Aucun délai de livraison affiché alors que les concurrents l'annoncent.
- Personas les plus faibles : acheteur pressé (47), startup parisienne (54), comparateur d'agences (56).

## Local — 63/100 (estimé)
- ✅ NAP cohérent (18 rue d'Aguesseau, 92100 Boulogne-Billancourt, +33 7 66 48 99 82), profil Google existant (lien Maps dans sameAs).
- **1 seul avis Google** : principal point faible local.
- /boulogne-billancourt, /creation-site-internet-boulogne-billancourt et l'article « agence web Boulogne comment choisir » visent la même intention.
- Citations : PagesJaunes, Bing Places, Apple Business Connect, Yelp, Pappers non confirmés.
- Mentions légales : adresse sans code postal.

## Backlinks — données insuffisantes
Domaine absent du graphe Common Crawl (jan–mar 2026) : signe probable d'un profil de liens très faible, pas une preuve. Exporter le rapport Liens de Search Console. Cibles : Sortlist, Clutch, Malt, Codeur, PagesJaunes, CCI, liens « réalisé par » des clients, Awwwards.

## Architecture de contenu (clusters)
Hub commercial `/services/creation-site-internet` + pilier éditorial à créer (« comment créer un site internet professionnel »). 4 clusters : Budget & cadrage, Format & technique, Conversion & crédibilité, Sites par métier. Cannibalisations : article Paris-erreur vs page Paris, article Boulogne vs page Boulogne, article refonte vs page refonte, `guide-rebranding-2025` (titré « Agence branding à Paris ») vs page branding. Lacunes : cahier des charges, prix maintenance, page d'accueil site vitrine, refonte sans perdre son SEO, profession libérale, association. Regroupements fondés sur l'intention, à valider dans Search Console avant toute fusion/301.

## Visuel / mobile
- Bannière cookies ≈ 25 % de l'écran mobile, masque les CTA sur toutes les pages.
- Vignettes du hero qui chevauchent le H1 sur mobile ; césure « Boulogne-/Billancourt ».
- CTA services et formulaire contact sous la ligne de flottaison sur mobile.
- Gris secondaires probablement sous le contraste WCAG AA (estimé visuellement) ; petits liens < 48 px.
