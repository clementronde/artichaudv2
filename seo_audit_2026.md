# 🚀 AUDIT SEO COMPLET 2026 - ARTICHAUD STUDIO

**Date:** 6 janvier 2026
**Site:** https://artichaud-studio.com
**Objectif:** Optimiser le référencement naturel et maximiser la visibilité sur Google

---

## 📊 ÉTAT ACTUEL DU SEO

### ✅ Points Forts Actuels

#### 1. **Fondations Techniques**
- ✅ Next.js 16 avec App Router (optimisation native)
- ✅ Métadonnées structurées avec `Metadata` API
- ✅ Favicons complets dans `/public/` :
  - `favicon.ico` (48x48)
  - `icon.png` (512x512)
  - `apple-touch-icon.png` (180x180)
  - `android-chrome-192x192.png`
  - `android-chrome-512x512.png`
- ✅ Google Analytics + Google Tag Manager intégrés
- ✅ Polices optimisées avec `font-display: swap` et préchargement

#### 2. **Métadonnées & Open Graph**
- ✅ Title template configuré : `"%s | Artichaud Studio"`
- ✅ Description personnalisée par page
- ✅ Open Graph complet (title, description, images, locale)
- ✅ Twitter Cards (summary_large_image)
- ✅ Canonical URLs sur toutes les pages
- ✅ Keywords pertinents par page

#### 3. **Données Structurées (Schema.org)**
- ✅ JsonLD implémenté avec `@type: DesignAgency`
- ✅ Informations complètes :
  - Nom, description, logo
  - Adresse Paris (75000)
  - Téléphone et email
  - Services proposés
  - Horaires d'ouverture
  - Note agrégée (5.0/5 - 12 avis)
  - Zone desservie (Paris, Île-de-France)

#### 4. **Accessibilité & UX**
- ✅ Lang="fr" sur `<html>`
- ✅ Structure sémantique
- ✅ Smooth scroll optimisé
- ✅ Animations GSAP et Framer Motion

---

## ❌ Points à Améliorer (PRIORITAIRES)

### 🔴 CRITIQUE - Fichiers Manquants

#### 1. **robots.txt**
**Impact:** 🔴 Très élevé
**Statut:** ❌ Absent
**Solution:**

```txt
# robots.txt - Artichaud Studio
# https://artichaud-studio.com/robots.txt

User-agent: *
Allow: /

# Fichiers à ne pas indexer
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap
Sitemap: https://artichaud-studio.com/sitemap.xml

# Crawl delay (optionnel, pour éviter la surcharge)
Crawl-delay: 1

# Autoriser Google Images
User-agent: Googlebot-Image
Allow: /

# Bloquer les bots inutiles (optionnel)
User-agent: SemrushBot
User-agent: AhrefsBot
User-agent: DotBot
Disallow: /
```

---

#### 2. **sitemap.xml**
**Impact:** 🔴 Très élevé
**Statut:** ❌ Absent
**Solution:** Créer un sitemap dynamique Next.js

**Fichier à créer:** `/src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://artichaud-studio.com'

  // Pages statiques
  const staticPages = [
    '',
    '/services',
    '/about',
    '/contact',
    '/works',
    '/works/all',
    '/blog',
    '/faq',
    '/creation-site-internet-paris',
    '/creation-site-internet-boulogne-billancourt',
    '/creation-site-vitrine-wordpress-webflow-wix',
    '/refonte-site-internet',
    '/mentions-legales',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as 'weekly' | 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Articles du blog (dynamiques)
  const posts = getAllPosts()
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.meta.date || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Works/projets (si vous avez une liste)
  // TODO: Ajouter les works individuels si nécessaire

  return [...staticPages, ...blogPosts]
}
```

**Vérification:** Accessible sur `https://artichaud-studio.com/sitemap.xml`

---

#### 3. **manifest.json (PWA)**
**Impact:** 🟠 Élevé
**Statut:** ❌ Absent
**Bénéfices:**
- Améliore le score Lighthouse
- Permet l'installation comme PWA
- Améliore l'expérience mobile
- Meilleur référencement mobile

**Fichier à créer:** `/public/manifest.json`

```json
{
  "name": "Artichaud Studio - Agence Web & Branding Paris",
  "short_name": "Artichaud Studio",
  "description": "Agence de branding et création de sites web à Paris. Design, stratégie digitale et développement sur mesure.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "categories": ["design", "business", "productivity"],
  "lang": "fr-FR",
  "dir": "ltr",
  "scope": "/"
}
```

