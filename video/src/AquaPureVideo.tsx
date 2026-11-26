import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./brand";
import { SHOTS, WIPES } from "./timeline";
import { BrowserCard, Cam, expoOut, inOut, Phone, Shot, SplitTitle, Tag, tween, Wipe } from "./parts";

export type Ending = "studio" | "client";
const W = 1080;
const H = 1350;
const M = 66; // marge de sécurité (≈ 6 % de la largeur)

// ——— Caméras ———————————————————————————————————————————————

// Hero : très légère poussée vers l'avant pendant que l'intro du site se joue.
const camHero: Cam = (f) => ({ s: tween(f, [60, 180], [1, 1.03]), fx: W / 2, fy: H / 2, qx: W / 2, qy: H / 2 });

// Bouton téléphone : zoom ×2 sur le bouton, aligné sur la marge gauche pour garder le titre lisible
// (même état que la fin du plan hero → la coupe ne se voit pas).
const CTA = { x: 185, y: 744 };
const camBouton: Cam = (f) => {
  const k = tween(f, [4, 62], [0, 1], inOut);
  const s0 = 1.03;
  return { s: s0 + (2 - s0) * k, fx: CTA.x, fy: CTA.y, qx: CTA.x + (360 - CTA.x) * k, qy: CTA.y + (760 - CTA.y) * k };
};

// Services : cartes cadrées en haut, la fin de l'accroche (lorem ipsum) reste au-dessus du cadre.
const camServices: Cam = (f) => ({ s: tween(f, [0, 180], [1.1, 1.14], inOut), fx: W / 2, fy: 460, qx: W / 2, qy: 420 });

// Contact : panneau de droite (titre + formulaire) ; le débord à droite se fond dans le fond bleu foncé.
const FORM = { x: 810, y: 840 };
const camContact: Cam = (f) => ({ s: tween(f, [0, 150], [1.44, 1.5], inOut), fx: FORM.x, fy: FORM.y, qx: W / 2, qy: 660 });

// Footer : cadré par le bas pendant que le wordmark monte (zoom léger pour ne pas couper l'accroche).
const camFooter: Cam = (f) => ({ s: tween(f, [0, 120], [1.0, 1.04], inOut), fx: W / 2, fy: H, qx: W / 2, qy: H });

// ——— Plans composés ————————————————————————————————————————

const RealisationsScene: React.FC = () => {
  const f = useCurrentFrame();
  const sh = SHOTS.realisations;
  const enter = tween(f, [6, 56], [0, 1], expoOut);
  const exitUp = tween(f, [sh.dur - 18, sh.dur], [0, 1], inOut);
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <div style={{ position: "absolute", left: M, top: 150 }}>
        <SplitTitle lines={["Un scroll", "qui raconte."]} at={10} size={92} />
      </div>
      <div style={{
        position: "absolute", left: M, top: 450,
        transform: `translateY(${(1 - enter) * 140 - exitUp * 40}px) scale(${0.94 + 0.06 * enter})`,
        transformOrigin: "50% 0%", opacity: enter,
      }}>
        <BrowserCard width={W - 2 * M} ratio={1512 / 944}>
          <OffthreadVideo src={staticFile(`shots/${sh.src}.mp4`)} trimBefore={sh.trim} playbackRate={sh.rate} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </BrowserCard>
      </div>
      <div style={{ position: "absolute", left: M, top: 1150, opacity: tween(f, [40, 70], [0, 1]) }}>
        <span style={{ fontFamily: FONT.aquapure, fontSize: 30, letterSpacing: "-0.04em", color: C.fluo }}>
          Nos réalisations — les photos montent au rythme du scroll
        </span>
      </div>
    </AbsoluteFill>
  );
};

const MobileScene: React.FC = () => {
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
      <div style={{
        position: "absolute", left: "50%", top: 150,
        transform: `translate(-50%, ${(1 - enter) * 520 + float}px) rotate(${(1 - enter) * 7}deg)`,
      }}>
        <Phone height={1060}>
          <OffthreadVideo src={staticFile(`shots/${sh.src}.mp4`)} trimBefore={sh.trim} playbackRate={sh.rate} muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Phone>
      </div>
      <Tag inAt={20} outAt={sh.dur - 16}>Pensé mobile</Tag>
    </AbsoluteFill>
  );
};

