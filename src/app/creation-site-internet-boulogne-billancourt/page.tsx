import type { Metadata } from "next";
import BoulogneClient from "./BoulogneClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Création site internet Boulogne-Billancourt | Agence web 92",
  description: "Création de site internet à Boulogne-Billancourt : site vitrine, refonte, SEO local, design sur mesure et accompagnement pour entreprises du 92.",
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
    images: [
      {
        url: "https://www.artichaud-studio.fr/images/og-boulogne.jpg",
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
  "description": "Agence web à Boulogne-Billancourt. Création de sites vitrines, refontes, SEO local et design sur mesure pour TPE, PME et indépendants du 92.",
  "url": "https://www.artichaud-studio.fr/creation-site-internet-boulogne-billancourt",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quel est le tarif d'un site internet vitrine à Boulogne-Billancourt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pour un site vitrine professionnel à Boulogne-Billancourt, les tarifs démarrent à 3 000€ pour une solution simple et vont de 5 000€ à 8 000€ pour un site sur-mesure avec stratégie SEO locale, animations et CMS. Nous proposons un devis gratuit sous 48h."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps pour créer un site visible sur Google à Boulogne-Billancourt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "La création du site prend 3 à 6 semaines selon la complexité. Pour la visibilité Google locale (requêtes comme 'votre métier Boulogne-Billancourt'), comptez 2 à 4 mois après la mise en ligne avec un SEO local correctement structuré dès le départ."
      }
    },
    {
      "@type": "Question",
      "name": "Artichaud Studio propose-t-il des réunions en présentiel à Boulogne-Billancourt ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Notre studio est situé au 18 rue d'Aguesseau à Boulogne-Billancourt (92100), accessible depuis le métro Marcel Sembat (ligne 9). Nous proposons des réunions en présentiel ou en visioconférence selon vos préférences et votre localisation."
      }
    },
    {
      "@type": "Question",
      "name": "Intervenez-vous dans toutes les communes du 92 ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. Nous accompagnons des entreprises à Boulogne-Billancourt, Issy-les-Moulineaux, Neuilly-sur-Seine, Saint-Cloud, Sèvres, Meudon et dans tout le département des Hauts-de-Seine. Nous travaillons également avec des clients à Paris et partout en France en remote."
      }
    },
    {
      "@type": "Question",
      "name": "Dois-je payer un abonnement mensuel pour mon site web ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Vous payez la création une seule fois. Les seuls frais récurrents sont l'hébergement et le nom de domaine (environ 50€ à 150€/an). Nous proposons des contrats de maintenance optionnels à partir de 150€/mois pour les mises à jour et le support."
      }
    },
    {
      "@type": "Question",
      "name": "Mon site sera-t-il référencé sur les recherches locales à Boulogne ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est notre priorité pour les clients locaux. Nous structurons le site avec une arborescence SEO locale, des balises optimisées et du contenu ciblé sur les requêtes Boulogne-Billancourt et 92. Nous vous conseillons aussi sur la création et l'optimisation de votre fiche Google Business Profile."
      }
    }
  ]
}

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
