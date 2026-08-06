# Audit SEO & GEO complet — Artichaud Studio
**Domaine analysé :** artichaud-studio.fr | **Date :** 6 août 2026 | **Objectif :** ranking maximal sur les requêtes de création de site web / SEO / branding, en Île-de-France, pour générer des demandes de contact.

> Méthode : lecture directe du code source Next.js (metadata, schema, sitemap, robots), scripts d'audit technique (robots.txt, llms.txt, headers de sécurité, meta sociales, maillage interne), analyse du contenu (blog, pages locales, pages de service), et recherche concurrentielle en direct sur Google.

---

## Score global estimé

| Catégorie | Poids | Score | Commentaire |
|---|---|---|---|
| Technique (indexation, structure) | 25% | 78/100 | Bonnes fondations Next.js, quelques bugs concrets |
| Contenu | 20% | 62/100 | Bon fond, mais **stoppé depuis 5 mois** + 1 article publié nulle part |
| On-page (titles, meta, Hn) | 15% | 75/100 | Solide, 1 dépassement de longueur mineur |
| Schema / données structurées | 15% | 60/100 | Bonne couverture, mais 1 type mal utilisé (FAQPage) |
| Performance (CWV) | 10% | N/A* | API PageSpeed limitée en rate-limit pendant l'audit |
| Images | 10% | 45/100 | AVIF/lazy-loading OK, **alt text quasi absent** |
| GEO / IA (llms.txt, AEO) | 5% | 88/100 | Vrai point fort, rare chez les concurrents |
| **E-E-A-T (transversal, hors pondération script)** | — | **35/100** | **Faiblesse la plus critique du dossier** |

*Le score composite technique/contenu/schema hors CWV se situe autour de **65/100 — "À améliorer"**. Le principal frein n'est pas technique : c'est la confiance (avis, auteurs, autorité).

---

## 1. Points forts confirmés

### Fondations techniques solides
- **Next.js App Router bien structuré** : `sitemap.ts` généré dynamiquement avec priorités cohérentes, `robots.ts` propre, `metadataBase` défini, canonical sur (quasi) toutes les pages.
- **Redirections de domaine centralisées** (`src/proxy.ts`) : `.com` → `.fr` et `www` → sans-www en 301, logique et sans boucle.
- **`llms.txt` + `llms-full.txt` actifs, score qualité 100/100** (vérifié en direct). C'est un vrai différenciateur : très peu d'agences concurrentes exposent un fichier GEO structuré pour les moteurs IA (ChatGPT, Perplexity, Claude).
- **IndexNow actif** (Bing) pour une indexation accélérée.
- **En-têtes de sécurité solides** : HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (score 85/100).
- **Schema Organization/LocalBusiness/DesignAgency complet** sur la homepage : NAP cohérent, géolocalisation précise, `sameAs` (LinkedIn, Instagram, TikTok, Google Maps), catalogue de services.

### Stratégie de contenu déjà pertinente
- **15 articles de blog** avec une vraie profondeur (843 à 1 824 mots), ciblant des requêtes longue traîne à forte intention commerciale : "prix site vitrine Île-de-France", "délai création site internet", "site internet artisan", "Webflow vs WordPress vs Wix". Ce n'est pas du contenu creux.
- **Pages locales dédiées** (`/creation-site-internet-paris`, `/creation-site-internet-boulogne-billancourt`) avec schema `LocalBusiness` + `FAQPage` + `BreadcrumbList` et contenu unique par ville — exactement la structure attendue pour du SEO local.
- **Page `/tarifs` transparente** avec fourchettes de prix précises : rare dans le secteur, excellent pour la confiance et capte les recherches "prix site internet".
- **Page `/artichaud-studio-orthographe`** : capture intelligente des fautes de frappe sur le nom de marque.
- **Test de positionnement en direct** : une recherche Google sur *"création site internet Boulogne-Billancourt agence web"* fait déjà remonter Artichaud Studio en tête des résultats organiques, devant plusieurs agences locales concurrentes (Farouk Nasri, Beecomy, Afalence, Agence2Web). Le socle local fonctionne déjà.

---

## 2. Points faibles — classés par impact

### 🔴 Critique — bloque la conversion et la confiance E-E-A-T

