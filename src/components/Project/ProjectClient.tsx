'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection' 
import ProjectIntro from '@/components/Project/ProjectIntro' 
import Link from 'next/link'

// Interface pour les types
interface ProjectClientProps {
  project: any; 
  posts: any[];
}

// Utilitaire contraste
const getContrastingTextColor = (hex: string) => {
  if (!hex) return 'text-black';
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 150 ? 'text-black' : 'text-white';
}

export default function ProjectClient({ project, posts }: ProjectClientProps) {
  const containerRef = useRef(null)
  const fullImageRef = useRef(null)

  // Parallax Hero
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] })
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80])

  // Parallax Image Full Width
  const { scrollYProgress: scrollFull } = useScroll({ target: fullImageRef, offset: ["start end", "end start"] })
  const yFullImage = useTransform(scrollFull, [0, 1], [0, -50])

  return (
    <main className="w-full bg-white min-h-screen">
      
      {/* 1. HERO SECTION (Reste dans le container pour l'alignement du texte) */}
      <div className="container mx-auto px-6 md:px-12 pt-32 md:pt-40 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5">
          <div className="col-span-8 flex flex-col gap-1">
            <motion.span 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-base font-normal text-black block"
            >
              Works
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2rem,3vw,2.8125rem)] font-normal text-black leading-snug uppercase tracking-tight"
            >
              {project.client}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* 2. HERO IMAGE */}
      <div ref={containerRef} className="w-full relative overflow-hidden bg-gray-100 z-0" style={{ height: '678px' }}>
        <motion.div style={{ y: yImage }} className="relative w-full h-[115%] -top-[7%]">
            <Image src={project.cover} alt={project.client} fill priority className="object-cover" />
        </motion.div>
      </div>

      {/* 3. INTRO */}
      <div className="relative z-10 -mt-20 md:-mt-40">
        <ProjectIntro 
            label="The Challenge" 
            title={`How we helped ${project.client} redefine their impact.`} 
            description={project.description} 
        />
      </div>

      {/* 4. SPLIT IMAGES + PALETTE (MODIFIÉ : Full Width) */}
      {/* Remplacement de 'container mx-auto px-6' par 'w-full px-0' */}
      <section className="w-full px-0 md:px-12 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            <div className="relative w-full h-[500px] md:h-[740px] bg-gray-100 overflow-hidden">
                {project.images && project.images[0] && (
                    <Image 
                        src={project.images[0]} 
                        alt="Project detail 1" 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                )}
            </div>
            <div className="flex w-full h-[500px] md:h-[740px]">
                {project.colors && project.colors.map((color: any, index: number) => {
                    const textColorClass = getContrastingTextColor(color.hex);
                    return (
                        <div 
                            key={index} 
                            className="group flex-1 h-full flex flex-col justify-end p-6 transition-all duration-500 hover:flex-[1.5]"
                            style={{ backgroundColor: color.hex }}
                        >
                            <div className={`flex flex-col gap-1 ${textColorClass}`}>
                                <span className="text-xs uppercase tracking-widest font-bold opacity-60">
                                    {color.name}
                                </span>
                                <span className="text-sm font-medium uppercase">
                                    {color.hex}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </section>

      {/* 5. FULL WIDTH IMAGE */}
      {project.images && project.images[1] && (
        <section ref={fullImageRef} className="w-full px-0 md:px-12 h-[500px] md:h-[740px] relative overflow-hidden bg-gray-100 mb-5">
            <motion.div style={{ y: yFullImage }} className="relative w-full h-[120%] -top-[10%]">
                <Image 
                    src={project.images[1]} 
                    alt="Project immersive shot" 
                    fill 
                    className="object-cover"
                />
            </motion.div>
        </section>
      )}

      {/* 6. DOUBLE GRID (MODIFIÉ : Full Width) */}
      {/* Remplacement de 'container mx-auto px-6' par 'w-full px-0' */}
      <section className="w-full px-0 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {project.images && project.images[2] && (
                <div className="relative w-full h-[500px] md:h-[740px] bg-gray-100 overflow-hidden">
                    <Image 
                        src={project.images[2]} 
                        alt="Project detail 2" 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            )}
            {project.images && project.images[3] && (
                <div className="relative w-full h-[500px] md:h-[740px] bg-gray-100 overflow-hidden">
                    <Image 
                        src={project.images[3]} 
                        alt="Project detail 3" 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                </div>
            )}
        </div>
      </section>

      {/* BLOG SECTION */}
      <div className="border-t border-black/10">
        <BlogSection posts={posts} />
      </div>

    </main>
  )
}