// Coordonnées du client : une seule source pour le header, le footer, les liens tel: et le JSON-LD
export const SITE = {
  name: "__NOM_CLIENT__",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://__DOMAINE__",
  email: "__EMAIL__",
  phoneDisplay: "__TELEPHONE__",
  phoneHref: "tel:+33__TELEPHONE_SANS_ZERO__",
  address: { street: "__RUE__", postalCode: "__CP__", city: "__VILLE__", country: "FR" },
} as const;

export const NAV_LINKS = [
  // { label: "Services", href: "#services" },
] as const;
