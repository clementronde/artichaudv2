import type { Metadata } from "next";
import ShowcaseClient from "./ShowcaseClient";

export const metadata: Metadata = {
  title: "Création site vitrine WordPress, Webflow & Wix | Studio créatif",
  description: "Sites vitrines sur-mesure avec WordPress, Webflow ou Wix. Design créatif, contenu clair et SEO de base inclus. Découvrez nos packs et choisissez la bonne technologie.",
  keywords: [
    "création site vitrine WordPress",
    "création site vitrine Webflow",
    "site vitrine Wix",
    "site vitrine professionnel",
    "agence site vitrine Paris",
    "création site vitrine Île-de-France",
    "comparatif cms site vitrine",
    "prix site vitrine wordpress"
  ],
  alternates: {
    canonical: "https://artichaud.com/creation-site-vitrine-wordpress-webflow-wix",
  },
  openGraph: {
    title: "Création Site Vitrine : WordPress, Webflow ou Wix ?",
    description: "Ne vous trompez pas de technologie. Découvrez notre comparatif expert et nos packs de création de sites vitrines performants.",
    url: "https://artichaud.com/creation-site-vitrine-wordpress-webflow-wix",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-cms-vitrine.jpg",
        width: 1200,
        height: 630,
        alt: "Comparatif WordPress Webflow Wix Agence Artichaud",
      },
    ],
  },
};

export default function Page() {
  return <ShowcaseClient />;
}