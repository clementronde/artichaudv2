'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, Variants, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/project'

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

export default function ProjectList() {
  // --- LOGIQUE "LOAD MORE" ---
  const PROJECTS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };
  // ---------------------------

  return (
    <div className="container mx-auto px-6 md:px-12 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-5">
        <AnimatePresence>
          {visibleProjects.map((project, index) => {
            const projectImage = project.cover;
            const slugLink = project.slug.startsWith('/works/') ? project.slug : `/works/${project.slug}`;

            return (
              <motion.div
                key={project.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} 
                variants={cardVariants}
                className="group w-full flex flex-col gap-4 cursor-pointer"
              >
                <a href={slugLink} className="block w-full">
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                    {projectImage ? (
                      <Image
                        src={projectImage}
                        alt={project.client}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    <div className="absolute top-4 left-4 flex gap-2">
                       <span className="px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-xs text-white font-medium">
                         {project.category}
                       </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-base font-medium text-black group-hover:text-amber-600 transition-colors">
                      {project.category}
                    </span>
                    <span className="text-sm font-light text-gray-400 italic">
                      for
                    </span>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-black rounded-full" /> 
                       <h3 className="text-base font-bold text-black">
                         {project.client}
                       </h3>
                    </div>
                  </div>
                </a>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* BOUTON CHARGER PLUS */}
      {hasMoreProjects && (
        <div className="flex justify-center mt-20">
          <button
            onClick={handleLoadMore}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white hover:bg-gray-800 transition-all duration-300"
          >
            <span className="font-medium text-sm">Load more works</span>
            {/* Petite flèche animée vers le bas */}
            <span className="transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </button>
        </div>
      )}
    </div>
  )
}