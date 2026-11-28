---
tags: [accueil, motion, integration, vault]
maj: 2026-11-28
---

# Vault Motion — Artichaud

Base de références pour un exercice précis : **transformer une maquette ou un site en vidéo animée** (réseaux sociaux, showreel du studio). On y range des exemples de vidéos, des sites dont le motion design est remarquable, les outils pour produire ces vidéos, et la méthode qu'on applique.

Il sert aussi au second métier du studio : **intégrer au pixel près une maquette Figma en site vitrine** (audit, animations, SEO, comparaison chiffrée avec Figma), avec la commande `/artichaud-maquette`.

S'ouvre tel quel dans [Obsidian](https://obsidian.md) (« Ouvrir un dossier comme coffre » → `artichaud/`), mais tout est en Markdown simple, lisible partout.

## Par où commencer

| Je veux… | Aller à |
|---|---|
| Comprendre ce qui fait une bonne vidéo de maquette | [[Principes du motion de maquette]] |
| Connaître les formats Reels / TikTok / LinkedIn / showreel | [[Formats réseaux sociaux]] |
| Choisir un outil (code ou no-code) | [[Comparatif des outils]] |
| Trouver de l'inspiration site | [[Galeries d'inspiration]], [[Studios de référence]], [[Sites remarquables]] |
| Trouver de l'inspiration vidéo | [[Vidéos de maquette et showreels]] |
| Ajouter une référence | dupliquer [[Fiche référence]] (dans `_modeles/`) |
| Voir le projet en cours | [[AquaPure — vidéo maquette]] |
| Vérifier une vidéo avant publication | [[Checklist vidéo]] |
| Savoir ce qu'on a appris (pièges, solutions) | [[Compétences — vidéo de maquette]] |
| Produire une nouvelle vidéo de site (commande `/video-maquette`) | [[Skill video-maquette]] |
| Intégrer une maquette Figma au pixel près (commande `/artichaud-maquette`) | [[Skill artichaud-maquette]] |
| Auditer une maquette avant de coder (polices, grille, couleurs…) | [[Audit de maquette]] |
| Choisir les animations d'un site client | [[Animations de site vitrine]] |
| Faire la critique SEO d'un site vitrine | [[Critique SEO d'un site vitrine]] |
| Vérifier un site contre Figma, le mettre en ligne | [[Comparaison pixel avec Figma]], [[Aperçu en ligne d'un site]] |
| Savoir ce qu'on a appris en intégration | [[Compétences — intégration pixel perfect]] |
| Voir un site intégré de référence | [[Chez Sophie — site gîte]] |

## Arborescence

```
artichaud/
├── README.md                  ← cette page
├── 01-Methode/                ← principes, formats, checklist, audit, animations, SEO
├── 02-Outils/                 ← Remotion, HyperFrames, capture, comparaison Figma, aperçu…
├── 03-References-sites/       ← galeries, studios, sites remarquables
├── 04-References-videos/      ← exemples de vidéos de maquette / showreels
├── 05-Projets/                ← une fiche par vidéo ou site produit
├── 06-Competences/            ← savoir-faire acquis, projet après projet
├── 07-Skills/                 ← commandes Claude Code et prompts prêts à l'emploi
├── _modeles/                  ← modèles de fiches (référence, projet vidéo, audit de maquette)
├── _a-trier.md                ← boîte de réception : coller un lien vite fait
└── medias/
    ├── videos/                ← exemples vidéo (voir medias/README.md)
    └── captures/              ← captures d'écran, GIF, images fixes
```

## Règles du vault

1. **Une référence = une raison.** On ne colle pas un lien sans écrire *pourquoi* il est là (la technique, le timing, l'idée de transition à reprendre).
2. **On cite la source.** Chaque fiche garde le lien d'origine et l'auteur (studio, designer). Les vidéos d'autres studios restent la propriété de leurs auteurs : on les garde pour étude interne, on ne les republie pas.
3. **On marque ce qui n'est pas vérifié.** Une info lue dans un article tiers porte la mention *(à vérifier)* tant que personne ne l'a constatée soi-même.
4. **Tags communs** : `#transition`, `#typo-animee`, `#scroll`, `#device-mockup`, `#3d`, `#rythme`, `#son`, `#9x16`, `#16x9`, `#a-reproduire`.

## Pour l'entraînement

Chaque vidéo produite a sa fiche dans `05-Projets/` : brief, storyboard, ce qui a marché, ce qu'on corrigerait. Avant une nouvelle vidéo, relire les fiches marquées `#a-reproduire` et les retours des projets précédents.
