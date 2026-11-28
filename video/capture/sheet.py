"""Planche contact d'un plan capturé : python3 capture/sheet.py <plan> [pas] [sortie]"""
import sys, os, glob
from PIL import Image

name = sys.argv[1]
step = int(sys.argv[2]) if len(sys.argv) > 2 else 20
out = sys.argv[3] if len(sys.argv) > 3 else f"/tmp/sheet-{name}.png"
root = os.path.join(os.path.dirname(__file__), "frames", name)
files = sorted(glob.glob(os.path.join(root, "*.jpg")))[::step]
ims = [Image.open(f) for f in files]
tw = 300
th = int(ims[0].height * tw / ims[0].width)
cols = 5
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (tw + 6), rows * (th + 6)), "white")
for i, im in enumerate(ims):
    sheet.paste(im.resize((tw, th)), ((i % cols) * (tw + 6), (i // cols) * (th + 6)))
sheet.save(out)
print(out, len(ims), "images")
