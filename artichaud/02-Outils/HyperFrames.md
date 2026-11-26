---
tags: [outils, code, html, gsap]
site: https://github.com/heygen-com/hyperframes
maj: 2026-11-26
---

# HyperFrames (HeyGen)

**« Write HTML, render MP4 »** : une vidéo est une page HTML ; le moteur la rend image par image (Chrome headless + FFmpeg), de façon déterministe. Projet open source publié par HeyGen, sorti à la mi-avril 2026 selon une revue tierce.

- Dépôt officiel : <https://github.com/heygen-com/hyperframes> (attention, de nombreux forks/miroirs existent : prendre celui-ci)
- Licence : **Apache 2.0** (selon les résultats de recherche ; *à vérifier dans le dépôt*)
- Animations : adaptateurs pour apporter son propre moteur — **GSAP**, Lottie, CSS, Three.js.
- Intégration agent : `npx skills add heygen-com/hyperframes` *(commande relevée dans la doc / les articles, à vérifier)*
- Article de présentation : [DEV Community](https://dev.to/mech_app_ai/hyperframes-html-to-mp4-rendering-as-an-agent-first-primitive-33k7) · revue : [andrew.ooo](https://andrew.ooo/posts/hyperframes-heygen-html-video-agents-review/)

## Pourquoi c'est intéressant pour Artichaud

- Nos sites sont déjà animés avec **GSAP** : on peut réutiliser les mêmes courbes, la même logique (timelines), voire des morceaux de code.
- Licence permissive : pas de question d'effectif comme avec [[Remotion]].
- Pensé pour être piloté par un agent : Claude peut écrire les scènes, rendre, regarder les images, corriger.

## Alternatives du même type

- **html2mp4** — rend n'importe quelle animation HTML (CSS, GSAP, Canvas, Three.js) en MP4, image par image, avec une option `--check-determinism` qui refait le rendu et compare chaque image : <https://github.com/TerryG907/html2mp4>
- Sujet GitHub `html-to-video` : <https://github.com/topics/html-to-video>

Liens : [[Comparatif des outils]] · [[Capture déterministe de site]]
