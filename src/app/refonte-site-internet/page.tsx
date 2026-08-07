import type { Metadata } from "next";
import RedesignClient from "./RedesignClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Refonte de site internet | Modernisez votre site vitrine & SEO",
  description: "Votre site ne vous ressemble plus ? Agence experte en refonte de site internet (WordPress, Webflow, Wix). Nouveau design, meilleure UX et SEO conservé. Devis gratuit.",
  keywords: [
    "refonte site internet",
    "refonte site vitrine",
    "refonte site WordPress",
    "moderniser site internet",
    "refonte site web Paris",
    "refonte site web Île-de-France",
    "migration site web",
    "audit site internet"
  ],
  alternates: {
    canonical: `${SITE_URL}/refonte-site-internet`,
  },
  openGraph: {
    title: "Refonte de Site Internet - Transformez votre présence en ligne",
    description: "Design daté ? Performances lentes ? Découvrez notre approche pour une refonte de site qui booste votre image et votre business.",
    url: `${SITE_URL}/refonte-site-internet`,
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
    // Image OG générée dynamiquement par opengraph-image.tsx dans ce dossier.
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Artichaud Studio",
    "description": "Agence experte en refonte de site internet à Boulogne-Billancourt et en Île-de-France. Nouveau design, meilleure UX et SEO conservé. WordPress, Webflow, Wix.",
    "url": `${SITE_URL}/refonte-site-internet`,
    "telephone": "+33766489982",
    "email": "hello@artichaud-studio.com",
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
      "name": "Refonte de site internet",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Refonte de site vitrine",
            "description": "Modernisation complète de votre site vitrine : nouveau design, UX améliorée, performances optimisées."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Refonte WordPress",
            "description": "Migration et refonte de site WordPress avec conservation du SEO existant."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Audit de site internet",
            "description": "Audit complet de votre site actuel (design, UX, SEO, performances) avant refonte."
          }
        }
      ]
    }
  },
  // Note SEO : pas de schema FAQPage — restreint par Google aux sites
  // gouvernementaux/santé depuis août 2023, aucun rich snippet possible ici.
];

export default function Page() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <RedesignClient />
      <RelatedLinks
        title="Préparer une refonte solide"
        links={relatedLinkGroups.redesign}
      />
    </>
  );
}
