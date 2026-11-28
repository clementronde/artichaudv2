# Fuego — site vitrine du restaurant

Landing page Next.js (App Router) + Tailwind, intégrée au pixel près depuis la maquette Figma
`DPvM3zfAeTVthBIsYijxQr` (cadre `152:630` « Landing_Restaurant », 1512 px) avec la commande `/artichaud-maquette`.
Audit de la maquette : `AUDIT.md`.

## Lancer

```bash
cd fuego
npm install
npm run dev
```

## Déployer (Vercel)

Nouveau projet Vercel sur ce dépôt avec **Root Directory = `fuego`**. Variable : `NEXT_PUBLIC_SITE_URL`.

## Aperçu statique

`npm run preview:static` → export autonome dans `out/` (voir le vault : « Aperçu en ligne d'un site »).

## Animations

Attributs `data-*` gérés par `src/components/motion/ScrollAnimations.tsx` (liste en tête du fichier), timelines
dédiées dans `Hero.tsx` (ouverture), `Privatisation.tsx` (pile de polaroïds 01/03) et `Actualites.tsx` (carrousel en
boucle). Défilement fluide Lenis synchronisé à GSAP. Tout est désactivé si l'utilisateur a demandé à réduire les
animations.

## Contenu à fournir

- Adresse exacte (la « rue de la Reine » n'est pas confirmée dans le 11e), domaine, e-mail et téléphone définitifs.
- Vrais avis clients (les trois avis sont en lorem ipsum).
- Carte complète (page ou PDF) pour « Voir le menu », outil de réservation (TheFork, Zenchef…).
- Articles du blog (trois fois le même titre dans la maquette), pages Privatisation, liens Instagram et Facebook.
- Mentions légales.
