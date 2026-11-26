---
tags: [outils, code, react]
site: https://www.remotion.dev
maj: 2026-11-26
---

# Remotion

**Créer des vidéos en React** : chaque image de la vidéo est un rendu de composants React à un instant donné ; le rendu final passe par un navigateur headless puis un encodeur.

- Site : <https://www.remotion.dev>
- Comparaison officielle avec Motion Canvas : <https://www.remotion.dev/docs/compare/motion-canvas> — Remotion utilise un arbre DOM complet pour la vidéo, Motion Canvas un seul `<canvas>`.

## Skills pour agents (Claude Code)

Remotion publie des **skills officiels** pour les agents de code (Claude Code, Codex, Cursor…), qui décrivent les bonnes pratiques d'un projet Remotion.

- Doc : <https://www.remotion.dev/docs/ai/skills>
- Installation indiquée par la doc : `npx skills add remotion-dev/skills`
- Les noms exacts des skills varient selon les versions (la doc cite par exemple des skills SaaS, interactivité, mise à jour, multimédia ; des annuaires tiers citent `remotion-best-practices`). *(à vérifier au moment de l'installation)*

## Licence — point de vigilance

- Gratuite pour les particuliers, associations, et les **entreprises à but lucratif jusqu'à 3 personnes** ; au-delà, une **licence entreprise** est requise. En cas de collaboration entre sociétés, c'est l'effectif cumulé qui compte. ([FAQ licence](https://www.remotion.dev/docs/license-pricing-compliance/faq), [Tarifs](https://www.remotion.dev/docs/pricing))
- → Avant de l'adopter pour le studio : vérifier l'effectif d'Artichaud **et** celui du client si la vidéo est coproduite.

## Quand le choisir

- Vidéos-modèles qu'on décline souvent (même structure, contenus différents).
- Besoin de composants React partagés avec nos sites.

Liens : [[Comparatif des outils]] · [[HyperFrames]]
