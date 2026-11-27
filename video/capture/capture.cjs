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
function bouton(viewport, from, frames = 130) {
  return {
    viewport,
    dpr: 2, // capturé en 2× pour le zoom caméra au montage (et même rendu que le hero)
    frames,
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
function realisations(viewport, dataFile, frames = 300) {
  return {
    viewport,
    dpr: 2, // capture fine : le scroll reste net et régulier
    frames,
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
function contact(viewport, cursorFrom, frames = 160, opts = {}) {
  return {
    viewport,
    frames,
    async setup(api) {
      // Pas de vraie réception des messages en local : on simule la réponse du serveur (succès)
      await api.page.route("**/api/contact", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
      await api.cursor(-100, -100, false);
      await api.tick(3600);
      const c = await api.rect("#contact");
      for (let y = 0; y <= c.y; y += 300) { await api.scrollTo(y); await api.tick(50); }
      this.top = c.y + c.h - viewport.height;
      // un peu plus bas puis retour, comme un visiteur : le bouton « Envoyer » (révélé à 85 % de l'écran) apparaît
      await api.scrollTo(this.top + 220);
      await api.tick(1500);
      await api.scrollTo(this.top);
      await api.tick(2500); // révélations de la section terminées
      const r = async (sel) => { const b = await api.rect(sel); return { x: b.x + 30, y: b.y - this.top + b.h / 2 }; };
      this.fields = [
        { sel: 'input[name="prenom"]', text: "Marie", at: await r('input[name="prenom"]') },
        { sel: 'input[name="nom"]', text: "Durand", at: await r('input[name="nom"]') },
        { sel: 'input[name="email"]', text: "marie.durand@mail.fr", at: await r('input[name="email"]') },
        ...(opts.full ? [{ sel: 'input[name="adresse"]', text: "12 rue de la Paroisse, Versailles", at: await r('input[name="adresse"]') }] : []),
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
        f += fld.text.length * (opts.per ?? 1) + 4;
        prev = fld.at;
      }
      if (opts.full) {
        // puis le curseur va sur « Envoyer » et clique : notification « Message envoyé au plombier »
        const btn = await r('form button[type="submit"]');
        const at = { x: btn.x + 30, y: btn.y };
        this.plan.push({ type: "move", from: prev, to: at, start: f + 8, end: f + 30 });
        this.plan.push({ type: "submit", start: f + 34 });
      }
      this.sfx = { keys: [], clicks: [], submit: null };
    },
    async done() {
      if (opts.sfxFile) require("node:fs").writeFileSync(require("node:path").join(__dirname, "..", "src", "data", opts.sfxFile), JSON.stringify(this.sfx));
    },
    async perFrame(api, i) {
      for (const step of this.plan) {
        if (step.type === "move" && i >= step.start && i <= step.end) {
          const p = path2(step.from, step.to, (i - step.start) / (step.end - step.start), 30);
          await api.cursor(p.x, p.y);
        }
        if (step.type === "click" && i === step.start) {
          await api.page.click(step.sel, { position: { x: 20, y: 14 } });
          this.sfx.clicks.push(i);
        }
        if (step.type === "type" && i >= step.start && (i - step.start) % step.per === 0) {
          const n = (i - step.start) / step.per;
          if (n < step.text.length) {
            await api.page.keyboard.type(step.text[n]);
            if (step.text[n] !== " ") this.sfx.keys.push(i);
          }
        }
        if (step.type === "submit" && i === step.start) {
          await api.page.click('form button[type="submit"]');
          this.sfx.submit = i;
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

/**
 * Visite d'une portion de page : une suite d'étapes « scroll jusqu'à », « survol de », « pause ».
 *   { scroll: "#sel", offset, frames }  → la page défile jusqu'à ce que le haut de #sel soit à `offset` px du haut
 *   { hover: "#sel", frames, move }     → le curseur entre (ou se déplace) et survole le centre de #sel
 *   { hold: frames }
 * La première étape `start` fixe la position de départ (sans animation).
 */
function visit(viewport, { start, steps }) {
  const frames = steps.reduce((n, st) => n + (st.frames || st.hold || 0), 0);
  return {
    viewport,
    dpr: 2,
    frames,
    async setup(api) {
      await api.cursor(viewport.width + 80, viewport.height - 120, false);
      await api.tick(3600);
      const docY = async (sel) => (await api.rect(sel)).y;
      const startY = start.y ?? Math.max(0, (await docY(start.sel)) - start.offset);
      // descente progressive : les animations au-dessus se déclenchent comme pour un vrai visiteur
      for (let y = 0; y <= startY; y += 300) { await api.scrollTo(y); await api.tick(50); }
      await api.scrollTo(startY);
      await api.tick(1200);
      // Plan image par image : position de scroll + position du curseur (coordonnées écran)
      this.plan = [];
      let y = startY;
      let cur = { x: viewport.width + 80, y: viewport.height - 120 };
      for (const st of steps) {
        if (st.scroll) {
          const max = await api.page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
          const to = Math.min(max, Math.max(0, (await docY(st.scroll)) - st.offset)); // bas de page : on s'arrête au maximum
          const path = scrollPath(y, to, st.frames, (t) => cruise(t, st.ramp ?? 0.25));
          for (const py of path) this.plan.push({ y: py, cur });
          y = path[path.length - 1];
        } else if (st.hover) {
          const r = await api.rect(st.hover);
          const target = { x: r.x + r.w * (st.ax ?? 0.5), y: r.y - y + r.h * (st.ay ?? 0.5) };
          const move = st.move ?? 36;
          for (let i = 0; i < st.frames; i++) this.plan.push({ y, cur: path2(cur, target, clamp01(i / move), 50) });
          cur = target;
        } else if (st.hold) {
          for (let i = 0; i < st.hold; i++) this.plan.push({ y, cur });
        }
      }
    },
    async perFrame(api, i) {
      const p = this.plan[Math.min(i, this.plan.length - 1)];
      await api.scrollTo(p.y);
      const visible = p.cur.x < viewport.width + 40;
      await api.cursor(p.cur.x, p.cur.y, visible);
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
  // (plans allongés de 24 images : 12 de chaque côté pour les fondus du montage)
  "hero-16x9": { viewport: WIDE, dpr: 2, frames: 200 },
  "bouton-16x9": bouton(WIDE, { x: 2000, y: 1000 }, 150),
  "services-16x9": visit(WIDE, {
    start: { sel: "#services", offset: 760 },
    steps: [
      { scroll: "#services", offset: 110, frames: 76 },
      { hover: "#services li:nth-child(1) a", frames: 72, move: 34, ay: 0.42 },
      { hover: "#services li:nth-child(2) a", frames: 72, move: 34, ay: 0.42 },
      { hover: "#services li:nth-child(3) a", frames: 80, move: 34, ay: 0.42 },
    ],
  }),
  "realisations-16x9": realisations(WIDE, "realisations-16x9-scroll.json", 330),
  // Les témoignages démarrent là où le scroll des réalisations s'arrête (pendant le fondu) : pas de « remontée »
  "temoignages-16x9": visit(WIDE, {
    start: { y: require("../src/data/realisations-16x9-scroll.json").y[312] },
    steps: [
      { scroll: "#temoignages", offset: 110, frames: 70 },
      { hover: "#temoignages li:nth-child(1) figure", frames: 66, move: 32, ay: 0.6 },
      { hover: "#temoignages li:nth-child(2) figure", frames: 66, move: 32, ay: 0.6 },
      { hover: "#temoignages li:nth-child(3) figure", frames: 66, move: 32, ay: 0.6 },
    ],
  }),
  "contact-16x9": contact(WIDE, { x: 1500, y: 1150 }, 350, { full: true, sfxFile: "contact-16x9-sfx.json" }),
  "actualites-16x9": visit(WIDE, {
    start: { sel: "#actualites", offset: 640 },
    steps: [
      { scroll: "#actualites", offset: 110, frames: 72 },
      { hover: "#actualites li:nth-child(2) article", frames: 84, move: 34, ay: 0.32 },
      { scroll: "footer", offset: -40, frames: 100, ramp: 0.3 },
      { hold: 44 },
    ],
  }),

  // Mobile qui défile (16:9) : intro, puis la page descend jusqu'aux cartes services
  "mobile-scroll": {
    viewport: { width: 390, height: 844 },
    dpr: 2,
    mobile: true,
    frames: 270,
    async setup(api) {
      await api.cursor(-100, -100, false);
      // sur mobile, l'ordre est hero → services → contact → réalisations : on s'arrête sur les cartes services
      const cards = await api.rect("#services ul");
      this.path = scrollPath(0, cards.y + cards.h - 844 + 40, 170, (t) => cruise(t, 0.25));
    },
    async perFrame(api, i) {
      // 90 images d'intro, puis on descend dans la page
      if (i >= 90) await api.scrollTo(this.path[Math.min(i - 90, this.path.length - 1)]);
    },
  },

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
