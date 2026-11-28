---
tags: [methode, integration, audit, figma]
maj: 2026-11-28
---

# Audit de maquette

Ce qu'on relève sur une maquette **avant d'écrire une ligne de code**. C'est l'étape 2 de la commande [[Skill artichaud-maquette]].

Remplir `<slug>/AUDIT.md` avec le modèle [[Fiche audit maquette]] (dans `_modeles/`). Chaque valeur vient de Figma (`get_design_context`,
`get_variable_defs`, `get_metadata`) ou d'une mesure sur le screenshot, jamais d'une estimation à l'œil.

## Polices

Pour chaque famille et style rencontrés dans le code de référence (`font-['Famille:Style']`) :

- taille, interlignage (`leading-[58px]` → 58 px), approche (`tracking-[-1.2px]`), graisse réelle ;
- source : Google Fonts (vérifier avec `curl "https://fonts.googleapis.com/css2?family=Nom+Famille:wght@…"`),
  fichiers fournis par l'utilisateur, ou police payante à obtenir ;
- **licence** : lire le fichier de licence fourni. « Personal use only » = interdit sur un site client, et à ne pas
  committer dans un dépôt public. Le signaler dans le rapport ;
- axes variables utilisés par Figma (taille optique `opsz`, `wdth`, `GRAD`, `ROND`) : les demander à Google Fonts ;
- métriques : lancer le contrôle USE_TYPO_METRICS de [[Compétences — intégration pixel perfect]] ;
- `leading-[normal]` dans Figma = interlignage natif de la police (ascent + descent + lineGap / unitsPerEm) :
  le calculer et l'écrire en px dans le code.

## Grille et alignements

- Largeur de référence (cadre de page) et hauteur du premier écran (souvent celle d'un MacBook : 1512 × 982).
- Marges latérales (souvent 60/61 px), colonnes (ex. 2 × 613 px dans 1392), gouttières (11, 18 px…).
- Espacement vertical : l'écart constant entre sections (`gap-[152px]` sur le conteneur de page) et les exceptions.
- Alignements récurrents : relever les `x` communs (titre, texte, boutons) et les `y` de chaque section.
- Éléments hors grille voulus : bandes qui débordent (carrousel à `x` négatif, cartes centrées plus larges que
  l'écran), décors qui chevauchent deux sections, illustrations ancrées au bord de la page.
- Ordre d'empilement des décors : un élément listé avant un autre dans Figma est dessous (fleur derrière des cartes).

## Couleurs

- `get_variable_defs` donne les noms. Les valeurs de repli dans le code (`var(--blanc,#fff9f0)`) peuvent différer de
  la variable : échantillonner le screenshot (PIL `getpixel`) pour trancher.
- Nommer les tokens comme la maquette (framboise, sapin…), en minuscules sans accents.
- Noter les couples texte/fond à faible contraste (ratio < 4,5:1) : à signaler, pas à corriger d'office.

## Assets

- Images : fichier, rôle, taille affichée, recadrage Figma converti en `object-position`, poids après compression.
- SVG : taille d'origine (attributs `width`/`height`), couleur de remplissage, transformation appliquée
  (rotation, miroir) et position exacte, relative à la section **et** au bord de page si l'élément y est ancré.
- Doublons : même hash md5 = un seul fichier.

## Animations

Voir [[Animations de site vitrine]]. Pour chaque section : l'effet proposé, l'indice qui le justifie dans la maquette, l'état final
qui doit rester identique à Figma, et le comportement en mouvement réduit et sur mobile.

## Responsive

Tableau section × largeur (390, 768, 1024, 1280, référence, 1920) : empilement, tailles fluides, éléments masqués,
défilement horizontal interne éventuel (bande de cartes), menu mobile.

## SEO

Voir [[Critique SEO d'un site vitrine]].

Liens : [[Skill artichaud-maquette]] · [[Fiche audit maquette]] · [[Compétences — intégration pixel perfect]]
