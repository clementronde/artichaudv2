'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import BlogSection from '@/components/home/BlogSection'

// On enregistre le plugin GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// --- DONNÉES : SERVICES ---
const capabilities = [
  {
    category: "Identité de marque",
    items: [
      { title: "Stratégie de marque & Identité verbale", description: "Ateliers de marque, Stratégie & Positionnement, Développement de baseline & slogan, Storytelling, Ton de voix, Rédaction." },
      { title: "Identité visuelle", description: "Logo, Palette de couleurs, Typographie, Graphismes & Illustrations de marque, Design System." },
      { title: "Levée de fonds & Go-to-Market", description: "Design de pitch deck, Vidéo produit, Support événementiel, Merchandising, Contenu digital, Assets commerciaux et marketing." }
    ]
  },
  {
    category: "Création de site web",
    items: [
      { title: "UX & Rédaction", description: "Structure et navigation du site, Wireframing, Cartographie du contenu, Messages & Rédaction." },
      { title: "Design de site web", description: "Design System, Graphismes de marque, Iconographie et illustrations." },
      { title: "Développement web", description: "Développement de site web, SEO technique, Intégrations API, Configuration CMS, Animations, Interactions et QA." }
    ]
  },
  {
    category: "Réseaux sociaux",
    items: [
      { title: "Stratégie & pilotage social media", description: "Ateliers de marque, Stratégie & Positionnement, Développement de baseline & slogan, Storytelling, Ton de voix." },
      { title: "Création de contenu", description: "Logo, Palette de couleurs, Typographie, Graphismes & Illustrations de marque, Design System." },
      { title: "Captation", description: "Design de pitch deck, Vidéo produit, Support événementiel, Merchandising, Contenu digital." }
    ]
  },
  {
    category: "Webmarketing",
    items: [
      { title: "Stratégie & pilotage social media", description: "Ateliers de marque, Stratégie & Positionnement, Développement de baseline & slogan, Storytelling." },
      { title: "Création de contenu", description: "Logo, Palette de couleurs, Typographie, Graphismes & Illustrations de marque, Design System." },
      { title: "Captation", description: "Design de pitch deck, Vidéo produit, Support événementiel, Merchandising, Contenu digital." }
    ]
  }
]

// --- DONNÉES : OFFRES ---
const offers = [
  {
    title: "Ponctuel",
    description: "Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est plus difficile de capter l'attention. Nous créons des assets spécifiques pour résoudre des problèmes immédiats.",
    image: null, // Pas d'image
    color: "bg-[#111111]"
  },
  {
    title: "Long terme",
    description: "Partenariat continu. Nous devenons votre équipe design dédiée, itérant et faisant évoluer votre marque mois après mois.",
    // 👇 VRAIE IMAGE UTILISÉE ICI
    image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop",
    color: "bg-[#111111]"
  }
]

// --- DONNÉES : VALEURS ---
const values = [
  { id: "1", title: "Collaborateurs en série", text: "Soyons honnêtes. Vous avez construit quelque chose de génial. Nous créons des écosystèmes où la collaboration alimente la croissance." },
  { id: "2", title: "Nourris par la diversité", text: "Différentes perspectives créent de meilleures solutions. Nous embrassons le chaos de la créativité pour trouver la clarté." },
  { id: "3", title: "Guidés par la bienveillance", text: "Pas d'ego, juste du bon travail et des bonnes personnes qui construisent ensemble." },
  { id: "4", title: "Qui ne se contentent jamais", text: "Le bien est l'ennemi du génial. Nous ajustons chaque pixel jusqu'à ce que ce soit parfait." }
]

interface ServicesClientProps {
  posts: any[]
}

