# Audit — Fuego, restaurant (Figma `DPvM3zfAeTVthBIsYijxQr`, cadre `152:630` « Landing_Restaurant »)

Largeur de référence : **1512 px** · Hauteur du cadre : 9158 px (page 9128 + 30 px sous le footer) · Premier écran : hero 1512 × 945 · Sections : 8
Notes du brief : restaurant haut de gamme, Paris, rue de la Reine.

## Polices

| Rôle | Famille / style | Taille / interlignage | Approche | Source | Licence | Remarques |
| --- | --- | --- | --- | --- | --- | --- |
| Titres H2 | Instrument Serif Regular, capitales | 60 / 78 px (`normal` = 1,3) | 0 | Google Fonts | OFL (libre) | Avis : noms en 20 / 26 px |
| Texte courant, accroches | Geist Mono Regular, capitales | 18 / 28 px ; libellés 18 / 23,4 (`normal`) | 0 | Google Fonts | OFL (libre) | variable `wght` 100–900 |
| Navigation, avis | Geist Mono Light | 16 / 20,8 px ; avis 16 / 26 px | 0 | Google Fonts | OFL | avis en casse normale |
| Liens, cartes | Geist Mono Regular, souligné | 16 / 26 px | 0 | Google Fonts | OFL | soulignement « from-font » |
| Horaires | Geist Mono Bold / Regular | 18 / 28 px | 0 | Google Fonts | OFL | |
| « Fuego » en italique | Geist Mono Italic | 18 / 28 px | 0 | Google Fonts | OFL | fichier italique séparé |
| (bouton hors page) | Google Sans Flex Light 20 px | — | — | — | — | reste de la maquette Chez Sophie, non utilisé |

Métriques : Geist Mono hhea = typo 1005 / −295 / 0, Instrument Serif 990 / −310 / 0 (unitsPerEm 1000) : USE_TYPO_METRICS actif mais
**identique** à hhea, aucun `ascent-override` nécessaire. Interlignage `normal` = 1,3 pour les deux familles (écrit en dur).
Sous-ensemble latin auto-hébergé (contient œ, €, accents).

## Grille et alignements

- Marges latérales 60 px (contenu 1392 px). Grille : une colonne de 459 px + 3 colonnes de 303 px, gouttières de 8 px
  (x = 60, 527, 838, 1149 ; fin à 1452). Avis : 3 colonnes de 458 px, gouttière 9 px.
- Écart vertical constant de **110 px** entre sections (y : 0, 1055, 1878, 5915, 6755, 7654, 8504).
- Footer en carte inset de 30 px (x = 30, largeur 1452) avec 30 px de crème dessous.

| Section | y Figma | Hauteur | Alignement | Particularités |
| --- | --- | --- | --- | --- |
| Hero | 0 | 945 | 2 moitiés de 756 | logo à (64, 41) sur la photo ; nav dans la moitié droite (x 894 → 1452, y 60) ; photo 303 × 392 centrée + logo 443 × 257 pivoté de −2,38° ; accroche centrée à y 795 |
| L'esprit Fuego | 1055 | 713 | libellé x 60, texte x 527 (925) | 3 photos 303 × 413 à y +300 |
| Menu (fond charbon) | 1878 | 2780 | cartes en quinconce | (60,96) titre ; Beyti (837,96) ; Tataki (60,607) ; Poulpe (678,1128) 614 px ; Dentelle (220,1915) |
| Privatisation (fond bleu) | 4658 | 1147 | texte x **62** (≠ 60) | pile de 3 polaroïds 459 × 539 de même centre, rotations 0°, −10,23°, +5,93° ; commandes 01/03 en (1308, 1002) |
| Avis | 5915 | 730 | x 60 | flèches alignées à droite, 3 cartes, la 1re foncée |
| Horaires | 6755 | 789 | panneau x 993 (459 × 669), y +59 | photo pleine largeur, recadrée en bas |
| Actualités | 7654 | 740 | libellé x 60 (pt 11), titre et cartes x 527 | flèches au-dessus des cartes |
| Footer | 8504 | 624 | inset 30 ; colonnes x 90, 712, 1023 ; ligne 2 x 401, 704, 1171 | logo bleu pivoté, coupé par le bas de la carte |

