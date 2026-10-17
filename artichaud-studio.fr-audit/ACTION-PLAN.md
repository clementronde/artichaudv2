# Plan d'action SEO — Artichaud Studio (17 octobre 2026)

Score actuel : **71/100**. Chaque action indique comment vérifier qu'elle a marché (✔) et l'indicateur à suivre (📈).

## Phase 1 — Corrections critiques (semaine 1, ~1 jour de dev)

| # | Action | Fichiers | Effort | ✔ Vérification |
|---|---|---|---|---|
| 1 | Ajouter un vrai espace après chaque mot dans les titres animés | `src/components/about/AboutIntro.tsx:11-21`, `home/Intro.tsx`, `Project/ProjectIntro.tsx` | 15 min | `curl /about` contient « Nous sommes » |
| 2 | Toujours rendre les réponses FAQ dans le DOM (`<details>` ou masquage CSS) | `RedesignClient.tsx:86-102`, `BoulogneClient.tsx`, client Paris | 30 min | `curl /refonte-site-internet \| grep "Zéro minute"` ≥ 1 |
| 3 | Corriger les 2 liens cassés de l'article refonte | `content/blog/refonte-site-internet-quand-et-comment.mdx` | 5 min | Plus aucun 404 interne au crawl |
| 4 | Retirer `opacity:0` du H1 en SSR (animer depuis un état visible ou via CSS) | composants hero home + services | 1–2 h | LCP mobile lab < 4 s, puis < 2,5 s |
| 5 | Retirer AggregateRating/Review du schema global ; retirer « notée 5/5 » de la meta Boulogne | `src/components/seo/*`, page Boulogne | 30 min | Rich Results Test sans rating |
| 6 | Corriger « basé à Paris » → « basé à Boulogne, intervient à Paris » | page Paris | 5 min | — |

📈 Couverture Search Console (pages indexées), LCP mobile.

## Phase 2 — Améliorations à fort impact (semaines 2–3)

1. Supprimer le double suffixe de marque (`works/[slug]/page.tsx:32-34` + template de titre) et raccourcir les ~30 titres > 60 caractères.
2. Supprimer le `#` H1 en tête des MDX (un seul H1 par article).
3. Harmoniser prix, noms de packs et délais (/tarifs, article prix, FAQ refonte, pages locales) ; afficher des délais de livraison ; unifier 24 h / 48 h.
4. Nettoyer `llms.txt` / `llms-full.txt` (liens apex, placeholder, noms, clients, hébergement, liste complète des articles).
5. Schema : `Service` sur /services/*, `BreadcrumbList` partout via `BreadcrumbsJsonLd`, `WebSite` sur la home, `@id` des LocalBusiness locaux → `/#organization`, `founder` + `Person`.
6. Performance : charger GTM/gtag après idle ou interaction, réduire les polices préchargées, ne pas précharger les 12 images du hero, ajouter `sizes`, retirer le lazy des logos, `minimumCacheTTL` plus long ; compresser les sources > 1 Mo dans `public/`.
7. `lastmod` réels dans `sitemap.ts` (date git ou champ `updated`) ; retirer `priority`/`changefreq`.
8. og:image 1200×630 pour les pages qui ont l'icône ou rien.
9. Mobile : bannière cookies plus compacte, vignettes du hero hors du H1, CTA au-dessus de la ligne de flottaison.
10. Supprimer `src/components/home/Testimonials.tsx` (faux témoignages inutilisés) ; compléter l'étude de cas Comon (`src/data/project.ts:341`).

📈 CTR moyen dans Search Console, impressions sur « refonte site internet » et « création site internet Paris ».

## Phase 3 — Contenu & autorité (mois 2)

1. **Avis Google** : objectif 10+ avis (demande systématique en fin de projet). C'est le levier local et E-E-A-T n°1.
2. Page /about avec noms, rôles, bios et LinkedIn de Clément Rondepierre et Charlotte ; paragraphe factuel « Artichaud Studio est… » sur la home et /about.
3. Études de cas enrichies (contexte, chiffres, citation client), en commençant par Caisse d'Épargne.
4. Résoudre les cannibalisations (à valider dans Search Console d'abord) :
   - article refonte → requête « refonte site internet » (guide) ; page service → « agence refonte site internet » ;
   - article Boulogne → « comment choisir une agence web » (non local) ;
   - fusion `creation-site-internet-paris-erreur` → `erreurs-site-vitrine-professionnel` (301) ;
   - retitrer `guide-rebranding-2025`.
5. Enrichir la page Paris (preuves parisiennes, arrondissements, cas clients).
6. Relancer le blog : pilier « comment créer un site internet professionnel », puis cahier des charges, prix maintenance, page d'accueil site vitrine, refonte sans perdre son SEO. Sourcer les statistiques ; ouvrir chaque H2 par une réponse directe.
7. Citations : PagesJaunes, Bing Places, Apple Business Connect, Pappers, Sortlist, Clutch, Malt ; liens « réalisé par » chez les clients.
8. Corriger les erreurs factuelles (métro Boulogne, article Webflow) ; compléter les mentions légales.

📈 Nombre d'avis Google, domaines référents (Search Console > Liens), mentions de marque.

## Phase 4 — Suivi (continu)

- Connecter Google Search Console / PageSpeed API (`/seo google setup`) pour obtenir les données terrain CrUX et l'indexation.
- Capturer une baseline : `/seo drift baseline https://artichaud-studio.fr`, puis comparer après chaque déploiement.
- Re-auditer dans 3 mois.
