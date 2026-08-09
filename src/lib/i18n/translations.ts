export type Locale = 'fr' | 'en'

export const translations = {
  fr: {
    hero: {
      title: [
        "Artichaud, l'agence web",
        "& branding à Boulogne-Billancourt",
        "qui fait monter la température.",
      ],
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
          title: "Stratégie digitale",
          description:
            "Nous clarifions votre positionnement, vos messages et vos objectifs pour construire une présence digitale lisible, cohérente et orientée conversion.",
          items: [
            "Positionnement de marque",
            "Parcours utilisateur",
            "Messages clés",
            "Architecture de contenu",
            "Plan d'action digital",
          ],
          image: "/services/projetkeletitautuservices.png",
        },
        {
          id: "002",
          title: "Site vitrine",
          description:
            "Nous créons des sites vitrines sur mesure qui présentent votre offre avec clarté, valorisent votre marque et transforment les visiteurs en prospects.",
          items: [
            "Arborescence SEO",
            "UX/UI design",
            "Rédaction des pages",
            "Développement performant",
            "Formulaires de contact",
          ],
          image: "/projects/charitio/charitioprojet1.avif",
        },
        {
          id: "003",
          title: "Expérience digitale",
          description:
            "Nous imaginons des interfaces et interactions qui rendent votre marque mémorable, tout en gardant une navigation simple, rapide et rassurante.",
          items: [
            "Direction artistique web",
            "Animations & micro-interactions",
            "Design responsive",
            "Prototypes interactifs",
            "Design system",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "SEO & contenu",
          description:
            "Nous structurons vos pages et vos contenus pour répondre aux recherches de vos clients, améliorer votre visibilité Google et attirer un trafic qualifié.",
          items: [
            "Recherche de mots-clés",
            "Optimisation technique",
            "Pages services SEO",
            "Articles de blog",
            "Maillage interne",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
        {
          id: "005",
          title: "Refonte web",
          description:
            "Nous modernisons les sites existants pour améliorer l'image de marque, les performances, l'expérience utilisateur et les conversions sans perdre les acquis SEO.",
          items: [
            "Audit UX & SEO",
            "Nouvelle arborescence",
            "Migration de contenus",
            "Redirections 301",
            "Suivi Search Console",
          ],
          image: "/projects/cherico/chericoprojet3.avif",
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
      ],
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
    footer: {
      letsTalk: "Contact",
      getInTouch: "Prendre contact",
      contactTitle: "Contact",
      followTitle: "Suivez-nous",
      overviewTitle: "Navigation",
      servicesTitle: "Nos Services",
      legalNotices: "Mentions Légales",
      boulogneLink: "Création de site internet à Boulogne-Billancourt",
      services: {
        web: "Création Site Internet",
        branding: "Branding & Identité Visuelle",
        seo: "SEO & Référencement",
      },
    },
    contact: {
      title: "Démarrons un projet",
      subtitle: "Quelques questions pour cerner votre besoin. Nous reviendrons vers vous sous 24 à 48h.",
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
        subtitle: "Merci {{name}}. Nous avons bien reçu votre demande et reviendrons vers vous sous 24 à 48 heures.",
        summary: "Récapitulatif",
        services: "Services",
        budget: "Budget",
        timeline: "Délai",
        notSpecified: "Non spécifié",
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
        website: "Site web actuel",
        message: "Décrivez votre projet *",
        howFound: "Comment nous avez-vous connu ?",
        namePlaceholder: "Jean Dupont",
        emailPlaceholder: "jean@entreprise.com",
        companyPlaceholder: "Nom de votre entreprise",
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
      title: [
        "Artichaud, the web",
        "& branding agency in Boulogne,",
        "turning up the heat.",
      ],
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
          title: "Digital Strategy",
          description:
            "We clarify your positioning, messages and goals to build a clear, coherent and conversion-focused digital presence.",
          items: [
            "Brand positioning",
            "User journey",
            "Key messaging",
            "Content architecture",
            "Digital action plan",
          ],
          image: "/services/projetkeletitautuservices.png",
        },
        {
          id: "002",
          title: "Showcase Website",
          description:
            "We create bespoke showcase websites that explain your offer clearly, elevate your brand and turn visitors into qualified leads.",
          items: [
            "SEO-friendly structure",
            "UX/UI design",
            "Page copywriting",
            "Fast development",
            "Contact forms",
          ],
          image: "/projects/charitio/charitioprojet1.avif",
        },
        {
          id: "003",
          title: "Digital Experience",
          description:
            "We craft interfaces and interactions that make your brand memorable while keeping the experience simple, fast and reassuring.",
          items: [
            "Web art direction",
            "Animations & micro-interactions",
            "Responsive design",
            "Interactive prototypes",
            "Design system",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "SEO & Content",
          description:
            "We structure pages and content around what your customers search for, helping you improve Google visibility and attract qualified traffic.",
          items: [
            "Keyword research",
            "Technical optimisation",
            "SEO service pages",
            "Blog articles",
            "Internal linking",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
        {
          id: "005",
          title: "Website Redesign",
          description:
            "We modernise existing websites to improve brand perception, performance, user experience and conversions without losing SEO equity.",
          items: [
            "UX & SEO audit",
            "New sitemap",
            "Content migration",
            "301 redirects",
            "Search Console follow-up",
          ],
          image: "/projects/cherico/chericoprojet3.avif",
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
      ],
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
    footer: {
      letsTalk: "Let's talk",
      getInTouch: "Get in touch",
      contactTitle: "Contact",
      followTitle: "Follow Us",
      overviewTitle: "Overview",
      servicesTitle: "Our Services",
      legalNotices: "Legal Notice",
      boulogneLink: "Website creation in Boulogne-Billancourt",
      services: {
        web: "Website Creation",
        branding: "Branding & Visual Identity",
        seo: "SEO & Organic Search",
      },
    },
    contact: {
      title: "Start a project",
      subtitle: "A few questions to understand your needs. We'll get back to you within 24 to 48 hours.",
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
        subtitle: "Thank you {{name}}. We've received your request and will get back to you within 24 to 48 hours.",
        summary: "Summary",
        services: "Services",
        budget: "Budget",
        timeline: "Timeline",
        notSpecified: "Not specified",
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
        website: "Current website",
        message: "Describe your project *",
        howFound: "How did you find us?",
        namePlaceholder: "John Smith",
        emailPlaceholder: "john@company.com",
        companyPlaceholder: "Your company name",
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
