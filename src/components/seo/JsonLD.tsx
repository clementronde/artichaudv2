export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["DesignAgency", "LocalBusiness"],
    "name": "Artichaud Studio",
    "alternateName": "Artichaud",
    "description": "Agence de branding et création de sites web à Paris. Design d'identité visuelle, développement web sur mesure et stratégie digitale pour marques ambitieuses.",
    "image": "https://artichaud-studio.com/icon.png",
    "logo": {
      "@type": "ImageObject",
      "url": "https://artichaud-studio.com/icon.png",
      "width": 512,
      "height": 512,
      "caption": "Artichaud Studio Logo"
    },
    "url": "https://artichaud-studio.com",
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
      "latitude": "48.8566",
      "longitude": "2.3522"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Île-de-France"
      }
    ],
    "serviceType": [
      "Branding",
      "Identité Visuelle",
      "Web Design",
      "Développement Web",
      "Stratégie Digitale",
      "Webmarketing",
      "SEO"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/artichaud-studio"
    ],
    "priceRange": "€€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "12",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}