const EndStudio: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame: f - 8, fps, config: { damping: 11, stiffness: 120, mass: 0.9 } });
  const land = spring({ frame: f - 26, fps, config: { damping: 8, stiffness: 220 } });
  const squash = 1 - 0.12 * Math.sin(Math.min(1, land) * Math.PI); // écrasement à l'atterrissage
  return (
    <AbsoluteFill style={{ background: C.artiBg, alignItems: "center" }}>
      <div style={{ position: "absolute", top: 150, transform: `translateY(${(1 - drop) * -700}px) scale(${2 - squash}, ${squash})`, transformOrigin: "50% 100%" }}>
        <Img src={staticFile("brand/logo-artichaud.svg")} style={{ height: 460 }} />
      </div>
      <div style={{ position: "absolute", top: 700, left: M, right: M, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <SplitTitle lines={["Site réalisé par"]} at={36} size={44} font={FONT.artichaud} tracking="-0.02em" color="#f3d9e2" />
        <SplitTitle lines={["Artichaud Studio"]} at={44} size={112} font={FONT.artichaud} weight={700} tracking="-0.04em" />
        <div style={{ marginTop: 20 }}>
          <SplitTitle lines={["artichaud-studio.fr"]} at={58} size={42} font={FONT.artichaud} tracking="-0.01em" color={C.artiRouge} weight={500} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndClient: React.FC = () => {
  const f = useCurrentFrame();
  const logo = tween(f, [10, 46], [100, 0], inOut);
  const pill = tween(f, [56, 96], [0, 1], expoOut);
  const fill = tween(f, [96, 130], [0, 1], inOut);
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <div style={{ position: "absolute", left: M, top: 300, clipPath: `inset(0% ${logo}% 0% 0%)` }}>
        <Img src={staticFile("brand/logo-aquapure.svg")} style={{ width: 640 }} />
      </div>
      <div style={{ position: "absolute", left: M, top: 520 }}>
        <SplitTitle lines={["Votre plombier de confiance", "dans les Yvelines, 7j/7."]} at={30} size={66} />
      </div>
      <div style={{ position: "absolute", left: M, top: 760, opacity: pill, transform: `translateY(${(1 - pill) * 40}px)` }}>
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

// ——— Montage ————————————————————————————————————————————————

export const AquaPureVideo: React.FC<{ ending: Ending }> = ({ ending }) => {
  const s = SHOTS;
  return (
    <AbsoluteFill style={{ background: C.bleu }}>
      <Sequence from={s.hero.from} durationInFrames={s.hero.dur}>
        <Shot {...s.hero} cam={camHero} />
      </Sequence>

      <Sequence from={s.bouton.from} durationInFrames={s.bouton.dur}>
        <Shot {...s.bouton} cam={camBouton} />
        <Tag inAt={40} outAt={s.bouton.dur - 4}>Micro-interactions</Tag>
      </Sequence>

      <Sequence from={s.services.from} durationInFrames={s.services.dur}>
        <Shot {...s.services} cam={camServices} />
        <Tag inAt={16} outAt={s.services.dur - 16}>Survols soignés</Tag>
      </Sequence>

      <Sequence from={s.realisations.from} durationInFrames={s.realisations.dur}>
        <RealisationsScene />
      </Sequence>

      <Sequence from={s.contact.from} durationInFrames={s.contact.dur}>
        <Shot {...s.contact} cam={camContact} />
        <Tag inAt={16} outAt={s.contact.dur - 16}>Formulaire vivant</Tag>
      </Sequence>

      <Sequence from={s.mobile.from} durationInFrames={s.mobile.dur}>
        <MobileScene />
      </Sequence>

      <Sequence from={s.footer.from} durationInFrames={s.footer.dur}>
        <Shot {...s.footer} cam={camFooter} />
      </Sequence>

      <Sequence from={s.fin.from} durationInFrames={s.fin.dur}>
        {ending === "studio" ? <EndStudio /> : <EndClient />}
      </Sequence>

      {WIPES.map((at, i) => (
        <Wipe key={at} at={at} color={i === WIPES.length - 1 && ending === "studio" ? C.artiBg : C.bleu} />
      ))}
    </AbsoluteFill>
  );
};
