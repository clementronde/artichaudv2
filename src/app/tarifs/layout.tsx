import type { Metadata } from "next";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Tarifs & Prix Création Site Internet Boulogne-Billancourt | Artichaud Studio"
  },
  description: "Tarifs transparents : Site vitrine dès 3000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Agence web à Boulogne-Billancourt. Devis gratuit en 24h.",
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
    description: "Site vitrine dès 3000€, E-commerce dès 8000€, Sur-mesure dès 15000€. Devis gratuit sous 48h.",
    url: `${SITE_URL}/tarifs`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
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
    images: [`${SITE_URL}/icon.png`]
  },
  alternates: {
    canonical: `${SITE_URL}/tarifs`
  }
};

// Schema.org FAQPage pour rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pourquoi une telle fourchette de prix ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Le prix dépend de la complexité du projet : nombre de pages, fonctionnalités spécifiques, design custom, intégrations tierces. Un site vitrine de 5 pages sera à 3000€, tandis qu'un site de 20 pages avec animations avancées sera à 8000€."
      }
    },
    {
      "@type": "Question",
      "name": "Le prix inclut-il l'hébergement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non, l'hébergement est facturé séparément (40-100€/an selon vos besoins). Nous vous conseillons les meilleurs hébergeurs et pouvons gérer la configuration pour vous."
      }
    },
    {
      "@type": "Question",
      "name": "Proposez-vous un paiement échelonné ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui ! Nous fonctionnons par jalons : 30% à la signature, 40% à la validation des maquettes, 30% à la livraison. Pour les projets >15000€, un échelonnement sur 3-4 mois est possible."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il des frais cachés ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aucun frais caché. Le devis détaille tous les coûts : conception, développement, intégrations. Seuls l'hébergement, le nom de domaine et les éventuelles licences tierces sont en sus."
      }
    },
    {
      "@type": "Question",
      "name": "Puis-je avoir un devis gratuit ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolument ! Nous proposons un premier échange gratuit de 30 minutes pour comprendre votre projet, puis nous vous envoyons un devis détaillé sous 48h."
      }
    }
  ]
}

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
