export type Locale = 'fr' | 'en'

export const translations = {
  fr: {
    hero: {
      // Titre animé : les services s'écrivent puis s'effacent à la fin de la phrase
      title: {
        start: "Artichaud, l'agence qui fait monter la température de",
        services: ["votre identité", "votre site web", "vos réseaux sociaux", "votre webmarketing"],
      },
      scroll: "SCROLL",
      ctaDiscuss: "On en discute",
      ctaProjects: "Voir nos projets",
    },
    intro: {
      tagline: "Notre approche",
      heading:
        "Artichaud Studio est un studio de création de sites web et d'expériences digitales 360. Nous concevons des présences en ligne complètes, de l'idée à la mise en ligne.",
      para1:
        "Nous réunissons stratégie, direction artistique, UX/UI, développement, contenus et référencement pour créer des sites qui ne se contentent pas d'exister. Ils clarifient votre offre, rassurent vos visiteurs et transforment l'attention en demandes concrètes.",
      para2:
        "Site vitrine, refonte, landing page, CMS, animations, identité visuelle ou accompagnement SEO : nous pensons chaque point de contact comme une expérience cohérente, performante et facile à faire évoluer.",
      cta: "Découvrir nos services",
    },
    services: {
      cta: "Commençons",
      list: [
        {
          id: "001",
          title: "Identité de marque",
          description:
            "Nous construisons des marques claires et désirables : positionnement, messages, logo et univers visuel pensés pour être reconnus et faire confiance dès le premier regard.",
          items: [
            "Stratégie de marque",
            "Identité verbale",
            "Logo & identité visuelle",
            "Design system",
            "Pitch deck & go-to-market",
          ],
          image: "/projects/caisse-epargne/caisseepargneprojet1.avif",
        },
        {
          id: "002",
          title: "Création de site web",
          description:
            "Nous concevons des sites sur mesure, de la structure au développement, qui présentent votre offre avec clarté, chargent vite et transforment vos visiteurs en demandes.",
          items: [
            "UX & rédaction",
            "Design de site web",
            "Développement web",
            "SEO technique",
            "Animations & interactions",
          ],
          image: "/projects/remembraance/remembraanceprojet4.webp",
        },
        {
          id: "003",
          title: "Réseaux sociaux",
          description:
            "Nous définissons votre ligne éditoriale et créons des contenus à l'image de votre marque pour animer votre communauté et rester visible auprès de vos clients.",
          items: [
            "Stratégie social media",
            "Lignes éditoriales",
            "Création de contenu",
            "Templates de marque",
            "Pilotage & reporting",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "Webmarketing",
          description:
            "Nous attirons les bonnes personnes sur votre site et mesurons ce qui fonctionne, pour générer des demandes qualifiées de façon régulière.",
          items: [
            "SEO & SEA",
            "Landing pages",
            "Tracking & analytics",
            "Campagnes email",
            "Contenus marketing",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
      ],
    },
    highlight: {
      title: "À la une",
      viewAll: "Voir les projets",
      for: "pour",
    },
    testimonials: {
      tagline: "Témoignages",
      heading: "Ce que nos clients\ndisent de nous",
      readMore: "Discuter de mon projet",
      items: [
        {
          id: 1,
          name: "Victoria Lauro",
          role: "Fondatrice, Chez June",
          text: "Très heureuse de travailler avec Clément pour la maintenance et l'évolution de nos sites Chez June et June Chez Vous. Réactif, professionnel, efficace et toujours disponible pour trouver des solutions adaptées à nos besoins. Un vrai partenaire de confiance au quotidien. Merci 🙏",
        },
        {
          id: 2,
          name: "Le Cocon des Layes",
          role: "Gérante d'un gîte",
          text: `J'ai fait appel à Artichaud Studio pour la création du site internet de mon gîte, Le Cocon des Layes, et je suis ravie du résultat !

Le site reflète parfaitement l'ambiance et l'identité de mon hébergement, avec un design élégant, soigné et une navigation agréable.

J'ai particulièrement apprécié leur écoute, leur disponibilité et leur souci du détail tout au long du projet. Mes attentes ont été parfaitement comprises et traduites en un site à la fois esthétique et fonctionnel.

Ce que j'apprécie particulièrement, c'est que leur accompagnement ne s'arrête pas à la mise en ligne du site. Ils restent toujours disponibles pour répondre à mes questions, me conseiller et m'accompagner dans l'évolution de mon site internet. C'est un véritable atout de pouvoir compter sur une équipe aussi réactive et à l'écoute.

Je suis pleinement satisfaite de cette collaboration et recommande Artichaud Studio à tous ceux qui recherchent un site internet professionnel, personnalisé et un accompagnement de qualité !`,
        },
      ],
      seeMore: "Voir plus",
      seeLess: "Voir moins",
    },
    blog: {
      tagline: "Blog",
      heading: ["Soyez au courant", "De nos dernières actus"],
      discoverAll: "Voir tous les articles",
      viewAll: "Voir tout",
    },
    navbar: {
      works: "Projets",
      services: "Services",
      about: "À propos",
      contact: "Contact",
      letsTalk: "Contact",
      close: "Fermer",
    },
    consent: {
      title: "Un petit cookie ?",
      description: "Quelques traceurs pour mesurer l'audience et nos campagnes, uniquement avec votre accord.",
      learnMore: "En savoir plus",
      necessaryTitle: "Essentiels",
      necessaryDesc: "Nécessaires au fonctionnement du site (langue, sécurité du formulaire, mesure anonyme).",
      alwaysOn: "Toujours actifs",
      analyticsTitle: "Mesure d'audience",
      analyticsDesc: "Google Analytics et Google Tag Manager, pour comprendre comment le site est utilisé.",
      marketingTitle: "Marketing",
      marketingDesc: "Pixel Meta et pixel OpenAI, pour mesurer l'efficacité de nos publicités sur Facebook, Instagram et ChatGPT.",
      reject: "Refuser",
      accept: "Accepter",
      customize: "Personnaliser",
      saveChoices: "Enregistrer",
      manage: "Gérer les cookies",
    },
    footer: {
      letsTalk: "Contact",
      getInTouch: "Prendre contact",
      contactTitle: "Contact",
      followTitle: "Suivez-nous",
      overviewTitle: "Navigation",
      servicesTitle: "Nos Services",
      legalNotices: "Mentions Légales",
      services: {
        web: "Création Site Internet",
        branding: "Branding & Identité Visuelle",
        seo: "SEO & Référencement",
      },
    },
    contact: {
      title: "Démarrons un projet",
      offerSelected: "Offre sélectionnée",
      offerRemove: "Retirer l’offre",
      callUs: "Appeler le 07 66 48 99 82",
      subtitle: "Quelques questions pour cerner votre besoin. Nous reviendrons vers vous sous 24h.",
      step1: {
        label: "Étape 01",
        heading: "De quoi avez-vous besoin ?",
        subheading: "Sélectionnez un ou plusieurs services.",
      },
      step2: {
        label: "Étape 02",
        heading: "Quel est votre budget ?",
        subheading: "Cette indication nous aide à vous proposer des solutions adaptées.",
        timelineHeading: "Et côté délai ?",
        timelineSubheading: "Quand souhaitez-vous lancer le projet ?",
      },
      step3: {
        label: "Étape 03",
        heading: "Comment vous contacter ?",
        subheading: "Dernière étape, promis. On reviendra vers vous rapidement.",
      },
      confirmation: {
        heading: "Demande envoyée",
        subtitle: "Merci {{name}}. Nous avons bien reçu votre demande et reviendrons vers vous sous 24 heures.",
        summary: "Récapitulatif",
        services: "Services",
        budget: "Budget",
        timeline: "Délai",
        notSpecified: "Non spécifié",
        offer: "Offre",
        backHome: "Retour à l'accueil",
      },
      nav: {
        back: "Retour",
        continue: "Continuer",
        send: "Envoyer",
        sending: "Envoi...",
      },
      fields: {
        name: "Votre nom *",
        email: "Email *",
        company: "Entreprise",
        phone: "Téléphone",
        phoneHint: "Pour qu'on vous rappelle rapidement",
        website: "Site web actuel",
        message: "Décrivez votre projet *",
        howFound: "Comment nous avez-vous connu ?",
        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@entreprise.com",
        companyPlaceholder: "Nom de votre entreprise",
        phonePlaceholder: "06 12 34 56 78",
        websitePlaceholder: "https://votresite.com",
        messagePlaceholder: "Parlez-nous de votre projet, vos objectifs, vos contraintes éventuelles...",
      },
      errors: {
        required: "Champ requis",
        invalidEmail: "Email invalide",
        submitError: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
      },
      directContact: {
        heading: "Vous préférez échanger directement ?",
        subheading: "Parfois un appel vaut mieux qu'un formulaire.",
      },
      services: [
        { id: "branding", label: "Logo & identité visuelle", description: "Logo, charte graphique, direction artistique" },
        { id: "webdesign", label: "Design du site (UX/UI)", description: "Maquettes et prototypes de votre futur site" },
        { id: "webdev", label: "Création de site internet", description: "Site vitrine, e-commerce, application sur-mesure" },
        { id: "social", label: "Réseaux sociaux", description: "Stratégie, création de contenu, community management" },
        { id: "marketing", label: "Référencement (SEO) & webmarketing", description: "SEO, SEA, emailing, analytics & reporting" },
        { id: "photo", label: "Photo & vidéo", description: "Packshot produit, lifestyle, motion design" },
      ],
      budgets: [
        { id: "small", label: "Moins de 3 000 €", hint: "Projet simple" },
        { id: "medium", label: "3 000 € — 8 000 €", hint: "Projet standard" },
        { id: "large", label: "8 000 € — 15 000 €", hint: "Projet complet" },
        { id: "enterprise", label: "Plus de 15 000 €", hint: "Projet d'envergure" },
        { id: "unknown", label: "À définir ensemble", hint: "Discutons-en" },
      ],
      timelines: [
        { id: "urgent", label: "Moins d'un mois" },
        { id: "normal", label: "1 à 3 mois" },
        { id: "relaxed", label: "3 à 6 mois" },
        { id: "flexible", label: "Pas de contrainte" },
      ],
      sources: ["Google", "Instagram", "LinkedIn", "Recommandation", "Autre"],
    },
  },

  en: {
    hero: {
      title: {
        start: "Artichaud, the agency that turns up the heat on",
        services: ["your brand identity", "your website", "your social media", "your digital marketing"],
      },
      scroll: "SCROLL",
      ctaDiscuss: "Let's talk",
      ctaProjects: "View our projects",
    },
    intro: {
      tagline: "Our approach",
      heading:
        "Artichaud Studio is a web creation and 360 digital experience studio. We design complete online presences, from the first idea to launch.",
      para1:
        "We bring together strategy, art direction, UX/UI, development, content and SEO to create websites that do more than exist. They clarify your offer, reassure visitors and turn attention into qualified requests.",
      para2:
        "Showcase website, redesign, landing page, CMS, animation, visual identity or SEO support: every touchpoint is designed as a coherent, performant and scalable experience.",
      cta: "Explore our services",
    },
    services: {
      cta: "Let's start",
      list: [
        {
          id: "001",
          title: "Brand identity",
          description:
            "We build clear, desirable brands: positioning, messaging, logo and visual universe designed to be recognised and trusted at first glance.",
          items: [
            "Brand strategy",
            "Verbal identity",
            "Logo & visual identity",
            "Design system",
            "Pitch deck & go-to-market",
          ],
          image: "/projects/caisse-epargne/caisseepargneprojet1.avif",
        },
        {
          id: "002",
          title: "Website creation",
          description:
            "We design custom websites, from structure to development, that present your offer clearly, load fast and turn visitors into enquiries.",
          items: [
            "UX & copywriting",
            "Web design",
            "Web development",
            "Technical SEO",
            "Animations & interactions",
          ],
          image: "/projects/remembraance/remembraanceprojet4.webp",
        },
        {
          id: "003",
          title: "Social media",
          description:
            "We define your editorial line and create on-brand content to engage your community and keep you visible to your clients.",
          items: [
            "Social media strategy",
            "Editorial lines",
            "Content creation",
            "Branded templates",
            "Management & reporting",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "Digital marketing",
          description:
            "We bring the right people to your website and measure what works, to generate qualified enquiries on a regular basis.",
          items: [
            "SEO & SEA",
            "Landing pages",
            "Tracking & analytics",
            "Email campaigns",
            "Marketing content",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
      ],
    },
    highlight: {
      title: "Featured",
      viewAll: "View projects",
      for: "for",
    },
    testimonials: {
      tagline: "Testimonials",
      heading: "What our clients\nsay about us",
      readMore: "Discuss my project",
      items: [
        {
          id: 1,
          name: "Victoria Lauro",
          role: "Founder, Chez June",
          text: "Really happy to work with Clément on the maintenance and evolution of our Chez June and June Chez Vous websites. Responsive, professional, efficient and always available to find solutions tailored to our needs. A genuine, trustworthy partner day to day. Thank you 🙏",
        },
        {
          id: 2,
          name: "Le Cocon des Layes",
          role: "Gîte owner",
          text: `I hired Artichaud Studio to create the website for my gîte, Le Cocon des Layes, and I'm delighted with the result!

The site perfectly reflects the atmosphere and identity of my guesthouse, with an elegant, polished design and pleasant navigation.

I particularly appreciated their attentiveness, availability and attention to detail throughout the project. My expectations were fully understood and translated into a site that is both beautiful and functional.

What I value most is that their support doesn't stop once the site goes live. They're always available to answer my questions, advise me and help my website evolve. Being able to count on such a responsive and attentive team is a real asset.

I'm fully satisfied with this collaboration and recommend Artichaud Studio to anyone looking for a professional, personalised website and high-quality support!`,
        },
      ],
      seeMore: "See more",
      seeLess: "See less",
    },
    blog: {
      tagline: "Blog",
      heading: ["Stay in the loop", "With our latest updates"],
      discoverAll: "Discover all articles",
      viewAll: "View all",
    },
    navbar: {
      works: "Works",
      services: "Services",
      about: "About",
      contact: "Contact",
      letsTalk: "Let's talk",
      close: "Close",
    },
    consent: {
      title: "Fancy a cookie?",
      description: "A few trackers to measure traffic and our campaigns, only with your consent.",
      learnMore: "Learn more",
      necessaryTitle: "Essential",
      necessaryDesc: "Required for the site to work (language, form security, anonymous analytics).",
      alwaysOn: "Always on",
      analyticsTitle: "Analytics",
      analyticsDesc: "Google Analytics and Google Tag Manager, to understand how the site is used.",
      marketingTitle: "Marketing",
      marketingDesc: "Meta Pixel and OpenAI pixel, to measure how our Facebook, Instagram and ChatGPT ads perform.",
      reject: "Reject",
      accept: "Accept",
      customize: "Customize",
      saveChoices: "Save",
      manage: "Manage cookies",
    },
    footer: {
      letsTalk: "Let's talk",
      getInTouch: "Get in touch",
      contactTitle: "Contact",
      followTitle: "Follow Us",
      overviewTitle: "Overview",
      servicesTitle: "Our Services",
      legalNotices: "Legal Notice",
      services: {
        web: "Website Creation",
        branding: "Branding & Visual Identity",
        seo: "SEO & Organic Search",
      },
    },
    contact: {
      title: "Start a project",
      offerSelected: "Selected offer",
      offerRemove: "Remove offer",
      callUs: "Call +33 7 66 48 99 82",
      subtitle: "A few questions to understand your needs. We'll get back to you within 24 hours.",
      step1: {
        label: "Step 01",
        heading: "What do you need?",
        subheading: "Select one or more services.",
      },
      step2: {
        label: "Step 02",
        heading: "What is your budget?",
        subheading: "This helps us tailor the right solutions for you.",
        timelineHeading: "What about the timeline?",
        timelineSubheading: "When would you like to kick off the project?",
      },
      step3: {
        label: "Step 03",
        heading: "How can we reach you?",
        subheading: "Last step, we promise. We'll get back to you quickly.",
      },
      confirmation: {
        heading: "Request sent",
        subtitle: "Thank you {{name}}. We've received your request and will get back to you within 24 hours.",
        summary: "Summary",
        services: "Services",
        budget: "Budget",
        timeline: "Timeline",
        notSpecified: "Not specified",
        offer: "Offer",
        backHome: "Back to home",
      },
      nav: {
        back: "Back",
        continue: "Continue",
        send: "Send",
        sending: "Sending...",
      },
      fields: {
        name: "Your name *",
        email: "Email *",
        company: "Company",
        phone: "Phone",
        phoneHint: "So we can call you back quickly",
        website: "Current website",
        message: "Describe your project *",
        howFound: "How did you find us?",
        namePlaceholder: "John Smith",
        emailPlaceholder: "john@company.com",
        companyPlaceholder: "Your company name",
        phonePlaceholder: "+33 6 12 34 56 78",
        websitePlaceholder: "https://yoursite.com",
        messagePlaceholder: "Tell us about your project, goals, and any constraints...",
      },
      errors: {
        required: "Required field",
        invalidEmail: "Invalid email",
        submitError: "An error occurred. Please try again or contact us directly.",
      },
      directContact: {
        heading: "Prefer to talk directly?",
        subheading: "Sometimes a call beats a form.",
      },
      services: [
        { id: "branding", label: "Brand Identity", description: "Logo, brand guidelines, art direction" },
        { id: "webdesign", label: "Web Design", description: "UX/UI, wireframes, interactive prototypes" },
        { id: "webdev", label: "Web Development", description: "Landing page, e-commerce, custom app" },
        { id: "social", label: "Social Media", description: "Strategy, content creation, community management" },
        { id: "marketing", label: "Digital Marketing", description: "SEO, SEA, email, analytics & reporting" },
        { id: "photo", label: "Photo & Video Shoot", description: "Product packshot, lifestyle, motion design" },
      ],
      budgets: [
        { id: "small", label: "Under €3,000", hint: "Simple project" },
        { id: "medium", label: "€3,000 — €8,000", hint: "Standard project" },
        { id: "large", label: "€8,000 — €15,000", hint: "Full project" },
        { id: "enterprise", label: "Over €15,000", hint: "Enterprise project" },
        { id: "unknown", label: "To be defined", hint: "Let's discuss" },
      ],
      timelines: [
        { id: "urgent", label: "Less than a month" },
        { id: "normal", label: "1 to 3 months" },
        { id: "relaxed", label: "3 to 6 months" },
        { id: "flexible", label: "No constraint" },
      ],
      sources: ["Google", "Instagram", "LinkedIn", "Referral", "Other"],
    },
  },
} as const

export type Translations = typeof translations.fr
