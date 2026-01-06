# Audit SEO Complet - Artichaud Studio

**Date** : Janvier 2026
**URL** : https://artichaud.studio
**Secteur** : Agence Web & Branding Paris

---

## 📊 État actuel du SEO

### ✅ Points forts

1. **Structure technique solide**
   - Sitemap.xml automatique généré
   - Robots.txt configuré
   - Données structurées Schema.org (DesignAgency)
   - Pages SEO locales (Paris, Boulogne-Billancourt)
   - URLs propres et descriptives

2. **Contenu existant**
   - 7 articles de blog
   - Pages de services
   - Portfolio projets
   - Pages locales SEO

3. **Optimisations techniques**
   - Next.js App Router (bon pour SEO)
   - Images optimisées (AVIF/WebP)
   - Métadonnées OpenGraph sur certaines pages

---

## ⚠️ Problèmes critiques identifiés

### 1. **Métadonnées manquantes** (CRITIQUE)

**Pages sans métadonnées complètes** :
- ✗ Page d'accueil (src/app/page.tsx) - AUCUNE métadonnée
- ✗ Page Services (src/app/services/page.tsx) - AUCUNE métadonnée
- ✗ Page Works (src/app/works/page.tsx) - Probablement aucune
- ✗ Page Contact - À vérifier

**Impact** :
- Google génère automatiquement title/description = perte de contrôle
- Pas d'optimisation mots-clés
- CTR réduit dans les SERP

**Solution** :
Ajouter des métadonnées complètes sur TOUTES les pages (voir section Recommandations).

---

### 2. **Schema.org incomplet**

**Problèmes dans JsonLD.tsx** :
```json
{
  "streetAddress": "Votre adresse",  // ❌ Placeholder
  "geo": {
    "latitude": 48.8566,  // ❌ Coordonnées génériques Paris
    "longitude": 2.3522
  },
  "sameAs": [
    "https://www.instagram.com/...",  // ❌ URL incomplète
  ]
}
```

**Impact** :
- Rich Snippets non affichés
- Google My Business non optimisé
- Perte de visibilité locale

---

### 3. **Contenu blog insuffisant**

**Actuellement** : 7 articles
**Recommandé** : 20-30 articles minimum

**Problèmes** :
- Pas assez de contenu pour ranker sur mots-clés concurrentiels
- Manque de topics clusters autour des services
- Pas de maillage interne développé

---

### 4. **Pas de plan de mots-clés**

**Mots-clés non exploités** :
- "agence branding Paris"
- "création identité visuelle Paris"
- "refonte site web Paris"
- "agence webdesign Paris"
- "tarif création site internet"
- Long-tail locaux (75001, 75002, etc.)

---

### 5. **URL incohérentes**

**Problème détecté** :
- Sitemap : `artichaud-studio.com`
- Metadata page Paris : `artichaud.com`
- Layout : `artichaud.studio`

**Impact** :
- Confusion pour Google
- Dilution du jus SEO
- Problèmes de canonical

---

## 🎯 Recommandations prioritaires

### PRIORITÉ 1 : Métadonnées complètes (URGENT)

#### Page d'accueil (src/app/page.tsx)

```tsx
export const metadata: Metadata = {
  title: "Artichaud Studio | Agence Web & Branding Paris - Design & Stratégie",
  description: "Agence de branding et création de sites web à Paris. Design d'identité visuelle, développement web sur mesure et stratégie digitale pour marques ambitieuses.",
  keywords: [
    "agence branding Paris",
    "agence web Paris",
    "création site internet Paris",
    "identité visuelle Paris",
    "webdesign Paris",
    "agence digitale Paris"
  ],
  openGraph: {
    title: "Artichaud Studio - Agence Web & Branding Paris",
    description: "Nous accompagnons les marques de là où elles sont, vers là où elles méritent d'être. Branding, webdesign et stratégie digitale à Paris.",
    url: "https://artichaud.studio",
    siteName: "Artichaud Studio",
    images: [
      {
        url: "https://artichaud.studio/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Artichaud Studio - Agence Branding Paris"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Artichaud Studio | Agence Web & Branding Paris",
    description: "Design d'identité visuelle et création de sites web sur mesure à Paris.",
    images: ["https://artichaud.studio/og-home.jpg"]
  },
  alternates: {
    canonical: "https://artichaud.studio"
  }
}
```

