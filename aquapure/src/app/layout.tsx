import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AquaPure — Plombier de confiance dans les Yvelines, 7j/7",
  description:
    "Dépannage d'urgence, rénovation de salle de bain, chauffage et entretien. Votre plombier de confiance dans les Yvelines, disponible 7j/7. Appelez le 06 33 10 20 60.",
  openGraph: {
    title: "AquaPure — Plombier dans les Yvelines",
    description: "Votre plombier de confiance dans les Yvelines, disponible 7j/7.",
    images: ["/images/hero.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#01292c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={satoshi.variable} suppressHydrationWarning>
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
