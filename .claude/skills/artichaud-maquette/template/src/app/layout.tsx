import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { fontVariables } from "./fonts";
import SmoothScroll from "@/components/motion/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

// __SEO__ : title ≤ 60 caractères (mot-clé principal + ville + marque), description ≤ 155 caractères avec un appel à l'action
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "__TITLE__",
  description: "__DESCRIPTION__",
  alternates: { canonical: "/" },
  openGraph: {
    title: "__OG_TITLE__",
    description: "__OG_DESCRIPTION__",
    images: ["/images/hero.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111", // __COULEURS__ : couleur principale
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Active le masquage pré-animation uniquement quand JS est disponible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd />
      </head>
      <body className="font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