Hors grille voulus : deux grands logos « fuego » en filigrane (bordeaux à 4 %), **au-dessus** de toutes les sections, ancrés au
bord gauche de la page : y 717 → 2104 (chevauche hero, esprit et menu) et y 7183 → 8574 (horaires, actualités, footer).

## Couleurs

| Token | Valeur | Usage | Contraste à surveiller |
| --- | --- | --- | --- |
| `cream` | #fffef6 | fond, texte sur foncé | — |
| `charbon` | #1a000b | menu, footer, textes | — |
| `burgundy` | #4c020c | moitié droite du hero, panneau horaires, filigranes à 4 % | crème sur bordeaux 15,7 : 1 |
| `blue` | #a0d1ff | section privatisation, textes du footer et de l'avis foncé | bleu sur charbon 12,5 : 1 (et l'inverse) |

Valeurs vérifiées sur le screenshot (PIL) : identiques aux variables. Aucun couple sous 4,5 : 1.

## Assets

| Fichier | Rôle | Taille affichée | Recadrage | Poids |
| --- | --- | --- | --- | --- |
| hero-chef.jpg | moitié gauche du hero (+ voile noir 10 %) | 756 × 945 | cover centré | 266 Ko |
| salle-nuit.jpg | photo du hero droit, 3e photo de l'esprit (doublon md5) | 303 × 392 / 413 | cover | 61 Ko |
| cuisine-suspension.jpg | esprit 1 et actualité 1 (même recadrage) | 303 × 413 | Figma h 120,7 % w 246,7 % top −20,6 % → **pré-découpée** | 93 Ko |
| cuisine-comptoir.jpg | fond des horaires (même photo) | 1512 × 789 | h 127,8 % top −27,7 % → `object-position: 50% 100%` | 340 Ko |
| chef-dressage.jpg | esprit 2 | 303 × 413 | cover | 80 Ko |
| plat-tataki / plat-beyti.jpg | cartes du menu (Beyti = actualité 3, doublon md5) | 458 × 559 | h 123 % top −23 % → `object-position: 50% 100%` | 141 / 165 Ko |
| plat-poulpe.jpg | carte large du menu | 614 × 559 | cover | 292 Ko |
| plat-dentelle.jpg | dessert | 458 × 559 | cover | 134 Ko |
| salle-bougies / salle-table / salle-banquettes.jpg | polaroïds avant / milieu / arrière | 436 × 434 | cover ; **avant étirée dans Figma** | 80 / 325 / 98 Ko |
| actu-cocktail.jpg | actualité 2 | 303 × 413 | cover | 76 Ko |
| logo-nav.svg, logo.svg, logo-bleu.svg | logo nav 148 × 85, hero 443 × 257 (−2,38°), footer bleu | tailles d'origine | — | 52 Ko chacun |
| filigrane-haut.svg, filigrane-bas.svg | grands logos à 4 % (rotation intégrée à l'export) | 685 × 1387, 568 × 1391 | — | 17 Ko |
| etoiles-bleu / etoiles-charbon.svg, fleches.svg, fleche-carre.svg, filet.svg | notes, flèches 63 × 7, boutons 41 × 41 (le droit = miroir), filet 351 × 0,5 | tailles d'origine | — | < 5 Ko |

Images sources : JPEG de 4096 px déclarés « .png » (≈ 30 Mo) → 2,3 Mo au total après conversion.

## Animations prévues

| Section | Effet | Indice dans la maquette | État final = Figma ? | Mouvement réduit / mobile |
| --- | --- | --- | --- | --- |
| Hero | rideau bordeaux qui s'ouvre, photo du chef qui se dézoome, photo de salle dévoilée, logo « écrit » de gauche à droite (masque), accroche ligne par ligne, nav qui descend | grande photo, logo manuscrit | oui | tout visible d'emblée ; même chose en mobile |
| L'esprit | paragraphe qui se colore mot à mot, 3 photos dévoilées en cascade, filigrane en légère parallaxe | long paragraphe d'accroche | oui | statique |
| Menu | titre ligne par ligne, cartes en parallaxe à vitesses différentes (gros plans), photos dévoilées, zoom au survol | cartes en quinconce | oui (parallaxe nulle au repos) | parallaxe coupée sous 1024 px |
| Privatisation | polaroïds qui tombent sur la table en tournant, carrousel 01/03 : la photo de dessus part derrière la pile | pile de polaroïds + compteur 01/03 | oui (état 01) | changement sans transition |
| Avis | cartes en cascade, carte active (foncée) qui suit le survol et les flèches, étoiles qui surgissent | 1re carte foncée + flèches | oui (carte 1 active) | statique ; défilement horizontal en mobile |
| Horaires | photo en parallaxe lente, panneau qui monte | photo pleine largeur | oui | statique |
| Actualités | titre ligne par ligne, photos dévoilées, carrousel en boucle avec les flèches, zoom et soulignement au survol | flèches | oui | défilement natif en mobile |
| Footer | logo bleu qui « s'écrit » au scroll, liens soulignés au survol | logo coupé | oui | statique |

Survols : bouton « Réserver » qui se remplit de crème (idée du bouton à pastille resté hors page), liens soulignés, photos +6 %.
Moment fort unique : l'ouverture du hero.

## Responsive

| Section | 390 | 768 | 1024 | 1280 | 1512 (réf.) | 1920 |
| --- | --- | --- | --- | --- | --- | --- |
| Hero | photo 56 svh puis bloc bordeaux, menu burger | idem | 2 moitiés, 945 px | idem | Figma | 2 moitiés de 960, contenu centré dans sa moitié |
| Nav | logo + burger, menu plein écran | idem | liens dans la moitié droite | idem | Figma | idem |
| Esprit | empilé, photos en bande défilante | 3 photos en grille | grille 459 / 925 fluide | idem | Figma | centré 1512 |
| Menu | 1 colonne | 2 colonnes | quinconce fluide (unités de conteneur) | idem | Figma | centré 1512 |
| Privatisation | texte puis pile réduite (×0,68), commandes centrées | pile ×0,85 | disposition Figma | idem | Figma | centré |
| Avis | bande défilante (85 %) | bande (60 %) | 3 colonnes | idem | Figma | centré |
| Horaires | photo puis panneau pleine largeur | idem | panneau à droite sur photo | idem | Figma | photo pleine largeur |
| Actualités | bande défilante | idem | grille 459 / 925 | idem | Figma | centré |
| Footer | empilé, inset 12 px | 2 colonnes | Figma fluide | idem | Figma | carte inset 30 px, contenu centré |

Titres : `clamp(40px, 33.404px + 1.759vw, 60px)` (60 px atteint à 1512).

## SEO

- **Type et intention** : vitrine mono-page d'un restaurant, intention locale transactionnelle (« restaurant … Paris 11 » →
  réserver) et marque (« Fuego Paris »).
