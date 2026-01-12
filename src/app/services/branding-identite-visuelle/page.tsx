import type { Metadata } from "next";
import BrandingIdentiteVisuelleClient from "./BrandingIdentiteVisuelleClient";

export const metadata: Metadata = {
  title: "Branding & Identité Visuelle Paris | Agence Design de Marque - Artichaud Studio",
  description: "Création d'identité visuelle et branding à Paris. Logo, charte graphique, stratégie de marque. Artichaud Studio, votre agence de design pour une marque forte et mémorable.",
  keywords: [
    "branding Paris",
    "identité visuelle Paris",
    "création logo Paris",
    "charte graphique",
    "design de marque",
    "agence branding Paris",
    "identité de marque",
    "stratégie de marque",
    "refonte logo",
    "brand identity",
    "design system",
    "agence design Paris"
  ],
  openGraph: {
    title: "Branding & Identité Visuelle Paris - Artichaud Studio",
    description: "Création d'identités visuelles fortes et mémorables. Logo, charte graphique, stratégie de marque. Démarquez-vous avec une identité unique.",
    url: "https://artichaud-studio.com/services/branding-identite-visuelle",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Branding & Identité Visuelle Paris - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/branding-identite-visuelle"
  }
};

export default function BrandingIdentiteVisuellePage() {
  return <BrandingIdentiteVisuelleClient />;
}
