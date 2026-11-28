---
tags: [outils, comparatif]
maj: 2026-11-26
---

# Comparatif des outils

Deux familles : **vidéo par le code** (reproductible, versionnée, pilotable par un agent comme Claude) et **outils visuels** (rapides pour un designer, moins automatisables).

## Vidéo par le code

| Outil | Principe | Licence | Points forts pour nous | Limites |
|---|---|---|---|---|
| [[Remotion]] | Vidéo = composants React, rendu image par image | Gratuite jusqu'à 3 personnes dans l'entreprise, sinon licence payante | Même stack que nos sites (React/Next) ; skills officiels pour agents | Licence à vérifier selon la taille du studio |
| [[HyperFrames]] | Vidéo = page HTML, rendu déterministe Chrome + FFmpeg | Apache 2.0 | Accepte directement GSAP, CSS, Lottie, Three.js ; pensé pour les agents | Projet récent (2026) |
| [[Motion Canvas et Revideo]] | Animation en TypeScript (générateurs), rendu canvas | Open source (licence à vérifier par projet) | Excellent pour schémas animés, explications | Moins adapté pour embarquer un vrai site |
| [[Capture déterministe de site]] | On filme le **vrai site** image par image (timecut, html2mp4…) | Open source | Montre les vraies interactions du site, sans saccade | Brut : à monter ensuite dans un des outils ci-dessus |

## Outils visuels (no-code)

Voir [[Outils no-code]] : Rotato (mockups 3D d'appareils), Jitter (motion design dans le navigateur), Screen Studio (enregistrement d'écran soigné, macOS).

## Recommandation Artichaud

Pour une vidéo de maquette de site qu'on a codé nous-mêmes :

1. **Capturer le vrai site** plan par plan en rendu déterministe (60 i/s, scroll et survols scriptés) → [[Capture déterministe de site]].
2. **Monter et habiller** (cadres d'appareils, typo, transitions, musique, formats 9:16 / 16:9) dans **HyperFrames** (GSAP natif, licence libre) ou **Remotion** (si la licence convient) → scènes versionnées dans le dépôt, réutilisables d'un projet à l'autre.
3. **Rotato / Jitter** en complément pour un plan 3D d'appareil très léché, si besoin.

Avantage : chaque vidéo devient un **modèle réutilisable** (on change les captures et les textes, on garde le rythme et les transitions maison).
