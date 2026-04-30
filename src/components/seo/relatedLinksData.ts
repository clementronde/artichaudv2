export type RelatedLink = {
  href: string
  label: string
  description: string
}

export const relatedLinkGroups = {
  localSite: [
    {
      href: '/services/creation-site-internet',
      label: 'Création de site internet sur-mesure',
      description: 'Notre approche complète pour cadrer, designer et développer un site performant.',
    },
    {
      href: '/creation-site-vitrine-wordpress-webflow-wix',
      label: 'Choisir entre WordPress, Webflow et Wix',
      description: 'Un comparatif utile avant de décider du CMS de votre futur site vitrine.',
    },
    {
      href: '/services/seo-referencement-naturel',
      label: 'Préparer le référencement naturel',
      description: 'Structure technique, contenus et maillage interne pour gagner en visibilité.',
    },
    {
      href: '/tarifs',
      label: 'Comprendre les tarifs',
      description: 'Les budgets habituels selon le niveau de design, de contenu et de fonctionnalités.',
    },
  ],
  cms: [
    {
      href: '/services/creation-site-internet',
      label: 'Création de site internet',
      description: 'Passer du choix du CMS au cadrage concret du projet.',
    },
    {
      href: '/refonte-site-internet',
      label: 'Refonte ou migration de site',
      description: 'Moderniser un site existant en conservant les acquis SEO.',
    },
    {
      href: '/blog/webflow-avantages-inconvenients-pme',
      label: 'Avantages et limites de Webflow',
      description: 'Un guide pour PME avant de choisir une plateforme no-code.',
    },
    {
      href: '/blog/prix-site-vitrine-iledefrance-2025',
      label: 'Prix d’un site vitrine en Île-de-France',
      description: 'Repères de budget pour comparer les options WordPress, Webflow ou Wix.',
    },
  ],
  redesign: [
    {
      href: '/services/seo-referencement-naturel',
      label: 'Audit SEO et référencement',
      description: 'Identifier les pages à conserver et les optimisations prioritaires.',
    },
    {
      href: '/creation-site-vitrine-wordpress-webflow-wix',
      label: 'Comparer les CMS',
      description: 'Choisir la bonne base technique avant une refonte ou une migration.',
    },
    {
      href: '/blog/refonte-site-internet-quand-et-comment',
      label: 'Guide de la refonte de site',
      description: 'Quand refondre, comment cadrer et quels pièges éviter.',
    },
    {
      href: '/contact',
      label: 'Demander un diagnostic',
      description: 'Faire le point sur l’existant avant d’engager une refonte.',
    },
  ],
  serviceWeb: [
    {
      href: '/creation-site-internet-paris',
      label: 'Création site internet Paris',
      description: 'Une page locale pour les entreprises basées à Paris et en Île-de-France.',
    },
    {
      href: '/creation-site-internet-boulogne-billancourt',
      label: 'Création site internet Boulogne-Billancourt',
      description: 'Un accompagnement de proximité pour l’ouest parisien.',
    },
    {
      href: '/creation-site-vitrine-wordpress-webflow-wix',
      label: 'Site vitrine WordPress, Webflow ou Wix',
      description: 'Comprendre quelle plateforme sert le mieux votre projet.',
    },
    {
      href: '/simulateur',
      label: 'Simuler un budget',
      description: 'Estimer rapidement l’ordre de grandeur de votre site.',
    },
  ],
  serviceSeo: [
    {
      href: '/services/creation-site-internet',
      label: 'Créer un site pensé pour le SEO',
      description: 'Intégrer la structure, la performance et les contenus dès la conception.',
    },
    {
      href: '/refonte-site-internet',
      label: 'Refondre sans perdre son SEO',
      description: 'Préserver les pages qui performent et corriger les freins techniques.',
    },
    {
      href: '/blog/piliers-seo-2026',
      label: 'Les piliers SEO en 2026',
      description: 'Les bases à connaître pour améliorer la visibilité d’un site.',
    },
    {
      href: '/blog/choisir-nom-de-domaine',
      label: 'Choisir son nom de domaine',
      description: 'Un sujet simple en apparence, mais stratégique pour le référencement.',
    },
  ],
  serviceBranding: [
    {
      href: '/services/creation-site-internet',
      label: 'Déployer l’identité sur un site',
      description: 'Transformer une direction artistique en expérience web claire et utile.',
    },
    {
      href: '/works',
      label: 'Voir les réalisations',
      description: 'Parcourir des projets de branding, webdesign et direction artistique.',
    },
    {
      href: '/blog/guide-rebranding-2025',
      label: 'Choisir une agence branding',
      description: 'Comprendre l’intérêt d’un studio créatif pour une marque.',
    },
    {
      href: '/contact',
      label: 'Parler d’un projet de marque',
      description: 'Cadrer une identité visuelle, un logo ou une refonte de marque.',
    },
  ],
  editorial: [
    {
      href: '/services/creation-site-internet',
      label: 'Créer un site internet',
      description: 'Notre service pour concevoir un site clair, rapide et administrable.',
    },
    {
      href: '/services/seo-referencement-naturel',
      label: 'Travailler le référencement',
      description: 'Structurer les contenus pour capter un trafic plus qualifié.',
    },
    {
      href: '/refonte-site-internet',
      label: 'Refondre un site existant',
      description: 'Moderniser l’expérience sans repartir de zéro.',
    },
    {
      href: '/tarifs',
      label: 'Comparer les budgets',
      description: 'Relier vos objectifs aux bons niveaux d’investissement.',
    },
  ],
} satisfies Record<string, RelatedLink[]>
