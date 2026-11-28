#!/usr/bin/env python3
"""Comparaison section par section entre l'export Figma et la capture du site.

    python3 -I compare.py <figma.png> <site.png> '<sections JSON>' <dossier-sortie> [seuil]

sections : {"nom": [y_figma, y_site, hauteur], ...} (pixels à l'échelle 1, largeur commune).
Pour chaque section : % de pixels dont l'écart dépasse le seuil (40/255 par défaut), et dans le dossier de sortie
cmp-<nom>.png (côte à côte), blend-<nom>.png (superposition à 50 %), diff-<nom>.png (masque des différences).
Objectif : moins de 2 % par section. Un texte dédoublé dans la superposition = un décalage à corriger.
"""
import json
import os
import sys

from PIL import Image, ImageChops

if len(sys.argv) < 5:
    sys.exit(__doc__)
figma_path, site_path, sections_json, out_dir = sys.argv[1:5]
threshold = int(sys.argv[5]) if len(sys.argv) > 5 else 40
os.makedirs(out_dir, exist_ok=True)

figma = Image.open(figma_path).convert("RGB")
site = Image.open(site_path).convert("RGB")
width = min(figma.width, site.width)
results = []
for name, (fy, sy, h) in json.loads(sections_json).items():
    a = figma.crop((0, fy, width, fy + h))
    b = site.crop((0, sy, width, sy + h))
    diff = ImageChops.difference(a, b).convert("L")
    hist = diff.histogram()
    pct = 100 * sum(hist[threshold:]) / max(1, sum(hist))
    side = Image.new("RGB", (width * 2 + 10, h), "red")
    side.paste(a, (0, 0))
    side.paste(b, (width + 10, 0))
    side.save(os.path.join(out_dir, f"cmp-{name}.png"))
    Image.blend(a, b, 0.5).save(os.path.join(out_dir, f"blend-{name}.png"))
    diff.point(lambda v: 255 if v > threshold else 0).save(os.path.join(out_dir, f"diff-{name}.png"))
    results.append((name, pct))

for name, pct in results:
    print(f"{name:<14} {pct:6.2f} %  {'OK' if pct < 2 else 'À CORRIGER'}")
