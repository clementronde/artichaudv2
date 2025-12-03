export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DesignAgency", // ou "WebSite" ou "DesignAgency"
    "name": "Artichaud Studio",
    "image": "https://artichaud-studio.com/opengraph-image.png",
    "url": "https://artichaud-studio.com",
    "telephone": "07 66 48 99 82", // Ton numéro public
    "email": "artichaud.studio@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Votre adresse", 
      "addressLocality": "Paris",
      "postalCode": "75000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566, // À ajuster précisément
      "longitude": 2.3522
    },
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
      "https://www.instagram.com/...",
      "https://www.linkedin.com/company/artichaud-studio"
    ],
    "priceRange": "$$$"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}