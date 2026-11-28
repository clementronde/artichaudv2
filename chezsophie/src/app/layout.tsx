import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

const editorial = localFont({
  src: [
    { path: "../../public/fonts/PPEditorialOld-Ultralight.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/PPEditorialOld-UltralightItalic.woff2", weight: "200", style: "italic" },
    { path: "../../public/fonts/PPEditorialOld-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/PPEditorialOld-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-editorial",
  display: "swap",
  // Le fichier active USE_TYPO_METRICS (820/-300) : Linux et Windows placeraient la ligne de base ~9 px plus haut
  // que macOS et Figma (hhea 1100/-300/100). On impose ces métriques partout.
  declarations: [
    { prop: "ascent-override", value: "110%" },
    { prop: "descent-override", value: "30%" },
    { prop: "line-gap-override", value: "10%" },
  ],
});

// Google Sans Flex (variable : graisses 200 à 700 + taille optique, comme Figma), sous-ensemble latin auto-hébergé
const googleSansFlex = localFont({
  src: [{ path: "../../public/fonts/GoogleSansFlex.woff2", weight: "200 700", style: "normal" }],
  variable: "--font-gsf",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://chezsophie.fr"),
  title: "Chez Sophie — Gîte de charme au cœur du Perche",
  description:
    "Gîte entièrement rénové niché au cœur du Perche : 4 chambres avec salle de bain, suite parentale, piscine, jacuzzi et grande terrasse face aux collines. Réservez votre séjour.",
  openGraph: {
    title: "Chez Sophie — L'art de vivre au grand air",
    description: "Gîte de charme au cœur du Perche, entre confort absolu et nature sauvage.",
    images: ["/images/hero.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#25040f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${editorial.variable} ${googleSansFlex.variable}`} suppressHydrationWarning>
      <head>
        {/* Active le masquage pré-animation uniquement quand JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
