import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./brand";
import { SHOTS, WIPES } from "./timeline";
import scroll from "./data/realisations-scroll.json";
import { BrowserCard, Cam, expoOut, inOut, Phone, Shot, SplitTitle, Tag, tween, Wipe } from "./parts";

export type Ending = "studio" | "client";
export type Format = "4x5" | "9x16";
const W = 1080;
const H = 1350; // hauteur des plans 4:5 (et de la « fenêtre » site dans le format Reels)
const M = 66; // marge de sécurité (≈ 6 % de la largeur)

/**
 * Reels 9:16 (1080 × 1920) : aucun texte dans les 14 % du haut (≈ 270 px) ni dans les 35 % du bas
 * (au-delà de ≈ 1248 px : légende et boutons d'Instagram). Les textes vivent entre REEL_TOP et REEL_BOTTOM.
 */
const REEL_H = 1920;
const REEL_TOP = 290;
const REEL_BOTTOM = 1240; // limite basse des textes (contrôlée sur les images de vérification)
const REEL_WINDOW_TOP = 520; // la fenêtre site 1080 × 1350 démarre sous le titre

// ——— Caméras ———————————————————————————————————————————————

// Hero : très légère poussée vers l'avant pendant que l'intro du site se joue.
const camHero = (h: number): Cam => (f) => ({ s: tween(f, [60, 180], [1, 1.03]), fx: W / 2, fy: h / 2, qx: W / 2, qy: h / 2 });

// Bouton téléphone : zoom ×2 sur le bouton, aligné sur la marge gauche pour garder le titre lisible
// (même état que la fin du plan hero → la coupe ne se voit pas).
// Centre du bouton mesuré dans le site : y = 744 en 1080 × 1350, y = 1029 en 1080 × 1920.
const camBouton = (cta: { x: number; y: number }, targetY: number): Cam => (f) => {
  const k = tween(f, [4, 62], [0, 1], inOut);
  const s0 = 1.03;
  // La dérive démarre avant la fin du zoom : la caméra ne marque jamais d'arrêt
  const drift = tween(f, [40, 120], [0, 0.16], (t) => t);
  return { s: s0 + (2 - s0) * k + drift, fx: cta.x, fy: cta.y, qx: cta.x + (360 - cta.x) * k, qy: cta.y + (targetY - cta.y) * k };
};

// Contact : panneau de droite (titre + formulaire) ; le débord à droite se fond dans le fond bleu foncé.
const FORM = { x: 810, y: 840 };
const camContact: Cam = (f) => ({ s: tween(f, [0, 150], [1.44, 1.5], inOut), fx: FORM.x, fy: FORM.y, qx: W / 2, qy: 660 });

// Footer : cadré par le bas pendant que le wordmark monte (zoom léger pour ne pas couper l'accroche).
const camFooter: Cam = (f) => ({ s: tween(f, [0, 120], [1.0, 1.04], inOut), fx: W / 2, fy: H, qx: W / 2, qy: H });

// ——— Plans composés ————————————————————————————————————————

/** Barre de défilement de la fenêtre, synchronisée sur le vrai scroll de la capture (src/data/realisations-scroll.json). */
const ScrollBar: React.FC<{ f: number; height: number }> = ({ f, height }) => {
  const y = scroll.y[Math.max(0, Math.min(scroll.y.length - 1, Math.round(f)))];
  const track = height - 16;
  const thumb = Math.max(60, (scroll.viewport / scroll.docH) * track);
  const top = 8 + (y / (scroll.docH - scroll.viewport)) * (track - thumb);
  const pinned = y >= scroll.pinStart && y <= scroll.pinEnd;
  return (
    <div style={{ position: "absolute", right: 8, top: 0, bottom: 0, width: 12 }}>
      <div style={{ position: "absolute", left: 3, right: 3, top: 8, bottom: 8, borderRadius: 4, background: "rgba(1,41,44,.08)" }} />
      <div style={{ position: "absolute", left: 1, right: 1, top, height: thumb, borderRadius: 6,
        background: pinned ? C.fluo : "rgba(1,41,44,.45)", boxShadow: pinned ? "0 0 0 2px rgba(1,41,44,.25)" : "none" }} />
    </div>
  );
};

