# 🚨 ACTIONS IMMÉDIATES POUR CORRIGER GTM

## 📋 Résumé du problème

Vous avez configuré GTM dans Vercel, collecté des données pendant 2 jours, puis plus rien.

**Cause la plus probable** : La variable d'environnement n'est pas correctement nommée ou configurée dans Vercel.

---

## ✅ SOLUTION EN 5 ÉTAPES (10 minutes)

### **Étape 1 : Vérifier le nom de la variable dans Vercel** ⏱️ 2 min

1. Allez sur https://vercel.com
2. Sélectionnez votre projet **artichaudv2**
3. Allez dans **Settings** → **Environment Variables**
4. Cherchez votre variable GTM

**Question** : Comment s'appelle-t-elle ?

❌ **Si elle s'appelle** `GTM_ID` → **C'EST LE PROBLÈME !**
✅ **Elle doit s'appeler** `NEXT_PUBLIC_GTM_ID`

---

### **Étape 2 : Corriger la variable** ⏱️ 3 min

#### Si votre variable s'appelle `GTM_ID` (sans `NEXT_PUBLIC_`) :

1. **Supprimez** l'ancienne variable `GTM_ID`
2. **Créez** une nouvelle variable avec :
   - **Name** : `NEXT_PUBLIC_GTM_ID`
   - **Value** : `GTM-XXXXXXX` (votre ID GTM actuel)
   - **Environments** : Cochez les 3 cases ✅
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. Cliquez sur **Save**

#### Si votre variable s'appelle déjà `NEXT_PUBLIC_GTM_ID` :

1. Vérifiez que la **valeur** est correcte : `GTM-XXXXXXX` (commence par `GTM-`)
2. Vérifiez que **les 3 environnements sont cochés**
3. Si c'est bon, passez à l'étape 3

---

### **Étape 3 : Redéployer l'application** ⏱️ 2 min

**CRITIQUE** : Les variables d'environnement sont injectées au **build**.
Si vous ne redéployez pas, les changements ne prendront pas effet !

#### Option A : Via Vercel (recommandé)

1. Allez dans **Deployments**
2. Cliquez sur le dernier déploiement (en haut)
3. Cliquez sur le bouton **︙** (3 points verticaux)
4. Cliquez sur **Redeploy**
5. Confirmez en cliquant sur **Redeploy** dans la popup

#### Option B : Via Git Push

```bash
git add .
git commit -m "fix: configure GTM environment variable"
git push origin claude/fix-gtm-data-collection-SkP3j
```

---

### **Étape 4 : Vérifier que GTM est chargé** ⏱️ 2 min

Attendez que le déploiement soit terminé (1-2 minutes), puis :

#### Test 1 : Via l'API de diagnostic

1. Allez sur : https://artichaud-studio.com/api/check-gtm
2. Vous devriez voir :

```json
{
  "gtm": {
    "configured": true,
    "value": "GTM-XXXXXXX",
    "isValid": true
  },
  "diagnostics": {
    "gtmWillLoad": true
  },
  "recommendations": [
    "✅ GTM is correctly configured!"
  ]
}
```

✅ **Si vous voyez ça : C'EST BON !**
❌ **Si `configured: false`** : La variable n'est toujours pas accessible

#### Test 2 : Dans le code source

1. Allez sur https://artichaud-studio.com
2. Clic droit → **Afficher le code source de la page** (ou Ctrl+U)
3. Faites Ctrl+F et cherchez `googletagmanager`
4. Vous devriez voir :

```html
<script src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX" async=""></script>
```

✅ **Si vous voyez ça : GTM est chargé !**

#### Test 3 : Dans la console du navigateur

1. Ouvrez la console (F12)
2. Tapez dans la console :

```javascript
window.dataLayer
```

3. Appuyez sur Entrée

✅ **Vous devriez voir un tableau avec des événements**
❌ **Si `undefined`** : GTM n'est pas chargé