- **Mots-clés proposés** (volumes à vérifier dans Search Console / Keyword Planner, aucun chiffre inventé) :
  - principal : *restaurant cuisine au feu de bois Paris 11* ;
  - secondaires : *restaurant grill braise Paris*, *restaurant haut de gamme Paris 11e*, *privatisation restaurant Paris 11*,
    *restaurant produits de saison Paris* ;
  - locaux : Paris 11e, rue de la Reine (à confirmer), quartier (Bastille / Oberkampf / République selon l'adresse réelle) ;
  - longue traîne : *restaurant pour anniversaire Paris 11 privatisable*, *poulpe grillé à la flamme Paris*, *dîner en
    tête-à-tête cuisine à la braise Paris*.
- **Critique du contenu** :
  - pas de titre texte dans le hero (logo seul) : H1 = logo (`alt` « Fuego ») + complément lisible par Google
    « restaurant à la flamme et à la braise, Paris 11e » (masqué visuellement) ; à rendre visible si le client accepte une
    ligne sous l'accroche ;
  - « L'esprit Fuego » n'a pas de grand titre : le libellé devient le H2 ;
  - positionnement « haut de gamme » du brief en tension avec le texte (« adresse conviviale », « assiettes généreuses ») et les
    prix (16–28 €) : à trancher avec le client, cela change les mots-clés ;
  - **lorem ipsum** dans les 3 avis ; 3 actualités au **même titre** et sans article ; pas de lien de réservation réel ;
  - ≈ 330 mots utiles : correct pour une landing, faible pour se positionner sur « privatisation » (page dédiée à prévoir) ;
  - NAP présent deux fois (panneau horaires + footer), cohérent.
- **Implémenté** : metadata (title ≤ 60, description ≤ 155, Open Graph, canonical), JSON-LD `Restaurant` (adresse, horaires
  `openingHoursSpecification`, téléphone, `servesCuisine`, `priceRange`, `acceptsReservations`, menu), `sitemap.ts`, `robots.ts`,
  un seul H1, H2 par section, H3 par plat / article, `alt` descriptifs, liens `tel:` et `mailto:`, images compressées,
  polices woff2 auto-hébergées.
- **À faire par le client** : fiche Google Business Profile, vrais avis (nom, date), adresse et domaine réels, carte complète
  (page ou PDF), outil de réservation (TheFork, Zenchef…), pages « Privatisation » et « La carte », articles du blog,
  comptes Instagram / Facebook, mentions légales.

## Risques et questions

- Adresse « 10 rue de la Reine, 75011 Paris » : je ne connais pas de rue de ce nom dans le 11e (il existe le Cours la Reine
  dans le 8e) → **à vérifier** avant mise en ligne (JSON-LD et NAP en dépendent).
- Coordonnées de maquette : `fuego.com`, `contact@fuego.com`, `+33 6 22 36 47 89` ; le lien « https://fuego.com/ » du footer
  pointe vers artichaud-studio.fr dans Figma.
- Photo du polaroïd de face **étirée** dans Figma (683 × 1024 forcée en 436 × 434) : corrigée en recadrage sans déformation.
- Texte de la privatisation à x 62 au lieu de 60 : aligné sur la grille (60).
- Coquilles : « En cuisine,notre » (espace manquante), « cuisine locale  ? » (double espace) : corrigées.
- Liens sans cible : « voir le menu », « en savoir plus », « organiser un événement », « lire plus », Instagram, Facebook,
  « Réserver » (dirigé vers le bloc horaires / contact en attendant l'outil de réservation).
- Bouton crème « Réserver » en Google Sans Flex posé hors page (x 2067) : reste de la maquette Chez Sophie, ignoré.

## Retours client (après la première version)

1. Footer : logo affiché en entier (la carte passe de 624 à 740 px ; Figma le coupait par le bas) ; il s'écrit en une fois à
   l'arrivée au lieu de suivre le scroll (en bas de page, la révélation s'arrêtait vers 15 %).
2. Privatisation : le polaroïd de devant sort de la pile en restant au-dessus, passe dessous puis revient se glisser
   derrière (« précédent » : celui du dessous sort de derrière et se pose devant).
3. Menu : le cadre blanc monte d'abord de bas en haut, un aplat crème puis la photo le suivent comme des calques (plus de zoom).
4. Menu : contour différent d'une carte à l'autre → la photo, posée par-dessus le cadre avec un retrait de 0,5 px arrondi au
   pixel, masquait les bords bas et droit selon la position de la carte. Cadre tracé au-dessus de la photo (1 px crème à 55 %
   sur écran standard, 0,5 px sur écran Retina), positions et parallaxe arrondies au pixel. Écart Figma du menu : 0,30 %.
5. Polaroïds : la photo se soulève (ombre qui s'allonge) avant d'être lancée en arc, se range derrière ; « précédent » la
   repose devant avec un léger rebond ; on peut la jeter à la souris ou au doigt, cliquer dessus, utiliser les flèches du
   clavier ; elle se soulève au survol ; le compteur défile.
6. « Pourquoi les images ne se voient pas directement ? » → ce n'était pas le chargement (toutes les images sont téléchargées
   avant d'arriver à l'écran) mais les animations : elles attendaient que la photo soit entrée de 10 à 20 % puis duraient
   1,2 à 1,5 s, et le dévoilement de bas en haut montre en dernier le haut de l'image, celui qu'on voit d'abord en descendant.
   Désormais elles démarrent dès l'entrée à l'écran avec une courbe rapide au début : photo à moitié visible en 0,15–0,25 s,
   entière en 0,6–0,7 s (mesuré à 10 Mbit/s). Ouverture du hero resserrée, et sans rideau aux visites suivantes de la session.
7. « Les images ne se chargent pas toutes, il faut qu'à l'arrivée du site elles soient toutes chargées » → 32 images sur 37
   étaient en chargement différé (10 seulement chargées 3 s après l'arrivée, sans défiler). Toutes passent en chargement
   immédiat, et le rideau d'ouverture reste baissé, avec une barre de progression, jusqu'à ce que toutes les images soient
   téléchargées et décodées (37 / 37 au lever du rideau ; 2,5 s à 30 Mbit/s, 3,9 s à 10 Mbit/s, 9,8 s à 3 Mbit/s ; attente
   bornée à 8 s après le démarrage des scripts).
