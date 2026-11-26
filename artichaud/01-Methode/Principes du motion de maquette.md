---
tags: [methode, motion, rythme]
maj: 2026-11-26
---

# Principes du motion de maquette

Ce qui sépare une vidéo de maquette « pro » d'un simple enregistrement d'écran. Liste de travail : à enrichir à chaque projet (voir [[Checklist vidéo]]).

## 1. Une idée par plan

- Chaque plan montre **une seule chose** : l'accroche du hero, le bouton d'appel, la grille de services, le formulaire. Si on doit expliquer le plan, il en contient deux.
- Durée indicative d'un plan : **1,5 à 3 s** pour les réseaux, jusqu'à 4–5 s pour un showreel posé.
- Le premier plan doit être lisible **sans le son et en moins d'une seconde** : c'est lui qui retient le pouce qui fait défiler.

## 2. Le rythme avant les effets

- Caler les coupes et les gros mouvements sur une **grille de tempo** (ex. 120 BPM → un temps = 0,5 s ; une mesure = 2 s). Même sans musique définitive, monter sur une grille garde la vidéo régulière.
- Alterner **plans calmes** (lecture d'un titre, d'une photo) et **plans d'énergie** (transition, zoom, défilement rapide). Une vidéo qui accélère tout le temps fatigue.
- Garder une **respiration finale** : logo / signature tenu au moins 1,5 s.

## 3. Courbes d'animation (easing)

- Jamais de mouvement linéaire visible, sauf un défilement continu « de fond ».
- Entrées : *ease-out* marqué (type `expo.out`, `power3.out`). Sorties : *ease-in* court. Changements de plan : *ease-in-out*.
- Réutiliser **les mêmes courbes que le site** quand on anime une maquette qu'on a codée : la vidéo et le site racontent la même marque. Pour AquaPure : `expo.out` (révélations) et `power3.inOut` (étiquettes, rideaux).

## 4. Caméra

- Mouvements de caméra lents et continus (léger zoom avant, travelling latéral) pendant qu'on lit ; mouvements rapides seulement **entre** les idées.
- **Zoom sur le détail** qui compte (le bouton téléphone, un survol de carte) plutôt que montrer toute la page à 30 % de taille.
- Le « device mockup » (écran d'ordinateur, téléphone) sert à situer, pas à décorer : un ou deux plans suffisent, le reste en plein cadre.

## 5. Montrer le vrai comportement du site

- Les meilleures vidéos de site montrent **les interactions réelles** : survols, défilement fluide, apparitions au scroll, menu mobile. C'est ce qui prouve le savoir-faire du studio.
- Le curseur, s'il est visible, se déplace en courbes douces et marque les clics (léger rebond). Pas de curseur qui tremble.
- Préférer une **capture image par image** (rendu déterministe) à un enregistrement d'écran : pas de saccade, 60 i/s garantis. Voir [[Capture déterministe de site]].

## 6. Typographie à l'écran

- Textes ajoutés (titres de plan, accroche, CTA) : **peu de mots**, gros corps, police de la marque (Satoshi pour AquaPure).
- Temps de lecture minimum ≈ **0,3 s par mot + 1 s**.
- Respecter les zones de sécurité de chaque plateforme : voir [[Formats réseaux sociaux]].

## 7. Son

- Une grande partie des vidéos sur les réseaux est regardée sans le son : le montage doit se comprendre muet ; le son est un bonus.
- Avec son : musique libre de droits ou sous licence (à tracer dans la fiche projet), *sound design* léger sur les transitions (whoosh discret, clic), mixage sans saturer.

## 8. Fin et appel à l'action

- Réseaux : dernière image = logo + promesse + action (« Appelez le 06 33 10 20 60 », « artichaud-studio.fr »).
- Showreel : dernière image = logo Artichaud + nom du projet / client.
- Prévoir une **première image forte** utilisable comme miniature (cover Reels).

## Anti-patterns à éviter

- Défilement de page entier en un seul plan, sans zoom ni pause.
- Transitions « gadgets » toutes différentes (une famille de transitions par vidéo).
- Texte qui passe sous les boutons de l'interface Instagram / TikTok.
- Musique tendance mais non licenciée pour un usage commercial.
- Vidéo de 60 s quand 20 s suffisent.

Liens : [[Formats réseaux sociaux]] · [[Comparatif des outils]] · [[Vidéos de maquette et showreels]]
