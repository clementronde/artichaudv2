// Fichier : src/data/project.ts

export const projects = [
  {
    id: 1,
    slug: "charitio",
    client: "Charit.IO",
    category: "Brand Identity",
    year: "2024",
    services: ["Brand Strategy", "Visual Identity", "Web Design", "UX/UI"],
    description: [
      "Charity needs clarity. We helped Charit.io simplify their message to reach more donors efficiently.",
      "By stripping away the noise, we focused on the human connection at the heart of their mission."
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
      "Keleti required a bold stance in a saturated market. We designed a system based on architectural precision.",
      "Every curve and line was calculated to reflect their engineering background."
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
      "Light is fast. Lumyn's website needed to be faster. We built a headless architecture for instant loading.",
      "The result is a seamless digital experience that mirrors the fluidity of light itself."
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
    category: "Brand Strategy",
    year: "2023",
    services: ["Naming", "Tone of Voice", "Identity"],
    description: [
      "Connecting talent with opportunity. Jobmi needed a friendly yet professional face.",
      "We created a brand identity that feels approachable, trustworthy, and modern."
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
      "A magazine about the many faces of creativity. We handled the art direction for their launch issue.",
      "Bold typography and striking imagery were key to cutting through the noise."
    ],
    cover: "/projects/multiface/multifaceprojet1.avif",
    images: [
      "/projects/multiface/multifaceprojet2.avif",
      "/projects/multiface/multifaceprojet3.avif",
      "/projects/multiface/multifaceprojet4.avif",
      "/projects/multiface/multifaceprojet5.avif"
    ],
    colors: [
      { hex: "#000000", name: "Black" },
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
      "Rules are made to be broken. Disobey is a streetwear brand that speaks to the rebels.",
      "We crafted a chaotic, energetic visual language that refuses to be ignored."
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
      "Création de la maquette et de la charte graphique pour proposer des bons d'achats aux étudiants.",
      "Une expérience gamifiée pour inciter à la récupération de produits bientôt périmés."
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
      "Création d'une mascotte et d'un univers rock inspiré de la pop culture.",
      "Une identité visuelle pour un festival haute en énergie et en couleurs."
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
      "Photo produit pour mettre en valeur une nouvelle marque de chicorée et café.",
      "Capturer l'authenticité et la chaleur des arômes à travers l'image."
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
      "Création de maquettes pour un site de mise en avant d'articles gamifiés.",
      "Donner envie à la nouvelle génération de restere connecter à l'actualité avec la gamification des articles."
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