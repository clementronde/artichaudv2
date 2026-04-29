import type { Metadata } from "next";
import ParisClient from "./ParisClient";
import RelatedLinks, { relatedLinkGroups } from "@/components/seo/RelatedLinks";

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
    canonical: "https://artichaud-studio.com/creation-site-internet-paris",
  },
  openGraph: {
    title: "Agence Web Paris - Création de Sites Internet Uniques",
    description: "Votre partenaire digital à Paris. Design, stratégie et performance pour les marques qui veulent se démarquer.",
    url: "https://artichaud-studio.com/creation-site-internet-paris",
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud-studio.com/images/og-paris.jpg",
        width: 1200,
        height: 630,
        alt: "Création site internet Paris Artichaud",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Artichaud Studio",
  "description": "Studio web créatif à Paris. Création de sites vitrines WordPress, Webflow et Wix pour TPE, PME et startups en Île-de-France.",
  "url": "https://artichaud-studio.com/creation-site-internet-paris",
  "telephone": "+33697538017",
  "email": "artichaud.studio@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Boulogne-Billancourt",
    "addressRegion": "Île-de-France",
    "postalCode": "92100",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8396",
    "longitude": "2.2400"
  },
  "areaServed": [
    { "@type": "City", "name": "Paris" },
    { "@type": "AdministrativeArea", "name": "Île-de-France" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Création de site internet Paris",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site vitrine Paris",
          "description": "Site vitrine professionnel pour entreprises parisiennes. Design moderne, SEO optimisé."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site WordPress Paris",
          "description": "Développement WordPress sur mesure pour TPE et PME à Paris."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site Webflow Paris",
          "description": "Sites Webflow performants et uniques pour startups et marques ambitieuses à Paris."
        }
      }
    ]
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ParisClient />
      <RelatedLinks
        title="Préparer votre création de site à Paris"
        links={relatedLinkGroups.localSite}
      />
    </>
  );
}
