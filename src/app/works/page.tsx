'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection' 

// --- DONNÉES PROJETS ---
const projects = [
  {
    id: 1,
    client: "Charitio",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2727&auto=format&fit=crop",
    slug: "/works/charitio",
    format: "aspect-[16/10]"
  },
  {
    id: 2,
    client: "Keleti Design",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2864&auto=format&fit=crop",
    slug: "/works/keleti",
    format: "aspect-[16/10]"
  },
  {
    id: 3,
    client: "Disobey",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    slug: "/works/disobey",
    format: "aspect-[16/10]"
  },
  {
    id: 4,
    client: "Lumyn",
    category: "Web Design & Dev",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    slug: "/works/lumyn",
    format: "aspect-[16/10]"
  },
  {
    id: 5,
    client: "Comon",
    category: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2940&auto=format&fit=crop",
    slug: "/works/jobmi",
    format: "aspect-[16/10]"
  },
  {
    id: 6,
    client: "Jobmi",
    category: "Brand identity ",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop",
    slug: "/works/multiface",
    format: "aspect-[16/10]"
  },
  {
    id: 7,
    client: "Multiface",
    category: "Brand identity",
    image: "https://images.unsplash.com/photo-1558655146-d09347e0c7a8?q=80&w=2574&auto=format&fit=crop",
    slug: "/works/multiface",
    format: "aspect-[16/10]"
  }
]

// --- ANIMATION ---
const cardVariants: Variants = {
  hidden: (index: number) => {
    const isLeft = index % 2 === 0;
    return {
      opacity: 0,
      x: isLeft ? -150 : 150, 
      y: 100,
      rotate: isLeft ? -5 : 5,
      scale: 0.95
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// --- COMPOSANT CARTE PROJET ---
const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} 
      variants={cardVariants}
      className="group w-full flex flex-col gap-4 cursor-pointer"
    >
      <Link href={project.slug} className="block w-full">
        <div className={`relative w-full ${project.format} bg-gray-100 overflow-hidden`}>
          <Image
            src={project.image}
            alt={project.client}
            fill
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
          <div className="absolute top-4 left-4 flex gap-2">
             <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs text-white font-medium">
               {project.category}
             </span>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-base font-medium text-arti-black group-hover:text-amber-600 transition-colors">
            Brand identity
          </span>
          <span className="text-sm font-light text-gray-400 italic">
            for
          </span>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-black rounded-full" /> 
             <h3 className="text-base font-bold text-arti-black">
               {project.client}
             </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// --- PAGE WORKS ---
export default function WorkPage() {
  return (
    <main className="w-full bg-white pt-40 min-h-screen overflow-x-hidden">
      
      {/* 1. HEADER INTRODUCTION (Grille 8 colonnes) */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          
          {/* Label "Works" - Col 1 */}
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-black block">
              Works
            </span>
          </div>

          {/* Phrase d'accroche - Col 2 à 6 (Span 5) */}
          <div className="col-span-1 md:col-span-5 md:col-start-2">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-black tracking-tight"
            >
              Working to shape the future of your industry? We create brands that bring that ambition to life.
            </motion.h1>
          </div>

        </div>
      </div>

      {/* 2. SECTION TITRE GRILLE + BOUTON */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[40px] md:text-[60px] font-normal tracking-tight text-arti-black"
            >
            Most Recent
            </motion.h2>

            <Link 
                href="/works/all" 
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300" 
            >
                <span className="relative z-10 font-medium text-sm">All projects</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        </div>
      </div>

      {/* 3. GRILLE PROJETS */}
      <div className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

{/* LIGNE DE SÉPARATION */}
      <div className="container mx-auto ">
        <div className="w-full border-t border-black/20" />
      </div>

      <BlogSection />

    </main>
  )
}