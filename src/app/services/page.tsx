'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection' 

// --- DONNÉES : SERVICES (Mise à jour avec descriptions) ---
const capabilities = [
  {
    category: "Brand identity",
    items: [
      {
        title: "Brand Strategy & Verbal Identity",
        description: "Brand Workshops, Strategy & Positioning, Tagline & Slogan Development, Storytelling, Tone-of-voice, Copywriting."
      },
      {
        title: "Visual Identity",
        description: "Logo, Color Palette, Font, Brand Graphics & Illustration, Design System."
      },
      {
        title: "Fundraising & Go-to-Market",
        description: "Pitch Deck Design, Product Video, Event Collateral, Merchandise, Digital Content, Sales and Marketing Assets."
      }
    ]
  },
  {
    category: "Website Creation",
    items: [
      {
        title: "UX & Copy",
        description: "Site Structure and Navigation, Wireframing, Content Mapping, Messaging & Copy."
      },
      {
        title: "Website Design",
        description: "Design System, Brand Graphics, Iconography and Illustrations."
      },
      {
        title: "Web Development",
        description: "Website Development, Technical SEO, API integrations, CMS setup, Animations, Interactions and QA."
      }
    ]
  },
  {
    category: "Social Media",
    items: [
      {
        title: "Strategie & pilotage social media",
        description: "Brand Workshops, Strategy & Positioning, Tagline & Slogan Development, Storytelling, Tone-of-voice."
      },
      {
        title: "Création de contenu",
        description: "Logo, Color Palette, Font, Brand Graphics & Illustration, Design System."
      },
      {
        title: "Captation",
        description: "Pitch Deck Design, Product Video, Event Collateral, Merchandise, Digital Content."
      }
    ]
  },
  {
    category: "Webmarketing",
    items: [
      {
        title: "Strategie & pilotage social media",
        description: "Brand Workshops, Strategy & Positioning, Tagline & Slogan Development, Storytelling."
      },
      {
        title: "Création de contenu",
        description: "Logo, Color Palette, Font, Brand Graphics & Illustration, Design System."
      },
      {
        title: "Captation",
        description: "Pitch Deck Design, Product Video, Event Collateral, Merchandise, Digital Content."
      }
    ]
  }
]

// --- DONNÉES : VALEURS ---
const values = [
  {
    id: "1",
    title: "Serial collaborators",
    text: "Let's be honest. You've built something great. But lately, it's been harder to capture attention. We build ecosystems where collaboration fuels growth."
  },
  {
    id: "2",
    title: "Fueled by diversity",
    text: "Different perspectives create better solutions. We embrace the chaos of creativity to find the clarity of a strong message."
  },
  {
    id: "3",
    title: "Guided by kindness",
    text: "We believe in radical transparency and kindness. No ego, just great work and good people building things together."
  },
  {
    id: "4",
    title: "That never settle",
    text: "Good is the enemy of great. We push pixels, strategy, and code until it feels right, not just finished."
  }
]

// --- DONNÉES : OFFRES ---
const offers = [
  {
    title: "One shot",
    description: "Let's be honest. You've built something great. But lately, it's been harder to capture attention. We build specific assets to solve immediate problems.",
    image: null, // Pas d'image pour le premier bloc
    color: "bg-[#1A0F0F]" // Une teinte sombre légèrement différente (rougeâtre/marron comme la maquette) ou #0a0a0a standard
  },
  {
    title: "Long term",
    description: "Continuous partnership. We become your dedicated design team, iterating and evolving your brand month after month.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop", // Remplace par ton image de cartes de visite
    color: "bg-[#1A0F0F]"
  }
]

