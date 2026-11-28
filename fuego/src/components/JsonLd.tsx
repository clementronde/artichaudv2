import { HOURS, SITE } from "@/lib/site";

/** Données structurées du restaurant (SEO local). aggregateRating à ajouter uniquement avec de vrais avis. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phoneHref.replace("tel:", ""),
    image: [`${SITE.url}/images/og.jpg`, `${SITE.url}/images/salle-bougies.jpg`],
    description:
      "Restaurant à Paris 11e : cuisine au feu de bois, à la flamme et à la braise, produits frais et de saison, salle privatisable.",
    servesCuisine: ["Cuisine au feu de bois", "Grillades à la braise", "Cuisine de saison"],
    priceRange: "€€",
    acceptsReservations: true,
    hasMenu: `${SITE.url}/#carte`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.country,
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
