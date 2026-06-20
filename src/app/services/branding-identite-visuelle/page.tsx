import type { Metadata } from "next";
import BrandingIdentiteVisuelleClient from "./BrandingIdentiteVisuelleClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Agence Branding & Identité Visuelle à Boulogne-Billancourt | Artichaud Studio"
  },
  description: "Création d'identité visuelle et branding à Boulogne-Billancourt. Logo, charte graphique, stratégie de marque. Artichaud Studio, votre agence de design pour une marque forte et mémorable.",
  keywords: [
    "branding Boulogne-Billancourt",
    "identité visuelle Île-de-France",
    "création logo Boulogne-Billancourt",
    "charte graphique",
    "design de marque",
    "agence branding 92",
    "identité de marque",
    "stratégie de marque",
    "refonte logo",
    "brand identity",
    "design system",
    "agence design Boulogne-Billancourt"
  ],
  openGraph: {
    title: "Agence Branding & Identité Visuelle — Artichaud Studio Boulogne-Billancourt",
    description: "Création d'identités visuelles fortes et mémorables à Boulogne-Billancourt. Logo, charte graphique, stratégie de marque. Démarquez-vous avec une identité unique.",
    url: `${SITE_URL}/services/branding-identite-visuelle`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "Agence Branding & Identité Visuelle Boulogne-Billancourt - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: `${SITE_URL}/services/branding-identite-visuelle`
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
