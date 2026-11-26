# Vidéos de maquette — Artichaud

Vidéos de présentation de sites, produites **par le code** : on filme le vrai site image par image, puis on monte dans [Remotion](https://www.remotion.dev). Méthode et références : vault `../artichaud/` (fiche projet : `artichaud/05-Projets/AquaPure — vidéo maquette.md`).

## Contenu

```
video/
├── capture/
│   ├── engine.cjs     ← moteur de capture déterministe (horloge figée + transitions CSS pilotées)
│   ├── capture.cjs    ← les plans du site AquaPure (scroll, curseur, saisie…)
│   └── sheet.py       ← planche contact d'un plan, pour vérifier une capture
├── public/
│   ├── shots/         ← plans capturés, encodés en MP4 60 i/s
│   └── brand/         ← polices, logos, icônes
├── src/
│   ├── timeline.ts    ← découpage, calé sur 120 BPM (1 temps = 30 images)
│   ├── parts.tsx      ← briques : caméra, étiquettes, titres masqués, rideau, navigateur, téléphone
│   ├── AquaPureVideo.tsx ← le montage + les deux fins
│   └── Root.tsx       ← compositions Reels 9:16 (AquaPureReelStudio / AquaPureReelClient) et 4:5 (AquaPureStudio / AquaPureClient)
└── remotion.config.ts
```

## Refaire la vidéo

```bash
# 1. Le site doit tourner en local
cd ../aquapure && npm run build && npx next start -p 3100

# 2. Capturer les plans (tous, ou seulement ceux qu'on cite)
cd ../video && npm install
NODE_PATH=$(npm root -g) node capture/capture.cjs            # tous les plans
NODE_PATH=$(npm root -g) node capture/capture.cjs contact    # un seul plan

# 3. Prévisualiser et ajuster le montage
npx remotion studio

# 4. Rendre
npm run render:reel:studio   # Reels 9:16 → out/aquapure-9x16-studio.mp4
npm run render:reel:client   # Reels 9:16 → out/aquapure-9x16-client.mp4
npm run render:studio   # 4:5 → out/aquapure-4x5-studio.mp4
npm run render:client   # 4:5 → out/aquapure-4x5-client.mp4
```

`NODE_PATH` sert à trouver Playwright installé globalement ; sur un poste où Playwright est installé dans le projet, il n'est pas nécessaire.
`remotion.config.ts` pointe vers un Chromium local : sur un autre poste, lancer avec `REMOTION_BROWSER=auto` (Remotion télécharge alors son navigateur).

## Comment marche la capture

- `page.clock` (Playwright) remplace `Date`, `performance.now`, `requestAnimationFrame` et les timers : GSAP, ScrollTrigger et Lenis avancent d'exactement 1/60 s par image, même si une capture prend 100 ms.
- Les transitions CSS (survols, champs du formulaire) ne suivent pas cette horloge : la timeline du document est figée (`Animation.setPlaybackRate 0`) puis chaque animation est positionnée à la bonne milliseconde (`Animation.seekAnimations`).
- Le scroll est posé par `window.scrollTo` à chaque image, avec une courbe d'accélération ; le curseur est un élément dessiné dans la page.

## Licence Remotion

Gratuite pour une entreprise de 3 personnes ou moins (cas d'Artichaud en novembre 2026). Au-delà, une licence entreprise est nécessaire : voir <https://www.remotion.dev/docs/license-pricing-compliance/faq>.
