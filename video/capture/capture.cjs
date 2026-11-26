/**
 * Plans du site AquaPure pour les vidéos 4:5 (fil), 9:16 (Reels) et 16:9 (showreel).
 * Usage : node capture/capture.cjs [nom-du-plan ...]   (sans argument : tous les plans)
 * Le site doit tourner : cd ../aquapure && npm run build && npx next start -p 3100
 */
const { run, ease } = require("./engine.cjs");

const URL = process.env.SITE_URL || "http://localhost:3100";
const FRAME = { width: 1080, height: 1350 }; // le site rendu nativement en 4:5 (mise en page desktop ≥ 1024 px)
const REEL = { width: 1080, height: 1920 }; // 9:16 Reels : le hero remplit tout l'écran (100svh)

/** Interpole une trajectoire de curseur entre deux points (courbe douce, léger arc). */
function path2(a, b, t, arc = 40) {
  const k = ease.inOutCubic(t);
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k - Math.sin(Math.PI * k) * arc };
}
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * Trajectoire de scroll image par image, posée sur des pixels entiers : tant que la page bouge, elle
 * avance d'au moins 1 px par image. Sinon, quand le scroll ralentit, le navigateur arrondit la position
 * et l'on obtient des marches irrégulières (immobile, +1, immobile…) qui se voient.
 */
function scrollPath(from, to, frames, profile) {
  const out = [];
  from = Math.round(from);
  to = Math.round(to);
  let prev = from;
  for (let i = 0; i < frames; i++) {
    let y = Math.round(from + (to - from) * profile(i / (frames - 1)));
    if (i > 0 && y < to && y - prev < 1) y = Math.min(to, prev + 1);
    y = Math.min(to, Math.max(prev, y));
    out.push(y);
    prev = y;
  }
  return out;
}

/** Scroll « à la molette » : accélère, garde une vitesse constante, puis freine (profil trapézoïdal). */
function cruise(t, ramp = 0.12) {
  t = clamp01(t);
  const v = 1 / (1 - ramp); // vitesse de croisière pour couvrir 0 → 1
  if (t < ramp) return (v * t * t) / (2 * ramp);
  if (t > 1 - ramp) return 1 - (v * (1 - t) * (1 - t)) / (2 * ramp);
  return v * (t - ramp / 2);
}

/** Survol du bouton téléphone, enchaîné exactement sur la fin du plan hero (3 s). */
function bouton(viewport, from) {
  return {
    viewport,
    dpr: 2, // capturé en 2× pour le zoom caméra au montage (et même rendu que le hero)
    frames: 130,
    async setup(api) {
      await api.cursor(from.x, from.y);
      await api.tick(3000); // exactement la fin du plan hero (180 images = 3 s) : la coupe ne se voit pas
      this.btn = await api.rect("[data-hero-cta]");
    },
    async perFrame(api, i) {
      // le curseur part de hors cadre et entre dans l'image
      const to = { x: this.btn.x + 150, y: this.btn.vy + this.btn.h / 2 + 4 };
      const p = path2(from, to, clamp01(i / 48), 60);
      await api.cursor(p.x, p.y);
    },
  };
}

/** Réalisations : vrai scroll avant / pendant / après la section fixée, position enregistrée image par image. */
function realisations(viewport, dataFile) {
  return {
    viewport,
    dpr: 2, // positions de scroll au demi-pixel : pas de micro-saccades quand le scroll ralentit
    frames: 300,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      // On descend progressivement jusqu'au contact pour déclencher les animations au-dessus
      const contact = await api.rect("#contact");
      for (let y = 0; y <= contact.y; y += 300) { await api.scrollTo(y); await api.tick(50); }
      const spacer = await api.page.evaluate(() => {
        const s = document.querySelector("#projets");
        const sp = s.parentElement;
        const r = sp.getBoundingClientRect();
        return { top: r.top + window.scrollY, h: r.height, secH: s.offsetHeight };
      });
      const vh = viewport.height;
      // Section plus petite que l'écran : elle se fixe centrée ; sinon calée par le bas (voir le site).
      const pinStart = spacer.secH > vh ? spacer.top + spacer.secH - vh : spacer.top + spacer.secH / 2 - vh / 2;
      const pinEnd = pinStart + (spacer.h - spacer.secH);
      this.start = pinStart - 560; // la page défile d'abord : le contact remonte, la section arrive
      this.end = pinEnd + 300; // puis repart une fois la séquence finie
      this.track = { viewport: vh, docH: await api.page.evaluate(() => document.documentElement.scrollHeight), pinStart, pinEnd, y: [] };
      await api.scrollTo(this.start);
      await api.tick(800);
    },
    async perFrame(api, i) {
      if (!this.path) this.path = scrollPath(this.start, this.end, this.frames, (t) => cruise(t));
      const y = this.path[i];
      this.track.y.push(y);
      await api.scrollTo(y);
    },
    // Position de scroll image par image → barre de défilement synchronisée au montage
    async done() {
      require("node:fs").writeFileSync(require("node:path").join(__dirname, "..", "src", "data", dataFile), JSON.stringify(this.track));
    },
  };
}