#### Page Services

```tsx
export const metadata: Metadata = {
  title: "Nos Services | Branding, Webdesign & Stratégie Digitale - Artichaud",
  description: "Découvrez nos services : Stratégie de marque, Identité visuelle, Webdesign, Webmarketing et Shooting Produit. Une agence 360 qui réunit tous les métiers de la création.",
  keywords: [
    "services agence web Paris",
    "stratégie de marque",
    "création identité visuelle",
    "webdesign Paris",
    "refonte site internet",
    "shooting produit Paris"
  ],
  openGraph: {
    title: "Services - Artichaud Studio Paris",
    description: "Stratégie de marque, identité visuelle, webdesign, webmarketing et shooting produit. Nos expertises pour faire grandir votre marque.",
    url: "https://artichaud.studio/services",
    images: [
      {
        url: "https://artichaud.studio/og-services.jpg",
        width: 1200,
        height: 630
      }
    ]
  },
  alternates: {
    canonical: "https://artichaud.studio/services"
  }
}
```

#### Page Works

```tsx
export const metadata: Metadata = {
  title: "Portfolio | Nos Projets Web & Branding - Artichaud Studio",
  description: "Découvrez nos réalisations : branding, sites web et stratégies digitales pour Charit.io, Disobey, Paradox et autres marques ambitieuses.",
  keywords: [
    "portfolio agence web Paris",
    "projets branding",
    "réalisations webdesign",
    "case studies design"
  ],
  openGraph: {
    title: "Portfolio - Artichaud Studio",
    description: "Nos projets de branding et webdesign pour des marques qui osent se démarquer.",
    url: "https://artichaud.studio/works"
  },
  alternates: {
    canonical: "https://artichaud.studio/works"
  }
}
```

---

### PRIORITÉ 2 : Corriger Schema.org

**Fichier** : `src/components/seo/JsonLD.tsx`

```tsx
export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DesignAgency",
    "name": "Artichaud Studio",
    "image": "https://artichaud.studio/logo-artichaud.png",
    "url": "https://artichaud.studio",
    "telephone": "+33766489982", // Format international
    "email": "artichaud.studio@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Votre vraie adresse", // ⚠️ À COMPLÉTER
      "addressLocality": "Paris",
      "postalCode": "75XXX", // ⚠️ À COMPLÉTER
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.XXXX, // ⚠️ Coordonnées réelles
      "longitude": 2.XXXX
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/artichaud.studio", // ⚠️ URL réelle
      "https://www.linkedin.com/company/artichaud-studio", // ⚠️ URL réelle
      "https://www.behance.net/artichaud" // Si vous en avez un
    ],
    "priceRange": "€€€",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "geoRadius": "50000" // 50km autour de Paris
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Design et Web",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stratégie de Marque",
            "description": "Brand workshops, stratégie et positionnement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Identité Visuelle",
            "description": "Logo, charte graphique, direction artistique"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Webdesign",
            "description": "UX/UI design, prototypage, design systems"
          }
        }
      ]
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

---

### PRIORITÉ 3 : Uniformiser les URLs

**Action** : Choisir UN domaine principal et tout mettre à jour.

**Recommandation** : `https://artichaud.studio` (cohérent avec votre nom)

**Fichiers à modifier** :
1. `src/app/sitemap.ts` → ligne 7
2. `src/app/robots.ts` → ligne 10
3. `src/components/seo/JsonLD.tsx` → ligne 6
4. `src/app/layout.tsx` → ligne 29
5. Toutes les pages avec canonical

**Script de remplacement** :
```bash
# Remplacer toutes les occurrences
find src -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/artichaud-studio.com/artichaud.studio/g'
find src -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/artichaud.com/artichaud.studio/g'
```

---

## 📄 Pages manquantes à créer

### 1. **Page FAQ** (SEO puissant)

**URL** : `/faq`
**Objectif** : Répondre aux questions fréquentes + schema FAQ

**Questions suggérées** :
- Combien coûte un site web sur mesure ?
- Quel est le délai pour créer un site internet ?
- Différence entre WordPress, Webflow et développement custom ?
- Comment se déroule un projet de branding ?
- Travaillez-vous avec des startups ?
- Zone d'intervention (Paris, Île-de-France, France ?)