**1. Zéro avis client visible en ligne**
- Recherche vérifiée : la fiche PagesJaunes d'Artichaud Studio n'a **aucun avis** ("soyez le premier à donner votre avis"). Aucun avis trouvé sur Google, Trustpilot.
- **Impact** : pour toute requête locale ("agence web Boulogne-Billancourt"), le pack local Google Maps est piloté par le volume et la qualité des avis. Sans avis, impossible de rivaliser dans le pack local — même avec un excellent site.
- Le fichier `SEO_CHECKLIST.md` du repo confirme que ce chantier est identifié mais **non traité** ("Collecter de vrais avis clients sur Google Business Profile" reste non coché).

**2. Aucune personne nommée sur le site — gros trou E-E-A-T**
- La page `/about` (`AboutClient.tsx`) ne cite **aucun nom, rôle ou lien LinkedIn** de fondateur ou d'équipe.
- Pourtant, `VisionSection.tsx` affiche déjà 4 photos réelles (`clement_profil.png`, `clement_heureux.png`, `charlotte_chevre.png`, `clement_charlotte.png`) — **toutes avec `alt=""`**, sans légende, sans nom.
- Aucun article de blog n'a d'auteur (`grep author` → 0 résultat sur 15 fichiers).
- **Depuis décembre 2025, Google applique l'E-E-A-T à toutes les requêtes concurrentielles, pas seulement YMYL.** Un site qui vend de la création de site web à 15 000€ sans dire qui le fabrique est structurellement désavantagé face à des concurrents qui affichent des profils vérifiables.

**3. Blog à l'arrêt depuis 5 mois**
- Dernier article publié : 16 mars 2026. Nous sommes le 6 août 2026.
- Le `sitemap.ts` annonce pourtant `changeFrequency: 'daily'` pour `/blog` — signal de fraîcheur non tenu, qui peut jouer contre la crédibilité de ce signal aux yeux de Google à terme.

**4. Un article entier, prêt, invisible sur le site**
- `content/blog/creation-site-internet-paris-erreur` (6 576 octets, ~1 350 mots) cible exactement *"création site internet Paris"* + intention de conversion ("Les 5 erreurs qui tuent votre conversion").
- Le fichier **n'a pas l'extension `.mdx`**. Or `src/lib/mdx.ts` filtre strictement sur `/\.mdx?$/` (ligne 34, 91, 201). Résultat : cet article n'apparaît ni dans `getAllPosts()`, ni dans le sitemap, ni nulle part sur le site. C'est un article entier, déjà rédigé, sur un mot-clé prioritaire, qui ne rapporte actuellement **zéro trafic**.

**5. Profil de notoriété/backlinks quasi inexistant (hypothèse, à confirmer via un outil payant)**
- Aucune donnée de backlinks n'a pu être collectée avec les outils gratuits de cet audit. Mais les signaux indirects concordent : pas d'avis, pas de mentions presse trouvées, domaine récent.
- Les requêtes larges ("agence web Paris", "meilleure agence SEO") sont dominées par des annuaires à forte autorité (Sortlist, tool-advisor.fr, digitiz.fr) et des agences installées depuis des années (Buddyweb, Optimize360, Fidesio). **Sans budget de netlinking, ranker n°1 sur ces requêtes génériques nationales n'est pas réaliste à court/moyen terme.**

### ⚠️ Avertissement — optimisations à fort ROI, effort limité

**6. Images Open Graph cassées sur 2 pages prioritaires**
- `/creation-site-internet-paris` et `/creation-site-internet-boulogne-billancourt` référencent `https://www.artichaud-studio.fr/images/og-paris.jpg` et `og-boulogne.jpg`.
- **Ces fichiers n'existent pas** dans `public/images/` (vérifié). Résultat : aperçu de partage cassé sur LinkedIn/Facebook/WhatsApp pour les 2 pages les plus stratégiques du site en termes de conversion locale. Le `SEO_CHECKLIST.md` interne l'a déjà identifié mais pas résolu.
- Bonus : ces URLs pointent vers le sous-domaine `www` alors que le domaine canonique est sans `www` — un hop de redirection supplémentaire que certains crawlers sociaux ne suivent pas bien.

**7. Alt text quasi absent sur les images**
- Les 13 vignettes de portfolio en page d'accueil (`/projects/*.avif`) ont toutes `alt=""`.
- Le logo utilise `alt="Logo"` (générique).
- Les 4 photos de l'équipe en page `/about` ont `alt=""`.
- Perte sèche de visibilité potentielle sur Google Images et d'accessibilité.