/** Formulaire de contact : clics et saisie (rythme final, lecture à vitesse 1). */
function contact(viewport, cursorFrom) {
  return {
    viewport,
    frames: 160,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      const c = await api.rect("#contact");
      for (let y = 0; y <= c.y; y += 300) { await api.scrollTo(y); await api.tick(50); }
      this.top = c.y + c.h - viewport.height;
      await api.scrollTo(this.top);
      await api.tick(2500); // révélations de la section terminées
      const r = async (sel) => { const b = await api.rect(sel); return { x: b.x + 30, y: b.y - this.top + b.h / 2 }; };
      this.fields = [
        { sel: 'input[name="prenom"]', text: "Marie", at: await r('input[name="prenom"]') },
        { sel: 'input[name="nom"]', text: "Durand", at: await r('input[name="nom"]') },
        { sel: 'input[name="email"]', text: "marie.durand@mail.fr", at: await r('input[name="email"]') },
        { sel: 'textarea[name="message"]', text: "Fuite sous l'évier, dispo samedi ?", at: await r('textarea[name="message"]') },
      ];
      this.plan = [];
      let f = 0, prev = cursorFrom;
      for (const fld of this.fields) {
        this.plan.push({ type: "move", from: prev, to: fld.at, start: f, end: f + 12 });
        f += 12;
        this.plan.push({ type: "click", sel: fld.sel, start: f });
        f += 3;
        this.plan.push({ type: "type", sel: fld.sel, text: fld.text, start: f, per: 1 });
        f += fld.text.length + 4;
        prev = fld.at;
      }
    },
    async perFrame(api, i) {
      for (const step of this.plan) {
        if (step.type === "move" && i >= step.start && i <= step.end) {
          const p = path2(step.from, step.to, (i - step.start) / (step.end - step.start), 30);
          await api.cursor(p.x, p.y);
        }
        if (step.type === "click" && i === step.start) await api.page.click(step.sel, { position: { x: 20, y: 14 } });
        if (step.type === "type" && i >= step.start && (i - step.start) % step.per === 0) {
          const n = (i - step.start) / step.per;
          if (n < step.text.length) await api.page.keyboard.type(step.text[n]);
        }
      }
    },
  };
}

/** Footer : arrivée en bas de page, le wordmark géant monte. `back` : hauteur parcourue (px). */
function footer(viewport, back) {
  return {
    viewport,
    dpr: 2, // positions de scroll au demi-pixel
    frames: 150,
    async setup(api) {
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      const max = await api.page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
      for (let y = 0; y <= max - back - 750; y += 300) { await api.scrollTo(y); await api.tick(50); }
      this.from = max - back; // démarre sur les actualités, après les témoignages
      this.to = max;
      await api.scrollTo(this.from);
      await api.tick(1500);
    },
    async perFrame(api, i) {
      // freinage franc, trajectoire au demi-pixel (voir scrollPath), puis immobile
      if (!this.path) this.path = scrollPath(this.from, this.to, 111, (t) => cruise(t, 0.3));
      await api.scrollTo(this.path[Math.min(i, 110)]);
    },
  };
}

const WIDE = { width: 1920, height: 1080 }; // 16:9 : le format natif d'un site desktop, plein cadre

const SHOTS = {
  // ——— 4:5 (fil) ———
  // Intro du hero, depuis le chargement (rideau, titre ligne par ligne, CTA, badges, nav)
  hero: { viewport: FRAME, dpr: 2, frames: 200 }, // 2× : même rendu que le plan bouton
  bouton: bouton(FRAME, { x: 1130, y: 1250 }),
  // Réalisations dans une fenêtre de navigateur 1512 × 944 (aussi utilisée par le format Reels)
  realisations: realisations({ width: 1512, height: 944 }, "realisations-scroll.json"),
  contact: contact(FRAME, { x: 900, y: 1250 }),
  footer: footer(FRAME, 650),

  // ——— 9:16 (Reels) : accroche plein cadre ———
  "hero-9x16": { viewport: REEL, dpr: 2, frames: 200 },
  "bouton-9x16": bouton(REEL, { x: 1130, y: 1700 }),

  // ——— 16:9 (showreel, YouTube, LinkedIn) : tout en plein cadre ———
  "hero-16x9": { viewport: WIDE, dpr: 2, frames: 200 },
  "bouton-16x9": bouton(WIDE, { x: 2000, y: 1000 }),
  "realisations-16x9": realisations(WIDE, "realisations-16x9-scroll.json"),
  "contact-16x9": contact(WIDE, { x: 1500, y: 1150 }),
  "footer-16x9": footer(WIDE, 520),

  // ——— Commun : mobile, affiché dans un téléphone au montage ———
  mobile: {
    viewport: { width: 390, height: 844 },
    dpr: 2,
    mobile: true,
    frames: 230,
    async setup(api) { await api.cursor(-100, -100, false); },
    async perFrame(api, i) {
      if (i === 165) await api.page.tap('button[aria-controls="menu-mobile"]');
    },
  },
};

const wanted = process.argv.slice(2);
const list = Object.entries(SHOTS)
  .filter(([name]) => !wanted.length || wanted.includes(name))
  .map(([name, s]) => ({ name, ...s }));

run(list, URL).catch((e) => { console.error(e); process.exit(1); });
