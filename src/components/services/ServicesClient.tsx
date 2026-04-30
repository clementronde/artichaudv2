'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import BlogSection from '@/components/home/BlogSection'
import { useLocale } from '@/context/LocaleContext'

// On enregistre le plugin GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const serviceContent = {
  fr: {
    label: 'Services',
    heroTitle: "Une agence 360 qui réunit tous les métiers de la création. C'est mieux pour penser chaque idée.",
    heroText: "Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention.",
    cta: 'Parlons-en',
    expertiseTitle: 'Nos expertises',
    supportTitle: 'Comment nous pouvons vous accompagner',
    whyLabel: 'Pourquoi',
    whyTitle: <>Pourquoi travailler <br /> avec Artichaud</>,
    imageAlt: 'Visuel de collaboration créative',
    capabilities: [
      {
        category: 'Identité de marque',
        items: [
          { title: 'Stratégie de marque & Identité verbale', description: 'Ateliers de marque, stratégie & positionnement, baseline, slogan, storytelling, ton de voix et rédaction.' },
          { title: 'Identité visuelle', description: 'Logo, palette de couleurs, typographie, graphismes, illustrations de marque et design system.' },
          { title: 'Levée de fonds & Go-to-Market', description: 'Pitch deck, vidéo produit, support événementiel, merchandising, contenu digital et assets commerciaux.' },
        ],
      },
      {
        category: 'Création de site web',
        items: [
          { title: 'UX & Rédaction', description: 'Structure du site, navigation, wireframes, cartographie des contenus, messages clés et rédaction.' },
          { title: 'Design de site web', description: 'Direction artistique, UI design, design system, graphismes de marque, iconographie et illustrations.' },
          { title: 'Développement web', description: 'Développement, SEO technique, intégrations API, configuration CMS, animations, interactions et QA.' },
        ],
      },
      {
        category: 'Réseaux sociaux',
        items: [
          { title: 'Stratégie social media', description: 'Choix des plateformes, lignes éditoriales, calendrier de publication, piliers de contenu et objectifs par canal.' },
          { title: 'Création de contenu', description: 'Posts, carrousels, stories, reels, templates de marque, déclinaisons de campagnes et contenus courts.' },
          { title: 'Pilotage & reporting', description: 'Suivi des performances, analyse des formats qui engagent, recommandations mensuelles et ajustements éditoriaux.' },
        ],
      },
      {
        category: 'Webmarketing',
        items: [
          { title: 'Acquisition & conversion', description: 'SEO, SEA, landing pages, tunnels de conversion, campagnes email et optimisation des points de contact clés.' },
          { title: 'Tracking & analytics', description: 'Plan de mesure, événements, tableaux de bord, lecture des parcours utilisateurs et priorisation des actions.' },
          { title: 'Contenus marketing', description: 'Pages de vente, lead magnets, séquences email, contenus SEO et supports conçus pour générer des demandes qualifiées.' },
        ],
      },
    ],
    offers: [
      {
        title: 'Ponctuel',
        description: "Vous avez un besoin précis : une landing page, une identité, un audit, des assets de campagne ou une amélioration ciblée. Nous intervenons vite, avec un livrable clair.",
        image: null,
        color: 'bg-[#111111]',
      },
      {
        title: 'Long terme',
        description: 'Partenariat continu. Nous devenons votre équipe créative dédiée pour faire évoluer votre site, votre marque et vos expériences digitales mois après mois.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop',
        color: 'bg-[#111111]',
      },
    ],
    values: [
      { id: '1', title: 'Un cadrage clair', text: "Avant de designer, nous clarifions vos objectifs, vos cibles et les messages à faire passer. Le site part d'une vraie direction, pas d'une simple envie graphique." },
      { id: '2', title: 'Un design qui sert la marque', text: "Nous cherchons l'équilibre entre impact visuel, lisibilité et conversion. Chaque page doit aider vos visiteurs à comprendre votre offre et à passer à l'action." },
      { id: '3', title: 'Une base technique solide', text: 'Performance, responsive, structure propre, CMS ou stack sur mesure : nous construisons des sites pensés pour durer, être maintenus et évoluer avec votre activité.' },
      { id: '4', title: 'Le SEO intégré dès le départ', text: 'Arborescence, contenus, balises, maillage interne et vitesse de chargement sont pris en compte dès la conception pour éviter de corriger après coup.' },
    ],
  },
  en: {
    label: 'Services',
    heroTitle: 'A 360 digital studio bringing every creative discipline together. Better thinking for every idea.',
    heroText: 'You have built something strong. Now the challenge is clearer: earning attention, explaining your value and turning interest into action.',
    cta: "Let's talk",
    expertiseTitle: 'Our expertise',
    supportTitle: 'How we can support you',
    whyLabel: 'Why',
    whyTitle: <>Why work <br /> with Artichaud</>,
    imageAlt: 'Creative collaboration visual',
    capabilities: [
      {
        category: 'Brand identity',
        items: [
          { title: 'Brand strategy & verbal identity', description: 'Brand workshops, strategy, positioning, baseline, tagline, storytelling, tone of voice and copywriting.' },
          { title: 'Visual identity', description: 'Logo, colour palette, typography, brand graphics, illustrations and design system.' },
          { title: 'Fundraising & go-to-market', description: 'Pitch decks, product videos, event materials, merchandising, digital content and sales assets.' },
        ],
      },
      {
        category: 'Website creation',
        items: [
          { title: 'UX & copywriting', description: 'Website structure, navigation, wireframes, content mapping, key messages and copywriting.' },
          { title: 'Web design', description: 'Art direction, UI design, design systems, brand graphics, iconography and illustrations.' },
          { title: 'Web development', description: 'Development, technical SEO, API integrations, CMS setup, animations, interactions and QA.' },
        ],
      },
      {
        category: 'Social media',
        items: [
          { title: 'Social media strategy', description: 'Platform choices, editorial lines, publishing calendar, content pillars and channel objectives.' },
          { title: 'Content creation', description: 'Posts, carousels, stories, reels, branded templates, campaign variations and short-form content.' },
          { title: 'Management & reporting', description: 'Performance tracking, format analysis, monthly recommendations and editorial calendar adjustments.' },
        ],
      },
      {
        category: 'Digital marketing',
        items: [
          { title: 'Acquisition & conversion', description: 'SEO, SEA, landing pages, conversion funnels, email campaigns and optimisation of key touchpoints.' },
          { title: 'Tracking & analytics', description: 'Measurement plans, event setup, dashboards, user journey analysis and action prioritisation.' },
          { title: 'Marketing content', description: 'Sales pages, lead magnets, email sequences, SEO content and campaign assets designed to generate qualified leads.' },
        ],
      },
    ],
    offers: [
      {
        title: 'One-off',
        description: 'You need a focused deliverable: a landing page, identity, audit, campaign assets or targeted improvement. We move fast with a clear scope.',
        image: null,
        color: 'bg-[#111111]',
      },
      {
        title: 'Long-term',
        description: 'An ongoing partnership. We become your dedicated creative team to evolve your website, brand and digital experiences month after month.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop',
        color: 'bg-[#111111]',
      },
    ],
    values: [
      { id: '1', title: 'Clear framing', text: 'Before designing, we clarify your goals, audiences and key messages. The website starts from a real direction, not just a visual mood.' },
      { id: '2', title: 'Design that serves the brand', text: 'We balance visual impact, readability and conversion. Every page should help visitors understand your offer and take action.' },
      { id: '3', title: 'A solid technical base', text: 'Performance, responsive design, clean structure, CMS or custom stack: we build websites designed to last, evolve and be maintained.' },
      { id: '4', title: 'SEO built in from the start', text: 'Structure, content, tags, internal linking and loading speed are considered from day one to avoid costly corrections later.' },
    ],
  },
} as const

