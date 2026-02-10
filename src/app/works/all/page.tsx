'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { motion } from 'framer-motion'

// --- DONNÉES PROJETS ---
const allProjects = [
  {
    id: 1,
    client: "Charit.IO",
    slogan: "Soutenons la culture ensemble !",
    category: "Brand Identity, Webdesign, UX",
    image: "/projects/charitio/charitioprojet1.avif",
    slug: "/works/charitio"
  },
  {
    id: 2,
    client: "Keleti Agency",
    slogan: "Portfolio de projets créatifs et innovants",
    category: "Brand Identity, Brand strategy",
    image: "/projects/keleti/keletiprojet1.avif",
    slug: "/works/keleti"
  },
  {
    id: 3,
    client: "Disobey",
    slogan: "Plateforme musicale de musique alternative",
    category: "Brand Identity, Webdesign",
    image: "/projects/disobey/disobeyprojet1.avif",
    slug: "/works/disobey"
  },
  {
    id: 4,
    client: "Lumyn",
    slogan: "Plateforme de concours créatifs",
    category: "Brand Identity, Webdesign, Brand strategy",
    image: "/projects/lumyn/Lumynprojet1.avif",
    slug: "/works/lumyn"
  },
  {
    id: 5,
    client: "Com'on",
    slogan: "Gamification de l'actualité pour la nouvelle génération",
    category: "Brand Identity, Webdesign, UX",
    image: "/projects/comon/comonprojet1.avif",
    slug: "/works/comon"
  },
  {
    id: 6,
    client: "Jobmi",
    slogan: "Tiers de confiance de la reconversion professionnelle",
    category: "Brand Identity, Webdesign, UX",
    image: "/projects/jobmi/jobmiprojet1.avif",
    slug: "/works/jobmi"
  },
  {
    id: 7,
    client: "Multiface",
    slogan: "Musée virtuel d'art contemporain en réalité augmentée",
    category: "Brand Identity, Webdesign, Web Marketing",
    image: "/projects/multiface/multifaceprojet1.avif",
    slug: "/works/multiface"
  },
  {
    id: 8,
    client: "Rockstar",
    slogan: "Collectif musical rock",
    category: "Brand Identity, Webdesign, Web Marketing",
    image: "/projects/rockstar/rockstarprojet1.avif",
    slug: "/works/rockstar"
  }
]

// --- COMPOSANT LIGNE PROJET ---
interface ProjectRowProps {
  project: typeof allProjects[0]
  setModal: (modal: { active: boolean; index: number }) => void
  index: number
}

const ProjectRow = ({ project, setModal, index }: ProjectRowProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <Link 
        href={project.slug} 
        className="group/item grid grid-cols-8 gap-5 py-8 md:py-12 border-t border-white/10 
                   transition-all duration-500 cursor-none items-baseline
                   group-hover/list:opacity-30 hover:!opacity-100"
        onMouseEnter={() => setModal({ active: true, index })}
        onMouseLeave={() => setModal({ active: false, index })}
      >
        
        {/* COL 1-5 : SLOGAN */}
        <div className="col-span-8 md:col-span-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white transition-all duration-500 group-hover/item:translate-x-2">
            {project.slogan}
          </h2>
        </div>

        {/* COL 6 : CLIENT */}
        <div className="col-span-4 md:col-span-1">
          <span className="text-base md:text-lg text-gray-400 font-medium block transition-colors duration-300 group-hover/item:text-white">
            {project.client}
          </span>
        </div>

        {/* COL 7-8 : CATÉGORIE */}
        <div className="col-span-4 md:col-span-2 text-right md:text-left">
          <p className="text-sm md:text-base text-gray-500 font-light transition-colors duration-300 group-hover/item:text-[#D0F800]">
            {project.category}
          </p>
        </div>

      </Link>
    </motion.div>
  )
}

// --- COMPOSANT MODAL (IMAGE FLOTTANTE) ---
const Modal = ({ modal, projects }: { modal: { active: boolean; index: number }, projects: typeof allProjects }) => {
  const { active, index } = modal
  const modalContainer = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!modalContainer.current) return
    
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      xMoveContainer(clientX)
      yMoveContainer(clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div 
      ref={modalContainer}
      variants={{
        initial: { scale: 0, x: "-50%", y: "-50%" },
        open: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
        closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
      }}
      animate={active ? "open" : "closed"}
      initial="initial"
      className="fixed top-0 left-0 h-[350px] w-[450px] overflow-hidden pointer-events-none z-50 flex items-center justify-center bg-[#0a0a0a]"
    >
      <div 
        style={{ top: index * -100 + "%" }} 
        className="relative h-full w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        {projects.map((project, i) => (
          <div key={`modal_${i}`} className="h-full w-full flex items-center justify-center">
            <Image 
              src={project.image}
              alt="project"
              width={450}
              height={350}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// --- PAGE PRINCIPALE ---
export default function AllProjectsPage() {
  const [modal, setModal] = useState({ active: false, index: 0 })

  return (
    <main className="w-full bg-[#0a0a0a] min-h-screen text-white pt-[230px] pb-32 relative">
      
      {/* ================================================
          1. HEADER INTRODUCTION
          Grid: 8 colonnes, margin: 40px, gap: 20px
      ================================================ */}
      <div className="px-10 mb-32">
        <div className="grid grid-cols-8 gap-5">
          
          {/* Label "Projets" - Col 1 */}
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-base font-normal text-white block">
              Projets
            </span>
          </div>

          {/* Phrase d'accroche - Col 2-6 (5 colonnes) */}
          <div className="col-span-8 md:col-span-5 md:col-start-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[45px] lg:text-[56px] leading-[1.1] font-normal text-white tracking-tight"
            >
              Vous travaillez à façonner l'avenir de votre industrie ? Nous créons des marques qui donnent vie à cette ambition.
            </motion.h1>
          </div>

          {/* Colonnes 7-8 vides pour respecter la grille */}

        </div>
      </div>

      {/* ================================================
          LISTE PROJETS
          Grid: 8 colonnes, margin: 40px
          group/list active l'effet "Focus inversé"
      ================================================ */}
      <div className="px-10 flex flex-col w-full group/list">
        {allProjects.map((project, index) => (
          <ProjectRow 
            key={project.id} 
            index={index} 
            project={project} 
            setModal={setModal} 
          />
        ))}
      </div>

      {/* IMAGE FLOTTANTE */}
      <Modal modal={modal} projects={allProjects} />

    </main>
  )
}