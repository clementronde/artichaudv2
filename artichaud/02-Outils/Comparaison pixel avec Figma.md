---
tags: [outil, integration, figma, verification]
maj: 2026-11-28
---

# Comparaison pixel avec Figma

Comment on prouve qu'un site est « pixel perfect » : on superpose des captures du site à l'export Figma, section par section, et on compte les pixels qui diffèrent. Outils dans `.claude/skills/artichaud-maquette/scripts/` (dépôt `artichaudv2`), utilisés par [[Skill artichaud-maquette]].

## 1. Export Figma

`get_screenshot` (MCP Figma) du cadre de page avec `maxDimension` = hauteur du cadre → PNG à l'échelle 1 (ex. 1512 × 7345). Les variantes hors page (états d'une section animée) s'exportent à part.

## 2. Capture du site

```bash
node scripts/capture.js http://localhost:3100 1512 982 shots/site.png
```

- Mouvement réduit (état final de toutes les animations), images forcées en chargement immédiat, page parcourue avant la capture.
- Affiche la position (`y`, hauteur) de chaque `section`, `header` et `footer` : à comparer aux `y` de `get_metadata`.
- `--motion` : capture avec animations, en faisant défiler jusqu'à `--scroll <y>` (états des sections épinglées).

## 3. Comparaison

```bash
python3 scripts/compare.py figma/full.png shots/site.png '{"hero":[0,0,982],"intro":[1134,1134,327]}' shots/
```

Pour chaque section `[y Figma, y site, hauteur]` : pourcentage de pixels dont l'écart dépasse 40/255, image côte à côte (`cmp-<section>.png`), superposition à 50 % (`blend-<section>.png`) et masque des différences (`diff-<section>.png`).

Lecture :
- **< 2 %** : conforme (anticrénelage, rendu des photos).
- Texte **dédoublé** dans la superposition : décalage de position ou de chasse → mesurer l'élément (`getBoundingClientRect`) et corriger.
- Zone entière différente : image absente (chargement différé), mauvais recadrage, mauvaise couleur.
- Écart qui se décale de section en section : une hauteur de section fausse au-dessus (souvent une taille de titre `clamp()`).

## 4. Mesures ponctuelles

Pour trancher un doute sur une largeur de texte (police, axe `opsz`), mesurer dans le navigateur avec les polices servies en HTTP. Voir [[Compétences — intégration pixel perfect]].

Liens : [[Skill artichaud-maquette]] · [[Aperçu en ligne d'un site]] · [[Capture déterministe de site]]
