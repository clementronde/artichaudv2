import type { Metadata } from "next";
import SeoReferencementNaturelClient from "./SeoReferencementNaturelClient";

export const metadata: Metadata = {
  title: "SEO & Référencement Naturel Paris | Agence SEO Expert - Artichaud Studio",
  description: "Référencement naturel et SEO à Paris. Audit SEO, stratégie de contenu, netlinking, optimisations techniques. Artichaud Studio, votre agence SEO pour booster votre visibilité Google.",
  keywords: [
    "SEO Paris",
    "référencement naturel Paris",
    "agence SEO Paris",
    "consultant SEO",
    "audit SEO",
    "stratégie SEO",
    "référencement Google",
    "optimisation SEO",
    "netlinking",
    "contenu SEO",
    "SEO technique",
    "agence référencement Paris"
  ],
  openGraph: {
    title: "SEO & Référencement Naturel Paris - Artichaud Studio",
    description: "Améliorez votre visibilité sur Google. Audit SEO, stratégie de contenu, optimisations techniques. Générez du trafic qualifié.",
    url: "https://artichaud-studio.com/services/seo-referencement-naturel",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "SEO & Référencement Naturel Paris - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/seo-referencement-naturel"
  }
};

export default function SeoReferencementNaturelPage() {
  return <SeoReferencementNaturelClient />;
}
