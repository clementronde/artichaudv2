'use client'

import Image from "next/image"
import { motion, Variants } from "framer-motion" 

// IMPORTS DES COMPOSANTS
import VisionSection from "@/components/about/VisionSection"
import AboutIntro from "@/components/about/AboutIntro"
import WhyArtichaud from "@/components/about/WhyArtichaud"
import { CanvasEffect } from "@/components/ui/canvas-effect"
import TrustedSection from "@/components/about/TrustedSection"
// Assurez-vous que le chemin vers BlogSection est correct (souvent dans home ou à la racine des components)
import BlogSection from "@/components/home/BlogSection" 

// --- TYPES ---
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  tags: string[];
}

// --- ANIMATIONS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
}

const staggerContainer: Variants = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const imageReveal: Variants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" }
  }
}

export default function AboutClient({ posts }: { posts: BlogPost[] }) {
  return (
    <main className="w-full bg-[#FFFFFF] min-h-screen overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 md:pt-48 pb-20">

        {/* Canvas background */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
           <CanvasEffect />
        </div>

        {/* Header text */}
        <motion.div
          className="relative z-10 w-full px-5 md:px-10 mb-10 md:mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full">

            {/* Label */}
            <div className="col-span-4 md:col-span-1 flex flex-col items-start">
              <motion.div
                variants={fadeInUp}
                className="text-black uppercase md:normal-case text-base font-normal"
              >
                Studio
              </motion.div>
            </div>

            {/* Titre principal */}
            <div className="col-span-4 md:col-span-5 mt-4 md:mt-0">
              <motion.h1
                variants={fadeInUp}
                className="text-black leading-[1.3] font-normal"
                style={{ fontSize: 'clamp(32px, 3.8vw, 52px)' }}
              >
                Une agence créative indépendante à Boulogne-Billancourt, convaincue que la marque précède le design.
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Hero image — pleine largeur */}
        <motion.div
          className="relative z-10 w-full h-[55vh] md:h-[80vh] overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={imageReveal}
        >
          <Image
            src="/image_hero_about.png"
            alt="Artichaud Studio"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>

      {/* --- AUTRES SECTIONS --- */}
      <VisionSection />
      <AboutIntro />
      <WhyArtichaud />
      
      {/* Nouvelle Section Trusted */}
      <TrustedSection />

      {/* Blog (reçoit les données du serveur) */}
      <BlogSection posts={posts} />

    </main>
  )
}