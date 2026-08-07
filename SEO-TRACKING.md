# Suivi SEO — Artichaud Studio
Document vivant à mettre à jour au fil des actions et des relevés. Complète `SEO_CHECKLIST.md` (historique des correctifs déjà traités) et s'appuie sur `FULL-AUDIT-REPORT.md` / `ACTION-PLAN.md` (audit du 6 août 2026).

**Dernière mise à jour :** 7 août 2026 (données réelles GSC/GA4 connectées + correctifs complémentaires)

---

## 1. Checklist des actions (issue de l'audit du 6 août 2026)

### Phase 0 — Technique (semaine 1-2) — ✅ terminée le 06/08/2026
- [x] Publier l'article `creation-site-internet-paris-erreur` (renommé en `.mdx`, contenu corrigé : lien mort vers `/blog/piliers-seo-2024` remplacé par `/blog/piliers-seo-2026`, placeholders `[Image of...]` retirés, tutoiement homogénéisé en vouvoiement)
- [x] Images OG Paris/Boulogne **+ Refonte** (bug identique trouvé) : remplacées par génération dynamique via `opengraph-image.tsx` (Next.js `next/og`) plutôt que des fichiers statiques manquants
- [x] `alt` descriptifs ajoutés : 4 images du portfolio sur les pages projet (`ProjectClient.tsx`), logo mobile navbar, 4 photos équipe `/about` (Clément, Charlotte), vignette hover `Highlight.tsx`
- [x] `og:title` et `twitter:title` homepage raccourcis à 56 caractères
- [x] Maillage interne : 4 articles de blog orphelins + `/works/all` ajoutés à `relatedLinksData.ts` (repris sur ~15 pages via le composant `RelatedLinks`). **Bug racine trouvé et corrigé** : les cartes projet de `TrustedSection.tsx` (page `/about`) pointaient vers `/works/1`, `/works/2`, `/works/3`, `/works/4` (mauvais champ `project.id` au lieu de `project.slug`) — corrigé vers les vrais slugs (`charitio`, `keleti`, `disobey`, `lumyn`)
- [x] Crawlers IA déclarés explicitement dans `robots.ts` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.)
- [x] Header CSP ajouté dans `next.config.ts`
- [x] Schema `FAQPage` retiré de `/faq`, `/tarifs`, `/refonte-site-internet`, `/creation-site-internet-boulogne-billancourt` — contenu FAQ visible conservé partout

**Vérification :** `npm run build` passe sans erreur, ESLint ne signale aucune nouvelle erreur sur les fichiers modifiés (les erreurs restantes sont préexistantes, hors du périmètre de ces corrections).

