# 🔧 Guide de Dépannage GTM (Google Tag Manager)

## 🚨 Problème : Plus de données GTM après 2 jours

### Causes possibles

#### 1. **Variable d'environnement mal nommée** (CAUSE PRINCIPALE)
❌ **Incorrect** : `GTM_ID=GTM-XXXXXXX`
✅ **Correct** : `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`

Dans Next.js, les variables accessibles côté client **doivent** commencer par `NEXT_PUBLIC_`.

#### 2. **Pas de redéploiement après modification**
Les variables d'environnement sont injectées au moment du **build**, pas à l'exécution.
Si vous modifiez une variable, vous **devez redéployer**.

#### 3. **Variable non définie pour Production**
La variable doit être activée pour les 3 environnements :
- ✅ Production
- ✅ Preview
- ✅ Development

---

## ✅ Solution pas à pas

### Étape 1 : Vérifier la configuration dans Vercel

1. Allez sur https://vercel.com/
2. Sélectionnez votre projet `artichaudv2`
3. Allez dans **Settings** > **Environment Variables**
4. Vérifiez que vous avez :

```
Name: NEXT_PUBLIC_GTM_ID
Value: GTM-XXXXXXX (votre vrai ID)
Environments: ✅ Production ✅ Preview ✅ Development
```

### Étape 2 : Corriger si nécessaire

**Si la variable s'appelle `GTM_ID` sans `NEXT_PUBLIC_`** :
1. Supprimez l'ancienne variable `GTM_ID`
2. Créez une nouvelle variable `NEXT_PUBLIC_GTM_ID`
3. Copiez la valeur (ex: `GTM-XXXXXXX`)
4. Cochez les 3 environnements

**Si la variable existe déjà avec le bon nom** :
1. Vérifiez que les 3 environnements sont bien cochés
2. Vérifiez que la valeur est correcte (commence par `GTM-`)

### Étape 3 : Redéployer l'application

**CRITIQUE** : Sans redéploiement, les changements ne prendront pas effet !

#### Option A : Via l'interface Vercel
1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement
3. Cliquez sur les **3 points** (...)
4. Sélectionnez **Redeploy**
5. Confirmez

#### Option B : Via git push
```bash
git commit --allow-empty -m "fix: trigger redeploy for GTM env vars"
git push origin claude/fix-gtm-data-collection-SkP3j
```

### Étape 4 : Vérifier que GTM fonctionne

#### Test 1 : Dans le code source de la page
1. Allez sur https://artichaud-studio.com
2. Clic droit > **Afficher le code source** (Ctrl+U)
3. Recherchez `googletagmanager.com` (Ctrl+F)
4. Vous devriez voir :

```html
<script src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"></script>
```

✅ Si vous voyez ça : **GTM est bien chargé**
❌ Si vous ne voyez rien : **Le problème persiste**

#### Test 2 : Dans la console du navigateur
1. Ouvrez la console (F12)
2. Tapez :
```javascript
window.dataLayer
```
3. Vous devriez voir un tableau avec des événements

