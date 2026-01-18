# Guide : Afficher le logo Artichaud dans Google SERP

## 🎯 Objectif
Faire apparaître le logo d'Artichaud Studio dans les résultats de recherche Google (SERP) à côté du nom de l'entreprise.

---

## ✅ Corrections déjà appliquées

### 1. Schema Organization (JsonLD)
- ✅ Format `ImageObject` avec dimensions correctes
- ✅ Type `Organization` ajouté en premier
- ✅ `contactPoint` structuré ajouté
- ✅ Profils sociaux multiples dans `sameAs`
- ✅ `legalName` et `contentUrl` ajoutés

### 2. Métadonnées OpenGraph
- ✅ Dimensions corrigées de **1200x630 (faux)** vers **512x512 (réel)**
- ✅ Correction sur toutes les pages :
  - Homepage
  - /services/creation-site-internet
  - /services/branding-identite-visuelle
  - /services/seo-referencement-naturel

### 3. SEO Technique
- ✅ Sitemap mis à jour avec les nouvelles pages
- ✅ Robots.txt optimisé
- ✅ Maillage interne renforcé

---

## ❌ PROBLÈME PRINCIPAL : Logo trop petit

### État actuel
- **Logo actuel** : `icon.png` = **512×512px** (13.6 KB)
- **Exigence Google** : **Minimum 1200×1200px recommandé**
- **Format** : PNG ou JPG, carré (1:1), fond blanc ou transparent

### Impact
🔴 **BLOQUANT** - Google n'affiche le logo dans les SERP que si la qualité est suffisante (1200×1200px minimum).

---

## 🛠️ ACTION REQUISE : Créer un logo haute résolution

### Option 1 : Upscale le logo existant (Rapide)

#### Avec un outil en ligne (Gratuit)
1. **Upscayl** (logiciel gratuit) : https://upscayl.github.io/
   - Télécharger et installer
   - Ouvrir `icon.png`
   - Upscale 4x → obtenir 2048×2048px
   - Exporter en PNG

2. **Waifu2x** (en ligne) : http://waifu2x.udp.jp/
   - Upload `icon.png`
   - Style: Artwork
   - Noise Reduction: Highest
   - Upscaling: 4x
   - Télécharger le résultat

3. **ImageEnlarger** : https://imageenlarger.com/
   - Upload `icon.png`
   - Choisir 2048×2048px
   - Télécharger

#### Avec Photoshop/Illustrator (Qualité maximale)
1. Ouvrir le fichier source du logo (si disponible en .AI ou .SVG)
2. Exporter en PNG :
   - Dimensions : **1200×1200px minimum** (idéal : 2000×2000px)
   - Résolution : 72 DPI (web) ou 300 DPI (haute qualité)
   - Format : PNG-24 avec transparence
   - Optimisation : Compression légère

### Option 2 : Recréer depuis les sources (Meilleure qualité)

Si vous avez les fichiers sources vectoriels (.AI, .SVG) :

1. Ouvrir dans Illustrator/Figma/Inkscape
2. Plan de travail : 1200×1200px ou 2000×2000px
3. Centrer le logo
4. Exporter :
   - Format : PNG
   - Qualité : Maximum
   - Transparence : Oui
   - Nom : `logo-1200.png` ou `og-logo.png`

---

## 📁 Installation du nouveau logo

### 1. Placer le fichier
```bash
# Renommer votre nouveau logo en logo-1200.png
# Le placer dans /public/
/public/logo-1200.png
```

### 2. Mettre à jour le code

#### Fichier : `src/components/seo/JsonLD.tsx`
```typescript
"logo": {
  "@type": "ImageObject",
  "url": "https://artichaud-studio.com/logo-1200.png",  // ← Changer ici
  "width": 1200,                                         // ← Changer ici
  "height": 1200,                                        // ← Changer ici
  "contentUrl": "https://artichaud-studio.com/logo-1200.png",
  "caption": "Artichaud Studio Logo",
  "inLanguage": "fr-FR"
},
```

#### Fichier : `src/app/page.tsx` (et autres pages)
```typescript
openGraph: {
  images: [
    {
      url: "https://artichaud-studio.com/logo-1200.png",  // ← Changer ici
      width: 1200,                                         // ← Changer ici
      height: 1200,                                        // ← Changer ici
      alt: "Artichaud Studio - Agence Branding Paris"
    }
  ],
}
```

