import type { Metadata } from "next";
import RedesignClient from "./RedesignClient";

export const metadata: Metadata = {
  title: "Refonte de site internet | Modernisez votre site vitrine & SEO",
  description: "Votre site ne vous ressemble plus ? Agence experte en refonte de site internet (WordPress, Webflow, Wix). Nouveau design, meilleure UX et SEO conservé. Devis gratuit.",
  keywords: [
    "refonte site internet",
    "refonte site vitrine",
    "refonte site WordPress",
    "moderniser site internet",
    "refonte site web Paris",
    "refonte site web Île-de-France",
    "migration site web",
    "audit site internet"
  ],
  alternates: {
    canonical: "https://artichaud.com/refonte-site-internet",
  },
  openGraph: {
    title: "Refonte de Site Internet - Transformez votre présence en ligne",
    description: "Design daté ? Performances lentes ? Découvrez notre approche pour une refonte de site qui booste votre image et votre business.",
    url: "https://artichaud.com/refonte-site-internet",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-refonte.jpg",
        width: 1200,
        height: 630,
        alt: "Avant Après Refonte Site Internet Artichaud",
      },
    ],
  },
};

export default function Page() {
  return <RedesignClient />;
}