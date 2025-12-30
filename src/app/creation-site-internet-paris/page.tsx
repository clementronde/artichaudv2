import type { Metadata } from "next";
import ParisClient from "../creation-site-internet-paris/ParisClient"; // On importe le composant client

export const metadata: Metadata = {
  title: "Création Site Internet Paris & IDF | Agence Web Expert (WordPress, Webflow)",
  description: "Agence de création de sites vitrines à Paris (75) et Île-de-France. Experts WordPress, Webflow & Wix pour freelances, cabinets et startups. Devis gratuit sous 24h.",
  keywords: ["création site internet paris", "agence web paris", "développeur web île-de-france", "expert webflow paris", "agence wordpress paris", "refonte site internet paris"],
  alternates: {
    canonical: "https://artichaud.com/creation-site-internet-paris",
  },
  openGraph: {
    title: "Agence Web Paris - Création de Sites Uniques",
    description: "Votre site internet sur-mesure à Paris. Design, SEO et performance pour vous démarquer localement.",
    url: "https://artichaud.com/creation-site-internet-paris",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-paris.jpg", // Pense à mettre une vraie image
        width: 1200,
        height: 630,
        alt: "Création site internet Paris",
      },
    ],
  },
};

export default function Page() {
  return <ParisClient />;
}