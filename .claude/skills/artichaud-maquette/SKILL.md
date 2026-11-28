---
name: artichaud-maquette
description: Intègre au pixel près un site vitrine Artichaud Studio à partir d'une maquette Figma (lien + notes). Audit préalable obligatoire (polices, grille et alignements, couleurs, assets, animations possibles, responsive, critique SEO et mots-clés ciblés), puis site Next.js + Tailwind + GSAP autonome dans le dépôt, comparaison chiffrée section par section avec Figma, corrections, aperçu en ligne, fiche projet dans le vault. À utiliser dès qu'un lien Figma de site ou de landing client est fourni pour intégration. Usage : /artichaud-maquette <lien Figma> [notes]
argument-hint: <lien Figma> [notes : client, métier, ville, mots-clés, ton, fichiers joints…]
---

# Artichaud — maquette Figma → site pixel perfect

Entrées : `$ARGUMENTS` — un lien Figma (obligatoire) suivi de notes libres (client, métier, zone géographique,
mots-clés visés, ton, contraintes, fichiers joints comme des polices). Sans lien Figma, demander le lien et s'arrêter.

Livrables, dans cet ordre :
1. `<slug>/AUDIT.md` : l'audit de la maquette (polices, grille, couleurs, assets, animations, responsive, SEO).
2. `<slug>/` : un projet Next.js autonome dans le dépôt, conforme à la maquette au pixel près à sa largeur de cadre.
3. Un tableau de comparaison chiffrée avec Figma, et la liste de ce qui a été corrigé.
4. Un aperçu en ligne (lien privé) et le code poussé sur la branche de travail.

Lis d'abord, dans le vault Artichaud (dossier `artichaud/` du dépôt `clementronde/artichaudv2`) :
- `06-Competences/Compétences — intégration pixel perfect.md` — les pièges déjà rencontrés (obligatoire) ;
- `01-Methode/Audit de maquette.md`, `Animations de site vitrine.md`, `Critique SEO d'un site vitrine.md` (étape 2) ;
- `02-Outils/Comparaison pixel avec Figma.md` (étape 4) et `Aperçu en ligne d'un site.md` (étape 5) ;
- les fiches de `05-Projets/` marquées `#a-reproduire` (ex. `Chez Sophie — site gîte.md`).

Si `artichaud/` n'est pas dans la copie de travail (branche non fusionnée), lire ces notes sur GitHub
(`git fetch origin <branche>` puis `git show origin/<branche>:"artichaud/…"`, en cherchant la branche qui contient le
dossier). Le socle de code est dans `template/` et les outils dans `scripts/`, à côté de ce fichier.

Références d'implémentation dans le dépôt : `chezsophie/` (gîte, référence la plus complète) et le site AquaPure
(plombier, dossier `aquapure/`).

## 1. Lire la maquette

1. Analyser l'URL : `figma.com/design/<fileKey>/<nom>?node-id=<a>-<b>` → `fileKey`, `nodeId = a:b`.
2. Charger le skill `figma:figma-design-to-code` (obligatoire avant `get_design_context`), puis `create_session`.
3. `get_metadata` sur le nœud : repérer le cadre de page (sa largeur = **largeur de référence**, souvent 1440 ou 1512),
   les sections et leurs `y`, et les cadres **hors page** (variantes d'une même section = états d'une animation,
   ex. chapitres 01/02/03 ; éléments posés à `x` négatif ou au-delà du cadre = carrousel ou débordement voulu).
4. `get_screenshot` du cadre entier avec `maxDimension` = hauteur du cadre, l'enregistrer dans le scratchpad
   (`figma/full.png`), puis le découper en tranches d'environ 1100 px pour le regarder en entier.
5. `get_design_context` section par section (`excludeScreenshot: true`, `skillNames: "figma-design-to-code"`),
   plus le cadre complet une fois : il donne les positions relatives et l'ordre d'empilement (z-index) des décors.
   Faire aussi `get_design_context` sur chaque variante hors page et chaque illustration décorative isolée.
6. `get_variable_defs` sur le cadre : les couleurs et styles nommés.
7. Télécharger **tout de suite** chaque asset (`curl -sf -L -o`) dans `<slug>/public/images/` : les URL expirent.
   Vérifier le vrai format avec `file` (des « .png » sont souvent des JPEG), repérer les doublons avec `md5sum`.

## 2. Auditer avant de coder

Remplir `<slug>/AUDIT.md` à partir du modèle `artichaud/_modeles/Fiche audit maquette.md`, en suivant la grille de
`Audit de maquette`, puis montrer à l'utilisateur un résumé court.
L'audit couvre obligatoirement :

- **Polices** : familles, graisses, tailles, interlignages, approche, axes variables (taille optique !), source
  (Google Fonts, fichiers fournis, licence payante), et leurs métriques (USE_TYPO_METRICS, voir les compétences).
- **Grille et alignements** : largeur de référence, marges latérales, colonnes et gouttières, espacement vertical
  entre sections, alignements récurrents (x communs), éléments volontairement hors grille.
- **Couleurs** : variables Figma, valeurs réellement rendues (échantillonner le screenshot avec PIL), noms de tokens.
- **Assets** : liste, rôle, recadrages (`object-position` à calculer), décors SVG et leur position exacte.
- **Animations possibles** : par section, adaptées au métier du client et aux indices de
  la maquette (variantes, débordements, numérotation), d'après `Animations de site vitrine`. Toujours une version sans
  animation (mouvement réduit).
