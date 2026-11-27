---
name: video-maquette
description: Produire la vidéo de présentation animée d'un site web (16:9 showreel, 9:16 Reels, 4:5 fil) dans la qualité Artichaud Studio — capture image par image du vrai site (aucune saccade) + montage Remotion avec fondus doux, étiquettes, sons et deux fins (studio / client). À utiliser quand on demande une vidéo, un Reel, un showreel ou une « vidéo de maquette » d'un site. Usage : /video-maquette [dossier ou URL du site] [formats]
---

# /video-maquette — vidéo de site, qualité Artichaud

Tu produis une vidéo de présentation d'un site, à partir du **vrai site filmé image par image**, montée dans **Remotion**. Référence de qualité : la vidéo AquaPure (vault `artichaud/05-Projets/AquaPure — vidéo maquette.md`). Toutes les règles ci-dessous viennent de défauts réels rencontrés sur ce projet : ne les saute pas.

Lis d'abord, dans le dépôt Artichaud (`clementronde/artichaudv2`) :
- `artichaud/06-Competences/Compétences — vidéo de maquette.md` — ce qui a été appris (obligatoire)
- `artichaud/01-Methode/Principes du motion de maquette.md`, `Formats réseaux sociaux.md`, `Checklist vidéo.md`
- `video/README.md` — la boîte à outils

## 0. Brief (une seule série de questions, avec AskUserQuestion)

Demande en une fois ce que tu ne peux pas déduire :
1. **Formats** à livrer (16:9 showreel / 9:16 Reels / 4:5 fil). Ne suppose jamais : une vidéo refaite pour une erreur de format coûte une itération.
2. **Fins** : studio (logo Artichaud `video/public/brand/logo-artichaud.svg`), client (logo + téléphone / URL), ou les deux.
3. **Son** : sans musique (montage calé sur 120 BPM), sons d'interface synthétisés, ou piste fournie.
4. Si le site contient du **texte provisoire** (lorem ipsum) : proposer de rédiger des textes réalistes, sinon ces sections resteront hors champ.

## 1. Le site

- Le faire tourner en local en production (`npm run build && npx next start -p 3100` pour un Next.js) ou utiliser l'URL fournie.
- Faire le tour des sections (captures fixes en 1920 × 1080 et 390 × 844) : repérer lorem ipsum, animations au scroll, sections fixées (pin), survols, formulaire, menu mobile.
- **Ce que la vidéo révèle du site se corrige sur le site** (avec l'accord implicite du brief) : saut au relâchement d'une section fixée, titres qui changent de hauteur pendant leur animation, éléments coupés sur grand écran, sortie de survol brutale, focus doublé… Toujours se demander si un « défaut de la vidéo » vient du site.

## 2. La boîte à outils

Dans le projet courant, crée un dossier `video/` en copiant depuis `clementronde/artichaudv2` (dossier `video/`) :
`capture/engine.cjs`, `capture/judder.py`, `capture/sheet.py`, `capture/sfx.py`, `src/parts.tsx`, `src/brand.ts` (à adapter : couleurs, polices, logos du nouveau site), `remotion.config.ts`, `package.json`, `tsconfig.json`, `.gitignore`, `public/brand/logo-artichaud.svg` + Helvetica Now (fin studio).
`capture/capture.cjs` et `src/AquaPureWide.tsx` servent de **modèles** : réécris-les pour le nouveau site (mêmes fonctions `bouton`, `realisations`, `contact`, `footer`, `visit`).
Installer : `npm install` (Remotion 4, React 19). Licence Remotion : gratuite si l'entreprise compte 3 personnes ou moins (cas d'Artichaud), sinon licence entreprise.
Playwright : `NODE_PATH=$(npm root -g)` s'il est installé globalement.

## 3. Storyboard