**8. Schema `FAQPage` mal ciblé**
- Présent sur `/creation-site-internet-boulogne-billancourt` (et au moins une autre page locale). **Ce type est restreint aux sites gouvernementaux et de santé depuis août 2023** — Google ignorera ce balisage pour le rich snippet FAQ. Le contenu reste utile pour la lecture par les moteurs IA (GEO), mais il ne faut pas compter dessus pour du rich result classique.

**9. Maillage interne dilué — 17 pages quasi orphelines**
- Script d'analyse : 17 pages avec ≤1 lien interne entrant, dont 4 articles de blog (`agence-web-boulogne-billancourt-comment-choisir`, `site-internet-artisan-guide-complet`, `site-vitrine-ou-ecommerce-quelle-difference`, `delai-creation-site-internet`) et 5 pages `/works/*`.
- Ces pages sont justement celles censées capter du trafic longue traîne — leur manque de maillage limite la transmission de "jus SEO" depuis la homepage.

**10. Incohérence témoignages ↔ portfolio**
- Les témoignages homepage citent "Chez June", "Atelier Nova", "Studio Lignes", "Comète", "Le Comptoir Vert".
- Le portfolio (`/works`) présente des clients différents : Charit.IO, Keleti Design, Lumyn, Jobmi, Multiface, Disobey.
- Absence de lien entre les deux : un visiteur (ou un crawler évaluant la cohérence E-E-A-T) ne peut pas vérifier qu'un témoignage correspond à une étude de cas réelle.

**11. Title/OG title homepage trop long**
- `og:title` mesuré à 61 caractères (max recommandé 60) — coupure possible dans les résultats de recherche.

**12. Crawlers IA non déclarés explicitement**
- `robots.txt` n'exclut pas GPTBot/ClaudeBot/PerplexityBot/Google-Extended etc. — ils héritent de la règle générale (donc **pas bloqués actuellement**), mais rien ne les autorise explicitement. Pour un objectif GEO assumé, une déclaration explicite est plus propre et plus lisible pour ces crawlers.

**13. Content-Security-Policy absent**
- Score sécurité 85/100 : seul le CSP manque parmi les en-têtes standards.

### ℹ️ Inconnues / limites de l'audit
- **Core Web Vitals** : non mesurés (API PageSpeed rate-limitée pendant l'audit). À vérifier manuellement via PageSpeed Insights ou Search Console. Point d'attention qualitatif : 13 images portfolio chargées en `loading="eager"` sur la homepage, ce qui peut peser sur le LCP si mal priorisées.
- **Backlinks réels / Domain Authority** : non mesurables sans outil payant (Ahrefs/Semrush/Majestic). À budgétiser.
- **Données Search Console réelles** (impressions, clics, position moyenne) : non accessibles depuis cet environnement. À intégrer manuellement dans le document de suivi.

---

## 3. Réalité concurrentielle — soyons honnêtes

- Sur les requêtes **hyper-locales** ("création site internet Boulogne-Billancourt", "agence web 92", variantes longue traîne autour de Paris Ouest), Artichaud Studio a déjà une longueur d'avance mesurable et la **1ère place est atteignable en 3 à 6 mois** en corrigeant les points ci-dessus.
- Sur les requêtes **génériques nationales** ("création de site web", "agence SEO", "webdesign" sans modificateur géographique), le terrain est occupé par des annuaires à fort volume de backlinks (Sortlist, tool-advisor, digitiz) et des agences avec des années d'antériorité. **Viser la 1ère position nationale sur ces termes seuls dans les 6-12 prochains mois n'est pas un objectif honnête** — ce n'est pas un problème de qualité du site, c'est un problème d'autorité de domaine qui se construit sur plusieurs années.
- **La stratégie gagnante réaliste** : dominer la longue traîne locale + les requêtes de service qualifiées ("agence branding Boulogne-Billancourt", "refonte site internet PME 92", "création site Webflow Paris") où la concurrence est faible et l'intention de conversion est forte, pendant que l'autorité de domaine se construit pour, à terme (12-24 mois), pouvoir concurrencer sur des termes plus larges.

---

## 4. Artefacts générés
- `FULL-AUDIT-REPORT.md` (ce document)
- `ACTION-PLAN.md` — plan d'action priorisé
- `SEO-TRACKING.md` — document de suivi vivant (KPIs, checklist, historique) — étend le `SEO_CHECKLIST.md` existant
