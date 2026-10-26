import type { Metadata } from "next";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { OG_IMAGE_URL, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Tarifs site internet Boulogne-Billancourt | Artichaud Studio"
  },
  description: "Tarifs transparents : Site vitrine dès 2000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Agence web à Boulogne-Billancourt. Devis gratuit en 24h.",
  keywords: [
    "prix création site internet Boulogne-Billancourt",
    "tarif agence web 92",
    "combien coûte un site vitrine",
    "prix site e-commerce",
    "devis site web Île-de-France",
    "tarif développement web",
    "prix agence digitale Boulogne-Billancourt",
    "cout site internet sur mesure"
  ],
  openGraph: {
    title: "Tarifs & Prix - Artichaud Studio Boulogne-Billancourt",
    description: "Site vitrine dès 2000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Devis gratuit sous 24h.",
    url: `${SITE_URL}/tarifs`,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Tarifs Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarifs & Prix - Artichaud Studio",
    description: "Site vitrine dès 2000€, E-commerce dès 8000€, Sur-mesure dès 15000€.",
    images: [OG_IMAGE_URL]
  },
  alternates: {
    canonical: `${SITE_URL}/tarifs`
  }
};

// Note SEO : pas de schema FAQPage ici — restreint par Google aux sites
// gouvernementaux/santé depuis août 2023, aucun rich snippet possible pour
// ce site. Les questions restent traitées dans le contenu visible de /tarifs
// et sur /faq (avec balisage Offer/BreadcrumbList ci-dessous, eux valides).

// Schema.org BreadcrumbList
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tarifs",
      "item": `${SITE_URL}/tarifs`
    }
  ]
}

// Schema.org Offer pour SEO
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Tarifs Création de Sites Web - Artichaud Studio",
  "description": "Nos forfaits de création de sites internet : vitrine, e-commerce et sur-mesure",
  "provider": {
    "@type": "DesignAgency",
    "name": "Artichaud Studio",
    "url": SITE_URL
  },
  "itemListElement": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Site Vitrine",
        "description": "Création d'un site vitrine professionnel responsive et optimisé SEO"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "2000",
        "minPrice": "2000",
        "maxPrice": "8000",
        "priceCurrency": "EUR"
      },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Site E-commerce",
        "description": "Boutique en ligne complète avec paiement sécurisé et gestion de stock"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "8000",
        "minPrice": "8000",
        "maxPrice": "20000",
        "priceCurrency": "EUR"
      },
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Développement Sur-mesure",
        "description": "Site web custom avec fonctionnalités avancées et architecture scalable"
      },
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "15000",
        "minPrice": "15000",
        "maxPrice": "50000",
        "priceCurrency": "EUR"
      },
      "availability": "https://schema.org/InStock"
    }
  ]
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      {children}
      <RelatedLinks
        title="Relier le budget au bon cadrage"
        links={[
          relatedLinkGroups.serviceWeb[0],
          relatedLinkGroups.cms[0],
          relatedLinkGroups.serviceSeo[0],
          relatedLinkGroups.serviceBranding[0],
        ]}
      />
    </>
  );
}
