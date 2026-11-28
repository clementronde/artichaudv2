import React from "react";
import { Composition } from "remotion";
import "./brand";
import { FPS } from "./brand";
import { TOTAL } from "./timeline";
import { AquaPureVideo } from "./AquaPureVideo";
import { AquaPureWide, TOTAL_WIDE } from "./AquaPureWide";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Reels / TikTok / Shorts, 9:16 — format principal */}
    <Composition id="AquaPureReelStudio" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920}
      defaultProps={{ ending: "studio" as const, format: "9x16" as const }} />
    <Composition id="AquaPureReelClient" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920}
      defaultProps={{ ending: "client" as const, format: "9x16" as const }} />
    {/* 16:9 — showreel, YouTube, LinkedIn : le site en plein cadre */}
    <Composition id="AquaPureWideStudio" component={AquaPureWide} durationInFrames={TOTAL_WIDE} fps={FPS} width={1920} height={1080}
      defaultProps={{ ending: "studio" as const }} />
    <Composition id="AquaPureWideClient" component={AquaPureWide} durationInFrames={TOTAL_WIDE} fps={FPS} width={1920} height={1080}
      defaultProps={{ ending: "client" as const }} />
    {/* Fil Instagram / LinkedIn, 4:5 */}
    <Composition id="AquaPureStudio" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1350}
      defaultProps={{ ending: "studio" as const, format: "4x5" as const }} />
    <Composition id="AquaPureClient" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1350}
      defaultProps={{ ending: "client" as const, format: "4x5" as const }} />
  </>
);
