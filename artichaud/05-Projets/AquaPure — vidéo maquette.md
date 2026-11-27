---
tags: [projet, video, aquapure]
client: AquaPure (plombier, Yvelines)
formats: [16x9, 9x16, 4x5]
duree_cible: 20 s
statut: livré
maj: 2026-11-26
---

# AquaPure — vidéo maquette

## Décisions (validées le 2026-11-26)

- **Format** : **9:16 Reels** (1080 × 1920) — format principal, demandé le 2026-11-26 après une première livraison en 4:5. La version 4:5 (1080 × 1350, fil Instagram / LinkedIn) reste disponible. ≈ 22 s.
- **Son** : pas de musique livrée ; montage **calé sur une grille de 120 BPM** (1 temps = 0,5 s) pour qu'une piste sous licence posée ensuite tombe juste.
- **Outil** : Artichaud compte 3 personnes ou moins → la licence gratuite de [[Remotion]] s'applique ; choix final entre Remotion et [[HyperFrames]] au moment de la production, selon le rendu.
- **Fin** : **deux versions** — une pour le studio (logo Artichaud + URL), une pour le client (logo AquaPure + 06 33 10 20 60).

## Brief

- **Objectif** : montrer le site AquaPure réalisé par Artichaud — un site d'artisan qui a l'air d'un site de studio.
- **Diffusion** : fil Instagram et LinkedIn (4:5) ; réseaux du studio et, pour la version client, ceux d'AquaPure.
- **Message** : « Un site d'artisan, fluide et soigné. » — fin selon la version (studio ou client).
- **Matière** : le vrai site (`aquapure/`), filmé en [[Capture déterministe de site]], monté en [[HyperFrames]] (ou [[Remotion]] selon la licence).
- **Charte** : Satoshi ; bleu foncé `#01292c`, cyan `#3cfff2`, blanc `#fcfcfc` ; courbes `expo.out` / `power3.inOut` (les mêmes que le site).

## À éviter à l'écran

Sections encore en **lorem ipsum** : accroche des services, témoignages, actualités → hors champ ou en plan très court et flou, tant que les vrais textes ne sont pas là (voir [[Checklist vidéo]]).

## Storyboard 4:5 — v0 (≈ 20 s, grille 120 BPM : 1 temps = 0,5 s)

| # | Temps | Plan | Mouvement / transition | Texte ajouté |
|---|---|---|---|---|
| 1 | 0:00–0:02 | Hero en plein cadre, recadré sur le titre « Votre plombier de confiance… » | Intro réelle du site : rideau de l'image + titre ligne par ligne | — |
| 2 | 0:02–0:04 | Zoom sur le **bouton téléphone** | Curseur qui survole : le carré cyan remplit le bouton | — |
| 3 | 0:04–0:07 | **Cartes services** (3 illustrations) | Travelling latéral ; survol d'une carte (le « + » tourne) | « Dépannage · Rénovation · Chauffage » |
| 4 | 0:07–0:11 | **Nos réalisations** | La séquence pilotée par le scroll : les 3 photos montent une à une, le wordmark traverse | — |
| 5 | 0:11–0:14 | **Formulaire de contact** | Les champs se remplissent, labels qui flottent, trait cyan | — |
| 6 | 0:14–0:16 | **Version mobile** | Transition ordinateur → téléphone (cf. [[Vidéos de maquette et showreels]]) ; menu mobile qui s'ouvre | « Pensé mobile » |
| 7 | 0:16–0:18 | **Footer** : le wordmark géant « AquaPure » monte | Match-cut sur le blanc des lettres | — |
| 8a | 0:18–0:20 | Carton final — **version studio** | Fond bleu foncé, logo Artichaud | « Site réalisé par Artichaud Studio » + artichaud-studio.fr |
| 8b | 0:18–0:20 | Carton final — **version client** | Fond bleu foncé, logo AquaPure | « Plombier dans les Yvelines, 7j/7 » + 06 33 10 20 60 |

Cadre 4:5 : le site (pensé en 16:10) ne remplit pas la hauteur → plans recadrés/zoomés sur une zone du site, ou site en mockup avec fond de marque. Garder ~6 % de marge sur les bords pour les textes ([[Formats réseaux sociaux]]).

