---
tags: [outil, integration, livraison]
maj: 2026-11-28
---

# Aperçu en ligne d'un site

Deux façons de montrer un site en cours à un client. Procédure suivie par [[Skill artichaud-maquette]] à la fin de chaque intégration.

## 1. Aperçu immédiat (Artifact claude.ai, lien privé)

Pratique pour faire valider pendant la session, sans serveur.

1. Export statique : `bash scripts/make-preview.sh <dossier-du-site> <dossier-apercu>`. Le script :
   - lance `STATIC_EXPORT=1 next build` (sortie `out/`, `assetPrefix: "."`, images non optimisées) ;
   - copie l'export dans `<dossier-apercu>/site/` et rend relatifs les chemins `/images/…` (HTML, charge RSC, JS) ;
   - échappe le caractère U+FFFD présent dans React (le publieur refuse les fichiers qui le contiennent) ;
   - écrit la page d'entrée `<dossier-apercu>/index.html`, qui redirige vers `site/index.html`.
2. `python3 scripts/preview-files.py <dossier-apercu> [liste-précédente.txt]` → la table `files` à passer à l'outil Artifact (et, avec la liste précédente, les fichiers à supprimer avec `null`).
3. Charger le skill `artifact-design`, puis publier `index.html` avec `root = <dossier-apercu>` et la table `files`. Republier sur le même chemin pour mettre à jour le même lien.

Pourquoi une page d'entrée : la page principale d'un Artifact est enveloppée dans un squelette HTML, ce qui casse l'hydratation de Next ; les autres fichiers HTML sont servis tels quels.

Limites : lien **privé** par défaut (le client ne le voit qu'après partage via le menu Share de l'Artifact) ; liens `mailto:` et `tel:` peu fiables pour les visiteurs extérieurs.

## 2. Vraie adresse publique (Vercel)

1. vercel.com → **Add New → Project** → importer `clementronde/artichaudv2`.
2. **Root Directory** = le dossier du site (`chezsophie`, `aquapure`…), puis Deploy.
3. Chaque push sur la branche donne une URL d'aperçu ; la fusion dans `main` donne la production. Brancher ensuite le nom de domaine du client.

Liens : [[Skill artichaud-maquette]] · [[Comparaison pixel avec Figma]]
