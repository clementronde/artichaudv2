import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FONT } from "./brand";

export const expoOut = Easing.bezier(0.19, 1, 0.22, 1); // même courbe que le site (ease-expo)
export const inOut = Easing.bezier(0.65, 0, 0.35, 1); // proche de power3.inOut

const clampOpts = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const tween = (f: number, [a, b]: [number, number], [x, y]: [number, number], easing = inOut) =>
  interpolate(f, [a, b], [x, y], { ...clampOpts, easing });

/**
 * Caméra : à l'image f, le point (fx, fy) de la capture (en px du site) est affiché au point (qx, qy)
 * de l'écran, avec un zoom s.
 */
export type Cam = (f: number) => { s: number; fx: number; fy: number; qx: number; qy: number };

/** Plan capturé, filmé par une caméra animée. */
export const Shot: React.FC<{
  src: string;
  trim: number;
  rate: number;
  cam?: Cam;
  style?: React.CSSProperties;
}> = ({ src, trim, rate, cam, style }) => {
  const f = useCurrentFrame();
  const c = cam ? cam(f) : { s: 1, fx: 0, fy: 0, qx: 0, qy: 0 };
  const tx = c.qx - c.fx * c.s;
  const ty = c.qy - c.fy * c.s;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: C.bleu, ...style }}>
      <AbsoluteFill style={{ transform: `translate(${tx}px, ${ty}px) scale(${c.s})`, transformOrigin: "0 0" }}>
        <OffthreadVideo src={staticFile(`shots/${src}.mp4`)} trimBefore={trim} playbackRate={rate} muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Étiquette cyan, reprise des « tags » du site : se déploie de gauche à droite puis se replie. Par défaut en bas à gauche. */
export const Tag: React.FC<{ children: React.ReactNode; inAt?: number; outAt: number; x?: number; y?: number; dark?: boolean }> = ({
  children, inAt = 8, outAt, x = 66, y = 1350 - 66 - 58, dark,
}) => {
  const f = useCurrentFrame();
  const open = tween(f, [inAt, inAt + 22], [100, 0]);
  const close = tween(f, [outAt, outAt + 14], [0, 100]);
  const clipRight = Math.max(open, 0);
  const clipLeft = close;
  const textX = tween(f, [inAt + 6, inAt + 34], [-30, 0], expoOut);
  return (
    <div style={{
      position: "absolute", left: x, top: y, padding: "14px 18px", background: dark ? C.bleu : C.fluo,
      color: dark ? C.fluo : C.bleu, fontFamily: FONT.aquapure, fontSize: 30, letterSpacing: "-0.04em", lineHeight: 1,
      clipPath: `inset(0% ${clipRight}% 0% ${clipLeft}%)`,
    }}>
      <span style={{ display: "inline-block", transform: `translateX(${textX}%)` }}>{children}</span>
    </div>
  );
};

/** Titre révélé ligne par ligne (masque), comme les titres du site. */
export const SplitTitle: React.FC<{ lines: string[]; at: number; size?: number; color?: string; font?: string; weight?: number; stagger?: number; lh?: number; tracking?: string }> = ({
  lines, at, size = 88, color = C.blanc, font = FONT.aquapure, weight = 400, stagger = 6, lh = 1.0, tracking = "-0.06em",
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ fontFamily: font, fontSize: size, lineHeight: lh, letterSpacing: tracking, color, fontWeight: weight }}>
      {lines.map((l, i) => {
        const y = tween(f, [at + i * stagger, at + i * stagger + 50], [130, 0], expoOut);
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: "0.18em", marginBottom: "-0.18em", paddingTop: "0.08em", marginTop: "-0.08em" }}>
            <div style={{ transform: `translateY(${y}%)` }}>{l}</div>
          </div>
        );
      })}
    </div>
  );
};

/** Raccord « rideau » : un panneau bleu foncé bordé de cyan monte, couvre la coupe, puis sort par le haut. */
export const Wipe: React.FC<{ at: number; color?: string }> = ({ at, color = C.bleu }) => {
  const f = useCurrentFrame();
  const half = 13;
  if (f < at - half || f > at + half) return null;
  const inY = tween(f, [at - half, at], [100, 0]);
  const outY = tween(f, [at, at + half], [0, -100]);
  const y = f <= at ? inY : outY;
  return (
    <AbsoluteFill style={{ transform: `translateY(${y}%)`, zIndex: 50 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: -10, height: 10, background: C.fluo }} />
      <AbsoluteFill style={{ background: color }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: -10, height: 10, background: C.fluo }} />
    </AbsoluteFill>
  );
};

/** Fenêtre de navigateur minimaliste (sans marque) autour d'un plan 16:10. */
export const BrowserCard: React.FC<{ children: React.ReactNode; width: number; ratio: number; style?: React.CSSProperties }> = ({
  children, width, ratio, style,
}) => (
  <div style={{ width, borderRadius: 18, overflow: "hidden", background: C.blanc, boxShadow: "0 40px 90px rgba(0,0,0,.45)", ...style }}>
    <div style={{ height: 46, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", background: "#e9eeee" }}>
      {[0, 1, 2].map((i) => <span key={i} style={{ width: 12, height: 12, borderRadius: 6, background: "#c4cfcf" }} />)}
      <span style={{ marginLeft: 18, flex: 1, height: 24, borderRadius: 12, background: "#fcfcfc", color: "#6b7f80",
        fontFamily: FONT.aquapure, fontSize: 15, lineHeight: "24px", paddingLeft: 14 }}>AquaPure — Plombier dans les Yvelines</span>
    </div>
    <div style={{ position: "relative", width, height: width / ratio, overflow: "hidden" }}>{children}</div>
  </div>
);

/** Téléphone générique (sans marque) dessiné en CSS. */
export const Phone: React.FC<{ children: React.ReactNode; height: number; style?: React.CSSProperties }> = ({ children, height, style }) => {
  const screenH = height - 28;
  const screenW = screenH * (390 / 844);
  return (
    <div style={{ width: screenW + 28, height, borderRadius: 64, background: "#0d1a1b", padding: 14,
      boxShadow: "0 50px 100px rgba(0,0,0,.5), inset 0 0 0 2px #2b3c3d", ...style }}>
      <div style={{ position: "relative", width: screenW, height: screenH, borderRadius: 50, overflow: "hidden", background: "#000" }}>
        {children}
        <div style={{ position: "absolute", top: 14, left: "50%", width: 110, height: 30, marginLeft: -55, borderRadius: 15, background: "#000" }} />
      </div>
    </div>
  );
};
