# Guide d'optimisation mobile - Artichaud Studio

Ce document explique les optimisations mises en place pour améliorer les performances mobiles du site sans affecter le desktop.

## 🎯 Objectif
Réduire le temps de chargement mobile de 6,4s à moins de 3s.

## ✅ Optimisations implémentées

### 1. Configuration Next.js optimisée (`next.config.ts`)

- **Formats d'image modernes** : AVIF et WebP générés automatiquement
- **Tailles responsive** : 8 tailles d'images différentes pour s'adapter aux devices
- **Compression activée** : Réduction automatique du bundle
- **Optimisation des polices** : Chargement optimisé avec display:swap
- **Suppression des console.log** en production

### 2. Smooth Scroll conditionnel

Le smooth scroll (Lenis) est désactivé sur mobile (< 1024px) car :
- Économise ~50-70 Ko de JavaScript
- Réduit les calculs de scroll
- Améliore la fluidité native mobile

**Fichiers modifiés** :
- `src/components/SmoothScrollWrapper.tsx` (nouveau)
- `src/app/layout.tsx`

### 3. Polices optimisées

- **Preload** : Polices critiques préchargées
- **Display swap** : Texte affiché immédiatement avec police système
- **Fallback natif** : system-ui, -apple-system pour chargement instantané

### 4. Hook de détection mobile

Nouveau hook `useIsMobile()` pour charger conditionnellement les ressources :

\`\`\`tsx
import { useIsMobile } from '@/hooks/useIsMobile'

function MyComponent() {
  const isMobile = useIsMobile() // true si < 768px

  if (isMobile) {
    return <SimplifiedVersion />
  }
  return <FullVersion />
}
\`\`\`

### 5. Composants Motion optimisés

Nouveau composant `OptimizedMotion` qui simplifie les animations sur mobile :

\`\`\`tsx
import { OptimizedMotion } from '@/components/OptimizedMotion'

// Animation désactivée sur mobile par défaut
<OptimizedMotion
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Contenu
</OptimizedMotion>

// Garder l'animation sur mobile
<OptimizedMotion
  simplifyOnMobile={false}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Contenu
</OptimizedMotion>
\`\`\`

## 📊 Optimisations d'images recommandées

### Pour tous les composants Next.js Image

Ajoutez l'attribut `sizes` pour optimiser le chargement :

\`\`\`tsx
// Avant
<Image src="/image.jpg" alt="Description" fill />

// Après - Mobile optimisé
<Image
  src="/image.jpg"
  alt="Description"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={false} // true uniquement pour les images above the fold
  quality={85} // 85% est optimal pour mobile
/>
\`\`\`

### Règles pour `sizes`

- **Images pleine largeur mobile** : `(max-width: 640px) 100vw`
- **Images 2 colonnes mobile** : `(max-width: 640px) 50vw`
- **Hero images** : Ajouter `priority={true}` pour LCP
- **Images below fold** : `loading="lazy"` (défaut)

## 🚀 Prochaines étapes recommandées

### 1. Lazy load des composants lourds

\`\`\`tsx
import dynamic from 'next/dynamic'

// Charger uniquement quand visible
const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  ssr: false,
  loading: () => <div>Chargement...</div>
})
\`\`\`

### 2. Composants à optimiser en priorité

- `src/components/home/Services.tsx` - GSAP lourd
- `src/components/home/Testimonials2.tsx` - Slider
- `src/components/about/AboutIntro.tsx` - Animations GSAP

### 3. Réduire le CSS inutilisé

Utilisez Tailwind JIT mode (déjà activé) et purgez le CSS :

\`\`\`js
// tailwind.config.ts
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Le purge se fait automatiquement en production
}
\`\`\`

### 4. Code splitting pour les pages

Les pages sont déjà automatiquement splittées par Next.js. Pour aller plus loin :

\`\`\`tsx
// Charger des composants conditionnellement
const DesktopOnly = dynamic(() => import('@/components/Desktop'), {
  ssr: false,
})

function Page() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileVersion /> : <DesktopOnly />
}
\`\`\`

## 📱 Tester les optimisations

### Local

\`\`\`bash
# Build de production
npm run build

# Serveur de production local
npm start

# Tester avec Lighthouse
# Chrome DevTools > Lighthouse > Mobile > Analyser
\`\`\`

### PageSpeed Insights

1. Aller sur https://pagespeed.web.dev/
2. Entrer l'URL de production
3. Choisir "Mobile"
4. Analyser

### Objectifs de performance

- **LCP (Largest Contentful Paint)** : < 2.5s
- **FID (First Input Delay)** : < 100ms
- **CLS (Cumulative Layout Shift)** : < 0.1
- **Speed Index** : < 3.5s

## ⚡ Gains attendus

- **JavaScript réduit** : -70 Ko (Smooth scroll désactivé mobile)
- **Images optimisées** : -40% de poids avec AVIF/WebP
- **Polices optimisées** : Affichage instantané avec display:swap
- **Animations simplifiées** : -30% de calculs sur mobile

## 📝 Checklist avant déploiement

- [ ] Build de production sans erreurs
- [ ] Test Lighthouse mobile > 80
- [ ] Vérification visuelle mobile (iOS Safari + Android Chrome)
- [ ] Test sur connexion 3G simulée
- [ ] Vérification que desktop n'est pas affecté

## 🔧 Maintenance

Les optimisations sont automatiques. Pour maintenir les performances :

1. **Toujours utiliser Next.js Image** pour les images
2. **Ajouter sizes** sur toutes les images
3. **Lazy loader** les composants lourds
4. **Tester régulièrement** avec PageSpeed Insights

---

**Dernière mise à jour** : $(date +%Y-%m-%d)
**Version** : 1.0.0
