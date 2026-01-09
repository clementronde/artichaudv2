# 🚀 Preloader V2 - Documentation

## 🎯 Objectifs

Le nouveau système de Preloader a été créé pour résoudre deux problèmes majeurs :

1. **Chargement basé sur les ressources réelles** : Au lieu d'un timer fixe, le preloader track maintenant le chargement réel des images, fonts et du DOM
2. **Navigation sans rechargement** : Le preloader ne s'affiche qu'au premier chargement de l'application et ne se réaffiche plus lors de la navigation entre pages

---

## 📦 Architecture

### Fichiers créés

```
src/
├── hooks/
│   └── usePageLoading.ts          # Hook qui track le chargement des ressources
├── components/
│   ├── PreloaderV2.tsx            # Nouveau composant de preloader amélioré
│   └── GlobalPreloader.tsx        # Wrapper global du preloader
└── app/
    └── layout.tsx                 # Preloader ajouté au niveau global
```

### Fichiers modifiés

```
src/components/home/HomeClient.tsx  # Ancien preloader retiré
```

---

## 🔧 Comment ça fonctionne

### 1. **Hook `usePageLoading`**

Ce hook personnalisé track 3 types de ressources :

#### **a) DOM (30% du progrès)**
```typescript
// Vérifie si le DOM est complètement chargé
if (document.readyState === 'complete') {
  resources.dom = true; // ✅ +30%
}
```

#### **b) Images (40% du progrès)**
```typescript
// Track toutes les images de la page
const images = Array.from(document.images);
images.forEach((img) => {
  img.addEventListener('load', handleLoad);
  img.addEventListener('error', handleError);
});
// Quand toutes sont chargées ✅ +40%
```

#### **c) Fonts (30% du progrès)**
```typescript
// Utilise l'API Font Loading
document.fonts.ready.then(() => {
  resources.fonts = true; // ✅ +30%
});
```

**Total : 100% quand toutes les ressources sont chargées**

### 2. **SessionStorage**

Pour ne jamais recharger le preloader lors de la navigation :

```typescript
// Au premier chargement
sessionStorage.getItem('hasSeenPreloader') // null

// Le preloader s'affiche...

// Une fois terminé
sessionStorage.setItem('hasSeenPreloader', 'true')

// Lors de la navigation vers /services, /about, etc.
sessionStorage.getItem('hasSeenPreloader') // 'true'
// ❌ Le preloader ne s'affiche pas !
```

> **Note** : Le sessionStorage est réinitialisé quand l'utilisateur ferme l'onglet, donc il verra à nouveau le preloader à sa prochaine visite.

### 3. **Durées configurables**

```typescript
const { progress, isLoading } = usePageLoading({
  minDuration: 1500, // 1.5s minimum (évite flash trop rapide)
  maxDuration: 4000, // 4s maximum (fallback de sécurité)
});
```

- **minDuration** : Même si tout charge en 200ms, on affiche au moins 1.5s pour éviter un flash désagréable
- **maxDuration** : Si certaines ressources ne chargent jamais, on force la fermeture après 4s

---

## 🎨 Nouvelles fonctionnalités visuelles

### Barre de progression

```tsx
<motion.div className="h-[2px] bg-white/20">
  <motion.div
    className="h-full bg-white"
    animate={{ scaleX: progress / 100 }}
  />
</motion.div>
```

### Texte de chargement dynamique

```tsx
{progress < 30 && "Chargement des ressources..."}
{progress >= 30 && progress < 70 && "Chargement des images..."}
{progress >= 70 && progress < 100 && "Finalisation..."}
{progress === 100 && "Prêt !"}
```

### Animation de sortie

```tsx
exit={{ y: "-100%" }}
transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
```

Le preloader glisse vers le haut avec une courbe Expo fluide (comme Awwwards, Apple).

---

## 📊 Comparaison Ancien vs Nouveau

