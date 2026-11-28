---
tags: [competences, methode, integration, a-reproduire]
maj: 2026-11-28
source: projet Chez Sophie (05-Projets/Chez Sophie — site gîte.md), intégration Figma et 4 séries de retours client
---

# Compétences acquises — intégration pixel perfect

Ce que l'intégration du site [[Chez Sophie — site gîte]] nous a appris. Chaque point a déjà coûté un écart visible avec Figma : les vérifier **avant** de chercher ailleurs. C'est la base de la commande [[Skill artichaud-maquette]] ; compléter cette page à chaque nouveau problème résolu.

## 1. Typographie

- **`leading-normal` de Tailwind vaut 1,5**, pas l'interlignage natif de la police. Figma `leading-[normal]` → écrire `leading-[normal]` (valeur CSS) ou la valeur calculée en px.
- **USE_TYPO_METRICS** : si une police active ce drapeau avec des métriques « typo » différentes de « hhea » (cas de PP Editorial Old : typo 820/-300, hhea 1100/-300/100), Linux et Windows placent la ligne de base **~9 px plus haut** que macOS et Figma. Contrôle :
  ```bash
  python3 -I -c "from fontTools.ttLib import TTFont as T;t=T('police.woff2');h=t['hhea'];o=t['OS/2'];print(t['head'].unitsPerEm,h.ascent,h.descent,h.lineGap,o.sTypoAscender,o.sTypoDescender,o.sTypoLineGap,bool(o.fsSelection&128))"
  ```
  Correction : `declarations` de `next/font/local` avec `ascent-override`, `descent-override`, `line-gap-override` = valeurs hhea ÷ unitsPerEm, en %.
- **Taille optique** : une police variable avec axe `opsz` (Google Sans Flex…) change de chasse selon la taille. Sans l'axe dans le fichier, le texte est **~3 % plus étroit** que Figma (crédit du footer : 226 px au lieu de 233). Demander l'axe à Google Fonts (`opsz,wght@6..144,200..700`).
- **`clamp()` trop petit à la largeur de référence** : la formule doit atteindre son max à la largeur de la maquette. Pour un min `m` à 375 px et un max `M` à 1440 px : pente `p = (M − m) / 1065`, valeur `clamp(m, (m − 375·p)px + 100·p vw, M)`. Vérifier en mesurant la hauteur des titres (n lignes × interlignage).
- **Espaces de taille différente** dans un paragraphe (Figma met parfois un espace en 45 px dans un texte en 38 px) : `<span className="text-[1.18em] leading-[0]"> </span>`, sinon la ligne grandit de ~11 px.
- Les retours à la ligne voulus de la maquette (un paragraphe par ligne dans Figma) → `<br />`.
- **Licence** : la version Befonts de PP Editorial Old est « Personal Use Only ». Interdit sur un site client sans licence web (Pangram Pangram), et à ne pas committer dans un dépôt public.

## 2. Mise en page

