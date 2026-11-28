# __NOM_CLIENT__ — site vitrine

Landing page Next.js (App Router) + Tailwind, intégrée au pixel près depuis la maquette Figma __LIEN_FIGMA__
avec la commande `/artichaud-maquette`. Audit de la maquette : `AUDIT.md`.

## Lancer

```bash
cd __SLUG__
npm install
npm run dev
```

## Déployer (Vercel)

Nouveau projet Vercel sur ce dépôt avec **Root Directory = `__SLUG__`**. Variable : `NEXT_PUBLIC_SITE_URL`.

## Aperçu statique

`npm run preview:static` → export autonome dans `out/` (voir le vault : « Aperçu en ligne d'un site »).

## Animations

Attributs `data-*` gérés par `src/components/motion/ScrollAnimations.tsx` (liste en tête du fichier), défilement
fluide Lenis synchronisé à GSAP. Tout est désactivé si l'utilisateur a demandé à réduire les animations.

## Contenu à fournir

__A_COMPLETER__
