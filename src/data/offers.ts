// Offres packagées : affichées sur la page Services et pré-remplies dans le formulaire de contact (?offre=<id>)

export type OfferId =
  | 'site-pro' | 'refonte' | 'presence'
  | 'pack-essentiel' | 'pack-signature' | 'pack-ecosysteme'
  | 'pack-vitrine' | 'pack-ecommerce'
  | 'pack-maintenance' | 'pack-seo' | 'pack-duo'

interface Offer {
  label: { fr: string; en: string }
  // Services pré-sélectionnés dans le formulaire (ids de t.contact.services)
  services: string[]
  // Budget pré-sélectionné (id de t.contact.budgets) : le formulaire s'ouvre alors directement sur les coordonnées
  budget?: string
  // Message pré-rempli (modifiable) dans le formulaire, pour ne pas faire retaper l'offre vue
  message?: { fr: string; en: string }
}

export const offers: Record<OfferId, Offer> = {
  'site-pro': {
    label: { fr: 'Offre Flash — 1 500 €', en: 'Flash offer — €1,500' },
    services: ['branding', 'webdesign', 'webdev', 'marketing'],
    budget: 'small',
    message: {
      fr: "Bonjour, je suis intéressé(e) par l'offre Flash (identité visuelle + site pro en 7 jours ouvrés). Mon activité : ",
      en: "Hello, I'm interested in the Flash offer (brand identity + professional website in 7 working days). My business: ",
    },
  },
  refonte: {
    label: { fr: 'Offre Refresh — 1 500 €', en: 'Refresh offer — €1,500' },
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
    services: ['branding'],
    budget: 'small',
  },
  'pack-signature': {
    label: { fr: 'Pack Signature — 1 500 €', en: 'Signature pack — €1,500' },
    services: ['branding'],
    budget: 'small',
  },
  'pack-ecosysteme': {
    label: { fr: 'Pack Écosystème — 2 000 €', en: 'Écosystème pack — €2,000' },
    services: ['branding'],
    budget: 'small',
  },
  'pack-vitrine': {
    label: { fr: 'Pack Vitrine — dès 2 000 €', en: 'Vitrine pack — from €2,000' },
    services: ['webdesign', 'webdev'],
    budget: 'small',
  },
  'pack-ecommerce': {
    label: { fr: 'Pack E-commerce — dès 8 000 €', en: 'E-commerce pack — from €8,000' },
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
}

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(offers, value)
}
