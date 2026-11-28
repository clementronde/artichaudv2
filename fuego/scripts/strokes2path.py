import json, sys, math
strokes = json.load(open(sys.argv[1]))
def catmull(pts):
    if len(pts) < 3:
        return "M%d %d L%d %d" % (*pts[0], *pts[-1])
    p = [pts[0]] + pts + [pts[-1]]
    d = "M%.1f %.1f" % pts[0]
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += " C%.1f %.1f %.1f %.1f %.1f %.1f" % (*c1, *c2, *p2)
    return d
def length(pts): return sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
main = strokes[0]
# position (fraction de longueur) du point du trait principal le plus proche du départ de chaque autre trait
cum = [0]
for i in range(len(main["pts"]) - 1): cum.append(cum[-1] + math.dist(main["pts"][i], main["pts"][i + 1]))
def frac(pt):
    j = min(range(len(main["pts"])), key=lambda k: math.dist(main["pts"][k], pt)); return cum[j] / cum[-1], math.dist(main["pts"][j], pt)
out = []
for k, s in enumerate(strokes):
    f, gap = frac(s["pts"][0]) if k else (0, 0)
    w = min(110, max(40, s["maxw"] + 8))
    out.append({"d": catmull([tuple(p) for p in s["pts"]]), "w": round(w), "len": round(length(s["pts"])), "nearMain": round(f, 3), "gap": round(gap)})
    print(k, "épaisseur du masque", round(w), "longueur", round(length(s["pts"])), "proche du trait principal à", round(f, 2), "écart", round(gap))
json.dump(out, open(sys.argv[2], "w"))