## Autres formats (plus tard)

9:16 et 16:9 non demandés pour l'instant : l'ossature ci-dessus se décline (plans plus longs et mockup d'appareil en ouverture pour un showreel 16:9).

## Points réglés

- AquaPure est un **client fictif** : pas d'accord de diffusion nécessaire.
- Logo Artichaud (mascotte rouge) fourni en SVG : `medias/captures/logo-artichaud.svg`.
- Plans services et mobile gardés ; l'accroche des services (lorem ipsum) reste hors cadre.

## Production

- **Code** : dossier `video/` du dépôt (voir son README) — capture déterministe du vrai site (`video/capture/`), montage Remotion (`video/src/`).
- **Outil retenu** : Remotion 4 (licence gratuite ≤ 3 personnes), Chromium local, export H.264 1080 × 1350, 60 i/s.
- **Musique** : aucune ; coupes et rideaux posés sur les temps (120 BPM, 1 temps = 30 images). Raccords aux temps 10, 16, 24, 29, 35 et 39.
- **Durée** : 20,5 s (41 temps) depuis la v3.
- **Montage v3** (retours client : à-coups, section services retirée, vrai effet de scroll) :

| Temps (s) | Plan | Ce qu'on voit |
|---|---|---|
| 0 – 3 | Hero | Intro réelle du site (rideau, dézoom, titre ligne par ligne, CTA, badges) |
| 3 – 5 | Bouton | Zoom ×2 sur le bouton téléphone, le curseur entre et le survole : le carré cyan remplit le bouton. Étiquette « Micro-interactions » |
| 5 – 10 | Réalisations | « Un scroll qui raconte. » : la page défile (le contact remonte), la section se fixe pendant que les photos montent, puis la page repart. Barre de défilement synchronisée sur le vrai scroll (cyan pendant la section fixée) + souris dont la molette tourne |
| 10 – 12,5 | Contact | Les champs se remplissent (labels qui montent, trait cyan). « Un formulaire vivant. » |
| 12,5 – 15,5 | Mobile | Téléphone qui monte, intro mobile puis ouverture du menu. « Pensé mobile. » |
| 15,5 – 17,5 | Footer | Le wordmark géant « AquaPure » monte. « Soigné jusqu'en bas. » |
| 17,5 – 20,5 | Fin | Studio : mascotte Artichaud + « Site réalisé par Artichaud Studio » / Client : logo AquaPure + accroche + bouton téléphone |

## Livrables 16:9 v2 (2026-11-27) — retours client

Retours : « transitions trop agressives », « pas de texte sous les réalisations », « la vidéo ne montre pas assez le site ».
- **Fondus doux** (0,4 s, léger dézoom du plan entrant) à la place des rideaux ; coupe invisible conservée intro → bouton.
- **Plus de site** : le lorem ipsum a été remplacé sur le site (accroche services, 3 avis d'exemple, 3 articles conseils), ce qui permet de filmer services, témoignages et actualités.
- **Légendes des réalisations** sur le site : n°, chantier, ville ; elles glissent depuis le bas de chaque photo au rythme du scroll.
- Déroulé (28,5 s) : intro 0–3 · bouton 3–5 · services 5–8 · réalisations 8–13 · témoignages 13–15,5 · formulaire 15,5–18 · actualités + footer 18–22,5 · mobile 22,5–25,5 · fin 25,5–28,5.
- 1920 × 1080, 60 i/s, ~18 Mo chacune (mêmes noms de fichiers que la v1, remplacés). `judder.py` : 0 saut ; arrêts signalés = pauses naturelles entre deux gestes.

## Livrables 16:9 v1 (2026-11-26, remplacée) — showreel, YouTube, LinkedIn

- `medias/videos/2026-11-26_artichaud_aquapure-16x9-studio.mp4` — fin Artichaud
- `medias/videos/2026-11-26_artichaud_aquapure-16x9-client.mp4` — fin AquaPure
- 1920 × 1080, 60 i/s, 20,5 s, H.264, environ 9,5 Mo chacune, sans son.
- **Mise en page** : le site est filmé en 1920 × 1080 et montré **en plein cadre** (format natif d'un site desktop) : intro, zoom ×2 sur le bouton avec le titre entier lisible, vrai scroll de « Nos réalisations » en plein écran (barre de défilement et souris en surimpression), formulaire, footer. Mobile : grand titre « Pensé mobile. » à gauche, téléphone à droite. Étiquettes et textes à 96 px des bords (5 %).
- **Défaut du site révélé et corrigé** : en écran large, le wordmark « AquaPure » de « Nos réalisations » était coupé net au bord de la colonne de 1512 px.

## Livrables Reels 9:16 (v3, 2026-11-26) — format principal

v3 : tous les plans lus à vitesse 1 (plus d'à-coups), raccord hero → bouton identique au pixel, section services retirée, vrai scroll sur les réalisations, plans de scroll capturés en 2× au demi-pixel.
Contrôle `video/capture/judder.py` sur le rendu final : aucun saut hors des raccords en rideau ; les seules images « immobiles » signalées sont des arrêts réels (section fixée une fois les photos en place, fin du plan mobile).

- `medias/videos/2026-11-26_artichaud_aquapure-9x16-studio.mp4` — fin Artichaud
- `medias/videos/2026-11-26_artichaud_aquapure-9x16-client.mp4` — fin AquaPure
- 1080 × 1920, 60 i/s, 20,5 s, H.264, sans son.
- **Mise en page Reels** : intro et zoom bouton en plein cadre (site recapturé en 1080 × 1920) ; ensuite, pour chaque section, un titre en haut (« Un scroll qui raconte. », « Un formulaire vivant. », « Pensé mobile. », « Soigné jusqu'en bas. ») et le plan du site dessous. Tous les textes entre 290 et 1240 px (zones de sécurité : 14 % en haut, 35 % en bas), vérifiés sur images avec les zones superposées.

## Livrables 4:5 (v1, 2026-11-26)

- `medias/videos/2026-11-26_artichaud_aquapure-4x5-studio.mp4` — fin Artichaud (mascotte + « Site réalisé par Artichaud Studio »)
- `medias/videos/2026-11-26_artichaud_aquapure-4x5-client.mp4` — fin AquaPure (logo + accroche + téléphone)
- 1080 × 1350, 60 i/s, 22,5 s, H.264, environ 8 Mo chacune, sans son.

## Bilan

**Ce qui a marché**
- Filmer le **vrai site** en rendu déterministe : intro, survols, scroll piloté et formulaire sont parfaitement fluides (analyse image par image : aucun saut, aucune image dupliquée).
- Le site en 1080 × 1350 donne des **plans 4:5 natifs** sans recadrage ; seuls quelques plans sont zoomés.
- Une seule famille de raccords (rideau bleu foncé bordé de cyan) + étiquettes reprises des « tags » du site : la vidéo parle la même langue que le site.
- Rendu rapide : ~1 min 40 par version.

**À corriger la prochaine fois**
- **La vidéo a révélé un vrai défaut du site** : les titres animés grandissaient de 12 px pendant leur animation (marges négatives qui fusionnaient entre lignes), ce qui faisait sauter la section fixée de 24 px à son relâchement. Corrigé sur le site. Toujours regarder si un « saut » vient du montage… ou du site.
- **Ne jamais accélérer / ralentir un plan au montage avec une vitesse non entière** : la v2 avait des à-coups (vus par le client) à cause des lectures ×0,66 / ×0,9 / ×1,12. Régler le rythme à la capture. Contrôle : `video/capture/judder.py`.
- Vérifier les **temps morts** dès le premier rendu : une caméra qui s'arrête se voit tout de suite (0,7 s figée à la fin du plan bouton en v0 → corrigé par une dérive lente).
- Prévoir dès le storyboard les zones de **texte provisoire** du site (lorem ipsum) : il a fallu recapturer le plan services et cadrer serré.
- Poser une piste son pour valider le rythme : le montage est calé sur 120 BPM mais n'a pas été écouté avec une musique.

- Confirmer le **format de diffusion** avant de produire : la v1 a été faite en 4:5 sur une réponse ambiguë, il a fallu la décliner en 9:16.

**Pistes**
- Version 16:9 (showreel) à partir des mêmes plans.
- Remplacer les textes provisoires du site puis recapturer services / témoignages.
