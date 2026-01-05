'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection'
import { projects as allProjects } from '@/data/project'

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
            {project.category}
          </span>
          <span className="text-sm font-light text-gray-400 italic">
            pour
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

// --- COMPOSANT CLIENT PRINCIPAL ---
// On accepte 'posts' ici
export default function WorkClient({ posts }: { posts: any[] }) {
  const [visibleCount, setVisibleCount] = useState(6)

  // On mappe les projets en fonction du nombre visible
  const projects = allProjects.slice(0, visibleCount).map(project => ({
    id: project.id,
    client: project.client,
    category: project.category,
    image: project.cover,
    slug: `/works/${project.slug}`,
    format: "aspect-[16/10]"
  }))

  const hasMore = visibleCount < allProjects.length

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, allProjects.length))
  }

  return (
    <main className="w-full bg-white pt-40 min-h-screen overflow-x-hidden">

      {/* 1. HEADER INTRODUCTION */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-black block">
              Projets
            </span>
          </div>
          <div className="col-span-1 md:col-span-5 md:col-start-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-black tracking-tight"
            >
              Vous travaillez à façonner l'avenir de votre industrie ? Nous créons des marques qui donnent vie à cette ambition.
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
              Les plus récents
            </motion.h2>

            <Link
                href="/works/all"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300"
            >
                <span className="relative z-10 font-medium text-sm">Tous les projets</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        </div>
      </div>

      {/* 3. GRILLE PROJETS */}
      <div className="container mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* BOUTON VOIR PLUS */}
        {hasMore && (
          <div className="flex justify-center mt-16">
            <motion.button
              onClick={loadMore}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <span className="relative z-10 font-medium">Voir plus de projets</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* LIGNE DE SÉPARATION */}
      <div className="container mx-auto ">
        <div className="w-full border-t border-black/20" />
      </div>

      {/* SECTION BLOG (On passe les posts reçus !) */}
      <BlogSection posts={posts} />

    </main>
  )
}