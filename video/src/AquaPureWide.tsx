import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { BEAT, C } from "./brand";
import wideScroll from "./data/realisations-16x9-scroll.json";
import contactSfx from "./data/contact-16x9-sfx.json";
import { Cam, expoOut, inOut, Phone, Shot, SplitTitle, Tag, tween } from "./parts";
import { camBouton, camHero, EndClient, EndStudio, Ending, MouseHint, ScrollBar } from "./AquaPureVideo";

/**
 * Format 16:9 (1920 × 1080) — showreel, YouTube, LinkedIn.
 * Le site est filmé en 1920 × 1080 et montré en plein cadre. Les plans s'enchaînent en fondus doux
 * (0,4 s, léger dézoom du plan entrant) ; l'intro → bouton reste une coupe invisible (même image).
 * Marges de sécurité des textes : 96 px (5 %).
 */
const W = 1920;
const H = 1080;
const M = 96;
const TAG_Y = H - M - 58;
const FADE = 24; // durée du fondu (images) : le plan entrant démarre 12 images avant le temps, le sortant finit 12 après
const HALF = FADE / 2;

/** Découpage 16:9, en temps (1 temps = 30 images à 120 BPM). Les captures ont 12 images de marge de chaque côté. */
const T = {
  hero: [0, 6],
  bouton: [6, 10],
  services: [10, 19], // survol des trois cartes, une par une
  realisations: [19, 29],
  temoignages: [29, 37], // le temps de lire les avis
  contact: [37, 47], // saisie complète, envoi, notification
  actualites: [47, 56],
  mobile: [56, 63],
  fin: [63, 69],
} as const;
export const TOTAL_WIDE = T.fin[1] * BEAT; // 2070 images = 34,5 s

/**
 * Fenêtre d'un plan : il commence HALF images avant son temps de départ (en fondu) et se prolonge HALF
 * images après son temps de fin (pendant que le suivant apparaît par-dessus).
 */
const span = ([a, b]: readonly [number, number], fadeIn = true) => {
  const from = a * BEAT - (fadeIn && a > 0 ? HALF : 0);
  const to = b * BEAT + HALF;
  return { from, durationInFrames: to - from };
};

/** Fondu doux d'entrée : opacité + très léger dézoom (1,02 → 1). */
const FadeIn: React.FC<{ children: React.ReactNode; on?: boolean }> = ({ children, on = true }) => {
  const f = useCurrentFrame();
  if (!on) return <AbsoluteFill>{children}</AbsoluteFill>;
  const o = tween(f, [0, FADE], [0, 1], inOut);
  const s = tween(f, [0, FADE + 20], [1.02, 1], expoOut);
  return <AbsoluteFill style={{ opacity: o, transform: `scale(${s})` }}>{children}</AbsoluteFill>;
};

// ——— Caméras ———————————————————————————————————————————————

// Centre du bouton téléphone mesuré dans le site en 1920 × 1080 (contenu centré dans 1512 px).
const CTA = { x: 359, y: 615 };
// Zoom ×2 : le titre entier reste lisible à gauche (il fait 791 px → 1582 px à l'écran).
const camBoutonWide = camBouton(CTA, 560, H, W, 434);

/** Très lente poussée continue (la caméra ne s'arrête jamais). */
const push = (len: number, amount = 0.025, fy = H / 2): Cam => (f) => {
  const s = 1 + amount * (f / len);
  return { s, fx: W / 2, fy, qx: W / 2, qy: fy };
};

// Contact : légère poussée vers le formulaire, puis, après l'envoi, zoom vers la notification
// (elle s'affiche en bas à droite de l'écran : on zoome en gardant ce coin fixe).
const FORM = { x: 1440, y: 708 };
const CORNER = { x: W - 24, y: H - 24 };
const CONTACT_TRIM = 20; // le plan démarre 20 images après le début de la capture (curseur déjà en route)
const SUBMIT = (contactSfx.submit ?? 250) - CONTACT_TRIM; // image (dans le plan) du clic sur « Envoyer »
const camContact: Cam = (f) => {
  const k = tween(f, [SUBMIT + 2, SUBMIT + 42], [0, 1], inOut);
  const s0 = 1 + 0.05 * tween(f, [0, SUBMIT], [0, 1], inOut);
  const p = { x: FORM.x + (CORNER.x - FORM.x) * k, y: FORM.y + (CORNER.y - FORM.y) * k };
  return { s: s0 + (1.75 - s0) * k, fx: p.x, fy: p.y, qx: p.x, qy: p.y };
};

// ——— Plans composés ————————————————————————————————————————

/** « Un scroll qui raconte » : la vraie page qui défile, en plein écran, barre de défilement et souris en surimpression. */
const RealisationsWide: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Shot src="realisations-16x9" trim={0} rate={1} />
      <ScrollBar f={f} height={H} track={wideScroll} right={10} />
      <div style={{ position: "absolute", right: M, bottom: M, opacity: tween(f, [30, 60], [0, 1]) }}>
        <MouseHint f={f} track={wideScroll} color={C.bleu} />
      </div>
      <Tag inAt={30} outAt={len - 34} x={M} y={TAG_Y}>Un scroll qui raconte</Tag>
    </AbsoluteFill>
  );
};

