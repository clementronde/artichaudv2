export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "DesignAgency", "LocalBusiness"],
    "name": "Artichaud Studio",
    "legalName": "Artichaud Studio",
    "alternateName": "Artichaud",
    "description": "Agence de branding et création de sites web à Paris. Design d'identité visuelle, développement web sur mesure et stratégie digitale pour marques ambitieuses.",
    "image": "https://artichaud-studio.com/icon.png",
    "logo": {
      "@type": "ImageObject",
      "url": "https://artichaud-studio.com/icon.png",
      "width": 512,
      "height": 512,
      "contentUrl": "https://artichaud-studio.com/icon.png",
      "caption": "Artichaud Studio Logo",
      "inLanguage": "fr-FR"
    },
    "url": "https://artichaud-studio.com",
    "telephone": "+33697538017",
    "email": "artichaud.studio@gmail.com",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33697538017",
      "email": "artichaud.studio@gmail.com",
      "contactType": "customer service",
      "areaServed": "FR",
      "availableLanguage": ["French", "English"]
    },
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
      "https://www.linkedin.com/company/artichaud-studio",
      "https://www.instagram.com/artichaud.studio/",
      "https://www.tiktok.com/@artichaud.studio",
      "https://www.google.com/maps/place/Artichaud+Studio/@48.6807824,2.5026636,17z/data=!3m1!4b1!4m6!3m5!1s0x8abebbf9b07c404d:0xa0fe1ccef548cf3f!8m2!3d48.6807824!4d2.5026636!16s%2Fg%2F11mm8rb1gx",
      "https://artichaud-studio.com"
    ],
    "priceRange": "€€"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}