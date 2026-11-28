"""
Sons de la vidéo, synthétisés (aucune question de droits) : python3 capture/sfx.py
→ public/sfx/key-1..4.wav (touches de clavier), click.wav (clic souris), notif.wav (notification).
"""
import os, wave
import numpy as np

SR = 48000
out = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")
os.makedirs(out, exist_ok=True)
rng = np.random.default_rng(7)


def save(name, x, gain=0.5):
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    data = (x * 32767).astype(np.int16)
    with wave.open(os.path.join(out, name), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / attack, 0, 1)
    return a * np.exp(-t / decay)


def bandnoise(n, lo, hi):
    spec = np.fft.rfft(rng.standard_normal(n))
    f = np.fft.rfftfreq(n, 1 / SR)
    spec[(f < lo) | (f > hi)] = 0
    return np.fft.irfft(spec, n)


# Touches : petit « clac » (bruit filtré très court) + corps grave léger ; 4 variantes pour éviter l'effet machine
for i, (lo, hi, body) in enumerate([(1800, 6000, 190), (2000, 6500, 170), (1600, 5500, 210), (2200, 7000, 180)], 1):
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    clack = bandnoise(n, lo, hi) * env(n, 0.0008, 0.006)
    thock = np.sin(2 * np.pi * body * t) * env(n, 0.001, 0.012) * 0.6
    save(f"key-{i}.wav", clack + thock, gain=0.32)

# Clic souris : deux transitoires (appui / relâche)
n = int(0.09 * SR)
x = np.zeros(n)
for start, g in ((0, 1.0), (int(0.045 * SR), 0.6)):
    m = int(0.02 * SR)
    x[start:start + m] += bandnoise(m, 2500, 8000) * env(m, 0.0005, 0.003) * g
save("click.wav", x, gain=0.4)

# Notification : deux notes douces (do6 puis sol6) avec harmonique légère
n = int(0.9 * SR)
t = np.arange(n) / SR
x = np.zeros(n)
for start, f0 in ((0.0, 1046.5), (0.13, 1568.0)):
    s = int(start * SR)
    tt = t[: n - s]
    tone = (np.sin(2 * np.pi * f0 * tt) + 0.25 * np.sin(2 * np.pi * 2 * f0 * tt)) * env(n - s, 0.004, 0.22)
    x[s:] += tone
save("notif.wav", x, gain=0.35)
print("sons écrits dans", os.path.abspath(out))
