"""
Détecteur d'à-coups d'un rendu : python3 capture/judder.py <video.mp4>

Repère, image par image, les images « répétées » au milieu d'un mouvement (écart quasi nul alors que
les images voisines bougent) et les « sauts » (écart bien plus fort que les voisines). C'est ce que
produit une lecture à vitesse non entière ; une vidéo propre n'en a aucun en dehors des raccords.
"""
import os, subprocess, sys, tempfile, glob, statistics
from PIL import Image, ImageChops, ImageStat

video = sys.argv[1]
fps = 60
tmp = tempfile.mkdtemp(prefix="judder-")
root = os.path.join(os.path.dirname(__file__), "..")
subprocess.run(["npx", "remotion", "ffmpeg", "-loglevel", "error", "-y", "-i", video, "-q:v", "5", os.path.join(tmp, "%05d.jpg")], cwd=root, check=True)
files = sorted(glob.glob(os.path.join(tmp, "*.jpg")))
prev, diffs = None, []
for f in files:
    im = Image.open(f).convert("L").resize((135, 240))
    if prev is not None:
        diffs.append(ImageStat.Stat(ImageChops.difference(im, prev)).mean[0])
    prev = im
    os.remove(f)

repeats, jumps = [], []
for i in range(3, len(diffs) - 3):
    around = diffs[i - 3:i] + diffs[i + 1:i + 4]
    med = statistics.median(around)
    if med > 0.6 and diffs[i] < 0.3 * med:
        repeats.append(i + 1)
    if diffs[i] > 6 and diffs[i] > 3.5 * max(med, 0.5):
        jumps.append(i + 1)

print(f"{len(files)} images analysées")
print(f"images répétées en plein mouvement : {len(repeats)}", [f"{n / fps:.2f}s" for n in repeats[:30]])
print(f"sauts : {len(jumps)}", [f"{n / fps:.2f}s" for n in jumps[:30]])
