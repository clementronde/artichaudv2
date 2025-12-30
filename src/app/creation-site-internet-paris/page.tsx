import type { Metadata } from "next";
import ParisClient from "./ParisClient";

export const metadata: Metadata = {
  title: "Création de site internet Paris | Studio web & branding",
  description: "Studio web créatif à Paris. Création de sites vitrines WordPress, Webflow et Wix pour TPE, PME et startups en Île-de-France. Discutons de votre projet.",
  keywords: [
    "création site internet Paris",
    "agence création site web Paris",
    "création site vitrine Paris",
    "agence web Paris",
    "création site internet Île-de-France",
    "site vitrine WordPress Paris",
    "site vitrine Webflow Paris",
    "refonte site internet Paris"
  ],
  alternates: {
    canonical: "https://artichaud.com/creation-site-internet-paris",
  },
  openGraph: {
    title: "Agence Web Paris - Création de Sites Internet Uniques",
    description: "Votre partenaire digital à Paris. Design, stratégie et performance pour les marques qui veulent se démarquer.",
    url: "https://artichaud.com/creation-site-internet-paris",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-paris.jpg",
        width: 1200,
        height: 630,
        alt: "Création site internet Paris Artichaud",
      },
    ],
  },
};

export default function Page() {
  return <ParisClient />;
}