| Fonctionnalité | Ancien Preloader | Nouveau Preloader V2 |
|----------------|------------------|----------------------|
| **Basé sur** | Timer fixe (2s) | Ressources réelles |
| **Précision** | ❌ Approximatif | ✅ Exact |
| **Scope** | Page Home uniquement | ✅ Global (toute l'app) |
| **Navigation** | ❌ Se réaffiche | ✅ Une seule fois |
| **Progress bar** | ❌ Aucune | ✅ Barre + texte |
| **Feedback utilisateur** | ❌ Juste % | ✅ Texte dynamique |
| **Durée moyenne** | 2.5s fixe | 1.5-3s dynamique |

---

## 🔥 Avantages

### ✅ **Expérience utilisateur**
- Progrès réaliste (pas un faux compteur)
- Feedback visuel clair (barre + texte)
- Navigation fluide sans rechargement

### ✅ **Performance**
- Se charge uniquement au premier accès
- Track les vraies ressources (pas d'attente inutile)
- Fallback de sécurité si ressources bloquées

### ✅ **Maintenabilité**
- Code modulaire (hook + composants séparés)
- Facile à personnaliser (durées, textes, styles)
- Réutilisable dans d'autres projets

---

## 🛠️ Configuration & Personnalisation

### Modifier les durées

**Fichier** : `src/hooks/usePageLoading.ts`

```typescript
const { progress, isLoading } = usePageLoading({
  minDuration: 2000, // 2s min
  maxDuration: 5000, // 5s max
});
```

### Modifier les textes de chargement

**Fichier** : `src/components/PreloaderV2.tsx`

```tsx
{progress < 30 && "Initialisation..."}
{progress >= 30 && progress < 70 && "Chargement du contenu..."}
{progress >= 70 && progress < 100 && "C'est presque prêt..."}
{progress === 100 && "C'est parti !"}
```

### Modifier le style

```tsx
// Changer la couleur de fond
className="bg-[#111]" // Noir actuel
className="bg-gradient-to-br from-purple-900 to-blue-900" // Gradient

// Changer la taille du texte
className="text-[10vw] md:text-[120px]" // Actuel
className="text-[15vw] md:text-[180px]" // Plus grand

// Changer l'animation de sortie
exit={{ y: "-100%" }} // Glisse vers le haut
exit={{ opacity: 0, scale: 0.9 }} // Fade + shrink
exit={{ x: "100%" }} // Glisse vers la droite
```

### Désactiver le preloader temporairement

**Option 1** : Commenter dans `layout.tsx`

```tsx
<body>
  {/* <GlobalPreloader /> */}
  <JsonLd />
  {/* ... */}
</body>
```

**Option 2** : Effacer le sessionStorage dans la console

```javascript
sessionStorage.removeItem('hasSeenPreloader');
location.reload();
```

---

## 🧪 Tests

### Test 1 : Premier chargement

1. Ouvrez le site en navigation privée : https://artichaud-studio.com
2. Le preloader doit s'afficher
3. Observez la progression : 0% → 100%
4. Le preloader glisse vers le haut après 100%

### Test 2 : Navigation entre pages

1. Sur la page d'accueil, cliquez sur "Services"
2. Le preloader **ne doit PAS se réafficher**
3. La navigation doit être instantanée
4. Cliquez sur "Works", "About", "Contact"
5. Le preloader ne doit jamais se réafficher

### Test 3 : Rechargement de page

1. Appuyez sur F5 (ou Cmd+R)
2. Le preloader **ne doit PAS se réafficher** (sessionStorage actif)

### Test 4 : Nouvel onglet

1. Fermez l'onglet
2. Ouvrez un nouvel onglet
3. Allez sur https://artichaud-studio.com
4. Le preloader **doit se réafficher** (sessionStorage réinitialisé)

### Test 5 : Connexion lente

1. Ouvrez DevTools (F12)
2. Network > Throttling > Slow 3G
3. Rechargez la page
4. Le preloader doit durer plus longtemps (tracking réel des images)

---

## 🐛 Dépannage

### Le preloader ne s'affiche jamais

**Cause** : sessionStorage contient `hasSeenPreloader: true`

**Solution** :
```javascript
// Console du navigateur
sessionStorage.removeItem('hasSeenPreloader');
location.reload();
```

### Le preloader reste bloqué à X%

**Cause** : Une ressource ne charge pas (image 404, font bloquée)

**Solution** : Le fallback de sécurité (maxDuration) force la fermeture après 4s

**Debug** : Ouvrez la console et cherchez les erreurs :
```javascript
// Images qui ne chargent pas
Failed to load resource: 404

// Fonts bloquées
net::ERR_BLOCKED_BY_CLIENT
```

### Le preloader se réaffiche à chaque page

**Cause** : Le `GlobalPreloader` n'est pas dans le `layout.tsx`

**Solution** : Vérifiez que dans `src/app/layout.tsx` :
```tsx
<body>
  <GlobalPreloader /> {/* ← Doit être ici */}
  <JsonLd />
  {/* ... */}
</body>
```

### La progression est trop rapide/lente

**Solution** : Ajustez les durées dans `usePageLoading` :

```typescript
// Trop rapide ? Augmentez minDuration
minDuration: 2500, // Au lieu de 1500

// Trop lent ? Réduisez maxDuration
maxDuration: 3000, // Au lieu de 4000
```

---

## 📝 Bonnes pratiques

### ✅ À faire

- Gardez le preloader simple et rapide (<3s en moyenne)
- Utilisez des textes courts et clairs
- Testez sur connexion lente (Slow 3G)
- Optimisez vos images pour réduire le temps de chargement

### ❌ À éviter

- Ne mettez pas trop de texte (distrait l'utilisateur)
- N'augmentez pas minDuration au-delà de 3s (frustrant)
- Ne supprimez pas le fallback maxDuration (risque de blocage)
- Ne réaffichez pas le preloader sur chaque page (anti-pattern)

---

## 🎓 Ressources

### Inspiration design

- **Awwwards** : https://awwwards.com (animation slide-up)
- **Apple** : https://apple.com (transitions fluides)
- **Stripe** : https://stripe.com (preloader minimaliste)

### APIs utilisées

- **Font Loading API** : https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API
- **Image onload** : https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/load_event
- **SessionStorage** : https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- **Framer Motion** : https://www.framer.com/motion/

---

## 🚀 Évolutions futures possibles

### V3 : Preloader avec logo animé

```tsx
<motion.svg
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  className="w-32 h-32"
>
  {/* Logo Artichaud */}
</motion.svg>
```

### V3 : Preload des routes Next.js

```typescript
// Precharger les pages importantes
router.prefetch('/services');
router.prefetch('/works');
router.prefetch('/contact');
```

### V3 : Analytics du temps de chargement

```typescript
// Envoyer à GTM le temps de chargement réel
window.dataLayer.push({
  event: 'page_load_time',
  load_duration: elapsedTime,
  resources_loaded: totalResources,
});
```

---

## ✅ Checklist de vérification

Avant de déployer, vérifiez que :

- [ ] Le preloader s'affiche au premier chargement
- [ ] Il ne se réaffiche pas lors de la navigation
- [ ] La progression monte de 0 à 100%
- [ ] L'animation de sortie est fluide
- [ ] Le scroll est bloqué pendant le chargement
- [ ] Le scroll est réactivé après fermeture
- [ ] Aucune erreur dans la console
- [ ] Testé sur desktop, mobile et tablette
- [ ] Testé sur Slow 3G
- [ ] L'événement `preloaderComplete` est dispatché

---

**Dernière mise à jour** : Janvier 2026
**Version** : 2.0
**Auteur** : Claude Code
