// Offres packagées : affichées sur la page Services et pré-remplies dans le formulaire de contact (?offre=<id>)

export type OfferId =
  | 'site-pro' | 'refonte' | 'presence'
  | 'pack-essentiel' | 'pack-signature' | 'pack-ecosysteme'
  | 'pack-vitrine' | 'pack-ecommerce'
  | 'pack-maintenance' | 'pack-seo' | 'pack-duo'
  | 'resto' | 'resto-identite' | 'resto-pack' | 'resto-site'
  | 'artisan' | 'artisan-identite' | 'artisan-pack' | 'artisan-site'
  | 'express' | 'express-identite' | 'express-pack' | 'express-site'

interface Offer {
  label: { fr: string; en: string }
  // Services pré-sélectionnés dans le formulaire (ids de t.contact.services)
  services: string[]
  // Budget pré-sélectionné (id de t.contact.budgets) : le formulaire s'ouvre alors directement sur les coordonnées
  budget?: string
  // Message pré-rempli (modifiable) dans le formulaire, pour ne pas faire retaper l'offre vue
  message?: { fr: string; en: string }
  // Prix en euros envoyé comme valeur de conversion (Google Ads, Meta) ; absent pour les offres mensuelles ou à définir
  value?: number
}

export const offers: Record<OfferId, Offer> = {
  'site-pro': {
    label: { fr: 'Offre Flash — 1 500 €', en: 'Flash offer — €1,500' },
    value: 1500,
    services: ['branding', 'webdesign', 'webdev', 'marketing'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par l'offre Flash (identité visuelle + site pro en 7 jours ouvrés). Mon activité : ",
      en: "Hello, I'm interested in the Flash offer (brand identity + professional website in 7 working days). My business: ",
    },
  },
  refonte: {
    label: { fr: 'Offre Refresh — 1 500 €', en: 'Refresh offer — €1,500' },
    value: 1500,
    services: ['branding', 'webdesign', 'webdev', 'marketing'],
    budget: 'small',
    message: {
      fr: "Bonjour, je souhaite moderniser mon site avec l'offre Refresh (refonte en 7 jours ouvrés). ",
      en: "Hello, I'd like to modernise my website with the Refresh offer (redesign in 7 working days). ",
    },
  },
  presence: {
    label: { fr: 'Offre Visibilité & Sérénité — 350 €/mois', en: 'Visibility & Peace of Mind offer — €350/month' },
    services: ['webdev', 'marketing'],
    budget: 'small',
    message: {
      fr: "Bonjour, je souhaite confier le suivi de mon site (référencement, maintenance, sécurité) à Artichaud. ",
      en: "Hello, I'd like Artichaud to look after my website (SEO, maintenance, security). ",
    },
  },
  'pack-essentiel': {
    label: { fr: 'Pack Essentiel — 1 000 €', en: 'Essentiel pack — €1,000' },
    value: 1000,
    services: ['branding'],
    budget: 'small',
  },
  'pack-signature': {
    label: { fr: 'Pack Signature — 1 500 €', en: 'Signature pack — €1,500' },
    value: 1500,
    services: ['branding'],
    budget: 'small',
  },
  'pack-ecosysteme': {
    label: { fr: 'Pack Écosystème — 2 000 €', en: 'Écosystème pack — €2,000' },
    value: 2000,
    services: ['branding'],
    budget: 'small',
  },
  'pack-vitrine': {
    label: { fr: 'Pack Vitrine — dès 2 000 €', en: 'Vitrine pack — from €2,000' },
    value: 2000,
    services: ['webdesign', 'webdev'],
    budget: 'small',
  },
  'pack-ecommerce': {
    label: { fr: 'Pack E-commerce — dès 8 000 €', en: 'E-commerce pack — from €8,000' },
    value: 8000,
    services: ['webdesign', 'webdev'],
    budget: 'large',
  },
  'pack-maintenance': {
    label: { fr: 'Pack Maintenance — 300 €/mois', en: 'Maintenance pack — €300/month' },
    services: ['webdev'],
    budget: 'small',
  },
  'pack-seo': {
    label: { fr: 'Pack SEO — 350 €/mois', en: 'SEO pack — €350/month' },
    services: ['marketing'],
    budget: 'small',
  },
  'pack-duo': {
    label: { fr: 'Pack Duo — 500 €/mois', en: 'Duo pack — €500/month' },
    services: ['webdev', 'marketing'],
    budget: 'small',
  },
  // Formules de la landing restaurant (/creation-site-internet-restaurant) ; « resto » quand aucune formule n'est choisie
  resto: {
    label: { fr: 'Restaurant · formule à définir', en: 'Restaurant · package to be defined' },
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je voudrais un site pour mon restaurant. Mon restaurant : ",
      en: "Hello, I'd like a website for my restaurant. My restaurant: ",
    },
  },
  'resto-identite': {
    label: { fr: 'Restaurant · Identité graphique — 1 000 €', en: 'Restaurant · Brand identity — €1,000' },
    value: 1000,
    services: ['branding'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Identité graphique (charte, menu, devanture…). Mon restaurant : ",
      en: "Hello, I'm interested in the Brand identity package (guidelines, menu, storefront…). My restaurant: ",
    },
  },
  'resto-pack': {
    label: { fr: 'Restaurant · Pack complet — 2 000 €', en: 'Restaurant · Full pack — €2,000' },
    value: 2000,
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par le Pack complet (identité + site en 7 jours). Mon restaurant : ",
      en: "Hello, I'm interested in the Full pack (identity + website in 7 days). My restaurant: ",
    },
  },
  'resto-site': {
    label: { fr: 'Restaurant · Site web — 1 500 €', en: 'Restaurant · Website — €1,500' },
    value: 1500,
    services: ['webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Site web pour mon restaurant. Mon restaurant : ",
      en: "Hello, I'm interested in the Website package for my restaurant. My restaurant: ",
    },
  },
  // Formules de la landing artisan (/creation-site-internet-artisan) ; « artisan » quand aucune formule n'est choisie
  artisan: {
    label: { fr: 'Artisan · formule à définir', en: 'Craftsman · package to be defined' },
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je voudrais un site pour mon activité. Mon activité : ",
      en: "Hello, I'd like a website for my business. My business: ",
    },
  },
  'artisan-identite': {
    label: { fr: 'Artisan · Identité graphique — 1 000 €', en: 'Craftsman · Brand identity — €1,000' },
    value: 1000,
    services: ['branding'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Identité graphique (logo, devis, cartes, véhicule…). Mon activité : ",
      en: "Hello, I'm interested in the Brand identity package (logo, quotes, cards, vehicle…). My business: ",
    },
  },
  'artisan-pack': {
    label: { fr: 'Artisan · Pack complet — 2 000 €', en: 'Craftsman · Full pack — €2,000' },
    value: 2000,
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par le Pack complet (identité + site en 7 jours). Mon activité : ",
      en: "Hello, I'm interested in the Full pack (identity + website in 7 days). My business: ",
    },
  },
  'artisan-site': {
    label: { fr: 'Artisan · Site web — 1 500 €', en: 'Craftsman · Website — €1,500' },
    value: 1500,
    services: ['webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Site web pour mon activité. Mon activité : ",
      en: "Hello, I'm interested in the Website package for my business. My business: ",
    },
  },
  // Formules de la landing tous métiers (/creation-site-internet-7-jours) ; « express » quand aucune formule n'est choisie
  express: {
    label: { fr: 'Site en 7 jours · formule à définir', en: '7-day website · package to be defined' },
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je voudrais un site internet en 7 jours. Mon activité : ",
      en: "Hello, I'd like a website in 7 days. My business: ",
    },
  },
  'express-identite': {
    label: { fr: 'Site en 7 jours · Identité graphique — 1 000 €', en: '7-day website · Brand identity — €1,000' },
    value: 1000,
    services: ['branding'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Identité graphique (logo, charte, supports…). Mon activité : ",
      en: "Hello, I'm interested in the Brand identity package (logo, guidelines, print…). My business: ",
    },
  },
  'express-pack': {
    label: { fr: 'Site en 7 jours · Pack complet — 2 000 €', en: '7-day website · Full pack — €2,000' },
    value: 2000,
    services: ['branding', 'webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par le Pack complet (identité + site en 7 jours). Mon activité : ",
      en: "Hello, I'm interested in the Full pack (identity + website in 7 days). My business: ",
    },
  },
  'express-site': {
    label: { fr: 'Site en 7 jours · Site web — 1 500 €', en: '7-day website · Website — €1,500' },
    value: 1500,
    services: ['webdesign', 'webdev'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par la formule Site web en 7 jours. Mon activité : ",
      en: "Hello, I'm interested in the 7-day Website package. My business: ",
    },
  },
}

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(offers, value)
}
