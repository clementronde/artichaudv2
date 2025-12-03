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
    image: "@/public/assets/projects/Charit.avif",
    slug: "/works/charitio"
  },
  {
    id: 2,
    client: "Keleti Agency",
    slogan: "Lorem ipsum dolor sit amet",
    category: "Brand Identity, Brand strategy",
    image: "@public/assets/projects/Keleti.avif",
    slug: "/works/keleti"
  },
  {
    id: 3,
    client: "Disobey",
    slogan: "Consectetur adipiscing elit",
    category: "Brand Identity, Webdesign",
    image: "@public/assets/projects/Disobey.avif",
    slug: "/works/disobey"
  },
  {
    id: 4,
    client: "Lumyn",
    slogan: "Ut labore et dolore magna aliqua",
    category: "Brand Identity, Webdesign, Brand strategy",
    image: "@public/assets/projects/Lumyn.avif",
    slug: "/works/lumyn"
  },
  {
    id: 5,
    client: "Com'on",
    slogan: "Duis aute irure",
    category: "Brand Identity, Webdesign, UX",
    image: "@public/assets/projects/Com'on.avif",
    slug: "/works/comon"
  },
  {
    id: 6,
    client: "Jobmi",
    slogan: "Excepteur sint occaecat",
    category: "Brand Identity, Webdesign, UX",
    image: "@public/assets/projects/Jobmi.avif",
    slug: "/works/jobmi"
  },
  {
    id: 7,
    client: "Multiface",
    slogan: "Quis nostrud exercitation ullamco laboris",
    category: "Brand Identity, Webdesign, Web Marketing",
    image: "@public/assets/projects/Multiface.avif",
    slug: "/works/multiface"
  },
  {
    id: 8,
    client: "Utopia",
    slogan: "Quis nostrud exercitation ullamco laboris",
    category: "Brand Identity, Webdesign, Web Marketing",
    image: "@public/assets/projects/Utopia.avif",
    slug: "/works/utopia"
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
        // Animation d'entrée en cascade
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="w-full"
    >
        <Link 
        href={project.slug} 
        // 1. GRID 9 COLS
        // 2. CURSOR NONE
        // 3. EFFET FOCUS INVERSÉ (group-hover/list)
        className="group/item grid grid-cols-1 md:grid-cols-9 gap-4 py-8 md:py-12 border-t border-white/10 
                    transition-all duration-500 cursor-none items-baseline
                    group-hover/list:opacity-30 hover:!opacity-100"
        onMouseEnter={() => setModal({ active: true, index })}
        onMouseLeave={() => setModal({ active: false, index })}
        >
        
        

        {/* COL 2 à 7 : SLOGAN */}
        <div className="col-span-1 md:col-span-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white transition-all duration-500 group-hover/item:translate-x-2">
            {project.slogan}
            </h2>
        </div>

        {/* COL 8 à 9 : CLIENT */}
        <div className="col-span-1 md:col-span-1">
            <span className="text-base md:text-lg text-gray-400 font-medium block transition-colors duration-300 group-hover/item:text-white">
            {project.client}
            </span>
        </div>

        {/* COL 10 à 12 : CATÉGORIE */}
        <div className="col-span-1 md:col-span-2 text-right md:text-left">
            <p className="text-sm md:text-base text-gray-500 font-light transition-colors duration-300 group-hover/item:text-amber-500">
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
  const modalContainer = useRef(null)
  
  useEffect(() => {
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" })
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" })
    
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e
      xMoveContainer(clientX)
      yMoveContainer(clientY)
    })
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
    <main className="w-full bg-[#0a0a0a] min-h-screen text-white pt-40 pb-32 relative">
      
      {/* 1. HEADER INTRODUCTION (Grille 8 colonnes) */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          
          {/* Label "Works" - Col 1 */}
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-white block">
              Works
            </span>
          </div>

          {/* Phrase d'accroche - Col 2 à 6 (Span 5) */}
          <div className="col-span-1 md:col-span-5 md:col-start-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-white tracking-tight"
            >
              Working to shape the future of your industry? We create brands that bring that ambition to life.
            </motion.h1>
          </div>

        </div>
      </div>

      {/* LISTE PROJETS */}
      {/* group/list active l'effet "Focus inversé" */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col w-full group/list">
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