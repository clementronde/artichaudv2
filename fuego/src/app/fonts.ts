import localFont from "next/font/local";

// Sous-ensembles latins de Google Fonts, auto-hébergés (licence OFL). Métriques hhea = typo : aucun override nécessaire.
// Interlignage natif (« normal » dans Figma) = 1,3 pour les deux familles.
export const instrument = localFont({
  src: [
    { path: "../../public/fonts/InstrumentSerif.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const geistMono = localFont({
  src: [
    { path: "../../public/fonts/GeistMono.woff2", weight: "100 900", style: "normal" },
    { path: "../../public/fonts/GeistMono-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${instrument.variable} ${geistMono.variable}`;
