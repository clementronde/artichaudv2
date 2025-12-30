import type { Metadata } from "next";
import ShowcaseClient from "../creation-site-vitrine-wordpress-webflow-wix/ShowcaseClient"; // On importe le composant client

export const metadata: Metadata = {
  title: "Création Site Vitrine WordPress, Webflow & Wix | Agence Expert",
  description: "Agence spécialisée dans la création de sites vitrines performants. Comparatif expert : Faut-il choisir WordPress, Webflow ou Wix pour votre projet ? Devis gratuit.",
  keywords: ["création site vitrine wordpress", "agence webflow expert", "site wix professionnel", "comparatif cms site vitrine", "développeur site vitrine", "prix site vitrine"],
  alternates: {
    canonical: "https://artichaud.com/creation-site-vitrine-wordpress-webflow-wix",
  },
  openGraph: {
    title: "Création Site Vitrine : WordPress, Webflow ou Wix ?",
    description: "Ne vous trompez pas de technologie. Découvrez notre expertise multi-CMS pour un site vitrine qui convertit.",
    url: "https://artichaud.com/creation-site-vitrine-wordpress-webflow-wix",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-cms-compare.jpg", // Image à créer
        width: 1200,
        height: 630,
        alt: "Comparatif WordPress Webflow Wix",
      },
    ],
  },
};

export default function Page() {
  return <ShowcaseClient />;
}