/** Souris dont la molette tourne tant que la page défile. */
const MouseHint: React.FC<{ f: number }> = ({ f }) => {
  const i = Math.max(1, Math.min(scroll.y.length - 1, Math.round(f)));
  const moving = scroll.y[i] - scroll.y[i - 1] > 0.5;
  const phase = (f % 36) / 36;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: FONT.aquapure, fontSize: 32, letterSpacing: "-0.04em", color: C.fluo }}>
      <div style={{ position: "relative", width: 40, height: 64, borderRadius: 20, border: `3px solid ${C.fluo}` }}>
        <div style={{ position: "absolute", left: "50%", width: 6, height: 12, marginLeft: -3, borderRadius: 3, background: C.fluo,
          top: 10 + (moving ? phase * 18 : 0), opacity: moving ? 1 - phase * 0.8 : 1 }} />
      </div>
      <span>scroll</span>
    </div>
  );
};

const RealisationsScene: React.FC<{ reel?: boolean }> = ({ reel }) => {
  const f = useCurrentFrame();
  const sh = SHOTS.realisations;
  const enter = tween(f, [6, 56], [0, 1], expoOut);
  const exitUp = tween(f, [sh.dur - 18, sh.dur], [0, 1], inOut);
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <div style={{ position: "absolute", left: M, top: reel ? REEL_TOP : 150 }}>
        <SplitTitle lines={["Un scroll", "qui raconte."]} at={10} size={92} />
      </div>
      <div style={{
        position: "absolute", left: M, top: reel ? 580 : 450,
        transform: `translateY(${(1 - enter) * 140 - exitUp * 40}px) scale(${0.94 + 0.06 * enter + tween(f, [56, sh.dur], [0, 0.03], (t) => t)})`,
        transformOrigin: "50% 0%", opacity: enter,
      }}>
        <BrowserCard width={W - 2 * M} ratio={1512 / 944}>
          <OffthreadVideo src={staticFile(`shots/${sh.src}.mp4`)} trimBefore={sh.trim} playbackRate={sh.rate} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <ScrollBar f={f + sh.trim} height={(W - 2 * M) / (1512 / 944)} />
        </BrowserCard>
      </div>
      <div style={{ position: "absolute", right: M, top: reel ? 330 : 190, opacity: tween(f, [20, 50], [0, 1]) }}>
        <MouseHint f={f + sh.trim} />
      </div>
      {/* Légende : en 4:5 seulement (en Reels, elle tomberait sous l'interface d'Instagram) */}
      {!reel && (
        <div style={{ position: "absolute", left: M, top: 1150, opacity: tween(f, [40, 70], [0, 1]) }}>
          <span style={{ fontFamily: FONT.aquapure, fontSize: 30, letterSpacing: "-0.04em", color: C.fluo }}>
            Nos réalisations — les photos montent au rythme du scroll
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const MobileScene: React.FC<{ reel?: boolean }> = ({ reel }) => {
  const f = useCurrentFrame();
  const sh = SHOTS.mobile;
  const enter = tween(f, [4, 60], [0, 1], expoOut);
  const float = Math.sin((f / 60) * Math.PI) * 6;
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      {/* Wordmark en fond, qui glisse lentement */}
      <Img src={staticFile("brand/wordmark-footer.svg")} style={{
        position: "absolute", width: 1700, top: 470, left: tween(f, [0, sh.dur], [-60, -360], inOut), opacity: 0.07,
      }} />
      {reel && (
        <div style={{ position: "absolute", left: M, top: REEL_TOP }}>
          <SplitTitle lines={["Pensé", "mobile."]} at={12} size={92} />
        </div>
      )}
      <div style={{
        position: "absolute", left: "50%", top: reel ? 560 : 150,
        transform: `translate(-50%, ${(1 - enter) * 520 + float}px) rotate(${(1 - enter) * 7}deg)`,
      }}>
        <Phone height={reel ? 1260 : 1060}>
          <OffthreadVideo src={staticFile(`shots/${sh.src}.mp4`)} trimBefore={sh.trim} playbackRate={sh.rate} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Phone>
      </div>
      {!reel && <Tag inAt={20} outAt={sh.dur - 16}>Pensé mobile</Tag>}
    </AbsoluteFill>
  );
};

const EndStudio: React.FC<{ y0?: number }> = ({ y0 = 0 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame: f - 8, fps, config: { damping: 11, stiffness: 120, mass: 0.9 } });
  const land = spring({ frame: f - 26, fps, config: { damping: 8, stiffness: 220 } });
  const squash = 1 - 0.12 * Math.sin(Math.min(1, land) * Math.PI); // écrasement à l'atterrissage
  const idle = f > 70 ? Math.sin(((f - 70) / 60) * Math.PI) * 10 : 0; // la mascotte flotte une fois posée
  return (
    <AbsoluteFill style={{ background: C.artiBg, alignItems: "center", transform: `scale(${tween(f, [60, 180], [1, 1.025], (t) => t)})` }}>
      <div style={{ position: "absolute", top: 150 + y0, transform: `translateY(${(1 - drop) * -(700 + y0) - idle}px) scale(${2 - squash}, ${squash})`, transformOrigin: "50% 100%" }}>
        <Img src={staticFile("brand/logo-artichaud.svg")} style={{ height: 460 }} />
      </div>
      <div style={{ position: "absolute", top: 700 + y0, left: M, right: M, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <SplitTitle lines={["Site réalisé par"]} at={36} size={44} font={FONT.artichaud} tracking="-0.02em" color="#f3d9e2" />
        <SplitTitle lines={["Artichaud Studio"]} at={44} size={112} font={FONT.artichaud} weight={700} tracking="-0.04em" />
        <div style={{ marginTop: 20 }}>
          <SplitTitle lines={["artichaud-studio.fr"]} at={58} size={42} font={FONT.artichaud} tracking="-0.01em" color={C.artiRouge} weight={500} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndClient: React.FC<{ y0?: number }> = ({ y0 = 0 }) => {
  const f = useCurrentFrame();
  const logo = tween(f, [10, 46], [100, 0], inOut);
  const pill = tween(f, [56, 96], [0, 1], expoOut);
  const fill = tween(f, [96, 130], [0, 1], inOut);
  return (
    <AbsoluteFill style={{ background: C.bleu, transform: `scale(${tween(f, [40, 180], [1, 1.03], (t) => t)})`, transformOrigin: "0% 50%" }}>
      {/* Rappel du footer du site : le wordmark géant en filigrane, qui monte */}
      <Img src={staticFile("brand/wordmark-footer.svg")} style={{
        position: "absolute", width: 1240, left: -40, top: tween(f, [0, 180], [1140, 1060], expoOut) + y0 * 1.6, opacity: 0.08,
      }} />
      <div style={{ position: "absolute", left: M, top: 390 + y0, clipPath: `inset(0% ${logo}% 0% 0%)` }}>
        <Img src={staticFile("brand/logo-aquapure.svg")} style={{ width: 640 }} />
      </div>
      <div style={{ position: "absolute", left: M, top: 610 + y0 }}>
        <SplitTitle lines={["Votre plombier de confiance", "dans les Yvelines, 7j/7."]} at={30} size={66} />
      </div>
      <div style={{ position: "absolute", left: M, top: 850 + y0, opacity: pill, transform: `translateY(${(1 - pill) * 40}px)` }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 26, height: 112, padding: "0 46px 0 9px", borderRadius: 8, background: "#023a3e", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 9, top: 9, bottom: 9, width: `calc(94px + (100% - 112px) * ${fill})`, borderRadius: 5, background: C.fluo }} />
          <div style={{ position: "relative", width: 94, height: 94, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("brand/icon-call.svg")} style={{ width: 30, height: 30 }} />
          </div>
          <span style={{ position: "relative", fontFamily: FONT.aquapure, fontSize: 48, letterSpacing: "-0.06em",
            color: fill > 0.55 ? C.bleu : C.blanc }}>06 33 10 20 60</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Format Reels : titre en haut (zone sûre) + le plan du site dans une fenêtre 1080 × 1350 en dessous. */
const ReelSection: React.FC<{ title: string[]; children: React.ReactNode }> = ({ title, children }) => {
  const f = useCurrentFrame();
  const enter = tween(f, [0, 40], [0, 1], expoOut);
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <div style={{ position: "absolute", left: M, top: REEL_TOP }}>
        <SplitTitle lines={title} at={10} size={92} />
      </div>
      <div style={{ position: "absolute", left: 0, top: REEL_WINDOW_TOP, width: W, height: H, overflow: "hidden",
        transform: `translateY(${(1 - enter) * 90}px)` }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// ——— Montage ————————————————————————————————————————————————

export const AquaPureVideo: React.FC<{ ending: Ending; format?: Format }> = ({ ending, format = "4x5" }) => {
  const s = SHOTS;
  const reel = format === "9x16";
  const sectioned = (title: string[], shot: React.ReactNode, tag: string | null, dur: number) =>
    reel ? <ReelSection title={title}>{shot}</ReelSection> : (
      <>
        {shot}
        {tag && <Tag inAt={16} outAt={dur - 16}>{tag}</Tag>}
      </>
    );
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Sequence from={s.hero.from} durationInFrames={s.hero.dur}>
        {reel ? <Shot {...s.hero} src="hero-9x16" cam={camHero(REEL_H)} /> : <Shot {...s.hero} cam={camHero(H)} />}
      </Sequence>

      <Sequence from={s.bouton.from} durationInFrames={s.bouton.dur}>
        {reel
          ? <Shot {...s.bouton} src="bouton-9x16" cam={camBouton({ x: 185, y: 1029 }, 900)} />
          : <Shot {...s.bouton} cam={camBouton({ x: 185, y: 744 }, 760)} />}
        <Tag inAt={40} outAt={s.bouton.dur - 4} y={reel ? 1120 : undefined}>Micro-interactions</Tag>
      </Sequence>

      <Sequence from={s.realisations.from} durationInFrames={s.realisations.dur}>
        <RealisationsScene reel={reel} />
      </Sequence>

      <Sequence from={s.contact.from} durationInFrames={s.contact.dur}>
        {sectioned(["Un formulaire", "vivant."], <Shot {...s.contact} cam={camContact} />, "Formulaire vivant", s.contact.dur)}
      </Sequence>

      <Sequence from={s.mobile.from} durationInFrames={s.mobile.dur}>
        <MobileScene reel={reel} />
      </Sequence>

      <Sequence from={s.footer.from} durationInFrames={s.footer.dur}>
        {sectioned(["Soigné", "jusqu'en bas."], <Shot {...s.footer} cam={camFooter} />, null, s.footer.dur)}
      </Sequence>

      <Sequence from={s.fin.from} durationInFrames={s.fin.dur}>
        {ending === "studio" ? <EndStudio y0={reel ? 240 : 0} /> : <EndClient y0={reel ? 240 : 0} />}
      </Sequence>

      {WIPES.map((at, i) => (
        <Wipe key={at} at={at} color={i === WIPES.length - 1 && ending === "studio" ? C.artiBg : C.bleu} />
      ))}
    </AbsoluteFill>
  );
};
