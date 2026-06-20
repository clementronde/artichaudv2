import type { Metadata } from "next";
import SeoReferencementNaturelClient from "./SeoReferencementNaturelClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Agence SEO & Référencement Naturel à Boulogne-Billancourt | Artichaud Studio"
  },
  description: "Agence SEO à Boulogne-Billancourt. Audit SEO, stratégie de contenu, netlinking, optimisations techniques. Boostez votre visibilité Google et générez du trafic qualifié.",
  keywords: [
    "agence SEO Boulogne-Billancourt",
    "référencement naturel Île-de-France",
    "agence SEO 92",
    "consultant SEO",
    "audit SEO",
    "stratégie SEO",
    "référencement Google",
    "optimisation SEO",
    "netlinking",
    "SEO local Boulogne-Billancourt",
    "SEO technique",
    "agence référencement Île-de-France"
  ],
  openGraph: {
    title: "Agence SEO & Référencement Naturel — Artichaud Studio Boulogne-Billancourt",
    description: "Améliorez votre visibilité sur Google. Audit SEO, stratégie de contenu, optimisations techniques. Agence SEO à Boulogne-Billancourt.",
    url: `${SITE_URL}/services/seo-referencement-naturel`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "Agence SEO Boulogne-Billancourt - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: `${SITE_URL}/services/seo-referencement-naturel`
  }
};

export default function SeoReferencementNaturelPage() {
  return (
    <>
      <SeoReferencementNaturelClient />
      <RelatedLinks
        title="Relier SEO, contenu et structure du site"
        links={relatedLinkGroups.serviceSeo}
      />
    </>
  );
}