### 3. Optimiser le fichier

Avant de l'uploader, optimisez le PNG :

**En ligne :**
- https://tinypng.com/ (compression sans perte de qualité)
- https://squoosh.app/ (optimisation avancée)

**En ligne de commande :**
```bash
# Installer optipng
npm install -g optipng

# Optimiser
optipng -o7 logo-1200.png
```

---

## 🚀 Déploiement et validation

### 1. Commit et push
```bash
git add public/logo-1200.png
git add src/components/seo/JsonLD.tsx
git add src/app/page.tsx
# + autres pages modifiées

git commit -m "feat: add high-resolution logo for Google SERP (1200x1200)"
git push
```

### 2. Vérifier l'accessibilité
Après déploiement, vérifier que le logo est accessible :
```
https://artichaud-studio.com/logo-1200.png
```

### 3. Valider le Schema
- **Schema.org validator** : https://validator.schema.org/
  - Copier le code source de votre page
  - Vérifier qu'il n'y a pas d'erreurs sur le logo

- **Google Rich Results Test** : https://search.google.com/test/rich-results
  - Tester : `https://artichaud-studio.com`
  - Vérifier que le logo apparaît dans le JSON-LD

### 4. Demander l'indexation
1. Google Search Console → Inspection d'URL
2. Entrer : `https://artichaud-studio.com`
3. Cliquer "Demander une indexation"

---

## ⏱️ Délais d'apparition

| Étape | Délai |
|-------|-------|
| Fichier uploadé et accessible | Immédiat |
| Google découvre la modification | 1-3 jours |
| Google valide le logo | 3-7 jours |
| **Logo apparaît dans SERP** | **1-4 semaines** |

**Note** : Parfois cela peut prendre jusqu'à 2 mois. Patience !

---

## 🔍 Vérifier l'affichage

### Test rapide
Rechercher sur Google :
```
site:artichaud-studio.com
```

ou directement :
```
Artichaud Studio Paris
```

Le logo devrait apparaître à côté du nom dans les résultats.

### Monitoring
- **Google Search Console** → Améliorations → Logo
  - Vérifier que Google reconnaît le logo
  - Voir les éventuelles erreurs

---

## 📊 Spécifications techniques complètes

### Logo parfait pour Google

| Critère | Valeur recommandée | Valeur actuelle |
|---------|-------------------|-----------------|
| Dimensions | 1200×1200px (ou plus) | ❌ 512×512px |
| Format | PNG ou JPG | ✅ PNG |
| Ratio | 1:1 (carré) | ✅ 1:1 |
| Taille fichier | < 5 MB | ✅ 13.6 KB |
| Fond | Blanc ou transparent | ✅ Transparent |
| URL | HTTPS absolue | ✅ |
| Accessible | Oui (pas de login) | ✅ |

### Formats alternatifs acceptés
- **Minimum** : 112×112px (technique, mais trop petit pour affichage)
- **Recommandé** : 1200×1200px
- **Optimal** : 2000×2000px ou plus
- **Maximum** : 5120×5120px

---

## ❓ Troubleshooting

### Le logo n'apparaît toujours pas après 4 semaines

1. **Vérifier l'accessibilité**
   ```bash
   curl -I https://artichaud-studio.com/logo-1200.png
   # Devrait retourner 200 OK
   ```

2. **Valider le Schema**
   - https://validator.schema.org/
   - Vérifier qu'il n'y a pas d'erreur sur `logo`

3. **Vérifier Search Console**
   - Améliorations → Logo
   - Y a-t-il des erreurs ?

4. **Forcer le recrawl**
   - Search Console → Inspection d'URL
   - Demander à nouveau l'indexation

5. **Vérifier le cache**
   - Rechercher : `cache:artichaud-studio.com`
   - La version en cache a-t-elle le nouveau logo dans le JSON-LD ?

### Le logo apparaît déformé

- Vérifier que le logo est bien **carré** (1:1)
- Vérifier que les dimensions dans le code correspondent au fichier réel
- Recréer le logo avec un fond transparent

---

## 📞 Support

Questions ?
- Google Search Central : https://support.google.com/webmasters/
- Documentation Schema : https://schema.org/Organization
- Google Guidelines : https://developers.google.com/search/docs/appearance/structured-data/logo

---

**Dernière mise à jour** : 2026-01-18
**Status** : ⏳ En attente du logo haute résolution
