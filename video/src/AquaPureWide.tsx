import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C } from "./brand";
import { SHOTS, WIPES } from "./timeline";
import wideScroll from "./data/realisations-16x9-scroll.json";
import { Cam, expoOut, inOut, Phone, Shot, SplitTitle, Tag, tween, Wipe } from "./parts";
import { camBouton, camHero, EndClient, EndStudio, Ending, MouseHint, ScrollBar } from "./AquaPureVideo";

/**
 * Format 16:9 (1920 × 1080) — showreel, YouTube, LinkedIn.
 * C'est le format natif d'un site desktop : le site est filmé en 1920 × 1080 et montré en plein cadre
 * (pas de fenêtre ni de recadrage). Marges de sécurité des textes : 96 px (5 %).
 */
const W = 1920;
const H = 1080;
const M = 96;
const TAG_Y = H - M - 58;

// Centre du bouton téléphone mesuré dans le site en 1920 × 1080 (contenu centré dans 1512 px).
const CTA = { x: 359, y: 615 };
// Zoom ×2 : le titre entier reste lisible à gauche (il fait 791 px → 1582 px à l'écran).
const camBoutonWide = camBouton(CTA, 560, H, W, 434);

// Contact : légère poussée vers le formulaire (colonne de droite).
const FORM = { x: 1440, y: 708 };
const camContact: Cam = (f) => {
  const k = tween(f, [0, 150], [0, 1], inOut);
  return { s: 1 + 0.06 * k, fx: FORM.x, fy: FORM.y, qx: FORM.x, qy: FORM.y };
};

// Footer : cadré par le bas pendant que le wordmark monte.
const camFooter: Cam = (f) => ({ s: tween(f, [0, 120], [1, 1.03], inOut), fx: W / 2, fy: H, qx: W / 2, qy: H });

/** « Un scroll qui raconte » : la vraie page qui défile, en plein écran, barre de défilement et souris en surimpression. */
const RealisationsWide: React.FC = () => {
  const f = useCurrentFrame();
  const sh = SHOTS.realisations;
  return (
    <AbsoluteFill>
      <Shot src="realisations-16x9" trim={sh.trim} rate={1} />
      <ScrollBar f={f + sh.trim} height={H} track={wideScroll} right={10} />
      <div style={{ position: "absolute", right: M, bottom: M, opacity: tween(f, [20, 50], [0, 1]) }}>
        <MouseHint f={f + sh.trim} track={wideScroll} color={C.bleu} />
      </div>
      <Tag inAt={14} outAt={sh.dur - 16} x={M} y={TAG_Y}>Un scroll qui raconte</Tag>
    </AbsoluteFill>
  );
};

/** Mobile : grand titre à gauche, téléphone à droite. */
const MobileWide: React.FC = () => {
  const f = useCurrentFrame();
  const sh = SHOTS.mobile;
  const enter = tween(f, [4, 60], [0, 1], expoOut);
  const float = Math.sin((f / 60) * Math.PI) * 6;
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Img src={staticFile("brand/wordmark-footer.svg")} style={{
        position: "absolute", width: 2400, top: 520, left: tween(f, [0, sh.dur], [-80, -420], inOut), opacity: 0.06,
      }} />
      <div style={{ position: "absolute", left: 200, top: 360 }}>
        <SplitTitle lines={["Pensé", "mobile."]} at={12} size={150} />
      </div>
      <div style={{
        position: "absolute", left: 1160, top: 60,
        transform: `translateY(${(1 - enter) * 600 + float}px) rotate(${(1 - enter) * 7}deg)`,
      }}>
        <Phone height={960}>
          <OffthreadVideo src={staticFile(`shots/${sh.src}.mp4`)} trimBefore={sh.trim} playbackRate={sh.rate} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

export const AquaPureWide: React.FC<{ ending: Ending }> = ({ ending }) => {
  const s = SHOTS;
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Sequence from={s.hero.from} durationInFrames={s.hero.dur}>
        <Shot {...s.hero} src="hero-16x9" cam={camHero(H, W)} />
      </Sequence>

      <Sequence from={s.bouton.from} durationInFrames={s.bouton.dur}>
        <Shot {...s.bouton} src="bouton-16x9" cam={camBoutonWide} />
        <Tag inAt={40} outAt={s.bouton.dur - 4} x={M} y={TAG_Y}>Micro-interactions</Tag>
      </Sequence>

      <Sequence from={s.realisations.from} durationInFrames={s.realisations.dur}>
        <RealisationsWide />
      </Sequence>

      <Sequence from={s.contact.from} durationInFrames={s.contact.dur}>
        <Shot {...s.contact} src="contact-16x9" cam={camContact} />
        <Tag inAt={16} outAt={s.contact.dur - 16} x={M} y={TAG_Y}>Formulaire vivant</Tag>
      </Sequence>

      <Sequence from={s.mobile.from} durationInFrames={s.mobile.dur}>
        <MobileWide />
      </Sequence>

      <Sequence from={s.footer.from} durationInFrames={s.footer.dur}>
        <Shot {...s.footer} src="footer-16x9" cam={camFooter} />
      </Sequence>

      <Sequence from={s.fin.from} durationInFrames={s.fin.dur}>
        {ending === "studio"
          ? <EndStudio y0={-70} />
          : <EndClient x0={200} y0={-150} wm={{ width: 2100, top: 690 }} />}
      </Sequence>

      {WIPES.map((at, i) => (
        <Wipe key={at} at={at} color={i === WIPES.length - 1 && ending === "studio" ? C.artiBg : C.bleu} />
      ))}
    </AbsoluteFill>
  );
};
