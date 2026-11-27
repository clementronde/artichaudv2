---
tags: [skill, prompt, video, outil]
maj: 2026-11-27
---

# Skill `/video-maquette`

Une commande Claude Code qui produit une vidéo de site **dans la même qualité que la vidéo AquaPure** : vrai site filmé image par image, fondus doux, étiquettes, sons d'interface, fins studio / client, formats 16:9 · 9:16 · 4:5.

- Fichier du skill : `.claude/skills/video-maquette/SKILL.md` (à la racine du dépôt `artichaudv2`)
- Boîte à outils : dossier `video/` du même dépôt (moteur de capture, détecteur d'à-coups, sons, briques de montage)
- Savoir-faire : [[Compétences — vidéo de maquette]]

## Utiliser la commande dans un autre projet (ex. le site du gîte)

Claude Code charge les skills du dossier `.claude/skills/` **du projet ouvert**. Pour l'avoir dans un autre dépôt :

1. Copier le dossier `.claude/skills/video-maquette/` de `artichaudv2` dans le dépôt du gîte (même chemin), commit.
2. Dans une session sur ce dépôt, taper :

```
/video-maquette site du gîte, formats 16:9 et 9:16, fins studio et client
```

Le skill va chercher la boîte à outils dans `clementronde/artichaudv2` (dossier `video/`) : la session doit avoir accès à ce dépôt (l'ajouter comme dépôt de la session si besoin).

> Variante sans copie : sur un poste où Claude Code tourne en local, placer le dossier dans `~/.claude/skills/video-maquette/` pour l'avoir dans **tous** les projets.

## Prompt équivalent (si la commande n'est pas disponible)

À coller tel quel dans une session :

```
Réalise la vidéo de présentation de ce site dans la qualité Artichaud Studio, en suivant
.claude/skills/video-maquette/SKILL.md du dépôt clementronde/artichaudv2 (méthode, boîte à outils video/,
règles de capture et de montage, vérifications). Formats : 16:9 et 9:16. Fins : studio et client.
Commence par le brief (formats, fins, son, textes provisoires), puis montre-moi le storyboard.
```

## Ce que le skill garantit

| Étape | Garantie |
|---|---|
| Capture | Horloge simulée, transitions CSS pilotées (y compris interrompues), scroll au pixel, 2× pour les zooms |
| Raccords | Même instant d'horloge, même position de scroll, même caméra |
| Montage | Fondus doux 0,4 s, rythme fixé à la capture (lecture ×1), zones de sécurité par format |
| Contrôle | Planches, images fixes, `judder.py` (0 saut), niveau sonore |
| Livraison | Vault (médias + fiche projet + compétences), fichiers envoyés, commit |

Liens : [[Compétences — vidéo de maquette]] · [[AquaPure — vidéo maquette]] · [[Comparatif des outils]]