export default function ServicesPage() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const yBlackBox = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <main className="w-full bg-white min-h-screen pt-40 pb-32 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-black block">Services</span>
          </div>
          <div className="col-span-1 md:col-span-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-black tracking-tight"
            >
              Une agence 360 qui réunit tous les métiers de la création. C’est mieux pour penser chaque idée.
            </motion.h1>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-48">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-500 font-light leading-relaxed"
            >
              Let’s be honest. You’ve built something great. But lately, it’s been harder to capture attention, or even - the right kind. Maybe your brand feels a little out of step with where your business is heading.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Link 
                    href="/contact" 
                    className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300" 
                >
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">Let's talk</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. CAPABILITIES (NOUVELLE STRUCTURE VERTICALE) */}
      <section ref={containerRef} className="container mx-auto px-6 md:px-12 mb-32">
        <motion.div 
            style={{ y: yBlackBox }} 
            className="w-full bg-[#0a0a0a] text-white rounded-[32px] p-8 md:p-12 lg:p-20"
        >
            <h2 className="text-[40px] md:text-[60px] font-normal mb-20 tracking-tight">
                Our Capabilities
            </h2>

            {/* LISTE VERTICALE */}
            <div className="flex flex-col">
                {capabilities.map((cap, index) => (
                    // LIGNE (ROW) - Grid 8 Colonnes
                    <div 
                        key={index} 
                        className={`grid grid-cols-1 md:grid-cols-8 gap-x-5 py-16 md:py-24 border-t border-white/20 ${index === capabilities.length - 1 ? 'border-b border-white/20' : ''}`}
                    >
                        
                        {/* COLONNE GAUCHE (5 Grids) - TITRE CATÉGORIE */}
                        <div className="col-span-1 md:col-span-5 mb-8 md:mb-0">
                            <h3 className="text-3xl md:text-5xl font-normal text-white">
                                {cap.category}
                            </h3>
                        </div>

                        {/* COLONNE DROITE (3 Grids) - LISTE ÉLÉMENTS */}
                        <div className="col-span-1 md:col-span-3 flex flex-col gap-10">
                            {cap.items.map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <h4 className="text-xl font-medium text-white">
                                        {item.title}
                                    </h4>
                                    <p className="text-base text-gray-400 font-light leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                    
                ))}
            </div>
            {/* 2.5 SECTION : HOW WE SUPPORT YOU */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 mb-12 items-end">
            <div className="md:col-span-1 pt-2">
                <span className="text-sm font-medium text-arti-black">
                   Services
                </span>
            </div>
            <div className="md:col-span-6">
                <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                    How we can support you
                </h2>
            </div>
        </div>

        {/* Les 2 Blocs (4 Grids / 4 Grids) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {offers.map((offer, index) => (
                <div 
                    key={index}
                    // Hauteur fixe (min-h) pour assurer l'aspect vertical de la maquette
                    className={`relative w-full min-h-[600px]  p-8 md:p-12 flex flex-col justify-between overflow-hidden group ${offer.color}`}
                >
                    {/* Contenu Texte */}
                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-5xl font-normal text-white mb-6">
                            {offer.title}
                        </h3>
                    </div>

                    {/* Description en bas */}
                    <div className="relative z-10 md:pr-12">
                        <p className="text-lg text-white/60 font-light leading-relaxed">
                            {offer.description}
                        </p>
                    </div>

                    {/* Image Décorative (Uniquement si définie, ex: Bloc de droite) */}
                    {offer.image && (
                        <div className="absolute top-12 right-0 w-[280px] aspect-[4/3] rotate-6 translate-x-12 transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:translate-x-4">
                            <div className="relative w-full h-full overflow-hidden shadow-2xl">
                                <img // J'utilise img ici pour l'exemple, mets Image de next/image si tu as l'import
                                    src={offer.image} 
                                    alt="Support visual" 
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    )}

                    {/* Effet Hover (Optionnel : cercle "C" ou lueur) */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
            ))}
        </div>

      </section>
        </motion.div>
      </section>

      {/* 3. WHY ARTICHAUD */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 mb-16">
            <div className="md:col-span-1 pt-2">
                <span className="text-sm font-medium text-arti-black">Why</span>
            </div>
            <div className="md:col-span-4">
                <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                    Why Artichaud <br /> is good
                </h2>
            </div>
        </div>

        <div className="w-full border-t border-black/10">
            {values.map((val) => (
                <div key={val.id} className="grid grid-cols-1 md:grid-cols-8 gap-x-5 py-12 border-b border-black/10 group hover:bg-gray-50 transition-colors duration-500">
                    <div className="md:col-span-1 hidden md:block">
                        <span className="text-sm font-bold text-arti-black">{val.id}</span>
                    </div>
                    <div className="md:col-span-3 mb-4 md:mb-0">
                        <h3 className="text-2xl font-medium text-arti-black group-hover:text-amber-600 transition-colors">
                            {val.title}
                        </h3>
                    </div>
                    <div className="md:col-span-4">
                        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl">
                            {val.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <div className="border-t border-black/10">
        <BlogSection />
      </div>

    </main>
  )
}