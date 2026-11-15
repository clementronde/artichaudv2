# AquaPure — site vitrine plombier

Landing page Next.js (App Router) + Tailwind, intégrée depuis la maquette Figma « Landing ».

## Lancer

```bash
cd aquapure
npm install
npm run dev
```

## Déployer (Vercel)

Nouveau projet Vercel sur ce dépôt avec **Root Directory = `aquapure`**.

### Formulaire de contact

Le formulaire poste sur `/api/contact`, qui transmet la demande en JSON à l'URL définie dans
la variable d'environnement `CONTACT_WEBHOOK_URL` (Make, Zapier, n8n, Formspree, Slack…).
Sans cette variable, l'envoi échoue proprement et le site invite à appeler le numéro.

## Animations

- Défilement fluide : Lenis, synchronisé au ticker GSAP (`src/components/motion/SmoothScroll.tsx`).
- Intro du hero (rideau + dézoom, titre ligne par ligne, CTA, badges) : `src/components/Hero.tsx`.
- Révélations au scroll pilotées par attributs `data-*` (`data-split`, `data-tag`, `data-fade`,
  `data-stagger`, `data-clip`, `data-parallax`, `data-drift`, `data-rise`) :
  `src/components/motion/ScrollAnimations.tsx`.
- Tout est désactivé si l'utilisateur a activé « réduire les animations ».

## Contenu à remplacer

Les textes de la maquette sont repris tels quels : accroche de la section Services, témoignages et
actualités sont encore en lorem ipsum ; liens réseaux sociaux et pages légales à renseigner.
