// Pages d'atterrissage des offres packagées (/offre/<slug>), pensées pour le trafic publicitaire.
// Les prix, délais et contenus reprennent l'offre de la page Services : ne rien promettre de plus ici.

import type { OfferId } from '@/data/offers'

// Contact direct affiché sur les pages offre (appel et WhatsApp)
export const OFFER_PHONE = { label: '06 87 53 80 17', href: 'tel:0687538017' }

export function whatsappHref(label: string) {
  const text = `Bonjour, je suis intéressé(e) par l'${label} d'Artichaud Studio.`
  return `https://wa.me/33687538017?text=${encodeURIComponent(text)}`
}

export interface OfferPage {
  slug: string
  offerId: OfferId
  label: string
  title: string
  intro: string
  price: string
  // Prix barré : uniquement pour un prix réellement pratiqué auparavant
  oldPrice?: string
  priceNote: string
  tags: string[]
  facts: string[]
  image: { src: string; alt: string }
  audience: { title: string; text: string }
  includes: { title: string; text: string }[]
  steps: { title: string; text: string }[]
  projects: string[]
  faq: { question: string; answer: string }[]
  form: {
    title: string
    // Deuxième champ du formulaire : nom de l'activité ou adresse du site actuel
    secondField: { label: string; placeholder: string; key: 'company' | 'website' }
  }
  seo: { title: string; description: string }
}