### Correctifs complémentaires — 07/08/2026 (suite à la connexion Search Console / GA4)
- [x] **Tracking de conversion GA4** : ajout de l'événement `generate_lead` (`sendGAEvent`) déclenché à la soumission réussie du formulaire `/contact` (`src/app/contact/page.tsx`). Avant ce correctif, GA4 ne mesurait aucune conversion (0 lead, 0 qualifié, 0 converti sur 28 jours malgré 3 événements clés déjà configurés côté GA4 : `qualify_lead`, `close_convert_lead`, `purchase`).
- [x] **URLs www codées en dur corrigées** dans les schémas JSON-LD de 8 fichiers (`creation-site-internet-paris/page.tsx` + `ParisClient.tsx`, `creation-site-internet-boulogne-billancourt/page.tsx`, `refonte-site-internet/page.tsx`, `creation-site-vitrine-wordpress-webflow-wix/page.tsx`, `BlogPostSchema.tsx`, `ArticleJsonLd.tsx`) — remplacées par `SITE_URL` (non-www). Search Console montre que Google indexe encore majoritairement la version www (791 impressions) contre la version canonique (67 impressions) malgré la redirection 301 : ces schémas auto-référencés en www allaient à l'encontre de la consolidation.
- [x] **Bug NAP (Name-Address-Phone) corrigé** : `ParisClient.tsx` émettait un second schema `LocalBusiness` en doublon avec un numéro de téléphone différent (+33687538017) du reste du site (+33766489982) — schema dupliqué retiré, celui de `page.tsx` (cohérent) fait foi.
- [x] **4ᵉ image OG cassée trouvée et corrigée** : `og-cms-vitrine.jpg` (page `/creation-site-vitrine-wordpress-webflow-wix`) n'existait pas non plus — `opengraph-image.tsx` dynamique ajouté, comme pour Paris/Boulogne/Refonte.
- [x] Maillage croisé ajouté entre `site-internet-artisan-guide-complet` et `site-internet-restaurant-guide` (les deux articles à fort volume d'impressions GSC mais position très basse — 90 et 65) + `modifiedDate` mise à jour sur les deux.

**Reste à faire (bloqué sur déploiement) :** une fois ces changements poussés en production et l'événement `generate_lead` reçu par GA4 (Admin > Événements), le marquer comme événement clé (icône étoile) pour qu'il apparaisse dans les rapports de conversion.

### Phase 1 — Confiance / E-E-A-T (semaines 2-6)
- [ ] Nommer les fondateurs sur `/about` (nom, rôle, photo légendée, LinkedIn)
- [ ] Ajouter schema `Person` (fondateurs) lié à `Organization`
- [ ] Signature auteur sur les articles de blog
- [ ] Campagne d'avis Google Business Profile (objectif 15-20 avis / 90 jours)
- [ ] Compléter fiches PagesJaunes / Trustpilot / Sortlist
- [ ] Relier témoignages homepage ↔ études de cas `/works`

### Phase 2 — Contenu (mois 1-3)
- [ ] Reprendre la cadence blog (2 articles/mois)
- [ ] Rafraîchir 2-3 articles anciens (`modifiedDate`)
- [ ] Étendre prudemment les pages locales (Issy-les-Moulineaux, Neuilly, Sèvres, Meudon) — max 30 pages locales
- [ ] Créer 2-3 pages comparatif/alternative

### Phase 3 — Autorité / netlinking (mois 2-6)
- [ ] Netlinking local (CCI 92, annuaires, partenaires)
- [ ] PR digital à chaque projet livré
- [ ] Guest posts blogs français
- [ ] Partenariat contenu avec La Fabrique du Net

> Checklist technique antérieure (déjà en grande partie traitée) : voir `SEO_CHECKLIST.md`.

---

## 2. Tableau de suivi des KPIs

À remplir à partir de Google Search Console, Google Analytics, Google Business Profile et PageSpeed Insights. Fréquence recommandée : toutes les 2 semaines. Baseline établie le 07/08/2026 par connexion directe à GSC (`sc-domain:artichaud-studio.fr`, fenêtre 3 mois) et GA4 (propriété "Artichaud Studio - Website", 28 derniers jours).

| Date | Impressions GSC (3 mois) | Clics GSC (3 mois) | CTR moyen | Position moyenne GSC | Sessions GA4 (28j) | % sessions recherche organique | Utilisateurs actifs GA4 (28j) | Avis GBP (nb / note) | Articles publiés (cumul) | Leads GA4 trackés (28j) |
|---|---|---|---|---|---|---|---|---|---|---|
| 07/08/2026 (baseline réelle) | 3 170 | 19 | 0,6 % | 41,5 | 83 | 4,8 % (4 sessions) | 65 (dont ~28 en France) | 0 / — | 16 | 0 (tracking absent — corrigé le 07/08, effectif après déploiement) |
| | | | | | | | | | | |
| | | | | | | | | | | |

**Notes sur la baseline :**
- Position moyenne en nette amélioration sur les 10 jours précédant le relevé (~45-50 → ~10-15) — tendance à confirmer sur le prochain relevé.
- La page canonique (sans www) de la homepage a une excellente position (4,9) mais ne capte que 67 des 858 impressions cumulées homepage — le reste va à la version www non consolidée (cf. correctif du 07/08/2026 ci-dessus).
- `blog/site-internet-artisan-guide-complet` (position 90) et `blog/site-internet-restaurant-guide` (position 65) cumulent 1 225 impressions à eux deux pour 0 clic — priorité de suivi pour le prochain relevé.

### Suivi par cluster de mots-clés

| Cluster | Position moyenne (07/08/2026) |
|---|---|
| Local (Boulogne-Billancourt, Paris, 92) | à isoler du relevé global au prochain point — actuellement agrégée dans la position moyenne de 41,5 |
| National (création de site web, agence SEO) | idem |

---

## 3. Suivi des positions par mot-clé prioritaire

| Mot-clé | Position baseline (06/08/2026) | Position actuelle | Objectif | Échéance |
|---|---|---|---|---|
| création site internet Boulogne-Billancourt | à relever (GSC) | | Top 3 | 3 mois |
| agence web Boulogne-Billancourt | à relever | | Top 3 | 3 mois |
| création site internet Paris | à relever | | Top 10 | 6 mois |
| agence branding Boulogne-Billancourt | à relever | | Top 10 | 6 mois |
| refonte site internet | à relever | | Top 10 | 6 mois |
| agence SEO Boulogne-Billancourt | à relever | | Top 10 | 6 mois |
| création de site web (national) | à relever | | Top 30 (réaliste 12 mois+) | 12+ mois |
| agence SEO (national) | à relever | | Top 30 (réaliste 12 mois+) | 12+ mois |

---

## 4. Journal des changements

| Date | Action réalisée | Résultat / note |
|---|---|---|
| 06/08/2026 | Audit SEO/GEO complet réalisé (voir `FULL-AUDIT-REPORT.md`) | Score composite ~65/100, E-E-A-T 35/100 identifié comme frein principal |
| 06/08/2026 | Phase 0 de l'`ACTION-PLAN.md` corrigée (8/8 points) | Article Paris publié, bug de liens `/works/1-4` corrigé, OG images Paris/Boulogne/Refonte régénérées dynamiquement, alt text, CSP, robots IA, FAQPage nettoyé. Build + lint validés |
| 07/08/2026 | Connexion directe à Search Console + GA4, baseline réelle établie | Voir tableau KPI ci-dessus. Découverte : SEO = 4,8 % du trafic seulement, 0 tracking de conversion, split www/non-www actif |
| 07/08/2026 | Correctifs suite données réelles : tracking `generate_lead` GA4, 8 fichiers avec URL www codées en dur corrigés, bug NAP (double schema, tél. différent) corrigé, 4ᵉ image OG cassée trouvée, maillage croisé artisan↔restaurant | Build + lint validés. Non commité — en attente de validation utilisateur pour push/déploiement |
| | | |

---

## 5. Notes de méthode
- Toujours convertir les dates relatives en dates absolues dans ce fichier.
- Ne jamais ajouter de faux avis, notes ou `aggregateRating` fictif dans le schema — cohérent avec le nettoyage déjà fait (voir `SEO_CHECKLIST.md`, ligne "Supprimer l'aggregateRating fictif").
- Respecter la limite de pages locales SEO (alerte à 30, stop à 50) pour éviter le SEO programmatique low-quality.
- Revalider ce document après chaque phase de l'`ACTION-PLAN.md`.