---

### **Étape 5 : Vérifier les données dans GTM** ⏱️ 1 min

1. Allez sur https://tagmanager.google.com
2. Sélectionnez votre conteneur
3. Cliquez sur **Preview** (en haut à droite)
4. Entrez l'URL : `https://artichaud-studio.com`
5. Cliquez sur **Connect**
6. Naviguez sur votre site dans l'onglet qui s'ouvre
7. Revenez sur l'onglet GTM Preview
8. Vous devriez voir les événements défiler en temps réel

✅ **Si vous voyez des événements : TOUT FONCTIONNE !**

---

## 🎉 Si tout fonctionne

**Félicitations !** Votre GTM collecte à nouveau des données.

### Vérifications finales :

- [ ] `window.dataLayer` existe dans la console
- [ ] Le script GTM apparaît dans le code source
- [ ] Les événements apparaissent dans GTM Preview Mode
- [ ] Les données remontent dans Google Analytics (si connecté)

### Nettoyage (optionnel) :

Vous pouvez maintenant supprimer la route de diagnostic (elle n'est plus nécessaire) :

```bash
rm -rf src/app/api/check-gtm
git add .
git commit -m "chore: remove GTM diagnostic route"
git push origin claude/fix-gtm-data-collection-SkP3j
```

---

## ❌ Si ça ne fonctionne toujours pas

### Problème : Variable toujours à `null` après redéploiement

**Cause** : Ancien build en cache

**Solution** :
1. Retournez dans Vercel > **Settings** > **Environment Variables**
2. **Modifiez** légèrement la variable (ajoutez un espace puis supprimez-le)
3. Sauvegardez
4. Forcez un nouveau build en ajoutant `?nocache=1` à l'URL de redeploy

### Problème : GTM se charge mais pas de données dans Analytics

**Causes possibles** :
1. **Conteneur GTM non publié** :
   - Allez sur https://tagmanager.google.com
   - Vérifiez qu'une version est publiée (pas en mode brouillon)
   - Si besoin, cliquez sur **Submit** → **Publish**

2. **Tags non configurés dans GTM** :
   - Vérifiez que vous avez bien des tags configurés
   - Vérifiez que les triggers sont corrects (ex: "All Pages" pour le Page View)

3. **Connexion GA4 manquante** :
   - Dans GTM, vérifiez que votre tag GA4 a le bon Measurement ID
   - Vérifiez dans GA4 que les données arrivent (Realtime)

### Problème : Script bloqué par ad blocker

**Test** :
1. Ouvrez votre site en **navigation privée**
2. Désactivez temporairement votre bloqueur de pub
3. Vérifiez à nouveau

---

## 📞 Besoin d'aide supplémentaire ?

Si après toutes ces étapes le problème persiste, consultez :

1. **Le guide complet** : `GTM_TROUBLESHOOTING.md`
2. **Les logs Vercel** : https://vercel.com/[votre-projet]/logs
3. **La console du navigateur** : Recherchez les erreurs en rouge

---

## 📚 Fichiers créés pour vous aider

- `GTM_TROUBLESHOOTING.md` : Guide complet de dépannage
- `.env.example` : Exemple de configuration des variables
- `src/app/api/check-gtm/route.ts` : API de diagnostic
- `src/components/analytics/GTMDebug.tsx` : Debug dans la console

---

## 🎯 Récapitulatif des changements effectués

✅ Ajout d'un composant de debug GTM (logs dans console en dev)
✅ Création d'une route API de diagnostic (`/api/check-gtm`)
✅ Documentation complète du problème et des solutions
✅ Guide pas à pas pour corriger la configuration

**Prochaine étape** : Suivez les 5 étapes ci-dessus ! 🚀

---

**Dernière mise à jour** : {{ date }}
**Temps estimé** : 10 minutes
**Difficulté** : Facile ⭐