export const offerPages: OfferPage[] = [
  {
    slug: 'site-flash',
    offerId: 'site-pro',
    label: 'Offre Flash',
    title: 'De zéro à votre site pro en 7 jours ouvrés.',
    intro:
      "Vous lancez votre activité et vous voulez une image crédible dès le premier jour ? On crée votre identité visuelle et votre site vitrine, sans des mois d'allers-retours.",
    price: '1 500 €',
    oldPrice: '2 800 €',
    priceNote: 'Hébergement et nom de domaine non compris',
    tags: ['Identité visuelle', 'Site web', 'SEO'],
    facts: ['Devis gratuit', '6 places disponibles', '7 jours ouvrés après signature du devis'],
    image: { src: '/services/offres/offre-site-pro-7-jours.avif', alt: "Offre Flash d'Artichaud Studio : site pro en 7 jours" },
    audience: {
      title: 'Pour qui ?',
      text: "Créateurs d'entreprise, indépendants, artisans, commerçants, thérapeutes, coachs : vous n'avez pas encore de site ni d'identité visuelle, et vous voulez avoir l'air d'une vraie marque tout de suite.",
    },
    includes: [
      { title: 'Questionnaire de cadrage', text: 'On cerne votre activité, vos clients et le ton de votre marque avant de dessiner quoi que ce soit.' },
      { title: 'Logo et déclinaisons', text: 'Un logo principal et ses variantes, prêts pour le web, les réseaux sociaux et l’impression.' },
      { title: 'Couleurs et typographies', text: 'Une palette et des polices qui donnent une personnalité claire à votre marque.' },
      { title: 'Mini-guide de marque', text: 'Un brandboard pour garder une image cohérente sur tous vos supports.' },
      { title: 'Site vitrine de 5 pages', text: 'Conçu et développé sur mesure, pensé pour le mobile.' },
      { title: 'Paramétrage SEO', text: 'Les bases techniques pour être trouvé sur Google dès la mise en ligne.' },
      { title: 'Deux allers-retours d’ajustements', text: 'Vous relisez, on ajuste. Deux fois.' },
      { title: 'Mise en ligne et fichiers sources', text: 'Votre site est en ligne et vous repartez avec tous vos fichiers.' },
    ],
    steps: [
      { title: 'Cadrage', text: 'Le questionnaire nous donne votre activité, vos cibles et vos envies.' },
      { title: 'Identité', text: 'Logo, couleurs, typographies et mini-guide de marque.' },
      { title: 'Site', text: 'Conception et développement de vos 5 pages.' },
      { title: 'Ajustements', text: 'Deux allers-retours pour caler chaque détail.' },
      { title: 'Mise en ligne', text: 'Paramétrage SEO, mise en ligne et remise des fichiers.' },
    ],
    projects: ['remembraance', 'jobmi', 'keleti'],
    faq: [
      { question: 'Quand démarrent les 7 jours ouvrés ?', answer: 'À la signature du devis.' },
      { question: 'Combien de pages comprend le site ?', answer: '5 pages, par exemple : accueil, services, à propos, réalisations et contact.' },
      { question: "L'hébergement et le nom de domaine sont-ils inclus ?", answer: "Non, ils ne sont pas compris dans les 1 500 €. On en parle ensemble au moment du devis." },
      { question: "Combien d'ajustements sont prévus ?", answer: 'Deux allers-retours, sur l’identité comme sur le site.' },
      { question: 'Pourquoi des places limitées ?', answer: 'Pour tenir le délai de 7 jours ouvrés, nous ne prenons que 6 projets à la fois.' },
    ],
    form: {
      title: 'Parlez-nous de votre activité',
      secondField: { label: 'Votre activité', placeholder: 'Ex. : coach sportif à Boulogne', key: 'company' },
    },
    seo: {
      title: 'Offre Flash : identité et site pro en 7 jours',
      description: "Logo, identité visuelle, site vitrine de 5 pages et SEO, livrés en 7 jours ouvrés pour 1 500 €. Devis gratuit, 6 places disponibles.",
    },
  },
  {
    slug: 'refonte',
    offerId: 'refonte',
    label: 'Offre Refresh',
    title: 'Modernisez votre site en 7 jours ouvrés.',
    intro:
      "Votre activité a évolué, mais votre site date de plusieurs années ? On modernise votre identité et on repense votre site pour qu'il reflète enfin la valeur de vos services, sans perdre votre référencement.",
    price: '1 500 €',
    oldPrice: '2 200 €',
    priceNote: 'Hébergement et nom de domaine non compris',
    tags: ['Identité visuelle', 'Site web', 'SEO'],
    facts: ['Devis gratuit', '6 places disponibles', '7 jours ouvrés après signature du devis'],
    image: { src: '/services/offres/offre-refonte-7-jours.avif', alt: "Offre Refresh d'Artichaud Studio : refonte de site en 7 jours" },
    audience: {
      title: 'Pour qui ?',
      text: 'TPE, PME, commerces et professions libérales dont le site a pris un coup de vieux : lent, mal affiché sur mobile ou qui ne ressemble plus à ce que vous faites aujourd’hui.',
    },
    includes: [
      { title: "Audit rapide de l'existant", text: 'On repère ce qui freine votre site et ce qu’il faut garder.' },
      { title: 'Logo modernisé et charte révisée', text: 'Votre identité rafraîchie, sans perdre ce qui vous rend reconnaissable.' },
      { title: 'Refonte complète du design', text: 'Un site actuel, à la hauteur de vos services.' },
      { title: 'Une structure pensée pour convertir', text: 'Des pages organisées pour transformer vos visiteurs en demandes.' },
      { title: 'Adaptation mobile et tablette', text: 'Un site impeccable sur tous les écrans.' },
      { title: 'Référencement conservé', text: 'Vos anciens liens sont redirigés vers les nouvelles pages.' },
      { title: 'Ajustements ciblés', text: 'Une phase d’ajustements pour caler chaque détail.' },
      { title: 'Mise en production et prise en main', text: 'On met en ligne et on vous montre comment faire vivre votre site.' },
    ],
    steps: [
      { title: 'Audit', text: 'On analyse votre site actuel et ce qu’il faut conserver.' },
      { title: 'Identité', text: 'Logo modernisé et charte révisée.' },
      { title: 'Refonte', text: 'Nouveau design, nouvelle structure, adaptation mobile.' },
      { title: 'Ajustements', text: 'On cale les derniers détails avec vous.' },
      { title: 'Mise en ligne', text: 'Redirections, mise en production et prise en main.' },
    ],
    projects: ['lumyn', 'charitio', 'remembraance'],
    faq: [
      { question: 'Quand démarrent les 7 jours ouvrés ?', answer: 'À la signature du devis.' },
      { question: 'Vais-je perdre mon référencement ?', answer: 'Non : vos anciens liens sont redirigés vers les nouvelles pages pour conserver votre référencement.' },
      { question: 'Mon site reste-t-il en ligne pendant la refonte ?', answer: 'Oui. Le nouveau site est préparé à part, puis mis en ligne une fois validé.' },
      { question: "L'hébergement et le nom de domaine sont-ils inclus ?", answer: "Non, ils ne sont pas compris dans les 1 500 €. On en parle ensemble au moment du devis." },
      { question: 'Pourquoi des places limitées ?', answer: 'Pour tenir le délai de 7 jours ouvrés, nous ne prenons que 6 projets à la fois.' },
    ],
    form: {
      title: 'Parlez-nous de votre site',
      secondField: { label: 'Votre site actuel', placeholder: 'https://votresite.fr', key: 'website' },
    },
    seo: {
      title: 'Offre Refresh : refonte de site en 7 jours',
      description: "Identité modernisée, nouveau design, site mobile et référencement conservé, en 7 jours ouvrés pour 1 500 €. Devis gratuit.",
    },
  },
  {
    slug: 'presence-en-ligne',
    offerId: 'presence',
    label: 'Offre Visibilité & Sérénité',
    title: 'On s’occupe de votre présence en ligne.',
    intro:
      "Vous avez déjà un site, mais vous manquez de temps pour le maintenir à jour et vous n'apparaissez pas sur Google ? On s'occupe de la technique et de votre référencement local chaque mois, pendant que vous vous concentrez sur vos clients.",
    price: '350 € / mois',
    priceNote: 'Sans engagement',
    tags: ['Référencement', 'Maintenance', 'Sécurité'],
    facts: ['Devis gratuit', 'Sans engagement', 'Un rapport chaque mois'],
    image: { src: '/services/offres/offre-presence-en-ligne.avif', alt: "Offre Visibilité & Sérénité d'Artichaud Studio : référencement, maintenance et sécurité" },
    audience: {
      title: 'Pour qui ?',
      text: 'Les entreprises qui ont un site mais personne pour s’en occuper : il ralentit, recule sur Google ou n’a pas été mis à jour depuis longtemps.',
    },
    includes: [
      { title: 'Audit technique et SEO de départ', text: 'On fait le point sur votre site avant de commencer.' },
      { title: 'Mises à jour mensuelles', text: 'Le site et ses extensions restent à jour.' },
      { title: 'Sauvegarde mensuelle', text: 'Une copie de votre site chaque mois.' },
      { title: 'Surveillance sécurité et disponibilité', text: 'La sécurité et la disponibilité de votre site sont surveillées.' },
      { title: 'Fiche Google Business Profile optimisée', text: 'Pour mieux apparaître dans les recherches locales et sur Maps.' },
      { title: 'Suivi du référencement local', text: 'Votre visibilité Google travaillée et suivie chaque mois.' },
      { title: 'Jusqu’à 1 h de petites modifications', text: 'Un texte, une photo, un horaire : on s’en charge.' },
      { title: 'Un rapport mensuel', text: 'Ce qui a été fait et ce qui avance, en clair.' },
    ],
    steps: [
      { title: 'Audit', text: 'État technique et SEO de votre site au départ.' },
      { title: 'Maintenance', text: 'Mises à jour, sauvegarde et surveillance chaque mois.' },
      { title: 'Référencement', text: 'Fiche Google Business Profile et référencement local.' },
      { title: 'Modifications', text: 'Jusqu’à 1 h de petites modifications par mois.' },
      { title: 'Rapport', text: 'Un point clair sur ce qui a été fait.' },
    ],
    projects: ['remembraance', 'lumyn', 'charitio'],
    faq: [
      { question: 'Y a-t-il un engagement ?', answer: 'Non, l’offre est sans engagement.' },
      { question: 'Que comprend la maintenance ?', answer: 'Les mises à jour du site et de ses extensions, une sauvegarde mensuelle et la surveillance de la sécurité et de la disponibilité.' },
      { question: 'Et le référencement ?', answer: 'Nous optimisons votre fiche Google Business Profile et suivons votre référencement local chaque mois.' },
      { question: 'Puis-je demander des modifications ?', answer: 'Oui, jusqu’à 1 h de petites modifications par mois.' },
    ],
    form: {
      title: 'Parlez-nous de votre site',
      secondField: { label: 'Votre site actuel', placeholder: 'https://votresite.fr', key: 'website' },
    },
    seo: {
      title: 'Offre Visibilité & Sérénité : SEO et maintenance',
      description: "Référencement local, maintenance, sauvegardes et sécurité de votre site pour 350 € par mois, sans engagement.",
    },
  },
]

export function getOfferPage(slug: string): OfferPage | undefined {
  return offerPages.find((page) => page.slug === slug)
}
