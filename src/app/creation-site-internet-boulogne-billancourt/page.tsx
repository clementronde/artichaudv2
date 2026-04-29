import type { Metadata } from "next";
import BoulogneClient from "./BoulogneClient";
import RelatedLinks, { relatedLinkGroups } from "@/components/seo/RelatedLinks";

export const metadata: Metadata = {
  title: "Création de site internet Boulogne-Billancourt | Agence web créative",
  description: "Agence web créative à Boulogne-Billancourt. Sites vitrines WordPress, Webflow ou Wix qui valorisent votre marque. Parlez-nous de votre projet dès aujourd’hui.",
  keywords: [
    "création site internet Boulogne-Billancourt",
    "agence web Boulogne-Billancourt",
    "site vitrine Boulogne-Billancourt",
    "création site vitrine 92",
    "création site WordPress Boulogne-Billancourt",
    "webdesigner Boulogne-Billancourt",
    "création site Webflow Boulogne"
  ],
  alternates: {
    canonical: "https://artichaud-studio.com/creation-site-internet-boulogne-billancourt",
  },
  openGraph: {
    title: "Création de site internet Boulogne-Billancourt | Agence Artichaud",
    description: "Agence web créative à Boulogne-Billancourt. Sites vitrines WordPress, Webflow ou Wix qui valorisent votre marque.",
    url: "https://artichaud-studio.com/creation-site-internet-boulogne-billancourt",
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud-studio.com/images/og-boulogne.jpg",
        width: 1200,
        height: 630,
        alt: "Création site internet Boulogne-Billancourt",
      },
    ],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Artichaud Studio",
  "description": "Agence web créative à Boulogne-Billancourt. Création de sites vitrines WordPress, Webflow ou sur mesure pour TPE, PME et artisans du 92.",
  "url": "https://artichaud-studio.com/creation-site-internet-boulogne-billancourt",
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
    { "@type": "City", "name": "Boulogne-Billancourt" },
    { "@type": "AdministrativeArea", "name": "Hauts-de-Seine" },
    { "@type": "City", "name": "Paris" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Création de site internet Boulogne-Billancourt",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site vitrine",
          "description": "Site vitrine professionnel pour artisans, commerçants et PME à Boulogne-Billancourt."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site WordPress",
          "description": "Site WordPress sur mesure, facile à gérer en autonomie."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de site Webflow",
          "description": "Site Webflow performant avec un design unique et sans code."
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
      <BoulogneClient />
      <RelatedLinks
        title="Compléter votre projet web à Boulogne"
        links={relatedLinkGroups.localSite}
      />
    </>
  );
}
