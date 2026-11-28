---
tags: [competences, methode, video, a-reproduire]
maj: 2026-11-27
source: projet AquaPure (05-Projets/AquaPure — vidéo maquette.md), 4 itérations avec retours client
---

# Compétences acquises — vidéo de maquette

Ce que le projet AquaPure nous a appris, rangé par domaine. Chaque point vient d'un problème réel rencontré et résolu ; c'est la base de la commande [[Skill video-maquette]].

## 1. Filmer un site sans saccade (capture déterministe)

- **Horloge simulée** : `page.clock.install()` **puis** `page.clock.pauseAt()` (sinon le temps continue en réel), et on avance de 1/60 s par image avec `runFor`. GSAP, ScrollTrigger, Lenis suivent exactement.
- **Transitions CSS** (survols, champs) : timeline du document figée via DevTools (`Animation.setPlaybackRate 0`) et chaque transition repositionnée à chaque image (`Animation.seekAnimations`).
- **Transitions interrompues** : quand la souris quitte un élément avant la fin du survol, le navigateur **annule** la transition et en crée une **inverse, raccourcie**. Il faut écouter `Animation.animationCanceled` et oublier l'ancienne, sinon l'élément reste figé dans l'état survolé puis saute (bug vu sur les cartes services, v3).
- **Scroll** : `scrollTo(y)` + événement `scroll` à chaque image ; trajectoire **au pixel entier**, qui avance d'au moins 1 px tant qu'elle bouge (sinon marches irrégulières « immobile, +1, immobile » quand le scroll ralentit). Profil de vitesse trapézoïdal (accélère, vitesse constante, freine).
- **Capture en 2×** pour les plans zoomés ou qui défilent ; même résolution pour deux plans raccordés (sinon saut de netteté à la coupe).
- **Raccord entre deux plans** capturés séparément : le second démarre exactement au même instant d'horloge que la fin du premier (`tick(3000)` après un plan de 180 images) **et** la même caméra (calcul du point de départ du zoom depuis la caméra du plan précédent). Écart mesuré : 0,0.
- **Curseur** : dessiné dans la page (élément fixe) + `page.mouse.move` pour déclencher les `:hover` ; il entre depuis hors cadre, trajectoires en courbe douce.
- **Formulaire** : saisie caractère par caractère, clic réel sur « Envoyer », réponse serveur simulée (`page.route`) pour afficher la notification de succès.
- **Dimensions paires** obligatoires (H.264) ; le site rendu en 1080 × 1350 / 1080 × 1920 / 1920 × 1080 donne des plans natifs pour chaque format.

## 2. Monter (Remotion)

- **Jamais de vitesse de lecture non entière** (×0,66, ×1,12…) : doublons / sauts irréguliers. Le rythme se règle à la capture, lecture à ×1.
- **Transitions** : le client a jugé les rideaux « trop agressifs » → **fondus doux** de 0,4 s avec léger dézoom du plan entrant (1,02 → 1). Plans capturés avec **12 images de marge** de chaque côté pour le chevauchement.
- **Continuité de scroll entre deux plans** : le plan suivant démarre à la position de scroll exacte où le précédent s'arrête (sinon « on descend, on remonte, on redescend »).
- **Caméra qui ne s'arrête jamais** : dérive lente continue, et la dérive démarre avant la fin d'un zoom (pas d'arrêt net).
- **Grille de tempo** (120 BPM, 1 temps = 30 images à 60 i/s) pour caler coupes et étiquettes.
- **Étiquettes** reprises du design du site (tags cyan qui se déploient) plutôt que des titres génériques.
- **Barre de défilement synchronisée** sur la vraie position de scroll enregistrée pendant la capture : rend le « scroll qui raconte » lisible.
- **Sons synthétisés** (clavier, clic, notification) par code (`capture/sfx.py`) : aucune question de droits ; calés sur les vraies frappes enregistrées pendant la capture.
- **Deux fins** (studio / client) et **trois formats** (16:9, 9:16, 4:5) depuis le même code.

## 3. Formats

- **9:16 Reels** : aucun texte dans les 14 % du haut ni les 35 % du bas ; vérifier avec les zones superposées sur des images fixes.
- **16:9** : format natif d'un site desktop → plein cadre, pas de fenêtre ; marges texte 5 %.
- **Toujours confirmer le format de diffusion avant de produire** (une version 4:5 a dû être refaite en 9:16).

## 4. Ce que la vidéo révèle du site (et qu'on corrige sur le site)

- Titres animés qui grandissaient de 12 px pendant l'animation (marges négatives qui **fusionnent** entre lignes, *margin collapsing*) → la section fixée au scroll sautait de 24 px à son relâchement.
- Wordmark coupé net à 1512 px sur grand écran (`overflow` sur la mauvaise boîte).
- Cadre de focus doublant l'état de focus maison des champs.
- Sortie de survol trop brutale → sortie plus lente et douce que l'entrée.
- Textes provisoires (lorem ipsum) qui empêchent de montrer des sections entières → les remplacer avant de filmer.

## 5. Contrôle qualité

- `video/capture/judder.py <vidéo>` : images répétées en plein mouvement + sauts. **Valider le détecteur sur un défaut connu** (il doit retrouver les à-coups d'une version fautive), sinon il peut passer à côté.
- Planches contact (`sheet.py`) de chaque capture avant montage.
- Images fixes de chaque plan avant le rendu complet (cadrage, textes, zones de sécurité).
- Mesure du son (niveau par demi-seconde, pas de saturation).

## 6. Travailler avec le client

- Les retours arrivent souvent **en visionnant** : noter chaque remarque avec son minutage, répondre point par point.
- Proposer une alternative quand on a mieux (scroll piloté plutôt qu'apparition), mais réaliser d'abord ce qui est demandé.
- Distinguer ce qui relève du **montage** de ce qui relève **du site** : plusieurs « défauts de la vidéo » étaient des défauts du site.

Liens : [[Skill video-maquette]] · [[Capture déterministe de site]] · [[Principes du motion de maquette]] · [[AquaPure — vidéo maquette]]