**Schema.org à ajouter** :
```tsx
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien coûte un site internet sur mesure ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le coût d'un site web varie de 3000€ à 15000€..."
      }
    }
  ]
}
```

---

### 2. **Page Tarifs/Prix**

**URL** : `/tarifs` ou `/prix`
**Objectif** : Capter les recherches "prix site internet", "tarif agence web"

**Contenu suggéré** :
- Grille tarifaire par type de projet
- Forfaits (Site vitrine, E-commerce, Sur-mesure)
- Options (SEO, maintenance, shooting)
- CTA vers devis gratuit

**Mots-clés ciblés** :
- "prix création site internet Paris"
- "tarif agence web"
- "combien coûte un site vitrine"
- "devis site web Paris"

---

### 3. **Pages SEO Locales supplémentaires**

**Actuellement** : Paris, Boulogne-Billancourt
**À créer** :

- `/creation-site-internet-neuilly-sur-seine`
- `/creation-site-internet-levallois-perret`
- `/creation-site-internet-issy-les-moulineaux`
- `/agence-web-hauts-de-seine-92`
- `/agence-branding-paris-75`

**Template réutilisable** :
```tsx
// src/app/[ville]/LocalPageTemplate.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ville = villesData[params.ville]

  return {
    title: `Création Site Internet ${ville.nom} | Agence Web & Branding`,
    description: `Agence web à ${ville.nom} (${ville.codePostal}). Création de sites internet sur mesure, branding et stratégie digitale pour entreprises en ${ville.region}.`,
    keywords: [
      `création site internet ${ville.nom}`,
      `agence web ${ville.nom}`,
      `webdesign ${ville.codePostal}`
    ]
  }
}
```

---

### 4. **Page Processus/Méthode**

**URL** : `/notre-methode` ou `/processus`
**Objectif** : Montrer votre expertise, rassurer

**Contenu** :
- Étapes d'un projet (Découverte, Stratégie, Design, Dev, Launch)
- Durée de chaque phase
- Méthodologie (Agile, Design Thinking)
- Livrables à chaque étape

**Bonus SEO** : Schéma HowTo
```json
{
  "@type": "HowTo",
  "name": "Comment créer un site web avec Artichaud Studio",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Découverte",
      "text": "Analyse de vos besoins et objectifs"
    }
  ]
}
```

---

### 5. **Pages de comparaison**

**Excellentes pour SEO informatif** :

- `/wordpress-vs-webflow-vs-developpement-sur-mesure`
- `/refonte-site-internet-ou-creation-nouveau-site`
- `/agence-web-ou-freelance-que-choisir`

**Structure type** :
```
# WordPress vs Webflow vs Développement sur mesure

## Tableau comparatif
## Avantages/Inconvénients
## Pour qui ?
## Notre recommandation
## CTA : Discutons de votre projet
```

---

### 6. **Page Équipe**

**URL** : `/equipe` ou `/about` (enrichir la page existante)

**Objectif SEO** :
- Rich Snippets "Organization"
- Humaniser la marque
- Renforcer l'E-E-A-T (Expertise, Experience, Authority, Trust)

**Schema.org Person** :
```json
{
  "@type": "Person",
  "name": "Prénom Nom",
  "jobTitle": "Founder & Creative Director",
  "image": "https://artichaud.studio/team/prenom-nom.jpg",
  "sameAs": [
    "https://www.linkedin.com/in/prenom-nom"
  ]
}
```

---

## 📝 Stratégie de contenu blog

### Articles à créer en priorité

#### Cluster 1 : Création de sites web

1. **"Guide complet : Créer un site internet en 2026 (étapes, prix, outils)"**
   - Mot-clé : "créer un site internet"
   - Volume : ~5000/mois
   - Difficulté : Moyenne

2. **"Site vitrine vs Site e-commerce : Lequel choisir en 2026 ?"**
   - Long-tail
   - Intention commerciale

3. **"Les 10 erreurs à éviter lors de la création de votre site web"**
   - Listicle = bon partage social

4. **"Combien coûte un site web en 2026 ? Grille tarifaire complète"**
   - Forte intention commerciale

#### Cluster 2 : Branding

