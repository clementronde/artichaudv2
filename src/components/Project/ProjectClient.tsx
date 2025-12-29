'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection'
import ProjectIntro from './ProjectIntro'

// --- TYPES ---
interface Project {
  id: number
  slug: string
  client: string
  category: string
  year: string
  services: string[]
  description: string[]
  cover: string
  images: string[]
  colors: { hex: string; name: string }[]
}

interface ProjectClientProps {
  project: Project
  posts: any[]
}

// --- UTILITAIRE : Calcul du contraste (Noir ou Blanc) ---
function getContrastColor(hexColor: string) {
  // On enlève le # si présent
  const hex = hexColor.replace('#', '');
  
  // On convertit en RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Formule YIQ pour la luminosité perçue
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  // Si > 128 c'est clair -> texte noir, sinon texte blanc
  return yiq >= 128 ? '#000000' : '#FFFFFF';
}

export default function ProjectClient({ project, posts }: ProjectClientProps) {
  return (
    <main className="w-full bg-white min-h-screen">

      {/* 1. HERO SECTION (TEXTE) */}
      <section className="pt-32 px-6 md:px-12 pb-12">
        <div className="w-full max-w-[90vw] text-left">
          {/* Label "Work" */}
          <span className="block text-sm font-medium text-arti-black uppercase tracking-wider mb-4">
            Work
          </span>
          
          {/* Nom du projet */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal text-arti-black tracking-tight">
            {project.client}
          </h1>
        </div>
      </section>

      {/* 2. HERO IMAGE (FULL WIDTH) */}
      <section className="w-full pb-0 relative z-10">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <Image
            src={project.cover}
            alt={`${project.client} Cover`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* 3. BLOC INTRO (ProjectIntro) */}
      <ProjectIntro 
        description={project.description}
        services={project.services}
        year={project.year}
        client={project.client}
      />

      {/* 4. SECTION MIXTE (Image Gauche + Couleurs Droite) */}
      <section className="px-6 md:px-12 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px] md:h-[700px]">
          
          {/* Image Gauche - Statique */}
          {project.images[0] && (
            <div className="relative h-full w-full bg-gray-100 overflow-hidden rounded-sm">
              <Image
                src={project.images[0]}
                alt="Project Detail 1"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          )}

          {/* Droite : 4 Couleurs en accordéon */}
          <div className="flex h-full w-full overflow-hidden rounded-sm">
            {project.colors.map((color, index) => {
              // Calcul dynamique de la couleur du texte pour ce bloc
              const textColor = getContrastColor(color.hex);

              return (
                <div
                  key={index}
                  className="relative flex-1 hover:flex-[3] transition-all duration-500 ease-in-out group cursor-pointer flex flex-col justify-end p-6 border-r border-white/10 last:border-0 overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Informations Toujours Visibles */}
                  {/* On applique la couleur calculée directement ici */}
                  <div 
                    className="absolute bottom-6 left-6 whitespace-nowrap opacity-100 transition-opacity duration-300"
                    style={{ color: textColor }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">
                      {color.name}
                    </p>
                    <p className="text-[10px] font-mono opacity-80">
                      {color.hex}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. IMAGE PLEINE LARGEUR - Statique */}
      <section className="px-6 md:px-12 mb-4">
        {project.images[1] && (
          <div className="relative w-full aspect-[21/10] bg-gray-100 overflow-hidden rounded-sm">
            <Image
              src={project.images[1]}
              alt="Project Full Width"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </section>

      {/* 6. DEUX IMAGES 50/50 - Statique */}
      <section className="px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images[2] && (
            <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm">
              <Image
                src={project.images[2]}
                alt="Project Grid 1"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          )}
          
          {project.images[3] && (
            <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm">
              <Image
                src={project.images[3]}
                alt="Project Grid 2"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* SECTION BLOG + FOOTER */}
      <section className="border-t border-gray-200">
        <BlogSection posts={posts} />
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#0a0a0a] text-white py-24 px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-6xl font-normal mb-8">Next Project?</h2>
        <Link href="/works" className="text-lg underline hover:text-amber-500 transition-colors">
          View all works
        </Link>
      </section>

    </main>
  )
}