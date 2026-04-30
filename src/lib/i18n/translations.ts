export type Locale = 'fr' | 'en'

export const translations = {
  fr: {
    hero: {
      title: [
        "Artichaud, c'est le",
        "studio de création web qui fait monter",
        "la température.",
      ],
      scroll: "SCROLL",
    },
    intro: {
      tagline: "Notre approche",
      heading:
        "Nous sommes Artichaud Studio - une agence de branding et design à Paris. Nous accompagnons les marques là où elles sont, vers là où elles méritent d'être.",
      para1:
        "Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention, ou même le bon type d'attention. Peut-être que votre marque semble un peu décalée par rapport à la direction de votre entreprise. Peut-être que votre message ne résonne pas comme vous le souhaitez.",
      para2:
        "Ou peut-être êtes-vous simplement fatigué de justifier l'apparence de votre marque. Il est temps de vous présenter avec la clarté et la confiance que vous méritez. Et c'est là que nous intervenons.",
      cta: "En savoir plus",
    },
    services: {
      cta: "Commençons",
      list: [
        {
          id: "001",
          title: "Stratégie de marque",
          description:
            "La boussole de votre marque. Elle définit votre raison d'être, affine votre positionnement et garantit que chaque décision résonne avec votre audience tout en stimulant la croissance.",
          items: [
            "Recherche & Insights",
            "Stratégie de lancement",
            "Architecture de marque",
            "Raison d'être, Mission, Vision",
            "Stratégie de communication",
          ],
          image: "/services/projetkeletitautuservices.png",
        },
        {
          id: "002",
          title: "Identité visuelle",
          description:
            "Plus qu'un simple logo. Nous créons un langage visuel qui parle à votre audience avant même que vous ne disiez un mot. Couleurs, typographie et direction artistique qui se démarquent.",
          items: [
            "Design de logo",
            "Charte graphique",
            "Direction artistique",
            "Motion Design",
            "Illustration & Iconographie",
          ],
          image: "/projects/charitio/charitioprojet1.avif",
        },
        {
          id: "003",
          title: "Webdesign",
          description:
            "Des expériences digitales qui convertissent. Nous concevons des sites web immersifs alliant esthétique et performance, garantissant un parcours utilisateur fluide sur tous les appareils.",
          items: [
            "Design UX/UI",
            "Prototypage",
            "Design d'interaction",
            "Design Systems",
            "Approche Mobile First",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "Webmarketing",
          description:
            "Amplifier votre voix. Nous développons des stratégies data-driven pour acquérir, convertir et fidéliser vos clients grâce à un ciblage précis et du contenu engageant.",
          items: [
            "SEO & SEA",
            "Stratégie Social Media",
            "Marketing de contenu",
            "Automation d'emailing",
            "Analytics & Reporting",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
        {
          id: "005",
          title: "Shooting Produit",
          description:
            "Des visuels qui vendent. Photographie et vidéographie haut de gamme pour mettre en valeur vos produits sous leur meilleur jour, créer du désir et valoriser votre offre.",
          items: [
            "Direction artistique",
            "Photographie studio",
            "Shooting lifestyle",
            "Post-production",
            "Vidéos courtes",
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
      readMore: "Lire plus d'avis",
      items: [
        {
          id: 1,
          name: "Thomas Vernier",
          role: "Fondateur, GreenPulse",
          text: "On avait peur que le côté 'trop technique' tue l'émotion de notre marque. Artichaud a prouvé le contraire. Ils ont réussi à coder une expérience fluide qui garde toute sa chaleur humaine. Le site est vivant, et ça se sent dans nos retours clients.",
        },
        {
          id: 2,
          name: "Sarah Lecomte",
          role: "CMO, Datadesk",
          text: "Passer de WordPress à leur stack Next.js a été le jour et la nuit. Nos pages chargent instantanément, notre score SEO a explosé, et l'équipe marketing a enfin un outil performant entre les mains. C'est de l'artisanat numérique de haut vol.",
        },
        {
          id: 3,
          name: "Julien Delmas",
          role: "CEO, Architekt Studio",
          text: "Un site beau, c'est bien. Un site qui rapporte, c'est mieux. Depuis la refonte, nos demandes de devis ont doublé. Ils ne se sont pas contentés de faire du 'joli', ils ont repensé tout notre parcours utilisateur avec une logique business implacable.",
        },
        {
          id: 4,
          name: "Eléonore B.",
          role: "Directrice Artistique, Maison Flow",
          text: "L'attention au détail frôle l'obsession chez eux. C'est la première fois qu'une agence comprend vraiment ce qu'on entend par 'minimaliste mais impactant'. Ils ont su traduire nos valeurs abstraites en une interface utilisateur concrète et élégante.",
        },
        {
          id: 5,
          name: "Marc Alibert",
          role: "Head of Growth, FinTask",
          text: "Enfin une agence qui ne parle pas qu'en jargon. De la stratégie à l'exécution, on s'est sentis accompagnés, pas juste facturés. Ils ont su challenger nos idées reçues pour nous emmener plus loin que prévu. Une collaboration précieuse.",
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
        { id: "branding", label: "Brand Identity", description: "Logo, charte graphique, direction artistique" },
        { id: "webdesign", label: "Web Design", description: "UX/UI, maquettes, prototypes interactifs" },
        { id: "webdev", label: "Développement Web", description: "Site vitrine, e-commerce, application sur-mesure" },
        { id: "social", label: "Social Media", description: "Stratégie, création de contenu, community management" },
        { id: "marketing", label: "Webmarketing", description: "SEO, SEA, emailing, analytics & reporting" },
        { id: "photo", label: "Shooting Photo & Vidéo", description: "Packshot produit, lifestyle, motion design" },
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
        "Artichaud is the",
        "web creation studio that turns up",
        "the heat.",
      ],
      scroll: "SCROLL",
    },
    intro: {
      tagline: "Our approach",
      heading:
        "We are Artichaud Studio — a branding and design agency in Paris. We take brands from where they are, to where they deserve to be.",
      para1:
        "Let's be honest. You've built something great. But lately, it's become harder to capture attention — or the right kind of attention. Maybe your brand feels a little out of step with where your company is headed. Maybe your message isn't resonating the way you'd like.",
      para2:
        "Or maybe you're simply tired of justifying how your brand looks. It's time to show up with the clarity and confidence you deserve. And that's where we come in.",
      cta: "Learn more",
    },
    services: {
      cta: "Let's start",
      list: [
        {
          id: "001",
          title: "Brand Strategy",
          description:
            "Your brand's compass. It defines your purpose, sharpens your positioning, and ensures every decision resonates with your audience while driving growth.",
          items: [
            "Research & Insights",
            "Launch Strategy",
            "Brand Architecture",
            "Purpose, Mission, Vision",
            "Communication Strategy",
          ],
          image: "/services/projetkeletitautuservices.png",
        },
        {
          id: "002",
          title: "Visual Identity",
          description:
            "More than just a logo. We craft a visual language that speaks to your audience before you even say a word. Colors, typography, and art direction that stand out.",
          items: [
            "Logo Design",
            "Brand Guidelines",
            "Art Direction",
            "Motion Design",
            "Illustration & Iconography",
          ],
          image: "/projects/charitio/charitioprojet1.avif",
        },
        {
          id: "003",
          title: "Web Design",
          description:
            "Digital experiences that convert. We design immersive websites balancing aesthetics and performance, ensuring a smooth user journey across all devices.",
          items: [
            "UX/UI Design",
            "Prototyping",
            "Interaction Design",
            "Design Systems",
            "Mobile First Approach",
          ],
          image: "/projects/lumyn/Lumynprojet4.avif",
        },
        {
          id: "004",
          title: "Digital Marketing",
          description:
            "Amplify your voice. We develop data-driven strategies to acquire, convert, and retain your customers through precise targeting and engaging content.",
          items: [
            "SEO & SEA",
            "Social Media Strategy",
            "Content Marketing",
            "Email Automation",
            "Analytics & Reporting",
          ],
          image: "/projects/comon/comonprojet2.avif",
        },
        {
          id: "005",
          title: "Product Photography",
          description:
            "Visuals that sell. High-end photography and videography to showcase your products at their best, create desire, and elevate your offer.",
          items: [
            "Art Direction",
            "Studio Photography",
            "Lifestyle Shooting",
            "Post-production",
            "Short Videos",
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
      readMore: "Read more reviews",
      items: [
        {
          id: 1,
          name: "Thomas Vernier",
          role: "Founder, GreenPulse",
          text: "We were afraid the 'too technical' side would kill our brand's emotion. Artichaud proved us wrong. They managed to code a smooth experience that keeps all its human warmth. The site is alive, and you can feel it in our client feedback.",
        },
        {
          id: 2,
          name: "Sarah Lecomte",
          role: "CMO, Datadesk",
          text: "Switching from WordPress to their Next.js stack was night and day. Our pages load instantly, our SEO score has skyrocketed, and the marketing team finally has a high-performance tool in their hands. It's top-tier digital craftsmanship.",
        },
        {
          id: 3,
          name: "Julien Delmas",
          role: "CEO, Architekt Studio",
          text: "A beautiful site is great. A site that generates revenue is better. Since the redesign, our quote requests have doubled. They didn't just make it 'pretty' — they rethought our entire user journey with relentless business logic.",
        },
        {
          id: 4,
          name: "Eléonore B.",
          role: "Art Director, Maison Flow",
          text: "Their attention to detail borders on obsession. It's the first time an agency truly understood what we mean by 'minimalist yet impactful'. They translated our abstract values into a concrete, elegant user interface.",
        },
        {
          id: 5,
          name: "Marc Alibert",
          role: "Head of Growth, FinTask",
          text: "Finally an agency that doesn't just speak in jargon. From strategy to execution, we felt guided, not just billed. They challenged our assumptions and took us further than expected. A truly valuable collaboration.",
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