**Puis ajouter dans `/src/app/layout.tsx` :**

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  manifest: '/manifest.json',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Artichaud Studio',
  },
}
```

---

### 🟠 IMPORTANT - Optimisations Recommandées

#### 4. **Images Open Graph Dédiées**
**Impact:** 🟠 Moyen-Élevé
**Problème actuel:** Utilisation de `icon.png` (512x512) au lieu d'une image 1200x630px

**Recommandation:**
- Créer une image OG dédiée : `og-image.png` (1200x630px)
- Design : Logo + tagline "Agence Web & Branding Paris"
- Format optimisé (WebP + fallback PNG)
- Poids < 300KB

**Images à créer:**
```
/public/og-image.png (1200x630) - Homepage
/public/og-services.png - Page services
/public/og-contact.png - Page contact
```

**Puis mettre à jour dans chaque page:**

```typescript
openGraph: {
  images: [
    {
      url: "https://artichaud-studio.com/og-image.png", // au lieu de icon.png
      width: 1200,
      height: 630,
      alt: "Artichaud Studio - Agence Web & Branding Paris"
    }
  ],
}
```

---

#### 5. **Meta Description Plus Engageante**
**Impact:** 🟠 Moyen
**Actuel:** _"Artichaud est une agence de design et création de sites web basée à Paris."_

**Recommandation:**

```typescript
// src/app/layout.tsx
description: "Artichaud Studio transforme votre marque avec du branding percutant et des sites web sur mesure. Agence créative à Paris spécialisée en identité visuelle, webdesign et stratégie digitale."
```

**Pourquoi ?**
- Plus d'action verbs ("transforme", "spécialisée")
- Bénéfices clairs pour l'utilisateur
- Mots-clés mieux intégrés naturellement
- Call-to-emotion subtil

---

#### 6. **Breadcrumbs (Fil d'Ariane) avec Schema.org**
**Impact:** 🟡 Moyen
**Bénéfice:** Rich snippets dans Google (améliore le CTR)

**Exemple pour `/services` :**

```typescript
// src/components/seo/BreadcrumbsJsonLd.tsx
export default function BreadcrumbsJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Usage:**

```typescript
// src/app/services/page.tsx
import BreadcrumbsJsonLd from '@/components/seo/BreadcrumbsJsonLd'

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbsJsonLd items={[
        { name: 'Accueil', url: 'https://artichaud-studio.com' },
        { name: 'Services', url: 'https://artichaud-studio.com/services' }
      ]} />
      {/* ... rest of page */}
    </>
  )
}
```

---

#### 7. **Articles de Blog - Schema.org Article**
**Impact:** 🟡 Moyen
**Bénéfice:** Rich snippets (note, auteur, date) dans les résultats Google

**Créer:** `/src/components/seo/ArticleJsonLd.tsx`

```typescript
interface ArticleProps {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}

export default function ArticleJsonLd(props: ArticleProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": props.title,
    "description": props.description,
    "image": props.image,
    "datePublished": props.datePublished,
    "dateModified": props.dateModified || props.datePublished,
    "author": {
      "@type": "Organization",
      "name": props.author,
      "url": "https://artichaud-studio.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Artichaud Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://artichaud-studio.com/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": props.url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

**Usage dans `/src/app/blog/[slug]/page.tsx` :**

```typescript
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

// Dans le composant
<ArticleJsonLd
  title={post.meta.title}
  description={post.meta.excerpt}
  image={`https://artichaud-studio.com${post.meta.image}`}
  datePublished={post.meta.date}
  author="Artichaud Studio"
  url={`https://artichaud-studio.com/blog/${post.slug}`}