interface ServicesClientProps {
  posts: any[]
}

export default function ServicesClient({ posts }: ServicesClientProps) {
  const containerRef = useRef(null) // Le wrapper (blanc)
  const blackBoxRef = useRef(null)  // La boîte noire qui s'anime
  const { locale } = useLocale()
  const content = serviceContent[locale]

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
      <div className="w-full px-[40px] mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-black block">{content.label}</span>
          </div>
          <div className="col-span-1 md:col-span-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-black tracking-tight"
            >
              {content.heroTitle}
            </motion.h1>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-48">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-500 font-light leading-relaxed"
            >
              {content.heroText}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">{content.cta}</span>
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
            <h2 className="text-[40px] md:text-[60px] font-normal mb-20 tracking-tight">{content.expertiseTitle}</h2>

            {/* LISTE SERVICES */}
            <div className="flex flex-col mb-32">
                {content.capabilities.map((cap, index) => (
                    <div key={index} className={`grid grid-cols-1 md:grid-cols-8 gap-x-5 py-16 md:py-24 border-t border-white/20 ${index === content.capabilities.length - 1 ? 'border-b border-white/20' : ''}`}>
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
                <div className="md:col-span-1"><span className="text-sm font-medium text-white/60">{content.label}</span></div>
                <div className="md:col-span-6"><h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-white tracking-tight">{content.supportTitle}</h2></div>
            </div>

            {/* CARTES OFFRES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                {content.offers.map((offer, index) => (
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
                                        alt={content.imageAlt}
                                        fill
                                        sizes="350px"
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

    {/* 3. WHY ARTICHAUD (LAYOUT FLUIDE 8 COLUMNS) */}
      {/* w-full + px-[40px] assure que le site prend toute la largeur moins les 40px de bord */}
      <section className="w-full px-[40px] mb-32">

        {/* Grille de 8 colonnes avec gouttière de 20px */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-[20px]">

            {/* --- GAUCHE (Col 1 à 4) --- */}
            {/* On utilise col-span-4 pour prendre la moitié gauche exacte */}
            <div className="md:col-span-4 mb-16 md:mb-0 relative">
                
                {/* Sticky Wrapper : On recrée une sous-grille de 4 colonnes pour aligner le texte */}
                <div className="sticky top-32 grid grid-cols-4 gap-[20px]">
                    
                    {/* Col 1 : Label */}
                    <div className="col-span-1 pt-2 border-t border-transparent">
                        <span className="text-sm font-medium text-arti-black">{content.whyLabel}</span>
                    </div>

                    {/* Col 2-3 : Titre (Le titre prend 2 colonnes, donc col-span-2) */}
                    {/* Note: Col 4 est laissée vide ici implicitement */}
                    <div className="col-span-2 md:col-span-3">
                        <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                            {content.whyTitle}
                        </h2>
                    </div>
                </div>
            </div>

            {/* --- DROITE (Col 5 à 8) --- */}
            {/* md:col-start-5 force le démarrage à la 5ème colonne */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col">
                {content.values.map((val, index) => (
                    
                    // Ligne item : On recrée une grille de 4 colonnes (qui correspondent aux colonnes 5, 6, 7, 8 globales)
                    <div 
                        key={val.id} 
                        className={`grid grid-cols-1 md:grid-cols-4 gap-[20px] py-12 border-t border-black/10 group hover:bg-gray-50 transition-colors duration-500 ${index === content.values.length - 1 ? 'border-b' : ''}`}
                    >

                        {/* COLONNES 5 & 6 (Globales) -> Col 1 & 2 (Locales) : ID + TITRE */}
                        <div className="md:col-span-2 flex items-start">
                            
                            {/* ID : Placé au début de la colonne 5 */}
                            {/* w-[20%] ou une largeur fixe permet de simuler l'espace avant le titre "milieu colonne 5" */}
                            <span className="text-sm font-bold text-arti-black shrink-0 w-12 md:w-16 pt-1">
                                {val.id}
                            </span>
                            
                            {/* Titre : Commence après l'ID (milieu col 5) et s'étend vers col 6 */}
                            <h3 className="text-xl md:text-2xl font-medium text-arti-black group-hover:text-amber-600 transition-colors leading-tight">
                                {val.title}
                            </h3>
                        </div>

                        {/* COLONNES 7 & 8 (Globales) -> Col 3 & 4 (Locales) : TEXTE */}
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

     

      <BlogSection posts={posts} />

    </main>
  )
}
