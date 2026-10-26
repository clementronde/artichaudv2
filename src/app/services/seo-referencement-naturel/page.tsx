import type { Metadata } from "next";
import SeoReferencementNaturelClient from "./SeoReferencementNaturelClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Agence SEO & référencement naturel | Artichaud Studio"
  },
  description: "Agence SEO en remote, partout en France. Audit SEO, stratégie de contenu, netlinking, optimisations techniques. Boostez votre visibilité Google et générez du trafic qualifié.",
  keywords: [
    "agence SEO",
    "référencement naturel Île-de-France",
    "agence SEO remote",
    "consultant SEO",
    "audit SEO",
    "stratégie SEO",
    "référencement Google",
    "optimisation SEO",
    "netlinking",
    "SEO local",
    "SEO technique",
    "agence référencement Île-de-France"
  ],
  openGraph: {
    title: "Agence SEO & Référencement Naturel — Artichaud Studio",
    description: "Améliorez votre visibilité sur Google. Audit SEO, stratégie de contenu, optimisations techniques. Agence SEO en remote, partout en France.",
    url: `${SITE_URL}/services/seo-referencement-naturel`,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Agence SEO - Artichaud Studio"
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
