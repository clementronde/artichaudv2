import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { fontVariables } from "./fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Fuego — Restaurant au feu de bois et à la braise, Paris 11e",
  description:
    "Fuego, restaurant à Paris 11e : cuisine à la flamme et à la braise, produits frais et de saison, salle privatisable. Réservez votre table.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fuego — L'alliance du bois, de la flamme et des produits de saison",
    description: "Restaurant au feu de bois et à la braise à Paris 11e. Cuisine authentique, salle privatisable.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Le chef de Fuego dresse un homard grillé" }],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4c020c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Active le masquage pré-animation uniquement quand JS est disponible ; « intro-vue » : rideau déjà vu dans la session */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('fuego-intro'))document.documentElement.classList.add('intro-vue')}catch(e){}",
          }}
        />
        <JsonLd />
      </head>
      <body className="font-mono">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
