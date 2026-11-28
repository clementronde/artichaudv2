---
tags: [skill, prompt, integration, figma, outil]
maj: 2026-11-28
---

# Skill `/artichaud-maquette`

Une commande Claude Code qui transforme une maquette Figma en site vitrine **au pixel près**, dans la qualité du site [[Chez Sophie — site gîte]] : audit de la maquette avant tout code, site Next.js + Tailwind + GSAP, comparaison chiffrée avec Figma, critique SEO, aperçu en ligne.

- Fichier du skill : `.claude/skills/artichaud-maquette/SKILL.md` (à la racine du dépôt `artichaudv2`)
- Boîte à outils (dans le même dossier) : `template/` (socle du site), `scripts/` (capture, comparaison, aperçu en ligne)
- Savoir-faire : [[Compétences — intégration pixel perfect]]

## Utilisation

Dans une session Claude Code ouverte sur `artichaudv2` :

```
/artichaud-maquette https://www.figma.com/design/XXXX/Landing?node-id=1-4 Gîte dans le Perche, client Sophie Martin, mots-clés : gîte avec piscine Perche, location vacances Orne. Polices jointes. Même style que le site du plombier.
```

Le lien Figma est obligatoire ; tout le reste est en notes libres : client, métier, ville, mots-clés visés, ton, site de référence, fichiers joints (polices). Le skill crée le dossier `<slug>/` du site et sa fiche `AUDIT.md`.

> Dans un autre dépôt : copier le dossier `.claude/skills/artichaud-maquette/` au même chemin (il contient sa boîte à outils). Les notes du vault se lisent depuis `clementronde/artichaudv2` (ajouter le dépôt à la session si besoin). En local, `~/.claude/skills/artichaud-maquette/` le rend disponible dans tous les projets.

## Prompt équivalent (si la commande n'est pas disponible)

```
Intègre au pixel près la maquette <lien Figma> en suivant .claude/skills/artichaud-maquette/SKILL.md du dépôt
clementronde/artichaudv2 (audit d'abord : polices, alignements, couleurs, animations, responsive, critique SEO
et mots-clés ; puis construction, comparaison chiffrée avec Figma, corrections, aperçu en ligne).
Notes : <client, métier, ville, mots-clés, polices…>
```

## Ce que le skill garantit

| Étape | Garantie |
|---|---|
| Audit | `AUDIT.md` : polices (source, licence, métriques), grille et alignements, couleurs, assets, animations par section, plan responsive, critique SEO et mots-clés ([[Audit de maquette]], [[Critique SEO d'un site vitrine]]) |
| Construction | Projet Next autonome, tokens de la maquette, polices auto-hébergées, images compressées, animations par attributs ([[Animations de site vitrine]]), SEO de base (metadata, JSON-LD, sitemap) |
| Contrôle | Moins de 2 % de pixels différents par section à la largeur de la maquette, états animés comparés aux variantes Figma, responsive de 390 à 1920 px sans défilement horizontal ([[Comparaison pixel avec Figma]]) |
| Livraison | Aperçu en ligne ([[Aperçu en ligne d'un site]]), commit et push, rapport avec écarts, corrections, SEO et points à fournir |
| Vault | Fiche projet dans `05-Projets/`, nouveaux pièges ajoutés à [[Compétences — intégration pixel perfect]] |

Liens : [[Compétences — intégration pixel perfect]] · [[Chez Sophie — site gîte]] · [[Skill video-maquette]]
