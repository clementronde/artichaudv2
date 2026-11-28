#!/usr/bin/env python3
"""Table `files` de l'outil Artifact pour un dossier d'aperçu produit par make-preview.sh.

    python3 -I preview-files.py <dossier-apercu> [liste-precedente.txt]

Écrit <dossier-apercu>/files-list.txt (liste des fichiers publiés) et affiche le JSON à passer en `files`,
avec `root` = <dossier-apercu>. Avec la liste de la publication précédente, les fichiers disparus sont mis à
null (supprimés) : les noms des bundles Next changent à chaque build.
"""
import json
import os
import sys

if len(sys.argv) < 2:
    sys.exit(__doc__)
root = sys.argv[1]
files = sorted(
    os.path.relpath(os.path.join(d, f), root)
    for d, _, fs in os.walk(os.path.join(root, "site"))
    for f in fs
)
mapping = {p: p for p in files}
if len(sys.argv) > 2 and os.path.exists(sys.argv[2]):
    old = set(open(sys.argv[2]).read().split())
    for p in sorted(old - set(files)):
        mapping[p] = None
open(os.path.join(root, "files-list.txt"), "w").write("\n".join(files) + "\n")
print(json.dumps(mapping, ensure_ascii=False))
print(f"\n{len(files)} fichiers, {sum(v is None for v in mapping.values())} à supprimer", file=sys.stderr)
