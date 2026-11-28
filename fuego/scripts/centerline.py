import sys, json
sys.setrecursionlimit(20000)
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.morphology import skeletonize
from collections import deque

img = np.array(Image.open(sys.argv[1]).convert("L")) > 127
dist = ndimage.distance_transform_edt(img)
sk = skeletonize(img)
H, W = sk.shape
pts = set(zip(*np.nonzero(sk)))
nb = lambda p: [(p[0] + dy, p[1] + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if (dy or dx) and (p[0] + dy, p[1] + dx) in pts]

def bfs(src, allowed):
    prev = {src: None}; q = deque([src]); last = src
    while q:
        u = q.popleft(); last = u
        for v in nb(u):
            if v in allowed and v not in prev:
                prev[v] = u; q.append(v)
    return prev, last

def longest(comp):
    a = next(iter(comp)); _, b = bfs(a, comp); prev, c = bfs(b, comp)
    path = [c]
    while prev[path[-1]] is not None: path.append(prev[path[-1]])
    return path

# composantes connexes du squelette
remaining = set(pts); comps = []
while remaining:
    s0 = next(iter(remaining)); prev, _ = bfs(s0, remaining); comp = set(prev); comps.append(comp); remaining -= comp
strokes = []
for comp in comps:
    if len(comp) < 15: continue
    left = set(comp)
    # trait principal puis branches secondaires (> 25 px), jusqu'à épuisement
    while True:
        path = longest(left)
        if len(path) < 25: break
        strokes.append(path)
        used = set(path)
        # retirer le chemin et un voisinage pour isoler les branches
        left -= used
        left = {p for p in left if all(abs(p[0]-q[0]) > 2 or abs(p[1]-q[1]) > 2 for q in path[::3])} if len(left) < 4000 else left - set(q for p in path for q in nb(p))
        if not left: break
def rdp(points, eps):
    if len(points) < 3: return points
    a, b = np.array(points[0], float), np.array(points[-1], float); ab = b - a; L = np.hypot(*ab) or 1
    dmax, idx = 0, 0
    for i in range(1, len(points) - 1):
        v = np.array(points[i], float) - a; d = abs(ab[0] * v[1] - ab[1] * v[0]) / L
        if d > dmax: dmax, idx = d, i
    if dmax > eps: return rdp(points[: idx + 1], eps)[:-1] + rdp(points[idx:], eps)
    return [points[0], points[-1]]
out = []
for st in strokes:
    pl = [(int(x), int(y)) for (y, x) in st]
    widths = [dist[y, x] for (x, y) in pl]
    simp = rdp(pl, 1.5)
    out.append({"n": len(pl), "maxw": float(max(widths) * 2), "p50w": float(np.percentile(widths, 50) * 2), "pts": simp})
out.sort(key=lambda s: -s["n"])
json.dump(out, open(sys.argv[2], "w"))
for s in out: print(s["n"], "px  épaisseur max", round(s["maxw"], 1), "médiane", round(s["p50w"], 1), "points", len(s["pts"]), "de", s["pts"][0], "à", s["pts"][-1])
