---
tags: [projet, integration, chezsophie, a-reproduire]
client: Chez Sophie (gîte, Belforêt-en-Perche)
statut: livré (aperçu)
maj: 2026-11-28
---

# Chez Sophie — site gîte

Site vitrine d'un gîte de charme, intégré au pixel près depuis la maquette Figma « Landing » (page 🏠 Gîte, cadre 1512 × 7345). Premier projet mené avec la méthode qui est devenue [[Skill artichaud-maquette]].

- Code : dossier `chezsophie/` du dépôt `artichaudv2` (branche `claude/zealous-bell-6oha5v`)
- Maquette : `figma.com/design/DPvM3zfAeTVthBIsYijxQr/Landing?node-id=1-4`
- Architecture reprise du site AquaPure (projet Next autonome, GSAP + Lenis, animations par attributs `data-*`)

## Charte

- Polices : PP Editorial Old (Ultralight, Ultralight Italic, Regular, Italic — fichiers fournis, licence **personnelle uniquement**) ; Google Sans Flex (graisses 200 à 700 + taille optique).
- Couleurs : crème `#fff9f0`, framboise `#25040f`, rose `#f580a0`, vert `#b2a837`, sapin `#202304`, jaune `#fadf99`, bleu `#bfe2fd`, marron `#210e02`.
- Grille : marges 60/61 px, écart de 152 px entre sections, colonnes de 613 px.

## Sections et animations

| Section | Animation retenue |
|---|---|
| Hero | rideau framboise + logo, photo qui se dézoome, titre ligne par ligne, flèche en boucle |
| Accroche | texte qui se colore mot à mot au scroll |
| Galerie | carrousel en boucle, accélère avec la vitesse de scroll |
| La Maison / Les Extérieurs / La Ferme | section épinglée, rideau : photo puis panneau qui recouvrent le chapitre précédent |
| Activités | titre fixe, cartes qui s'empilent (celles du dessous reculent), branche fleurie qui pousse puis s'efface |
| Avis | bande de cartes qui glisse, fleur en parallaxe, icônes qui surgissent |
| Blog | photos dévoilées de bas en haut, zoom et soulignement au survol |
| Footer | paysage en parallaxe, fleurs qui se balancent, logo dévoilé |

## Comparaison avec Figma (1512 px)

Hero 0,75 % · accroche 0,89 % · galerie 0,35 % · chapitres 1,2 à 1,8 % · activités 0,60 % · avis 0,73 % · blog 1,5 % · footer 0,37 %.

## Retours client (dans l'ordre)

1. « Le titre doit rester fixe et les cartes défiler » (Activités) → titre `sticky`, branche fleurie qui l'accompagne puis s'efface.
2. « Je ne vois pas le texte du premier point au-dessus de Les Extérieurs » → le texte de La Maison ne disparaît plus en fondu, il est recouvert par le panneau suivant.
3. « Les cartes s'empilent » → d'abord compris pour les chapitres 01/02/03 (erreur), puis appliqué aux cartes d'activités ; chapitres remis en rideau.
4. Bouton du hero : fond blanc, texte et pastille en vert.

## Bilan

- Ce qui a marché : audit avant code, comparaison chiffrée section par section, aperçu en ligne publié dès la première version.
- À corriger la prochaine fois : demander à quelle section s'applique un effet quand plusieurs sections ont des cartes ; acheter la licence web des polices avant de committer dans un dépôt public.
- Contenus à fournir par le client : témoignages (lorem ipsum), textes des cartes Activités (identiques), articles du blog, liens réseaux sociaux et pages légales.

Liens : [[Compétences — intégration pixel perfect]] · [[Skill artichaud-maquette]] · [[AquaPure — vidéo maquette]]