/>
```

---

#### 8. **FAQ Schema.org**
**Impact:** 🟡 Moyen-Faible
**Bénéfice:** Rich snippets FAQ dans Google (affichage déroulant)

**Pour `/faq` :**

```typescript
// src/app/faq/page.tsx - Ajouter ce JsonLd
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte la création d'un site web ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nos tarifs démarrent à partir de 3 000€ pour un site vitrine. Le prix varie selon vos besoins spécifiques en design, développement et fonctionnalités."
      }
    },
    // ... autres questions
  ]
}
```

---

### 🟢 OPTIMISATIONS AVANCÉES

#### 9. **Performance & Core Web Vitals**

**a) Images Next.js**
- ✅ Vérifier que toutes les images utilisent `<Image>` de Next.js
- ✅ Formats modernes (WebP, AVIF)
- ✅ Lazy loading automatique

**b) Polices**
- ✅ Déjà optimisé avec `localFont` et `display: swap`
- ⚠️ Vérifier le poids total des polices (actuellement 5 poids chargés)

**Recommandation:** Ne charger que les poids utilisés (400, 500, 700)

```typescript
const helvetica = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNowDisplay-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/HelveticaNowDisplay-Medium.woff2', weight: '500' },
    { path: '../../public/fonts/HelveticaNowDisplay-Bold.woff2', weight: '700' },
  ],
  // Supprimer 300 et 800 si non utilisés
})
```

**c) Bundle Size**
- Vérifier avec `npm run build` que le bundle reste < 200KB
- Envisager le code splitting pour GSAP si non utilisé partout

---

#### 10. **Contenu SEO-Friendly**

**a) Headings Structure**
- ✅ Vérifier que chaque page a un seul `<h1>`
- ✅ Hiérarchie logique h1 → h2 → h3

**b) Alt Text Images**
- Ajouter des alt text descriptifs et contextuels
- Exemple : `alt="Logo Artichaud Studio - Agence Web Paris"` au lieu de `alt="logo"`

**c) Internal Linking**
- Créer plus de liens internes entre pages
- Exemple : Depuis `/services`, linker vers `/works`

---

#### 11. **Métadonnées Spécifiques par Page**

**Actuellement manquant sur:**
- `/contact` : Ajouter metadata
- `/about` : Ajouter metadata
- `/faq` : Ajouter metadata

**Template pour `/contact` :**

```typescript
export const metadata: Metadata = {
  title: "Contact | Devis Gratuit - Artichaud Studio Paris",
  description: "Contactez Artichaud Studio pour votre projet web ou branding. Réponse sous 24-48h. Devis gratuit et sans engagement. ☎️ 06 97 53 80 17",
  keywords: [
    "contact agence web Paris",
    "devis site internet Paris",
    "demande de devis branding",
    "agence création site Paris contact"
  ],
  openGraph: {
    title: "Contactez-nous - Artichaud Studio",
    description: "Discutons de votre projet web ou branding. Réponse rapide garantie.",
    url: "https://artichaud-studio.com/contact",
    images: [{ url: "https://artichaud-studio.com/og-contact.png", width: 1200, height: 630 }]
  },
  alternates: { canonical: "https://artichaud-studio.com/contact" }
}
```

---

#### 12. **Local SEO (Référencement Local Paris)**

**a) Google Business Profile**
- ✅ Vérifier que le profil Google My Business est à jour
- Adresse complète (si bureau physique)
- Horaires exacts
- Photos du studio
- Avis clients

**b) LocalBusiness Schema (amélioration)**

Remplacer `DesignAgency` par un type plus spécifique avec géolocalisation :

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["DesignAgency", "LocalBusiness"],
  "name": "Artichaud Studio",
  "image": "https://artichaud-studio.com/icon.png",
  "url": "https://artichaud-studio.com",
  "telephone": "+33697538017",
  "email": "artichaud.studio@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "À définir si bureau physique", // ⚠️ Mettre l'adresse exacte
    "addressLocality": "Paris",
    "addressRegion": "Île-de-France",
    "postalCode": "75000", // ⚠️ Mettre le code postal exact
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8566",  // ⚠️ Coordonnées réelles de votre bureau
    "longitude": "2.3522"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "priceRange": "€€€",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.linkedin.com/company/artichaud-studio",
    "https://www.instagram.com/artichaud.studio" // Si existe
  ]
}
```

---

#### 13. **Security Headers (Bonus SEO)**

