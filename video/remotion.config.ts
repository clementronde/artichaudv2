import { Config } from "@remotion/cli/config";

// Chromium « headless shell » déjà installé sur la machine (évite un téléchargement).
// Sur un autre poste : supprimer cette ligne, Remotion téléchargera son propre navigateur.
const LOCAL_SHELL = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (process.env.REMOTION_BROWSER !== "auto") {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER || LOCAL_SHELL);
}

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(92);
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setCrf(18);
Config.setPixelFormat("yuv420p");