#### Test 3 : Avec l'extension Tag Assistant
1. Installez [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Allez sur votre site
3. Cliquez sur l'extension
4. Vous devriez voir votre conteneur GTM en vert

#### Test 4 : Dans GTM Preview Mode
1. Allez sur https://tagmanager.google.com
2. Sélectionnez votre conteneur
3. Cliquez sur **Preview**
4. Entrez l'URL de votre site
5. Naviguez sur le site
6. Vérifiez que les tags se déclenchent

---

## 🐛 Problèmes persistants

### Le GTM ne se charge toujours pas

#### Cause possible : Cache CDN de Vercel
Même après redéploiement, le cache peut persister.

**Solution** :
1. Allez dans Vercel > **Deployments**
2. Trouvez le domaine `artichaud-studio.com`
3. Purgez le cache via l'interface

#### Cause possible : GTM ID incorrect
Vérifiez que votre ID :
- Commence par `GTM-` (pas `G-` qui est pour GA4)
- Est bien celui de votre conteneur GTM
- N'a pas d'espaces avant/après

#### Cause possible : Conteneur GTM non publié
Dans GTM, vous devez **publier** votre conteneur pour qu'il soit actif.

1. Allez sur https://tagmanager.google.com
2. Sélectionnez votre conteneur
3. Cliquez sur **Submit** (en haut à droite)
4. Ajoutez un nom de version
5. Cliquez sur **Publish**

---

## 🔍 Debugging avancé

### Vérifier les variables d'environnement côté build

Créez une route de test temporaire :

```typescript
// src/app/api/check-env/route.ts
export async function GET() {
  return Response.json({
    GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    has_GTM: !!process.env.NEXT_PUBLIC_GTM_ID,
    all_public_vars: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
  })
}
```

Puis accédez à : `https://artichaud-studio.com/api/check-env`

✅ Si vous voyez `{"GTM_ID": "GTM-XXXXXXX"}` : **La variable est bien configurée**
❌ Si vous voyez `{"GTM_ID": null}` : **La variable n'est pas accessible**

⚠️ **N'oubliez pas de supprimer cette route après vérification** (elle expose vos IDs publics).

---

## 📊 Vérifier la collecte de données dans GTM

Une fois GTM bien chargé, vérifiez que les données remontent :

1. Allez sur https://tagmanager.google.com
2. Sélectionnez votre conteneur
3. Cliquez sur **Preview**
4. Naviguez sur votre site
5. Vérifiez les événements dans le panneau de gauche :
   - `Page View` (obligatoire)
   - `Click` (si configuré)
   - Vos événements personnalisés

6. Allez dans Google Analytics (si connecté à GTM)
7. **Realtime** > **Overview**
8. Vous devriez voir votre visite en temps réel

---

## 📝 Checklist complète

- [ ] Variable nommée `NEXT_PUBLIC_GTM_ID` (avec le préfixe)
- [ ] Valeur au format `GTM-XXXXXXX` (correct)
- [ ] Cochée pour Production, Preview ET Development
- [ ] Application redéployée après modification
- [ ] Code source montre `googletagmanager.com/gtm.js`
- [ ] `window.dataLayer` existe dans la console
- [ ] Preview Mode GTM détecte le site
- [ ] Événements visibles dans GTM Preview
- [ ] Données visibles dans Google Analytics Realtime
- [ ] Conteneur GTM publié (pas en mode brouillon)

---

## 💡 Bonnes pratiques

### 1. Testez en local d'abord

Créez un fichier `.env.local` :
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Puis lancez en local :
```bash
npm run dev
```

Ouvrez http://localhost:3000 et vérifiez que GTM se charge.

### 2. Utilisez différents conteneurs par environnement

```bash
# Production
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Staging/Preview
NEXT_PUBLIC_GTM_ID=GTM-YYYYYYY

# Development
NEXT_PUBLIC_GTM_ID=GTM-ZZZZZZZ
```

Ainsi vous ne polluerez pas vos stats de production avec des tests.

### 3. Surveillez les erreurs GTM

Dans GTM, activez le **Debug Mode** et surveillez :
- Tags qui ne se déclenchent pas
- Erreurs JavaScript
- Variables undefined

---

## 🚀 Si tout est OK mais pas de données

### Cas 1 : Les données mettent du temps à apparaître

Google Analytics peut avoir jusqu'à **24-48h de latence** pour les rapports standards.

✅ Utilisez **Realtime** pour voir les données immédiatement.

### Cas 2 : Problème de filtre ou de vue GA4

Si GTM envoie bien les données mais vous ne les voyez pas dans GA4 :

1. Vérifiez que votre propriété GA4 est bien connectée à GTM
2. Vérifiez qu'il n'y a pas de filtre bloquant (IP, domaine)
3. Vérifiez les paramètres de collecte de données

---

## 📞 Support

Si après toutes ces étapes le problème persiste :

1. Vérifiez les logs Vercel : https://vercel.com/[projet]/logs
2. Vérifiez la console du navigateur (F12) pour des erreurs
3. Testez sur plusieurs navigateurs (Chrome, Firefox, Safari)
4. Testez en navigation privée (pour éviter les bloqueurs de pubs)

---

**Dernière mise à jour** : Janvier 2026
**Version du guide** : 1.0