Ajouter dans `next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 📈 ACTIONS PRIORITAIRES (Quick Wins)

### 🔥 À FAIRE MAINTENANT (Impact Immédiat)

1. **[10 min]** Créer `robots.txt` dans `/public/`
2. **[20 min]** Créer `sitemap.ts` dans `/src/app/`
3. **[15 min]** Créer `manifest.json` dans `/public/` + ajouter dans layout
4. **[5 min]** Ajouter `themeColor` dans metadata
5. **[30 min]** Créer images OG dédiées (1200x630)

### 🎯 CETTE SEMAINE (Impact Élevé)

6. **[20 min]** Ajouter metadata sur `/contact`, `/about`, `/faq`
7. **[30 min]** Implémenter BreadcrumbsJsonLd
8. **[40 min]** Implémenter ArticleJsonLd pour le blog
9. **[20 min]** Vérifier et optimiser les alt text images
10. **[15 min]** Améliorer la meta description globale

### 📊 CE MOIS (Impact Moyen)

11. **[1h]** Ajouter FAQ Schema.org
12. **[30 min]** Optimiser le LocalBusiness Schema avec coordonnées exactes
13. **[1h]** Audit des Core Web Vitals avec Lighthouse
14. **[30 min]** Optimiser le poids des polices (supprimer les non-utilisées)
15. **[2h]** Créer un blog post SEO-optimisé mensuel

---

## 🎯 OBJECTIFS MESURABLES

### KPIs à Suivre (Google Search Console + Analytics)

| Métrique | Actuel | Objectif 3 mois | Objectif 6 mois |
|----------|--------|-----------------|-----------------|
| **Impressions organiques** | À mesurer | +50% | +100% |
| **CTR moyen** | À mesurer | 3-5% | 5-7% |
| **Position moyenne** | À mesurer | Top 10 | Top 5 |
| **Pages indexées** | À vérifier | 100% pages | 100% pages |
| **Core Web Vitals (mobile)** | À tester | 90+ | 95+ |
| **Backlinks** | À mesurer | +20 | +50 |

### Requêtes Cibles (Mots-clés Prioritaires)

**Volume élevé :**
- "agence web Paris" (1000-10K/mois)
- "création site internet Paris" (500-1K/mois)
- "agence branding Paris" (100-500/mois)

**Long tail (conversion élevée) :**
- "refonte site web Paris" (100-500/mois)
- "création identité visuelle Paris" (50-100/mois)
- "agence webdesign Boulogne-Billancourt" (10-50/mois)

---

## 🔧 OUTILS RECOMMANDÉS

### Audit & Monitoring
- **Google Search Console** (essentiel)
- **Google Analytics 4** (déjà installé ✅)
- **PageSpeed Insights** (Core Web Vitals)
- **Screaming Frog** (crawl technique)
- **Ahrefs / Semrush** (backlinks, keywords)

### Validation
- **Schema.org Validator** : https://validator.schema.org/
- **Rich Results Test** : https://search.google.com/test/rich-results
- **Mobile-Friendly Test** : https://search.google.com/test/mobile-friendly

---

## 📝 CHECKLIST DE VALIDATION

Avant de pousser en production, vérifier :

- [ ] `robots.txt` accessible sur `/robots.txt`
- [ ] `sitemap.xml` accessible sur `/sitemap.xml`
- [ ] Sitemap référencé dans robots.txt
- [ ] Sitemap soumis à Google Search Console
- [ ] `manifest.json` accessible et valide
- [ ] Toutes les images OG en 1200x630
- [ ] Metadata complètes sur toutes les pages
- [ ] JsonLD valide sur toutes les pages (validator.schema.org)
- [ ] Alt text sur toutes les images
- [ ] Canonical URLs corrects
- [ ] Aucune erreur dans la console navigateur
- [ ] Test mobile (responsive)
- [ ] Core Web Vitals > 90 (mobile + desktop)

---

## 🚀 PROCHAINES ÉTAPES (Après l'Audit)

### Content Marketing
1. **Blog régulier** : 2 articles/mois sur des sujets SEO-friendly
   - "Comment choisir son agence web à Paris"
   - "Branding vs Design graphique : quelle différence ?"
   - "Refonte de site : les 10 erreurs à éviter"

2. **Case Studies** : Détailler vos projets avec mots-clés
   - Structurer avec Schema.org (CreativeWork)

3. **Landing Pages Géolocalisées**
   - Déjà : Paris, Boulogne-Billancourt ✅
   - Ajouter : Neuilly, Levallois, Issy-les-Moulineaux

### Link Building
- Annuaires qualité (Kompass, PagesJaunes Pro)
- Partenariats agences complémentaires
- Guest posting sur blogs marketing/design
- Inscription plateformes (Malt, Sortlist, Clutch)

### Technical SEO Avancé
- Implémenter Incremental Static Regeneration (ISR) pour le blog
- Lazy load images (déjà natif avec Next/Image ✅)
- Compression Brotli (Vercel le fait automatiquement ✅)

---

## 💡 NOTES FINALES

**Points forts du site actuel :**
- Excellent design et UX
- Stack technique moderne (Next.js 16)
- Bonne base de métadonnées
- Schema.org déjà en place

**Gains estimés après optimisation :**
- **+30-50% de trafic organique** en 3 mois
- **+70-100% d'impressions** dans la Search Console
- **Meilleur positionnement** sur les requêtes géolocalisées Paris
- **Rich snippets** visibles dans les SERPs (FAQ, articles)

**Effort estimé total :**
- Quick wins : **2-3 heures**
- Optimisations complètes : **8-10 heures**
- Maintenance mensuelle : **2-4 heures/mois**

---

**🎯 Prochaine action recommandée :** Commencer par les 5 quick wins (robots.txt, sitemap, manifest, themeColor, images OG) pour un impact immédiat.

---

_Audit réalisé par Claude (Anthropic) - Janvier 2026_
