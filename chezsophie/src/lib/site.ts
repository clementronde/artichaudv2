export const SITE = {
  name: "Chez Sophie",
  email: "bonjour@chezsophie.fr",
  address: "12 Chemin des Vignes, 61360 Belforêt en Perche",
  phoneDisplay: "06 43 20 44 17",
  phoneHref: "tel:+33643204417",
} as const;

export const BOOKING_MAILTO = `mailto:${SITE.email}?subject=${encodeURIComponent("Demande de réservation — Chez Sophie")}`;

export const NAV_LINKS = [
  { label: "La Maison", href: "#maison" },
  { label: "Les activités", href: "#activites" },
  { label: "Galerie", href: "#galerie" },
  { label: "Blog", href: "#blog" },
] as const;
