---
tags: [outils, capture, scroll]
maj: 2026-11-26
---

# Capture déterministe de site

**Problème** : un enregistrement d'écran classique d'un site animé (GSAP, Lenis, défilement fluide) saccade dès que la machine ralentit, et le résultat n'est jamais deux fois le même.

**Solution** : contrôler le temps du navigateur. L'outil « fige » l'horloge de la page, avance d'exactement 1/60 s, prend une image, recommence. Même si chaque image met 200 ms à être calculée, la vidéo finale est parfaitement fluide.

## Outils

| Outil | Ce qu'il fait | Limite connue |
|---|---|---|
| [timesnap](https://github.com/tungs/timesnap) | Ouvre la page (Puppeteer), remplace les fonctions de temps JavaScript, capture à des instants virtuels | Ne contrôle que le temps JS et les vidéos : **les transitions/animations CSS** risquent de ne pas être rendues correctement |
| [timecut](https://github.com/tungs/timecut) | timesnap + FFmpeg → une vidéo en une commande ; capture « haute cadence virtuelle » | Même limite CSS |
| [html2mp4](https://github.com/TerryG907/html2mp4) | Rendu image par image de CSS, GSAP, Canvas, Three.js, avec vérification de déterminisme | Projet récent *(à tester)* |
| [[HyperFrames]] | Moteur de rendu déterministe intégré à une composition vidéo | Pensé pour des pages-compositions plutôt que pour filmer un site existant *(à tester sur un vrai site)* |
| Playwright `recordVideo` | Enregistrement simple intégré au navigateur de test | **Temps réel** : pas déterministe, cadence irrégulière → seulement pour des brouillons |

## Points d'attention pour nos sites

- **Lenis + ScrollTrigger** : le défilement doit être scripté (positions de scroll calculées pour chaque image), pas simulé à la molette.
- Les **survols CSS** (`transition` Tailwind) ne suivent pas une horloge JS virtuelle : soit les piloter en JS pendant la capture, soit vérifier image par image.
- Désactiver le curseur système et dessiner un **curseur animé** dans la composition, pour des déplacements propres.
- Capturer en **2×** (deviceScaleFactor 2) pour pouvoir zoomer au montage sans flou.

Liens : [[Comparatif des outils]] · [[Principes du motion de maquette]]