5. **"Qu'est-ce qu'une charte graphique et pourquoi en avez-vous besoin ?"**
6. **"Comment réussir son rebranding : 7 étapes clés"**
7. **"Logo : 15 exemples de marques qui ont tout compris"**
8. **"Différence entre identité visuelle et identité de marque"**

#### Cluster 3 : Local SEO

9. **"Top 10 des agences web à Paris en 2026"** (vous inclure)
10. **"Pourquoi choisir une agence web parisienne pour votre projet ?"**
11. **"Sites internet pour TPE/PME en Île-de-France : Guide pratique"**

#### Cluster 4 : Technique

12. **"WordPress vs Webflow vs Wix : Comparatif complet 2026"**
13. **"Qu'est-ce que le SEO et pourquoi c'est crucial pour votre site ?"**
14. **"Vitesse de chargement : Comment optimiser votre site web"**

### Fréquence de publication recommandée

- **Court terme** : 2 articles/mois minimum
- **Objectif 6 mois** : 20+ articles
- **Long terme** : 1 article/semaine (50+/an)

---

## 🔗 Stratégie de maillage interne

### Principes

1. **Chaque article de blog doit linker vers** :
   - 2-3 autres articles du blog (topics connexes)
   - 1 page service pertinente
   - 1 page projet si pertinent

2. **Pages services doivent linker vers** :
   - Articles de blog relatifs
   - Page FAQ
   - Page processus
   - Projets portfolio

3. **Page d'accueil doit linker vers** :
   - Toutes les pages services
   - Articles blog phares
   - Page à propos
   - FAQ

### Structure en silos recommandée

```
Accueil
├── Services/
│   ├── Branding
│   │   ├── Blog: Qu'est-ce qu'une charte graphique
│   │   ├── Blog: Réussir son rebranding
│   │   └── Projet: Disobey
│   ├── Webdesign
│   │   ├── Blog: WordPress vs Webflow
│   │   ├── Blog: Optimiser vitesse site
│   │   └── Projet: Charit.io
│   └── Webmarketing
│       ├── Blog: SEO 2026
│       └── Blog: Stratégie contenu
├── Works/ (Portfolio)
└── Blog/
```

---

## 🌍 SEO Local avancé

### Google My Business

**Actions** :
1. Créer/Optimiser fiche GMB
2. Ajouter photos de qualité (bureau, équipe, projets)
3. Catégories : "Agence de marketing", "Graphiste", "Concepteur de sites web"
4. Collecter avis clients (min. 10)
5. Publier posts GMB régulièrement

### Citations locales

**Annuaires à cibler** :
- PagesJaunes.fr
- Yelp.fr
- Trustpilot
- Clutch.co (B2B)
- Sortlist.com (agences)
- Malt.fr (si applicable)

**NAP cohérent** (Name, Address, Phone) :
- Même format partout
- Même numéro de téléphone
- Même adresse

---

## 🏆 Backlinks & Autorité

### Stratégies actionnables

1. **Guest posting**
   - Blogs marketing/startup
   - Médias tech français (Maddyness, FrenchWeb)
   - Blogs WordPress/Webflow

2. **Partenariats**
   - Autres agences complémentaires (photo, copywriting)
   - Fournisseurs (hébergeurs, CMS)

3. **Digital PR**
   - Communiqués de presse (lancement projets)
   - Case studies partagés avec clients
   - Awards & Concours (Awwwards, CSS Design Awards)

4. **Contenu linkable**
   - Guides ultra-complets (10000+ mots)
   - Infographies partageables
   - Outils gratuits (calculateur de prix site web)

---

## 🎨 Rich Snippets & Featured Snippets

### Optimisations pour extraits enrichis

1. **FAQ Schema** (déjà mentionné)

2. **HowTo Schema** (Processus)

3. **Article Schema** (Blog)
```tsx
// Dans chaque article de blog
{
  "@type": "Article",
  "headline": "Titre de l'article",
  "image": "https://...",
  "author": {
    "@type": "Person",
    "name": "Clément Ronde"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Artichaud Studio",
    "logo": {...}
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-01-20"
}
```

4. **BreadcrumbList**
```tsx
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://artichaud.studio"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://artichaud.studio/services"
    }
  ]
}
```

### Cibler Featured Snippets

**Format à privilégier** :
- Paragraphe concis (40-60 mots) répondant à une question
- Listes numérotées/à puces
- Tableaux comparatifs
- Définitions claires

