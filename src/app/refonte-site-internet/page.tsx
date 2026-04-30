import type { Metadata } from "next";
import RedesignClient from "./RedesignClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";

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
    canonical: "https://www.artichaud-studio.com/refonte-site-internet",
  },
  openGraph: {
    title: "Refonte de Site Internet - Transformez votre présence en ligne",
    description: "Design daté ? Performances lentes ? Découvrez notre approche pour une refonte de site qui booste votre image et votre business.",
    url: "https://www.artichaud-studio.com/refonte-site-internet",
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.artichaud-studio.com/images/og-refonte.jpg",
        width: 1200,
        height: 630,
        alt: "Avant Après Refonte Site Internet Artichaud",
      },
    ],
  },
};

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Artichaud Studio",
    "description": "Agence experte en refonte de site internet à Paris. Nouveau design, meilleure UX et SEO conservé. WordPress, Webflow, Wix.",
    "url": "https://www.artichaud-studio.com/refonte-site-internet",
    "telephone": "+33687538017",
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
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quand faut-il refaire son site internet ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Il est temps de refondre votre site si : il date de plus de 3-4 ans, il n'est pas responsive mobile, il se charge lentement, il ne reflète plus votre image ou vos services, ou si votre taux de conversion est faible."
        }
      },
      {
        "@type": "Question",
        "name": "Combien coûte une refonte de site internet ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une refonte de site vitrine démarre à partir de 2 500€. Le tarif varie selon la complexité du site actuel, le nombre de pages, les fonctionnalités souhaitées et la technologie choisie (WordPress, Webflow, sur mesure)."
        }
      },
      {
        "@type": "Question",
        "name": "Mon SEO sera-t-il conservé après la refonte ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Nous mettons en place un plan de redirection 301 pour conserver votre positionnement SEO existant. Nous réalisons également un audit SEO préalable pour identifier les pages à conserver en priorité."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le délai pour une refonte de site ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une refonte de site vitrine prend généralement 4 à 8 semaines selon la complexité. Un site e-commerce peut nécessiter 8 à 12 semaines."
        }
      }
    ]
  }
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
