import type { Metadata } from "next";
import BoulogneClient from "../creation-site-internet-boulogne-billancourt/BoulogneClient"; // On importe le composant client

export const metadata: Metadata = {
  title: "Création Site Internet Boulogne-Billancourt (92) | Agence Web Expert",
  description: "Agence web à Boulogne-Billancourt (92100). Création de sites vitrines sur-mesure (WordPress, Webflow, Wix) pour TPE, PME et startups des Hauts-de-Seine.",
  keywords: ["création site internet boulogne billancourt", "agence web 92", "site internet boulogne", "freelance web boulogne billancourt", "agence wordpress 92100", "expert webflow hauts-de-seine"],
  alternates: {
    canonical: "https://artichaud.com/creation-site-internet-boulogne-billancourt",
  },
  openGraph: {
    title: "Agence Web Boulogne - Création de Sites Uniques",
    description: "Votre partenaire digital local à Boulogne-Billancourt. Design, performance et SEO pour les entreprises du 92.",
    url: "https://artichaud.com/creation-site-internet-boulogne-billancourt",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-boulogne.jpg", // Pensez à mettre une vraie image
        width: 1200,
        height: 630,
        alt: "Création site web Boulogne-Billancourt",
      },
    ],
  },
};

export default function Page() {
  return <BoulogneClient />;
}