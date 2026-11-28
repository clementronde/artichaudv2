import { SITE } from "@/lib/site";

/**
 * Données structurées du commerce (SEO local). __TYPE_SCHEMA__ selon le métier :
 * LodgingBusiness / BedAndBreakfast (hébergement), Restaurant, Plumber, Electrician, HomeAndConstructionBusiness,
 * sinon LocalBusiness. Ajouter aggregateRating uniquement avec de vrais avis.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneHref.replace("tel:", ""),
    image: `${SITE.url}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
