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
        
        {/* Fond Néon #D0FF00 */}
        <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
           <CanvasEffect />
        </div>

        {/* Textes Animés */}
        <motion.div 
          className="relative z-10 w-full px-5 md:px-10 mb-20 md:mb-32"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full">
            
            {/* Label Services */}
            <div className="col-span-4 md:col-span-1 flex flex-col items-start">
              <motion.div 
                variants={fadeInUp}
                className="text-black uppercase md:normal-case"
                style={{ fontSize: '16px', fontFamily: 'Helvetica Now Display, Arial, sans-serif', fontWeight: '400' }}
              >
                Services
              </motion.div>
            </div>

            {/* Titre Principal */}
            <div className="col-span-4 md:col-span-3 mt-4 md:mt-0">
              <motion.h1 
                variants={fadeInUp}
                className="text-black"
                style={{ fontSize: 'clamp(32px, 4vw, 45px)', lineHeight: '140%', fontFamily: 'Helvetica Now Display, Arial, sans-serif', fontWeight: '400' }}
              >
                Une agence 360 qui réunit tous les métiers de la création. C’est mieux penser chaque idée.
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Image Hero */}
        <div className="relative z-10 w-full h-[50vh] md:h-[80vh] overflow-hidden">
          <motion.div 
            className="w-full h-full relative"
            initial="hidden"
            animate="visible"
            variants={imageReveal}
          >
            <Image 
              src="/images/office-team.jpg" 
              alt="Agence Artichaud Team"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </div>
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