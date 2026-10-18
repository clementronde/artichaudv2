// Fichier : src/data/project.ts

export interface Project {
  id: number;
  slug: string;
  client: string;
  category: string;
  year: string;
  services: string[];
  description: string[];
  cover: string;
  images: string[];
  colors: { hex: string; name: string }[];
  // Remplace le bloc des couleurs par une image
  sideImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export const projects: Project[] = [
  {
    id: 10,
    slug: "remembraance",
    client: "Remembraance",
    category: "Site e-commerce",
    year: "2026",
    services: ["Identité visuelle", "Web Design", "E-commerce", "UX/UI"],
    seoTitle: "Remembraance : e-commerce de mode upcyclée",
    seoDescription: "Découvrez le projet Remembraance : identité visuelle et site e-commerce pour une créatrice de vêtements upcyclés qui voulait vendre en direct, au-delà de Vinted.",
    seoKeywords: [
      "Remembraance",
      "site e-commerce mode upcyclée",
      "créatrice vêtements upcyclés",
      "vendre ses créations hors Vinted",
      "Artichaud Studio Remembraance"
    ],
    description: [
      "Remembraance est l'atelier d'une créatrice qui donne une seconde vie aux tissus en imaginant des vêtements upcyclés, pièce par pièce. Après avoir lancé son activité sur Vinted, elle ne voulait plus dépendre d'une seule plateforme pour exister et vendre.",
      "Notre mission : lui offrir un lieu à elle. Nous avons conçu une identité visuelle à son image, un logotype manuscrit, un trait d'illustration délicat et une palette prune, rose poudré, bleu ciel et vert olive, puis un site e-commerce qui raconte l'atelier autant qu'il vend. Le parcours invite chaque cliente à composer sa pièce : choisir son modèle, son tissu, indiquer ses mensurations. Un espace blog prolonge l'univers de la marque et nourrit son référencement. Résultat : une boutique indépendante, pensée mobile d'abord, qui permet à Remembraance de fidéliser sa clientèle en direct et de maîtriser son image comme ses marges."
    ],
    cover: "/projects/remembraance/remembraanceprojet1.webp",
    images: [
      "/projects/remembraance/remembraanceprojet6.webp",
      "/projects/remembraance/remembraanceprojet3.webp",
      "/projects/remembraance/remembraanceprojet4.webp",
      "/projects/remembraance/remembraanceprojet5.webp"
    ],
    colors: [
      { hex: "#2B0B16", name: "Plum" },
      { hex: "#FED8E5", name: "Blush" },
      { hex: "#729DCA", name: "Sky Blue" },
      { hex: "#7D7715", name: "Olive" }
    ],
    sideImage: "/projects/remembraance/remembraanceprojet2.webp"
  },
  {
    id: 11,
    slug: "caisse-epargne",
    client: "Caisse d'Épargne",
    category: "Identité visuelle",
    year: "2026",
    services: ["Identité visuelle", "Logo", "Direction artistique", "Packaging"],
    seoTitle: "Caisse d'Épargne : podcast Génération Impact",
    seoDescription: "Découvrez le projet Génération Impact : création de l'identité visuelle du nouveau podcast de la Caisse d'Épargne Île-de-France, du logo aux miniatures YouTube.",
    seoKeywords: [
      "Caisse d'Épargne",
      "Génération Impact",
      "identité visuelle podcast",
      "logo podcast",
      "Artichaud Studio Caisse d'Épargne"
    ],
    description: [
      "Pour lancer Génération Impact, son nouveau podcast, la Caisse d'Épargne Île-de-France souhaitait une identité capable de parler à une nouvelle génération, loin des codes attendus d'une banque.",
      "Nous avons imaginé un logo en forme de bulle de dialogue, ponctué d'un personnage aux grands yeux qui incarne la prise de parole et la curiosité. La typographie condensée et percutante, associée à une palette franche, rouge vif, rose pop, bleu électrique et noir, donne au podcast une énergie immédiatement reconnaissable. L'identité a ensuite été déclinée sur l'ensemble des supports : visuel de couverture pour les plateformes d'écoute, miniatures YouTube, bannières, packagings et goodies comme le tote bag. Résultat : un système graphique cohérent et ludique, qui installe Génération Impact comme un rendez-vous à part entière."
    ],
    cover: "/projects/caisse-epargne/caisseepargneprojet1.avif",
    images: [
      "/projects/caisse-epargne/caisseepargneprojet2.avif",
      "/projects/caisse-epargne/caisseepargneprojet3.avif",
      "/projects/caisse-epargne/caisseepargneprojet4.avif",
      "/projects/caisse-epargne/caisseepargneprojet5.avif"
    ],
    colors: [
      { hex: "#DF271F", name: "Impact Red" },
      { hex: "#E95AAA", name: "Pop Pink" },
      { hex: "#040AE4", name: "Electric Blue" },
      { hex: "#141414", name: "Ink Black" }
    ]
  },
  {
    id: 1,
    slug: "charitio",
    client: "Charit.IO",
    category: "Brand Identity",
    year: "2024",
    services: ["Brand Strategy", "Visual Identity", "Web Design", "UX/UI"],
    description: [
      "Charit.IO accompagne les organismes culturels associatifs et à but non lucratif en réinventant l’acte de don pour le rendre plus simple, plus humain et plus connecté. ",
      "Dans le cadre de la refonte, nous avons repensé l’expérience de bout en bout : audit et optimisation du parcours utilisateur, clarification des messages, et structuration d’un chemin de don plus fluide, rassurant et engageant. Côté design, nous avons modernisé la charte graphique avec une identité plus affirmée et chaleureuse, portée par un contraste assumé (fonds sombres, typographie claire) et des touches colorées qui dynamisent l’interface et facilitent la lecture des étapes clés. Enfin, nous avons conçu et développé le site web pour traduire cette vision en une plateforme efficace, accessible et orientée conversion, au service de la culture et de ses projets."
    ],
    cover: "/projects/charitio/charitioprojet1.avif", 
    images: [
      "/projects/charitio/charitioprojet2.avif",
      "/projects/charitio/charitioprojet3.avif",
      "/projects/charitio/charitioprojet4.avif",
      "/projects/charitio/charitioprojet5.avif",
    ],
    colors: [
      { hex: "#ED3C1F", name: "Pastel Red" },
      { hex: "#5B30F5", name: "Pastel Purple" },
      { hex: "#FC990A", name: "Pastel Yellow" },
      { hex: "#186840", name: "Pastel Green" }
    ]
  },
  {
    id: 2,
    slug: "keleti",
    client: "Keleti Design",
    category: "Brand Identity",
    year: "2023",
    services: ["Art Direction", "Motion Design", "3D Rendering"],
    description: [
      "Keleti Tautu est une agence de mobilier design dédiée au seconde main premium : une sélection de pièces de prestige, durables et soigneusement sourcées, pensée pour un showroom",
      "majoritairement en ligne. La marque valorise l’artisanat, la qualité de fabrication et la dimension intemporelle des objets, en plaçant la matière et les détails au centre du récit. À l’agence, nous avons conçu la charte graphique et l’univers visuel afin d’exprimer ce positionnement haut de gamme : une identité forte et éditoriale, structurée par une typographie impactante et un jeu de contrastes. La palette associe des tons profonds et sophistiqués noir graphite, vert olive et rouge brique  pour créer une atmosphère chaleureuse, confidentielle et “galerie”, au service d’une expérience digitale élégante et premium."
    ],
    cover: "/projects/keleti/keletiprojet1.avif",
    images: [
      "/projects/keleti/keletiprojet2.avif",
      "/projects/keleti/keletiprojet3.avif",
      "/projects/keleti/keletiprojet4.avif",
      "/projects/keleti/keletiprojet5.avif"
    ],
    colors: [
      { hex: "#141414", name: "Charcoal Black" },
      { hex: "#77702D", name: "Olive Drab" },
      { hex: "#CF0505", name: "Crimson Red" },
      { hex: "#550000", name: "Burgundy" }
    ]
  },
  {
    id: 3,
    slug: "lumyn",
    client: "Lumyn",
    category: "Web Design",
    year: "2024",
    services: ["Web Development", "Next.js", "GSAP Animation"],
    description: [
      "Lumyn est une plateforme de concours créatifs en ligne pensée comme un véritable tremplin professionnel : elle permet aux talents de participer à des challenges, de se constituer un réseau qualifié ",
      "et d’accéder à de réelles opportunités (collaborations, visibilité, missions). Les lauréats sont mis en avant au sein d’un magazine trimestriel, prolongeant l’expérience digitale par une approche éditoriale premium. À l’agence, nous avons assuré la production complète du projet, de la direction artistique (branding, charte graphique, système visuel) au développement du site (front & back). L’univers se distingue par une esthétique radicale et élégante : une base noir profond, rehaussée d’un accent néon qui évoque l’idée de “mettre en lumière” les créateurs, avec une typographie serif et une mise en page très éditoriale pour un rendu à la fois contemporain et iconique."
    ],
    cover: "/projects/lumyn/Lumynprojet1.avif",
    images: [
      "/projects/lumyn/Lumynprojet2.avif",
      "/projects/lumyn/Lumynprojet3.avif",
      "/projects/lumyn/Lumynprojet4.avif",
      "/projects/lumyn/Lumynprojet5.avif"
    ],
    colors: [
      { hex: "#EFFF00", name: "Neon Yellow" },
      { hex: "#272626", name: "Graphite" },
      { hex: "#070707", name: "Midnight" },
      { hex: "#FFFFFF", name: "White" }
    ]
  },
  {
    id: 4,
    slug: "jobmi",
    client: "Jobmi",
    category: "Identité de marque",
    year: "2023",
    services: ["Naming", "Brand strategy", "Identité visuelle", "Tone of voice"],
    seoTitle: "Jobmi - Identité de marque pour plateforme emploi",
    seoDescription: "Découvrez le projet Jobmi : naming, stratégie de marque, identité visuelle et ton éditorial pour une plateforme emploi moderne, claire et rassurante.",
    seoKeywords: [
      "Jobmi",
      "identité de marque plateforme emploi",
      "branding startup recrutement",
      "naming application emploi",
      "Artichaud Studio Jobmi"
    ],
    description: [
      "Jobmi rapproche les talents et les opportunités avec une identité de marque claire, accessible et professionnelle.",
      "Pour cette plateforme dédiée à l'emploi et au recrutement, nous avons travaillé le naming, la stratégie de marque, le ton éditorial et les premiers codes visuels afin de créer une expérience immédiatement compréhensible.",
      "L'objectif était de rendre la recherche d'opportunités plus humaine : un univers rassurant pour les candidats, crédible pour les recruteurs, et suffisamment flexible pour accompagner l'évolution du service sur le web."
    ],
    cover: "/projects/jobmi/jobmiprojet1.avif",
    images: [
      "/projects/jobmi/jobmiprojet2.avif",
      "/projects/jobmi/jobmiprojet3.avif",
      "/projects/jobmi/jobmiprojet4.avif",
      "/projects/jobmi/jobmiprojet5.avif"
    ],
    colors: [
      { hex: "#4361EE", name: "Job Blue" },
      { hex: "#4CC9F0", name: "Sky" },
      { hex: "#7209B7", name: "Purple" },
      { hex: "#F72585", name: "Pink Pop" }
    ]
  },
  {
    id: 5,
    slug: "multiface",
    client: "Multiface",
    category: "Art Direction",
    year: "2024",
    services: ["Photography", "Set Design", "Editorial"],
    description: [
      "Multiface est un musée interactif dédié aux jeux de rôle sur table, imaginé comme une passerelle entre culture, immersion et narration collaborative. L’expérience met en avant la découverte",
      "univers, systèmes de jeu, créations), tout en invitant le public à jouer, explorer et interagir. À l’agence, nous avons piloté le projet de A à Z : direction artistique, brand strategy, stratégie social media, ainsi que la conception du site web et de l’application mobile. L’univers visuel traduit ce positionnement “expérience” à travers une identité moderne et accessible : une base sombre, une typographie affirmée et une palette chaleureuse et ludique. Complétée par des textures en dégradé qui évoquent l’atmosphère, la matière et la magie des récits. Le résultat : une marque cohérente et immédiatement identifiable, déployée sur tous les points de contact pour créer une expérience fluide, engageante et mémorable."
    ],
    cover: "/projects/multiface/multifaceprojet1.avif",
    images: [
      "/projects/multiface/multifaceprojet2.avif",
      "/projects/multiface/multifaceprojet3.avif",
      "/projects/multiface/multifaceprojet4.avif",
      "/projects/multiface/multifaceprojet5.avif"
    ],
    colors: [
      { hex: "#30041B", name: "Black" },
      { hex: "#FFFFFF", name: "White" },
      { hex: "#FF5733", name: "Orange" },
      { hex: "#C70039", name: "Deep Red" }
    ]
  },
  {
    id: 6,
    slug: "disobey",
    client: "Disobey",
    category: "Brand Identity",
    year: "2023",
    services: ["Rebranding", "Merch Design", "Social Media"],
    description: [
      "Disobey est une marque musicale punk pensée comme un manifeste : une identité brute, directe et sans compromis, au service d’une scène qui refuse les codes. À l’agence, nous avons conçu la charte",
      "graphique ainsi qu’une plateforme musicale dédiée, imaginée comme un espace de découverte et de diffusion pour l’univers punk. L’identité s’appuie sur une esthétique volontairement “do it yourself” : logotype texturé façon marque au pochoir, typographies massives, mise en page tranchée et contrastes forts. La palette combine un fond sombre et profond (#110000) avec des accents orange brûlé (#F78800) et rouge vif (#FF0000), pour un rendu incandescent, énergique et immédiatement reconnaissable. Le résultat : une direction artistique radicale et cohérente, qui transforme la plateforme en expérience immersive et amplifie l’attitude Disobey à chaque interaction."
    ],
    cover: "/projects/disobey/disobeyprojet1.avif",
    images: [
      "/projects/disobey/disobeyprojet2.avif",
      "/projects/disobey/disobeyprojet3.avif",
      "/projects/disobey/disobeyprojet4.avif",
      "/projects/disobey/disobeyprojet5.avif"
    ],
    colors: [
      { hex: "#111111", name: "Asphalt" },
      { hex: "#888888", name: "Concrete" },
      { hex: "#FF0000", name: "Alert Red" },
      { hex: "#FFFF00", name: "Caution" }
    ]
  },
  // NOUVEAU PROJET 1 : Yumdeal
  {
    id: 7,
    slug: "yumdeal",
    client: "Yumdeal",
    category: "UI/UX & Identity",
    year: "2024",
    services: ["UI/UX Design", "Brand Identity", "Gamification"],
    description: [
      "Yumdeal est une application pensée pour accompagner les étudiants vers une hygiène de vie plus saine, de façon simple et motivante. L’expérience repose sur des challenges du quotidien ",
      "et un système de gamification qui transforme l’effort en progression visible, avec des mécaniques de points et de récompenses. À l’agence, nous avons conçu la charte graphique, optimisé le parcours utilisateur et réalisé l’application mobile, en veillant à une interface claire, mobile-first et engageante. L’univers visuel s’appuie sur un contraste frais et énergique : une base bleu nuit (#001328), des accents vert menthe (#B5FFA7) et jaune (#FFEA00), équilibrés par un violet signature (#660053) qui structure la marque et renforce sa personnalité. Résultat : une identité dynamique et accessible, au service d’un produit utile, ludique et orienté action."
    ],
    cover: "/projects/yumdeal/yumdealprojet1.avif",
    images: [
      "/projects/yumdeal/yumdealprojet2.avif",
      "/projects/yumdeal/yumdealprojet3.avif",
      "/projects/yumdeal/yumdealprojet4.avif",
      "/projects/yumdeal/yumdealprojet5.avif"
    ],
    // Palette suggérée (tons frais/écologiques)
    colors: [
      { hex: "#4CAF50", name: "Fresh Green" },
      { hex: "#FF9800", name: "Deal Orange" },
      { hex: "#FFFFFF", name: "Clean White" },
      { hex: "#2E7D32", name: "Dark Green" }
    ]
  },
  // NOUVEAU PROJET 2 : Rockstar
  {
    id: 8,
    slug: "rockstar",
    client: "Rockstar",
    category: "Brand Identity",
    year: "2024",
    services: ["Mascot Design", "Visual Identity", "Illustration"],
    description: [
      "Rockstar est un collectif musical rock qui organise des concerts et fédère une communauté autour d’un univers visuel fort, entre énergie live et culture club. À l’agence, nous avons conçu",
      "l’écosystème complet de la marque : charte graphique, site web, merchandising, menus et contenus print/digitaux, ainsi qu’une collection de NFT. Le site a été pensé comme une vitrine et un point de conversion : faire connaître le collectif, centraliser les informations des events, et vendre à la fois NFT et merch via une expérience simple, immersive et cohérente. L’identité s’appuie sur une esthétique nocturne et électrique dominée par un violet profond et des illustrations pop assumées, pour traduire l’attitude “rockstar” et créer une signature immédiatement reconnaissable sur scène comme en ligne."
    ],
    cover: "/projects/rockstar/rockstarprojet1.avif",
    images: [
      "/projects/rockstar/rockstarprojet2.avif",
      "/projects/rockstar/rockstarprojet3.avif",
      "/projects/rockstar/rockstarprojet4.avif",
      "/projects/rockstar/rockstarprojet5.avif"
    ],
    // Palette suggérée (Rock/Pop)
    colors: [
      { hex: "#E91E63", name: "Pop Pink" },
      { hex: "#212121", name: "Rock Black" },
      { hex: "#FFEB3B", name: "Electric Yellow" },
      { hex: "#9C27B0", name: "Purple Haze" }
    ]
  },
  // NOUVEAU PROJET 3 : Cherico
  {
    id: 9,
    slug: "cherico",
    client: "Cherico",
    category: "Photography",
    year: "2024",
    services: ["Product Photography", "Art Direction", "Set Design"],
    description: [
      "Entre couleurs franches, lumière ultra clean et compositions graphiques, ce shooting pour Charico met en scène leurs nouvelles références comme de véritables objets design, pensés pour capter l’œil.",
      "Nous avons réalisé un shooting produit sur fonds colorés afin d’accompagner le lancement de leurs nouvelles références. L’objectif : créer des visuels nets, lumineux et immédiatement identifiables, capables de fonctionner aussi bien en e-commerce qu’en social media. La direction photo joue sur des aplats graphiques et des contrastes francs notamment autour d’oranges chaleureux pour faire ressortir les packagings et renforcer la dimension premium et contemporaine de la marque. Résultat : une série cohérente et modulable, pensée pour décliner facilement les visuels en campagnes, bannières et contenus éditoriaux."
    ],
    cover: "/projects/cherico/chericoprojet1.avif",
    images: [
      "/projects/cherico/chericoprojet2.avif",
      "/projects/cherico/chericoprojet3.avif",
      "/projects/cherico/chericoprojet4.avif",
      "/projects/cherico/chericoprojet5.avif"
    ],
    // Palette suggérée (Café/Nature)
    colors: [
      { hex: "#6D4C41", name: "Coffee Bean" },
      { hex: "#D7CCC8", name: "Latte Foam" },
      { hex: "#3E2723", name: "Dark Roast" },
      { hex: "#8D6E63", name: "Chicory" }
    ]
  },// NOUVEAU PROJET 3 : Cherico
  {
    id: 9,
    slug: "comon",
    client: "Comon",
    category: "Brand Identity",
    year: "2025",
    services: ["Brand Strategy", "Visual Identity", "Web Design", "UX/UI"],
    description: [
      "Création de maquettes pour un site de mise en avant d'articles gamifiés. L'objectif est de donner envie à la nouvelle génération de rester connectée à l'actualité via la gamification des articles."
    ],
    cover: "/projects/comon/comonprojet1.avif",
    images: [
      "/projects/comon/comonprojet2.avif",
      "/projects/comon/comonprojet3.avif",
      "/projects/comon/comonprojet4.avif",
      "/projects/comon/comonprojet5.avif"
    ],
    // Palette suggérée (Café/Nature)
    colors: [
      { hex: "#6D4C41", name: "Coffee Bean" },
      { hex: "#D7CCC8", name: "Latte Foam" },
      { hex: "#3E2723", name: "Dark Roast" },
      { hex: "#8D6E63", name: "Chicory" }
    ]
  }
]