Fiche projet dans le vault depuis `artichaud/_modeles/Fiche projet vidéo.md`. Un plan = une idée (intro, CTA, chaque section clé, formulaire, mobile, fin). Durées sur une grille de 120 BPM (1 temps = 30 images à 60 i/s). Pour un site vitrine : **30–35 s en 16:9**, ~20 s en 9:16. Montrer le site, pas des cartons : la majorité du temps en plein cadre sur le vrai site.

## 4. Capture — règles impératives

- Horloge : `clock.install()` **puis** `clock.pauseAt()` ; 60 i/s ; capture **2×** pour les plans zoomés ou qui défilent.
- Transitions CSS pilotées par DevTools, **y compris les transitions annulées** (`animationCanceled`, déjà géré par `engine.cjs`).
- Scroll : `scrollPath()` (pixels entiers, ≥ 1 px/image tant que ça bouge, profil `cruise`). Jamais de scroll « à la molette » simulé.
- **Rythme fixé à la capture** (nombre d'images, vitesse de frappe, durée des survols ~70 images par élément). Jamais de vitesse de lecture non entière au montage.
- **12 images de marge** avant et après chaque plan (fondus).
- **Raccords** : un plan qui suit un autre démarre au même instant d'horloge et, si c'est un scroll, **à la même position de scroll** (pas de « remontée »). Vérifier l'écart entre la dernière image de l'un et la première de l'autre (doit être ~0).
- Curseur qui entre depuis hors cadre ; éviter de traverser des éléments survolables par accident (ou accepter un survol bref : il se retire maintenant proprement).
- Formulaire : remplir tous les champs, cliquer « Envoyer », simuler la réponse serveur (`page.route`) pour la notification ; enregistrer les frappes (`sfxFile`) pour les sons.
- Section fixée au scroll : enregistrer la position de scroll image par image (JSON) pour la barre de défilement du montage.
- Contrôler chaque capture : `python3 capture/sheet.py <plan>` (planche) et détection de sauts sur les images brutes.

## 5. Montage

- **Fondus doux** de 24 images (0,4 s) avec léger dézoom du plan entrant (composant `FadeIn` de `AquaPureWide.tsx`) ; coupe franche seulement si l'image est identique (raccord invisible). Pas de rideaux ni d'effets agressifs.
- Caméra : légère poussée continue ; zoom ×2 sur un détail (CTA) en partant de la caméra du plan précédent ; dérive qui démarre avant la fin d'un zoom.
- Étiquettes au style du site (`Tag`), entrée à ~30 images, sortie avant que le contenu ne passe dessous.
- Mobile : capture 390 × 844 dans `Phone`, page qui **défile** (pas le menu), titre à côté.
- Zones de sécurité : 9:16 → textes entre 14 % du haut et 35 % du bas ; 16:9 → 5 % des bords.
- Sons : `python3 capture/sfx.py` (clavier, clic, notification), posés sur les frappes enregistrées.

## 6. Vérification (avant de livrer)

1. Images fixes de chaque plan (`npx remotion still …`) en planche ; corriger cadrages / textes.
2. Rendu complet (`npx remotion render <Composition> out/<nom>.mp4`), 60 i/s, H.264.
3. `python3 capture/judder.py out/<nom>.mp4` : **0 saut** hors raccords ; les « images répétées » restantes doivent être des arrêts réels (pause entre deux gestes, section fixée). Si tu modifies le détecteur, revalide-le sur une vidéo fautive connue.
4. Son : niveau par demi-seconde, aucune saturation, silence ailleurs.
5. `artichaud/01-Methode/Checklist vidéo.md`.

## 7. Livraison

- Copier les rendus dans `artichaud/medias/videos/AAAA-MM-JJ_artichaud_<projet>-<format>-<fin>.mp4`, mettre à jour la fiche projet (déroulé minuté, retours, bilan), et compléter `06-Competences` si un nouveau problème a été résolu.
- Envoyer les fichiers à l'utilisateur (SendUserFile), commit + push sur la branche de travail.
- Retours client : les traiter point par point avec leur minutage ; dire clairement ce qui a été corrigé sur le site et ce qui l'a été dans le montage.
