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

## Testé chez nous (AquaPure, novembre 2026)

Moteur maison dans `video/capture/engine.cjs` (Playwright, sans dépendance de plus). Ce qui a marché, et les pièges rencontrés :

- **`page.clock.install()` ne suffit pas** : l'horloge simulée continue d'avancer en temps réel. Il faut `page.clock.pauseAt()` juste après, puis avancer image par image avec `page.clock.runFor(ms)`. Sans ça, l'intro du site était déjà finie à la 20ᵉ image.
- **Transitions CSS** (survols Tailwind, labels du formulaire) : figer la timeline du document via le protocole DevTools (`Animation.setPlaybackRate` à 0), noter chaque animation qui démarre (`Animation.animationStarted`) et la positionner à chaque image (`Animation.seekAnimations`). Résultat : survols et champs parfaitement fluides.
- **Scroll** : `window.scrollTo(y)` + un événement `scroll` déclenché à la main à chaque image → Lenis et ScrollTrigger suivent, y compris la section fixée pilotée par le scroll.
- **Curseur** : un élément dessiné dans la page, déplacé par le script en plus de `page.mouse.move` (qui déclenche les `:hover`).
- **Dimensions paires obligatoires** pour l'encodage H.264 (une capture en 1512 × 945 a échoué ; 1512 × 944 passe).
- **Le site en 1080 × 1350** reste en mise en page desktop (≥ 1024 px) : on obtient des plans 4:5 natifs, sans recadrage.
- **Ce que la vidéo révèle du site** : le cadre de focus par défaut doublait l'état de focus maison des champs ; corrigé sur le site au passage.
- Vitesse : environ 15 s pour 200 images en 1080 × 1350 (en 2× pour les plans zoomés).
- ⚠️ **Jamais de vitesse de lecture non entière au montage** (×0,66, ×1,12…) : le monteur duplique ou saute une image source à intervalles irréguliers → à-coups visibles dans tout mouvement continu (scroll surtout). Le rythme se règle **à la capture** (nombre d'images, durée des déplacements, vitesse de frappe), puis on lit à ×1. Repéré par le client sur la v2 ; corrigé en v3.
- **Raccord entre deux plans** capturés séparément : démarrer le second exactement au même instant de l'horloge que la fin du premier (ex. hero 180 images = 3 000 ms → plan suivant `tick(3000)`), sinon l'état de la page change à la coupe.
- **Contrôle automatique** : `video/capture/judder.py <vidéo>` liste les images répétées en plein mouvement et les sauts. Un simple « écart nul entre deux images » ne suffit pas : la compression rend les doublons légèrement différents.

Liens : [[Comparatif des outils]] · [[Principes du motion de maquette]]
