// Offres packagées : affichées sur la page Services et pré-remplies dans le formulaire de contact (?offre=<id>)

export type OfferId = 'site-pro' | 'refonte' | 'presence'

interface Offer {
  label: { fr: string; en: string }
  // Services pré-sélectionnés dans le formulaire (ids de t.contact.services)
  services: string[]
}

export const offers: Record<OfferId, Offer> = {
  'site-pro': {
    label: { fr: 'Site pro en 7 jours — 1 500 €', en: 'Pro website in 7 days — €1,500' },
    services: ['branding', 'webdesign', 'webdev', 'marketing'],
  },
  refonte: {
    label: { fr: 'Refonte en 7 jours — 1 500 €', en: 'Redesign in 7 days — €1,500' },
    services: ['branding', 'webdesign', 'webdev', 'marketing'],
  },
  presence: {
    label: { fr: 'Présence en ligne — 350 €/mois', en: 'Online presence — €350/month' },
    services: ['marketing'],
  },
}

export function isOfferId(value: unknown): value is OfferId {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(offers, value)
}
