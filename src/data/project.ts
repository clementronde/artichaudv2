// Fichier : src/data/projects.ts

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
    cover: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE
    colors: [
      { hex: "#FF4D4D", name: "Heart Red" },
      { hex: "#FFFFFF", name: "Pure White" },
      { hex: "#1A1A1A", name: "Charcoal" },
      { hex: "#F2F2F2", name: "Soft Grey" }
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
    cover: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE
    colors: [
      { hex: "#D4A373", name: "Sand" },
      { hex: "#CCD5AE", name: "Sage" },
      { hex: "#E9EDC9", name: "Cream" },
      { hex: "#353535", name: "Dark Stone" }
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
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE (Celle de ta maquette)
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
    cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE
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
    cover: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE
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
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop"
    ],
    // 👇 AJOUT PALETTE
    colors: [
      { hex: "#111111", name: "Asphalt" },
      { hex: "#888888", name: "Concrete" },
      { hex: "#FF0000", name: "Alert Red" },
      { hex: "#FFFF00", name: "Caution" }
    ]
  }
]