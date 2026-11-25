# Chez Sophie — site vitrine du gîte

Landing page Next.js (App Router) + Tailwind, intégrée au pixel près depuis la maquette Figma « Landing » (page 🏠 Gîte),
dans la même architecture que le site AquaPure.

## Lancer

```bash
cd chezsophie
npm install
npm run dev
```

## Déployer (Vercel)

Nouveau projet Vercel sur ce dépôt avec **Root Directory = `chezsophie`**.
Variable optionnelle : `NEXT_PUBLIC_SITE_URL` (URL publique, pour les balises Open Graph ; `https://chezsophie.fr` par défaut).

## Aperçu statique

`npm run preview:static` produit un export statique autonome dans `out/` (chemins relatifs aux scripts et aux polices,
images non optimisées). Il sert à publier un aperçu sans serveur. Les chemins `/images/…` doivent alors être rendus
relatifs (`./images/…`) si l'aperçu n'est pas servi à la racine d'un domaine.

## Sections

| Composant | Maquette | Animation |
| --- | --- | --- |
| `Hero` | Hero | Rideau framboise avec le logo, photo qui se dézoome, titre ligne par ligne, parallaxe au scroll |
| `Intro` | Caption | Le texte se colore mot à mot au fil du scroll |
| `Gallery` | Carrousel image | Bande infinie qui accélère et suit le sens du scroll |
| `Chapters` | La Maison / Les extérieurs / La ferme | Section épinglée : les trois chapitres se recouvrent en rideau (empilés sur mobile) |
| `Activities` | Activités | La branche fleurie « pousse » et se balance, cartes en cascade |
| `Testimonials` | Ce que nos voyageurs en pensent | Bande de cartes qui glisse au scroll, fleur en parallaxe |
| `Blog` | Nos Actualités | Photos dévoilées de bas en haut, zoom et soulignement au survol |
| `Footer` | Footer | Paysage en parallaxe, fleurs qui se balancent, logo dévoilé |

Les révélations au scroll sont pilotées par attributs `data-*` (`data-split`, `data-words`, `data-fade`, `data-stagger`,
`data-clip`, `data-parallax`, `data-drift`, `data-grow`, `data-sway`, `data-pop`) dans
`src/components/motion/ScrollAnimations.tsx`. Défilement fluide : Lenis synchronisé au ticker GSAP.
Tout est désactivé si l'utilisateur a activé « réduire les animations ».

## Polices

- **PP Editorial Old** (Ultralight, Ultralight Italic, Regular, Italic) : fichiers fournis, convertis en woff2.
  La licence fournie (Befonts) est **à usage personnel uniquement** : acheter une licence web auprès de Pangram Pangram
  avant la mise en ligne du site client.
- **Google Sans Flex** (variable, graisses 200 à 700 + taille optique), sous-ensemble latin auto-hébergé (licence OFL).

## Contenu à remplacer

- Témoignages en lorem ipsum (« Julie Blanchet ») et textes des cartes Activités identiques : à rédiger.
- Liens réseaux sociaux génériques, pages légales (`#`) et articles du blog à créer.
- Les boutons « Je réserve » mènent au bloc de réservation ; le bouton final ouvre un e-mail à `bonjour@chezsophie.fr`.

Coquilles de la maquette corrigées : « O1 » → « 01 », « La Activités » → « Les Activités », « campage » → « campagne ».
