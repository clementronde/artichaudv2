#!/bin/bash
# Export statique d'un site du dépôt, prêt à publier en Artifact (aperçu en ligne).
#
#   bash make-preview.sh <dossier-du-site> <dossier-apercu> [titre]
#
# Produit <dossier-apercu>/index.html (page d'entrée qui redirige) et <dossier-apercu>/site/ (export Next).
# Ensuite : python3 -I preview-files.py <dossier-apercu> → table `files` pour l'outil Artifact.
set -euo pipefail
SITE_DIR=$(cd "$1" && pwd)
PREVIEW_DIR=$2
TITLE=${3:-$(basename "$SITE_DIR")}
mkdir -p "$PREVIEW_DIR"
PREVIEW_DIR=$(cd "$PREVIEW_DIR" && pwd)

cd "$SITE_DIR"
rm -rf out
STATIC_EXPORT=1 npx next build > "$PREVIEW_DIR/build.log" 2>&1 || { tail -30 "$PREVIEW_DIR/build.log"; exit 1; }

rm -rf "$PREVIEW_DIR/site" && cp -r out "$PREVIEW_DIR/site"
cd "$PREVIEW_DIR/site"
rm -rf 404.html _not-found _not-found.html _not-found.txt fonts
# Chemins absolus /images/ → relatifs (HTML, charge RSC, bundles JS)
find . -type f \( -name '*.html' -o -name '*.txt' -o -name '*.js' \) -print0 \
  | xargs -0 sed -i 's#"/images/#"./images/#g; s#\\"/images/#\\"./images/#g'
grep -rl '"/images/' . && echo "ATTENTION : chemins /images/ absolus restants" || true
# Le publieur refuse le caractère U+FFFD littéral (présent dans React) : on l'échappe, identique en JS
python3 -I - <<'PY'
import glob
for f in glob.glob('_next/static/chunks/*.js'):
    s = open(f, encoding='utf-8').read()
    if '�' in s:
        open(f, 'w', encoding='utf-8').write(s.replace('�', '\\uFFFD'))
        print('U+FFFD échappé :', f)
PY

# Page d'entrée : la page principale d'un Artifact est enveloppée dans un squelette (ce qui casse l'hydratation
# de Next) ; les autres fichiers HTML sont servis tels quels, d'où la redirection vers site/index.html.
cat > "$PREVIEW_DIR/index.html" <<HTML
<title>$TITLE</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>
  :root { --bg: #111111; --fg: #fafafa; --accent: #fafafa; color-scheme: dark; }
  body {
    background: var(--bg); color: var(--fg); margin: 0; min-height: 100vh;
    display: grid; place-items: center; text-align: center;
    font: 300 18px/1.5 Georgia, "Times New Roman", serif;
    padding-left: max(16px, env(safe-area-inset-left, 0px));
    padding-right: max(16px, env(safe-area-inset-right, 0px));
  }
  h1 { font-weight: 300; font-size: 44px; line-height: 1; margin: 0 0 16px; }
  a { color: var(--accent); }
</style>
<main>
  <h1>$TITLE</h1>
  <p><a href="site/index.html">Ouvrir l’aperçu du site</a></p>
</main>
<script>location.replace("site/index.html");</script>
HTML
du -sh "$PREVIEW_DIR/site" | sed 's/^/taille : /'
echo "aperçu prêt : $PREVIEW_DIR"
