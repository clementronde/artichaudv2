---
tags: [outils, code, typescript, canvas]
maj: 2026-11-26
---

# Motion Canvas et Revideo

## Motion Canvas

- Bibliothèque TypeScript qui programme les animations avec des **générateurs**, plus un **éditeur** avec aperçu en temps réel.
- Rendu dans un seul `<canvas>` : idéal pour les animations explicatives, schémas, typographie animée.
- Le rendu se lance depuis l'interface de l'éditeur.
- Comparatif côté Remotion : <https://www.remotion.dev/docs/compare/motion-canvas>

## Revideo

- **Fork de Motion Canvas** transformé en bibliothèque : ajoute une **API de rendu headless** et un lecteur React, pour générer des vidéos à partir de modèles et de données.
- Dépôt : <https://github.com/redotvideo/revideo>

## Pour nous

Bon choix pour un plan « explication » (ex. animer le schéma d'une intervention en 4 étapes), moins pour filmer un vrai site. Pour les vidéos de maquette, préférer [[HyperFrames]] ou [[Remotion]] + [[Capture déterministe de site]].

Liens : [[Comparatif des outils]]
