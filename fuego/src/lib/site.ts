// Coordonnées du restaurant : une seule source pour la nav, les horaires, le footer et le JSON-LD.
// Valeurs de la maquette, à confirmer par le client (adresse, domaine, téléphone : voir AUDIT.md).
export const SITE = {
  name: "Fuego",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuego.com",
  urlDisplay: "https://fuego.com/",
  email: "contact@fuego.com",
  phoneDisplay: "+33 6 22 36 47 89",
  phoneHref: "tel:+33622364789",
  address: { street: "10 rue de la Reine", postalCode: "75011", city: "Paris", country: "FR" },
  instagram: "#",
  facebook: "#",
} as const;

// Horaires affichés (panneau) et repris dans le JSON-LD
export const HOURS = [
  { label: "Lundi au jeudi", days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "11:00", closes: "23:30" },
  { label: "Vendredi", days: ["Friday"], opens: "11:00", closes: "01:00" },
  { label: "Samedi", days: ["Saturday"], opens: "08:00", closes: "01:00" },
  { label: "Dimanche", days: ["Sunday"], opens: "08:00", closes: "23:00" },
] as const;

export const NAV_LINKS = [
  { label: "La Carte", href: "#carte" },
  { label: "L'Esprit Fuego", href: "#esprit" },
  { label: "Privatisation", href: "#privatisation" },
] as const;

// En attendant l'outil de réservation (TheFork, Zenchef…), « Réserver » mène au bloc horaires et contact
export const RESERVE_HREF = "#reserver";