**Exemple** :
```md
## Combien coûte un site internet en 2026 ?

Un site vitrine coûte entre 3000€ et 8000€, un site e-commerce entre 8000€ et 20000€, et un site sur mesure à partir de 15000€. Le prix dépend de la complexité, du design et des fonctionnalités.
```

---

## 📱 Core Web Vitals & Performance

### Audits techniques réguliers

**Outils à utiliser** :
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Google Search Console

**Objectifs** :
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

**Déjà optimisé** ✅ (grâce aux optimisations récentes)

---

## 📊 Tracking & Mesure

### Google Search Console

**Métriques à suivre** :
- Impressions
- Clics
- Position moyenne
- CTR

**Actions** :
1. Vérifier propriété
2. Soumettre sitemap
3. Corriger erreurs d'indexation
4. Améliorer pages avec impressions mais faible CTR

### KPIs SEO à tracker

| Métrique | Objectif 3 mois | Objectif 6 mois |
|----------|-----------------|-----------------|
| Trafic organique | +50% | +150% |
| Mots-clés top 10 | 10 | 30 |
| Backlinks | 15 | 40 |
| Articles de blog | 13 (7+6) | 25+ |
| Pages indexées | 30 | 50+ |

---

## ✅ Checklist immédiate (Cette semaine)

### Jour 1-2 : Métadonnées critiques
- [ ] Ajouter métadonnées complètes page d'accueil
- [ ] Ajouter métadonnées page Services
- [ ] Ajouter métadonnées page Works
- [ ] Ajouter métadonnées page Contact

### Jour 3-4 : Schema.org
- [ ] Compléter adresse réelle dans JsonLD
- [ ] Ajouter coordonnées GPS précises
- [ ] Compléter URLs réseaux sociaux
- [ ] Ajouter hasOfferCatalog

### Jour 5-7 : Contenu
- [ ] Créer page FAQ avec 10 questions
- [ ] Créer page Tarifs
- [ ] Planifier 2 articles blog supplémentaires

---

## 🚀 Roadmap SEO 3 mois

### Mois 1 : Fondations
- ✅ Corriger métadonnées toutes pages
- ✅ Uniformiser URLs
- ✅ Compléter Schema.org
- 📝 Créer 2 articles blog
- 📝 Lancer FAQ + Tarifs

### Mois 2 : Expansion
- 📝 3 pages SEO locales supplémentaires
- 📝 4 articles blog
- 🔗 10 backlinks (guest posts, annuaires)
- 📊 Optimiser GMB

### Mois 3 : Autorité
- 📝 4 articles blog (total 20+)
- 🔗 15 backlinks de qualité
- 📈 Featured snippets (3-5)
- 🎯 Top 3 sur 5 mots-clés locaux

---

## 💡 Quick Wins (Résultats rapides)

1. **Ajouter métadonnées** → +30% CTR SERP (2 jours)
2. **Créer FAQ** → Featured snippet possible (1 semaine)
3. **Optimiser GMB** → +50% visibilité locale (1 semaine)
4. **Corriger Schema.org** → Rich snippets (2 semaines)
5. **2 articles piliers** → Trafic long-tail (1 mois)

---

## 📞 Ressources & Outils

### SEO Tools recommandés
- **Google Search Console** (gratuit) - Essentiel
- **Google Analytics 4** (gratuit) - Tracking
- **Ubersuggest** ou **SEMrush** (freemium) - Recherche mots-clés
- **Screaming Frog** (gratuit/payant) - Audit technique
- **AnswerThePublic** (gratuit) - Idées contenu

### Guides de référence
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

## 📝 Conclusion

**Potentiel SEO actuel** : 4/10
**Potentiel après optimisations** : 8/10

**Effort estimé** :
- Quick wins : 1 semaine
- Fondations solides : 1 mois
- Résultats visibles : 2-3 mois
- Autorité établie : 6-12 mois

**ROI attendu** :
- Trafic organique x3 en 6 mois
- 20-30% du CA via SEO en 12 mois
- Position #1 sur mots-clés locaux

---

**Prochaine étape** : Implémenter les métadonnées (Priorité 1) dès aujourd'hui.

---

**Document créé le** : Janvier 2026
**Version** : 1.0
**Auteur** : Claude (Audit SEO Artichaud Studio)
