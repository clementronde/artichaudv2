import type { Metadata } from "next";
import BoulogneClient from "./BoulogneClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Création site internet Boulogne-Billancourt (92)",
  description: "Agence web basée à Boulogne-Billancourt. Site vitrine, refonte et SEO local pour TPE, PME et indépendants du 92. Devis gratuit et sans engagement.",
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
    canonical: `${SITE_URL}/creation-site-internet-boulogne-billancourt`,
  },
  openGraph: {
    title: "Création de site internet Boulogne-Billancourt | Artichaud Studio",
    description: "Agence web à Boulogne-Billancourt pour sites vitrines, refontes, SEO local et design sur mesure.",
    url: `${SITE_URL}/creation-site-internet-boulogne-billancourt`,
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
    // Image OG générée dynamiquement par opengraph-image.tsx dans ce dossier.
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Artichaud Studio",
  "description": "Agence web à Boulogne-Billancourt. Création de sites vitrines, refontes, SEO local et design sur mesure pour TPE, PME et indépendants du 92.",
  "url": `${SITE_URL}/creation-site-internet-boulogne-billancourt`,
  "telephone": "+33766489982",
  "email": "hello@artichaud-studio.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "18 rue d'Aguesseau",
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

// Note SEO : pas de schema FAQPage émis — restreint par Google aux sites
// gouvernementaux/santé depuis août 2023, aucun rich snippet possible ici.
// Le contenu FAQ visible reste inchangé plus bas dans BoulogneClient.

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Création site Boulogne-Billancourt", "item": `${SITE_URL}/creation-site-internet-boulogne-billancourt` }
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BoulogneClient />
      <RelatedLinks
        title="Compléter votre projet web à Boulogne"
        links={relatedLinkGroups.localSite}
      />
    </>
  );
}
