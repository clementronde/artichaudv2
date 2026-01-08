import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs & Prix | Création Site Internet Paris - Artichaud Studio",
  description: "Découvrez nos tarifs transparents : Site vitrine dès 3000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Devis gratuit en 24h. Paiement échelonné disponible.",
  keywords: [
    "prix création site internet",
    "tarif agence web Paris",
    "combien coûte un site vitrine",
    "prix site e-commerce",
    "devis site web Paris",
    "tarif développement web",
    "prix agence digitale",
    "cout site internet sur mesure"
  ],
  openGraph: {
    title: "Tarifs & Prix - Artichaud Studio Paris",
    description: "Site vitrine dès 3000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Devis gratuit sous 48h.",
    url: "https://artichaud-studio.com/tarifs",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
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
    description: "Site vitrine dès 3000€, E-commerce dès 8000€, Sur-mesure dès 15000€.",
    images: ["https://artichaud-studio.com/icon.png"]
  },
  alternates: {
    canonical: "https://artichaud-studio.com/tarifs"
  }
};

// Schema.org Offer pour SEO
const offerSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Tarifs Création de Sites Web - Artichaud Studio",
  "description": "Nos forfaits de création de sites internet : vitrine, e-commerce et sur-mesure",
  "provider": {
    "@type": "DesignAgency",
    "name": "Artichaud Studio",
    "url": "https://artichaud-studio.com"
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
        "price": "3000",
        "minPrice": "3000",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      {children}
    </>
  );
}
