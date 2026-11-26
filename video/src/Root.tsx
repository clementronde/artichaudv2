import React from "react";
import { Composition } from "remotion";
import "./brand";
import { FPS } from "./brand";
import { TOTAL } from "./timeline";
import { AquaPureVideo } from "./AquaPureVideo";

export const RemotionRoot: React.FC = () => (
  <>
    {/* Fil Instagram / LinkedIn, 4:5 — fin « studio » (logo Artichaud) */}
    <Composition id="AquaPureStudio" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1350}
      defaultProps={{ ending: "studio" as const }} />
    {/* Même montage — fin « client » (logo AquaPure + téléphone) */}
    <Composition id="AquaPureClient" component={AquaPureVideo} durationInFrames={TOTAL} fps={FPS} width={1080} height={1350}
      defaultProps={{ ending: "client" as const }} />
  </>
);
