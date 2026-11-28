---
tags: [methode, integration, scroll, transition, a-reproduire]
maj: 2026-11-28
---

# Animations de site vitrine

Quelles animations proposer sur un site client et comment les brancher dans le socle Artichaud (GSAP + ScrollTrigger + SplitText + Lenis). Utilisé à l'étape d'audit de [[Skill artichaud-maquette]] ; à distinguer de [[Principes du motion de maquette]] (vidéo).

Règle d'or : l'état final de chaque animation est **exactement** la maquette. L'animation part d'ailleurs et y
arrive. Une animation par section suffit ; un seul moment fort par page (souvent l'ouverture ou une section épinglée).
Tout est désactivé en mouvement réduit (`gsap.matchMedia` + `MOTION_OK`) et rien d'important ne reste caché sans JS.

## Attributs disponibles (template `ScrollAnimations.tsx`)

| Attribut | Effet |
| --- | --- |
| `data-split` | titre révélé ligne par ligne (masque), redevient du texte normal ensuite |
| `data-words` | paragraphe qui se « colore » mot à mot au fil du scroll (opacité 0,14 → 1) |
| `data-fade` (+ `data-delay`) | fondu + montée |
| `data-stagger` | enfants directs en cascade |
| `data-clip` | image dévoilée de bas en haut, photo qui se dézoome |
| `data-parallax="0.2"` | décalage vertical proportionnel au scroll |
| `data-drift="-90"` | glissement horizontal en px (≥ 768 px), pour une bande qui déborde |
| `data-grow` / `data-grow-right` | illustration qui « pousse » depuis un bord (clip scrubbé) |
| `data-sway="2"` | balancement continu (degrés) : végétal, suspension, enseigne |
| `data-pop` | petite icône qui surgit |
| `data-stack` (+ `data-stack-card`, `data-stack-title`) | pile de cartes collantes, celles du dessous reculent |
| `data-sticky-fade` | décor d'un titre fixe qui s'efface en fin de section |

Timelines dédiées (dans le composant) : intro du hero, sections épinglées, carrousel en boucle.

## Lire les indices de la maquette

- **Cadres hors page qui reprennent une section** (mêmes dimensions, autre contenu) → section épinglée où les
  états se succèdent (rideau qui monte, panneau qui recouvre le précédent). Chaque état de repos = un cadre Figma.
- **Bande d'images qui commence à `x` négatif / dépasse à droite** → carrousel en boucle (accélère avec la vitesse
  de scroll, suit son sens) ou glissement horizontal scrubbé.
- **Cartes plus larges que l'écran, centrées** → `data-drift` léger, défilement horizontal natif sur mobile.
- **Titre à gauche, liste de cartes à droite** → titre collant (`sticky`) et cartes qui défilent ou s'empilent.
- **Numérotation 01 / 02 / 03** → narration séquentielle (épinglage, compteur).
- **Illustration végétale, objet suspendu** → `data-sway`, `data-grow`.
- **Grande photo plein écran** → rideau d'ouverture, dézoom lent, parallaxe.
- **Long paragraphe d'accroche** → `data-words`.

## Par type de site

| Métier | Ce qui met en valeur | À éviter |
| --- | --- | --- |
| Gîte, hôtel, chambre d'hôtes | lenteur : dézoom lent des photos, rideaux, végétal qui se balance, chapitres épinglés | effets nerveux, rebonds |
| Restaurant, traiteur | gros plans en parallaxe, menu révélé par lignes, carrousel de plats | carrousels automatiques rapides |
| Artisan du bâtiment (plombier, électricien) | clarté : CTA téléphone animé au survol, avant/après, chiffres clés, badges de confiance | décors qui retardent l'appel |
| Commerce, boutique | survols produits (zoom, second visuel), cartes en cascade | intro longue avant les produits |
| Profession libérale, cabinet | sobriété : fondus, titres ligne par ligne | effets décoratifs |

## Survols (boutons, cartes, liens)

- Bouton à pastille qui grandit jusqu'à remplir le bouton (`DotButton` de `chezsophie/`, voir [[Chez Sophie — site gîte]]).
- Bouton à fond qui monte et texte qui défile verticalement (nav « Réserver », CTA final).
- Carte qui se soulève de 6 px, icône qui pivote ; image qui zoome de 5 à 7 % ; soulignement qui se dessine.
- Durées 500–900 ms, courbe `expo` (`cubic-bezier(0.19, 1, 0.22, 1)`).

## Ouverture (hero)

Rideau de la couleur principale avec le logo (≤ 1,3 s), photo qui se dézoome (1,28 → 1 sur ~3 s), titre ligne par
ligne, CTA, flèche qui invite à descendre en boucle ; navigation qui descend juste après. Filet de sécurité CSS : le
rideau et les éléments `data-intro` réapparaissent seuls après 5–6 s si les scripts ne se chargent pas.

Liens : [[Skill artichaud-maquette]] · [[Audit de maquette]] · [[Sites remarquables]] · [[Compétences — intégration pixel perfect]]
