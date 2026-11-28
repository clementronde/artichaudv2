---
tags: [methode, formats, 9x16, 16x9]
maj: 2026-11-26
---

# Formats réseaux sociaux

> Les plateformes changent souvent leurs règles. Les chiffres ci-dessous viennent de guides tiers relevés en novembre 2026 : **vérifier dans l'app ou l'aide officielle avant chaque livraison**.

## Tableau de travail

| Usage | Ratio | Résolution d'export | Durée visée | Remarque |
|---|---|---|---|---|
| Instagram Reels / TikTok / YouTube Shorts | 9:16 | 1080 × 1920 | 15–30 s | Format principal pour les réseaux |
| Post carré / carrousel vidéo | 1:1 | 1080 × 1080 | 10–20 s | Encore utile sur LinkedIn et dans le fil Instagram |
| Post vertical fil Instagram / LinkedIn | 4:5 | 1080 × 1350 | 10–30 s | Occupe plus de place dans le fil que le carré |
| Showreel / site / Behance | 16:9 | 1920 × 1080 (ou 3840 × 2160) | 30–90 s | Format du showreel studio |

Encodage conseillé : MP4 H.264, 30 ou 60 i/s constants, son AAC 48 kHz. Garder un master en haute qualité (ProRes ou H.264 haut débit) et exporter les versions réseaux à partir de lui.

## Reels Instagram (relevé)

- Cadre **1080 × 1920, 9:16** : consensus des guides. ([invideo](https://invideo.io/blog/instagram-reel-size-guide/), [Hootsuite](https://blog.hootsuite.com/instagram-video-size/))
- Durée : la plupart des guides 2026 indiquent **3 min maximum** pour un Reel standard ; les limites d'enregistrement dans l'app varient selon les comptes. *(à vérifier sur le compte du studio)* ([Quso](https://quso.ai/blog/instagram-reel-dimensions))
- **Zone de sécurité** (recommandation la plus courante dans les guides tiers) : garder l'essentiel dans un rectangle central d'environ **1080 × 1420** ; éviter les **210 px du haut**, les **290 px du bas** (légende, boutons) et les **60 px de droite** (boutons d'action). ([PostSyncer](https://postsyncer.com/tips/instagram-reels-size-and-safe-areas))
- Une analyse des pages d'aide de Meta donne des marges plus prudentes : au moins **14 % en haut, 35 % en bas et 6 % sur les côtés** sans texte ni logo. ([Sirency](https://www.sirency.com/blog/instagram-reels-safe-zone)) → c'est la règle qu'on applique par défaut, la plus sûre.

## Règle Artichaud pour le 9:16

```
┌──────────────┐  0
│   (haut)     │  ← 14 % ≈ 270 px : rien d'important
│──────────────│
│              │
│  ZONE UTILE  │  ← titres, CTA, logo, visuel clé
│              │
│──────────────│
│  (légende +  │  ← 35 % ≈ 670 px : visuel de fond seulement
│   boutons)   │
└──────────────┘  1920
  6 % (65 px) de marge à gauche et à droite
```

Dans le projet vidéo, prévoir un **calque guide** (désactivé au rendu) qui dessine ces zones.

Liens : [[Principes du motion de maquette]] · [[Checklist vidéo]]
