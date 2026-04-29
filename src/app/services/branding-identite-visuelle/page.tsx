import type { Metadata } from "next";
import BrandingIdentiteVisuelleClient from "./BrandingIdentiteVisuelleClient";
import RelatedLinks, { relatedLinkGroups } from "@/components/seo/RelatedLinks";

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
    url: "https://www.artichaud-studio.com/services/branding-identite-visuelle",
    images: [
      {
        url: "https://www.artichaud-studio.com/icon.png",
        width: 512,
        height: 512,
        alt: "Branding & Identité Visuelle Paris - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://www.artichaud-studio.com/services/branding-identite-visuelle"
  }
};

export default function BrandingIdentiteVisuellePage() {
  return (
    <>
      <BrandingIdentiteVisuelleClient />
      <RelatedLinks
        title="Faire vivre l’identité sur tous les supports"
        links={relatedLinkGroups.serviceBranding}
      />
    </>
  );
}
