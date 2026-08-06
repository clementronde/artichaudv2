# Plan d'action SEO/GEO — Artichaud Studio
Objectif : maximiser impressions, clics et demandes de contact sur les requêtes création de site web / SEO / branding en Île-de-France.
Référence : voir `FULL-AUDIT-REPORT.md` pour le détail des constats.

Chaque action a un **effort** (S/M/L) et un **impact** (🔴 fort / 🟡 moyen / 🟢 faible).

---

## Phase 0 — Corrections techniques rapides (semaine 1-2)

| # | Action | Effort | Impact | Détail |
|---|---|---|---|---|
| 0.1 | Renommer `content/blog/creation-site-internet-paris-erreur` → `.mdx` et publier | S | 🔴 | Article prêt, ~1350 mots, cible "création site internet Paris" — actuellement invisible |
| 0.2 | Créer les images OG manquantes : `og-paris.jpg`, `og-boulogne.jpg` (1200×630) dans `public/images/`, + refaire les URLs sans `www.` | S | 🔴 | Aperçus de partage cassés sur les 2 pages locales les plus stratégiques |
| 0.3 | Ajouter des `alt` descriptifs sur les 13 vignettes portfolio + logo + 4 photos équipe | S | 🟡 | Ex: `alt="Refonte de site vitrine pour Charit.IO — identité et UI"` |
| 0.4 | Raccourcir l'`og:title` homepage à ≤60 caractères | S | 🟢 | |
| 0.5 | Ajouter les liens internes manquants vers les 17 pages orphelines identifiées (depuis blog, homepage, pages services) | M | 🟡 | Prioriser les 4 articles de blog et les pages `/works/*` |
| 0.6 | Déclarer explicitement les crawlers IA dans `robots.ts` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended → `allow`) | S | 🟢 | Cohérence avec la stratégie GEO déjà engagée (llms.txt) |
| 0.7 | Ajouter un header Content-Security-Policy | M | 🟢 | |
| 0.8 | Retirer/clarifier l'usage du schema `FAQPage` sur les pages commerciales (garder le contenu texte, ne pas attendre de rich snippet Google dessus) | S | 🟢 | |

## Phase 1 — Confiance & E-E-A-T (semaines 2-6)

| # | Action | Effort | Impact | Détail |
|---|---|---|---|---|
| 1.1 | Nommer les fondateurs sur `/about` : nom, rôle, photo légendée, lien LinkedIn | M | 🔴 | Les photos existent déjà (`clement_profil.png`, `charlotte_chevre.png`...) — juste les attribuer |
| 1.2 | Ajouter un schema `Person` pour chaque fondateur, lié à l'`Organization` via `founder` | S | 🟡 | Renforce le graphe de connaissances |
| 1.3 | Ajouter une signature auteur (nom + lien vers profil) sur les 15 articles de blog existants et futurs | M | 🔴 | E-E-A-T : Google valorise l'auteur identifiable depuis fin 2025 |
| 1.4 | Lancer une campagne active de collecte d'avis Google Business Profile auprès des clients livrés (Charit.IO, Keleti, Lumyn, Jobmi, Multiface, Disobey, etc.) — objectif 15-20 avis en 90 jours | M | 🔴 | Levier n°1 pour le pack local Google Maps |
| 1.5 | Créer/compléter les fiches PagesJaunes, Trustpilot, Sortlist avec avis | M | 🟡 | |
| 1.6 | Relier chaque témoignage homepage à l'étude de cas `/works` correspondante (ou aligner les données) | S | 🟡 | Cohérence = crédibilité |

## Phase 2 — Contenu & fraîcheur (mois 1-3)

| # | Action | Effort | Impact | Détail |
|---|---|---|---|---|
| 2.1 | Reprendre une cadence de publication régulière : **2 articles/mois minimum** | L | 🔴 | Le blog est le principal moteur de trafic organique longue traîne actuel |
| 2.2 | Rafraîchir 2-3 articles les plus anciens (mettre à jour `modifiedDate`, données 2026) | S | 🟡 | Le champ `modifiedDate` existe déjà, bonne pratique à systématiser |
| 2.3 | Étendre le maillage de pages locales avec prudence : Issy-les-Moulineaux, Neuilly-sur-Seine, Sèvres, Meudon (déjà citées dans la FAQ Boulogne) — contenu unique à chaque fois, pas de duplication | L | 🟡 | ⚠️ Respecter la limite : rester sous 30 pages locales, ne jamais dépasser 50 |
| 2.4 | Créer 2-3 pages de comparatif/alternative ("Artichaud vs agence low-cost", "Site vitrine vs plateforme no-code") pour capter les recherches de comparaison | M | 🟡 | |

## Phase 3 — Autorité & netlinking (mois 2-6)

| # | Action | Effort | Impact | Détail |
|---|---|---|---|---|
| 3.1 | Netlinking local ciblé : CCI Hauts-de-Seine, annuaires d'entreprises du 92, partenaires (photographes, imprimeurs cités dans le blog) | L | 🔴 | Seul vrai levier pour rivaliser à terme avec les annuaires nationaux |
| 3.2 | Relations presse / PR digital à chaque nouveau projet client livré (étude de cas + communiqué) | L | 🟡 | |
| 3.3 | Guest posts sur blogs français webdesign/marketing/entrepreneuriat | L | 🟡 | |
| 3.4 | Explorer un partenariat de contenu avec La Fabrique du Net (badge déjà intégré dans `layout.tsx`) | M | 🟢 | Relation déjà existante à exploiter |

## Phase 4 — Mesure & itération (continu)

| # | Action | Fréquence |
|---|---|---|
| 4.1 | Mettre à jour `SEO-TRACKING.md` avec les données Search Console (impressions, clics, position moyenne par cluster de mots-clés) | Toutes les 2 semaines |
| 4.2 | Suivre le nombre d'avis Google Business Profile et la note moyenne | Mensuel |
| 4.3 | Vérifier les Core Web Vitals via PageSpeed Insights | Mensuel |
| 4.4 | Auditer les nouveaux backlinks (Search Console > Liens) | Mensuel |

---

## Objectifs réalistes par horizon

| Horizon | Objectif |
|---|---|
| **1 mois** | Phase 0 terminée. Article Paris publié. GBP en collecte active d'avis. 2 nouveaux articles publiés. |
| **3 mois** | Top 3 sur "création site internet Boulogne-Billancourt", "agence web Boulogne-Billancourt". Top 10 sur "création site internet Paris" (longue traîne). 15+ avis Google. |
| **6 mois** | 1ère position sur 5-8 clusters longue traîne locaux/service. Présence page 1 sur des termes moyens ("agence branding Boulogne-Billancourt", "refonte site internet 92"). 10+ nouveaux domaines référents. |
| **12 mois** | Position dominante durable sur le cluster local/niche. Présence significative (top 10-20) sur des termes régionaux plus larges. Base d'autorité posée pour viser des termes nationaux génériques par la suite. |

**Sur les requêtes génériques nationales** ("création de site web", "agence SEO") : ne pas viser le n°1 comme objectif court terme réaliste — c'est un jeu de long terme (années) dominé par des acteurs à forte autorité de domaine. Le plan ci-dessus construit cette autorité progressivement via le local et la niche, seule voie honnête vers ce terrain à moyen terme.