/** Mobile : grand titre à gauche, téléphone à droite dans lequel la page défile. */
const MobileWide: React.FC<{ len: number }> = ({ len }) => {
  const f = useCurrentFrame();
  const enter = tween(f, [6, 70], [0, 1], expoOut);
  const float = Math.sin((f / 60) * Math.PI) * 6;
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Img src={staticFile("brand/wordmark-footer.svg")} style={{
        position: "absolute", width: 2400, top: 520, left: tween(f, [0, len], [-80, -420], inOut), opacity: 0.06,
      }} />
      <div style={{ position: "absolute", left: 200, top: 360 }}>
        <SplitTitle lines={["Pensé", "mobile."]} at={16} size={150} />
      </div>
      <div style={{
        position: "absolute", left: 1160, top: 60,
        transform: `translateY(${(1 - enter) * 260 + float}px)`, opacity: tween(f, [0, 30], [0, 1]),
      }}>
        <Phone height={960}>
          <OffthreadVideo src={staticFile("shots/mobile-scroll.mp4")} trimBefore={26} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

/** Sons du formulaire, calés sur les vraies frappes de la capture (src/data/contact-16x9-sfx.json). */
const ContactSounds: React.FC = () => (
  <>
    {contactSfx.keys.filter((f) => f >= CONTACT_TRIM).map((f, i) => (
      <Sequence key={`k${f}`} from={f - CONTACT_TRIM} durationInFrames={8} layout="none">
        <Audio src={staticFile(`sfx/key-${(i % 4) + 1}.wav`)} volume={0.55 + ((i * 37) % 10) / 40} />
      </Sequence>
    ))}
    {[...contactSfx.clicks, contactSfx.submit].filter((f): f is number => f != null && f >= CONTACT_TRIM).map((f) => (
      <Sequence key={`c${f}`} from={f - CONTACT_TRIM} durationInFrames={10} layout="none">
        <Audio src={staticFile("sfx/click.wav")} volume={0.8} />
      </Sequence>
    ))}
    {contactSfx.submit != null && (
      <Sequence from={SUBMIT + 8} durationInFrames={60} layout="none">
        <Audio src={staticFile("sfx/notif.wav")} volume={0.7} />
      </Sequence>
    )}
  </>
);

/** Un plan du site en plein cadre, avec son étiquette. */
const SitePlan: React.FC<{ src: string; len: number; cam?: Cam; tag?: string; tagOut?: number; trim?: number }> = ({ src, len, cam, tag, tagOut, trim = 0 }) => (
  <AbsoluteFill>
    <Shot src={src} trim={trim} rate={1} cam={cam ?? push(len)} />
    {tag && <Tag inAt={30} outAt={tagOut ?? len - 34} x={M} y={TAG_Y}>{tag}</Tag>}
  </AbsoluteFill>
);

// ——— Montage ————————————————————————————————————————————————

export const AquaPureWide: React.FC<{ ending: Ending }> = ({ ending }) => {
  const sp = {
    hero: span(T.hero),
    bouton: span(T.bouton, false), // coupe invisible : même image que la fin de l'intro
    services: span(T.services),
    realisations: span(T.realisations),
    temoignages: span(T.temoignages),
    contact: span(T.contact),
    actualites: span(T.actualites),
    mobile: span(T.mobile),
    fin: span(T.fin),
  };
  // L'intro s'arrête pile au temps 6 (la coupe vers le bouton est franche et invisible).
  const hero = { from: 0, durationInFrames: T.hero[1] * BEAT };
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Sequence {...hero}>
        <Shot src="hero-16x9" trim={0} rate={1} cam={camHero(H, W)} />
      </Sequence>

      <Sequence {...sp.bouton}>
        <Shot src="bouton-16x9" trim={0} rate={1} cam={camBoutonWide} />
        <Tag inAt={40} outAt={sp.bouton.durationInFrames - 24} x={M} y={TAG_Y}>Micro-interactions</Tag>
      </Sequence>

      <Sequence {...sp.services}>
        <FadeIn><SitePlan src="services-16x9" len={sp.services.durationInFrames} tag="Trois métiers, un artisan" /></FadeIn>
      </Sequence>

      <Sequence {...sp.realisations}>
        <FadeIn><RealisationsWide len={sp.realisations.durationInFrames} /></FadeIn>
      </Sequence>

      <Sequence {...sp.temoignages}>
        <FadeIn><SitePlan src="temoignages-16x9" len={sp.temoignages.durationInFrames} tag="Avis clients 5/5" /></FadeIn>
      </Sequence>

      <Sequence {...sp.contact}>
        <FadeIn><SitePlan src="contact-16x9" trim={CONTACT_TRIM} len={sp.contact.durationInFrames} cam={camContact} tag="Formulaire vivant" tagOut={SUBMIT} /></FadeIn>
        <ContactSounds />
      </Sequence>

      <Sequence {...sp.actualites}>
        {/* l'étiquette sort avant la descente vers le footer (elle recouvrirait son accroche) */}
        <FadeIn><SitePlan src="actualites-16x9" len={sp.actualites.durationInFrames} tag="Conseils & actualités" tagOut={146} /></FadeIn>
      </Sequence>

      <Sequence {...sp.mobile}>
        <FadeIn><MobileWide len={sp.mobile.durationInFrames} /></FadeIn>
      </Sequence>

      <Sequence {...sp.fin}>
        <FadeIn>
          {ending === "studio"
            ? <EndStudio y0={-70} />
            : <EndClient x0={200} y0={-150} wm={{ width: 2100, top: 690 }} />}
        </FadeIn>
      </Sequence>
    </AbsoluteFill>
  );
};