- Recadrage d'image Figma `h-[215.6%] top-[-94.81%]` → `object-position: 50% Y%` avec `Y = |top| ÷ (h − 100)`. Ici `94,81 ÷ 115,6 = 82 %`.
- Décor **ancré au bord de la page** (branche qui sort du bord gauche) alors que le contenu est centré : `left: calc(-57px - max(var(--g), (100cqw - 1512px) / 2 + var(--g)))` avec `container-type: inline-size` sur la section (`cqw` évite l'erreur due à la barre de défilement de `vw`).
- Décor « derrière le bloc, dont seule la tige dépasse » (fleur du footer) : deux exemplaires, l'un sous le bloc, l'autre dans le bloc (`overflow: clip`), mêmes positions, **mêmes durées d'animation** (sinon ils se désynchronisent).
- Bande centrée plus large que l'écran : `justify-content: center` déborde des deux côtés. Le parent ne doit pas couper ; `overflow-x: clip` seulement sur `main`. `overflow: clip` ne casse pas `position: sticky`, `overflow: hidden` si.
- Les URL d'assets Figma **expirent** : tout télécharger dès la lecture. Les « .png » sont souvent des JPEG de 8 à 15 Mo → JPEG qualité 82 à 2 × la taille affichée (≈ 120 Mo → 6 Mo sur Chez Sophie).
- Texte clair sur photo claire en mobile (ciel du footer) : voile dégradé réservé au mobile.

## 3. Animations (GSAP, ScrollTrigger, Lenis)

- **Épinglage dans un parent flex** (le `<main>` en `flex-col`) : ScrollTrigger désactive l'espace réservé par défaut et la suite de la page passe par-dessus. Envelopper la section dans un `<div>` bloc et passer `pinSpacing: true`.
- **Transform CSS posé avant hydratation** (`translateY(100%)` pour cacher un panneau) : GSAP le lit en pixels et le garde **en plus** de `yPercent`. Mettre `y: 0` dans le `from` et le `to`.
- **`filter: none` → `brightness(0.8)`** : GSAP part de `brightness(0)`, la carte devient presque noire. Toujours un `fromTo` depuis `brightness(1)`.
- **Masques de lignes (SplitText)** : ils rognent jambages et accents avec un interlignage serré. `unclipDescenders` du socle, puis `revert()` en fin d'animation.
- **Texte qui disparaît trop tôt** dans une section épinglée (retour client : « je ne vois pas le texte du premier point ») : ne pas faire disparaître le texte sortant en fondu ; laisser le panneau entrant le recouvrir, et garder un temps de lecture au début (`tl.to({}, { duration: 0.45 })`).
- **Pile de cartes collantes** : sans précaution, les cartes du dessous se tassent sous la dernière en fin de section. Marges qui s'annulent (`margin-bottom: (n−1−i)·pas`, `margin-top: −(n−i)·pas`) pour que la pile reparte d'un bloc, et `min-height` du titre collant = hauteur visuelle de la pile pour qu'ils se libèrent ensemble.
- **ScrollTrigger et éléments collants** : ne jamais utiliser un élément `sticky` comme déclencheur ; calculer les positions à partir du conteneur non collant et des hauteurs.
- Décor qui suit un titre collant : il peut chevaucher la section suivante en fin de course → `data-sticky-fade`.
- Filets de sécurité : rideau d'ouverture et éléments `data-intro` réapparaissent seuls après 5–6 s si les scripts ne se chargent pas (animation CSS `forwards`, qui l'emporte sur les styles en ligne).

## 4. Vérification

- **Images en chargement différé** absentes des captures pleine page : passer toutes les `img` en `loading="eager"` et faire défiler la page avant la capture (fait par `scripts/capture.js`).
- **Port déjà occupé** : `next start` échoue en silence et l'ancien serveur répond (CSS en erreur 500). `fuser -k 3100/tcp` avant de relancer.
- Mesurer une largeur de texte : servir les polices en HTTP (`python3 -m http.server`), pas en `file://` dans une page vide (la police ne se charge pas, la mesure est fausse).
- Un écart de 1–2 px sur des liens de menu vient du rendu du texte (Figma ≠ navigateur) : le signaler, ne pas décaler les éléments pour « tricher ».
- Objectif tenu sur Chez Sophie : **0,4 à 1,8 % de pixels différents par section** à 1512 px.

## 5. Retours client à anticiper

- Les numéros 01/02/03 d'une maquette sont lus comme une narration : la cliente voulait un rideau entre chapitres, **pas** une pile de cartes. La pile de cartes allait sur la section « titre à gauche + cartes à droite ».
- Toujours confirmer où va un effet demandé (« les cartes s'empilent ») quand plusieurs sections ont des cartes : une mauvaise section = une itération perdue.
- Bouton du hero en blanc avec texte de couleur : demandé après coup ; vérifier le contraste (vert #b2a837 sur blanc ≈ 2,3:1, à signaler).

Liens : [[Skill artichaud-maquette]] · [[Audit de maquette]] · [[Animations de site vitrine]] · [[Chez Sophie — site gîte]]
