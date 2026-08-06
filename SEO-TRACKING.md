# Suivi SEO — Artichaud Studio
Document vivant à mettre à jour au fil des actions et des relevés. Complète `SEO_CHECKLIST.md` (historique des correctifs déjà traités) et s'appuie sur `FULL-AUDIT-REPORT.md` / `ACTION-PLAN.md` (audit du 6 août 2026).

**Dernière mise à jour :** 6 août 2026 (Phase 0 corrigée)

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

À remplir à partir de Google Search Console, Google Analytics, Google Business Profile et PageSpeed Insights. Fréquence recommandée : toutes les 2 semaines.

| Date | Impressions GSC (28j) | Clics GSC (28j) | Position moy. cluster local* | Position moy. cluster national** | Avis GBP (nb / note) | Nouveaux domaines référents | Articles publiés (cumul) | Demandes de contact (mois) |
|---|---|---|---|---|---|---|---|---|
| 06/08/2026 (baseline) | — | — | — | — | 0 / — | — | 15 | — |
| | | | | | | | | |
| | | | | | | | | |

\* Cluster local = "création site internet Boulogne-Billancourt", "agence web Boulogne-Billancourt", "création site internet Paris", "agence web 92"
\** Cluster national = "création de site web", "agence SEO", "webdesign" (sans modificateur géo)

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
| | | |

---

## 5. Notes de méthode
- Toujours convertir les dates relatives en dates absolues dans ce fichier.
- Ne jamais ajouter de faux avis, notes ou `aggregateRating` fictif dans le schema — cohérent avec le nettoyage déjà fait (voir `SEO_CHECKLIST.md`, ligne "Supprimer l'aggregateRating fictif").
- Respecter la limite de pages locales SEO (alerte à 30, stop à 50) pour éviter le SEO programmatique low-quality.
- Revalider ce document après chaque phase de l'`ACTION-PLAN.md`.