- **Responsive** : comportement prévu de chaque section à 390, 768, 1024, 1280, la largeur de référence et 1920 px.
- **Critique SEO** : type de site, intention de recherche, mots-clés ciblés (principal, secondaires, locaux, longue
  traîne), critique du contenu de la maquette (H1, hiérarchie, volume de texte, lorem ipsum, CTA, NAP), ce qui sera
  implémenté et ce qui reste à faire par le client (`Critique SEO d'un site vitrine`).
- **Risques et questions** : licences de polices, contenu manquant, coquilles de la maquette, liens sans cible.

Continuer sans attendre de validation, sauf blocage réel : une police payante absente sans équivalent gratuit
acceptable, ou une maquette incomplète au point de ne pas savoir quoi construire. Dans ce cas, poser la question.

## 3. Construire

1. `<slug>` = nom court du client en minuscules (`chezsophie`, `aquapure`). Copier `template/` vers `<slug>/`,
   remplacer les `__PLACEHOLDERS__` (nom, métadonnées, couleurs, polices), `npm install`.
2. Ajouter `<slug>` aux exclusions du site principal : `"exclude"` de `tsconfig.json` et `globalIgnores` de
   `eslint.config.mjs` à la racine (sinon le build du site Artichaud échoue).
3. **Polices** : OTF/TTF fournis → woff2 avec fontTools (`python3 -I`, `t.flavor = "woff2"`). Google Fonts →
   récupérer le sous-ensemble latin en demandant **tous les axes utilisés** (ex. `opsz,wght@6..144,200..700`).
   Charger avec `next/font/local`. Vérifier les métriques et ajouter `declarations` d'`ascent-override` si besoin.
4. **Images** : convertir les gros rasters en JPEG qualité 82, largeur ≈ 2 × la taille affichée (PIL, LANCZOS).
   Calculer chaque recadrage Figma (`h: 215%; top: -94%`) en `object-position` (formule dans les compétences).
   Les SVG restent tels quels, utilisés à leur taille d'origine.
5. **Tokens** : couleurs et polices dans `tailwind.config.ts`, avec les noms de la maquette.
6. **Sections** : un composant par section, mise en page en flex/grid (jamais la position absolue brute de Figma,
   sauf décors). Valeurs Figma en px à la largeur de référence ; tailles de titres fluides avec un `clamp()` qui
   **atteint sa valeur max à la largeur de référence** (formule dans les compétences).
7. **Animations** : par attributs `data-*` gérés par `src/components/motion/ScrollAnimations.tsx` (liste en tête
   du fichier), plus des timelines dédiées dans les composants pour le hero et les sections épinglées. Lenis pour le
   défilement fluide. Rien d'indispensable à la lecture ne doit rester caché sans JS (filets de sécurité CSS).
8. **SEO** : `metadata` (title, description, Open Graph, `metadataBase`), un seul H1, hiérarchie H2/H3, `alt`
   descriptifs, JSON-LD adapté au métier, `sitemap.ts` et `robots.ts`. Corriger les coquilles évidentes de la
   maquette et les lister dans le rapport.

## 4. Vérifier contre Figma (obligatoire)

1. `npx next build`, puis `npx next start -p 3100` en arrière-plan (libérer le port avec `fuser -k 3100/tcp`).
2. Capture pleine page en mouvement réduit à la largeur de référence, images forcées en chargement immédiat :
   `node scripts/capture.js http://localhost:3100 <largeur> <hauteur> <sortie.png>`. Le script affiche aussi la
   position des sections : les comparer aux `y` de Figma.
3. Comparaison par section : `python3 scripts/compare.py figma/full.png <sortie.png> '<sections JSON>' <dossier>`.
   Objectif : **moins de 2 % de pixels différents par section**. Regarder chaque superposition (`blend-*.png`) :
   un texte dédoublé = un décalage ; mesurer l'élément fautif dans la page (`getBoundingClientRect`) et corriger.
4. États animés : capturer avec animations (`--motion`) en faisant défiler jusqu'aux sections épinglées, et comparer
   chaque état de repos aux cadres de variantes Figma.
5. Responsive : captures à 390 (iPhone 13), 1024, 1280, 1920 ; vérifier `scrollWidth === innerWidth` (aucun
   défilement horizontal) et la lisibilité (texte clair sur photo claire, etc.).
6. Répéter jusqu'à l'objectif. Ce qui reste (rendu du texte à ±2 px, anticrénelage) est signalé, pas masqué.

## 5. Mettre en ligne

Suivre `Aperçu en ligne d'un site` : export statique (`scripts/make-preview.sh`), publication en Artifact privé
(charger d'abord le skill `artifact-design`), puis instructions Vercel (Root Directory = `<slug>`) pour une vraie
adresse publique. Committer sur la branche de travail et pousser.

## 6. Vault

- Créer la fiche projet `artichaud/05-Projets/<Client> — site.md` (charte, sections et animations retenues, écarts
  mesurés, retours client dans l'ordre, bilan), sur le modèle de `Chez Sophie — site gîte.md`.
- Ajouter à `06-Competences/Compétences — intégration pixel perfect.md` chaque **nouveau** problème résolu
  (symptôme, cause, correction), et mettre à jour son champ `maj`.
- Si l'utilisateur fait des retours, les traiter point par point et les consigner dans la fiche projet.

## 7. Rapport final

En français, court, dans cet ordre : lien de l'aperçu ; tableau des écarts par section ; erreurs trouvées et
corrigées ; animations par section ; résumé SEO (mots-clés retenus, ce qui est fait, ce qui reste) ; « À savoir »
(licences de polices, coquilles corrigées, contenus à fournir, liens sans cible). Signaler un dépôt public si des
fichiers sous licence restrictive y sont committés.