export default function ServicesClient({ posts }: ServicesClientProps) {
  const containerRef = useRef(null) // Le wrapper (blanc)
  const blackBoxRef = useRef(null)  // La boîte noire qui s'anime

  // --- ANIMATION GSAP (COPIÉE DE PROJECT INTRO) ---
  useGSAP(() => {
    if (!blackBoxRef.current || !containerRef.current) return;

    // 1. Expansion de largeur (85% -> 100%)
    gsap.fromTo(blackBoxRef.current,
      { width: "85%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Commence quand le haut du container touche le bas de l'écran
          end: "top 60%",      // Finit quand le haut du container est à 60% de l'écran
          scrub: 0.5,
        }
      }
    )

    // 2. Parallax de sortie (Effet de glissement vers le bas à la fin)
    gsap.to(blackBoxRef.current, {
      y: '10%',
      scale: 0.98,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      }
    })

  }, { scope: containerRef })

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
              Une agence 360 qui réunit tous les métiers de la création. C'est mieux pour penser chaque idée.
            </motion.h1>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-48">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-500 font-light leading-relaxed"
            >
              Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">Parlons-en</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. CAPABILITIES + OFFRES (ANIMÉ) */}
      {/* ContainerRef sert de repère pour le ScrollTrigger */}
      <section ref={containerRef} className="relative z-0 w-full mb-32 flex justify-center overflow-hidden">
        <div
            ref={blackBoxRef}
            className="bg-[#0a0a0a] text-white rounded-[40px] p-8 md:p-12 lg:p-20 mx-auto will-change-transform"
        >
            <h2 className="text-[40px] md:text-[60px] font-normal mb-20 tracking-tight">Nos expertises</h2>

            {/* LISTE SERVICES */}
            <div className="flex flex-col mb-32">
                {capabilities.map((cap, index) => (
                    <div key={index} className={`grid grid-cols-1 md:grid-cols-8 gap-x-5 py-16 md:py-24 border-t border-white/20 ${index === capabilities.length - 1 ? 'border-b border-white/20' : ''}`}>
                        <div className="col-span-1 md:col-span-5 mb-8 md:mb-0">
                            <h3 className="text-3xl md:text-5xl font-normal text-white">{cap.category}</h3>
                        </div>
                        <div className="col-span-1 md:col-span-3 flex flex-col gap-10">
                            {cap.items.map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <h4 className="text-xl font-medium text-white">{item.title}</h4>
                                    <p className="text-base text-gray-400 font-light leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* HEADER OFFRES */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 mb-12 items-baseline">
                <div className="md:col-span-1"><span className="text-sm font-medium text-white/60">Services</span></div>
                <div className="md:col-span-6"><h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-white tracking-tight">Comment nous pouvons vous accompagner</h2></div>
            </div>

            {/* CARTES OFFRES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className={`relative w-full min-h-[600px] rounded-none p-8 md:p-12 flex flex-col justify-between overflow-hidden group ${offer.color}`}
                    >
                        <div className="relative z-10"><h3 className="text-4xl md:text-5xl font-normal text-white mb-6">{offer.title}</h3></div>
                        <div className="relative z-10 md:pr-12"><p className="text-lg text-white/60 font-light leading-relaxed">{offer.description}</p></div>

                        {/* 👇 FIX : AFFICHAGE CONDITIONNEL DE L'IMAGE */}
                        {offer.image && (
                            <div className="absolute top-24 right-[-50px] w-[350px] aspect-[16/10] rotate-6 transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:translate-x-4">
                                <div className="relative w-full h-full overflow-hidden shadow-2xl">
                                    <Image
                                        src={offer.image}
                                        alt="Support visual"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. WHY ARTICHAUD (LAYOUT SPLIT GAUCHE/DROITE) */}
      <section className="container mx-auto px-6 md:px-12 mb-32">

        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">

            {/* GAUCHE (Col 1-4) : TITRE FIXE */}
            <div className="md:col-span-4 mb-16 md:mb-0">
                <div className="grid grid-cols-4 gap-x-5 sticky top-32"> {/* Sticky pour garder le titre visible au scroll */}
                    <div className="col-span-1 pt-2">
                        <span className="text-sm font-medium text-arti-black">Pourquoi</span>
                    </div>
                    <div className="col-span-3">
                        <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                            Pourquoi Artichaud <br /> c'est bien
                        </h2>
                    </div>
                </div>
            </div>

            {/* DROITE (Col 5-8) : LISTE DES VALEURS */}
            <div className="md:col-span-4 flex flex-col">
                {values.map((val, index) => (
                    // Ligne du tableau (Bordure uniquement ici)
                    <div
                        key={val.id}
                        className={`grid grid-cols-1 md:grid-cols-4 gap-x-5 py-12 border-t border-black/10 group hover:bg-gray-50 transition-colors duration-500 ${index === values.length - 1 ? 'border-b' : ''}`}
                    >

                        {/* 1. Numéro (Col 5 Globale) */}
                        <div className="md:col-span-1 hidden md:block">
                            <span className="text-sm font-bold text-arti-black">{val.id}</span>
                        </div>

                        {/* 2. Titre (Col 6 Globale) */}
                        <div className="md:col-span-1 mb-4 md:mb-0">
                            <h3 className="text-xl md:text-2xl font-medium text-arti-black group-hover:text-amber-600 transition-colors leading-tight">
                                {val.title}
                            </h3>
                        </div>

                        {/* 3. Texte (Col 7-8 Globales) */}
                        <div className="md:col-span-2">
                            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                                {val.text}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
      </section>

      {/* 4. NOS SERVICES DÉTAILLÉS - MAILLAGE INTERNE */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Découvrez nos services en détail
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Explorez nos expertises et découvrez comment nous pouvons vous accompagner dans votre croissance digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/services/creation-site-internet"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300 flex flex-col"
          >
            <div className="text-4xl mb-6">🌐</div>
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              Création de Site Internet
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-6 flex-grow">
              Sites web modernes, performants et SEO-friendly. Design sur mesure, développement Next.js/React, optimisations techniques.
            </p>
            <span className="text-sm font-medium text-arti-black group-hover:translate-x-2 inline-block transition-transform">
              En savoir plus →
            </span>
          </Link>

          <Link
            href="/services/branding-identite-visuelle"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300 flex flex-col"
          >
            <div className="text-4xl mb-6">🎨</div>
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              Branding & Identité Visuelle
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-6 flex-grow">
              Identité de marque forte et cohérente. Logo, charte graphique, stratégie de marque, design system. Démarquez-vous.
            </p>
            <span className="text-sm font-medium text-arti-black group-hover:translate-x-2 inline-block transition-transform">
              En savoir plus →
            </span>
          </Link>

          <Link
            href="/services/seo-referencement-naturel"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300 flex flex-col"
          >
            <div className="text-4xl mb-6">📈</div>
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              SEO & Référencement Naturel
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-6 flex-grow">
              Dominez Google et générez du trafic qualifié. Audit SEO, optimisations techniques, stratégie de contenu, netlinking.
            </p>
            <span className="text-sm font-medium text-arti-black group-hover:translate-x-2 inline-block transition-transform">
              En savoir plus →
            </span>
          </Link>
        </div>
      </section>

      <BlogSection posts={posts} />

    </main>
  )
}
