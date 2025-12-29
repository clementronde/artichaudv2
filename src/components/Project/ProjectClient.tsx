'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import BlogSection from '@/components/home/BlogSection'

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

export default function ProjectClient({ project, posts }: ProjectClientProps) {
  return (
    <main className="w-full bg-white min-h-screen">

      {/* 1. HEADER - Titre du projet */}
      <section className="pt-32 pb-12 px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black tracking-tight"
        >
          {project.client}
        </motion.h1>
      </section>

      {/* 2. HERO IMAGE - Grande image de couverture */}
      <section className="w-full">
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9]">
          <Image
            src={project.cover}
            alt={`${project.client} cover`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* 3. CALL TO ACTION SECTION - Fond noir avec texte */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* Colonne gauche - Label */}
          <div>
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Call to action
            </span>
          </div>

          {/* Colonne droite - Titre + Description */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2]">
              Hey, we're Artichaud Studio - a branding and agency the
            </h2>

            <div className="space-y-6">
              {project.description.map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-white/80 leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Services */}
            <div className="pt-8">
              <p className="text-sm text-white/60 mb-4">Services</p>
              <div className="flex flex-wrap gap-3">
                {project.services.map((service, index) => (
                  <span
                    key={index}
                    className="text-sm text-white/90 font-light"
                  >
                    {service}
                    {index < project.services.length - 1 && ','}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/contact"
                className="text-sm text-white hover:text-amber-500 transition-colors underline underline-offset-4"
              >
                → Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERIE + PALETTE DE COULEURS */}
      <section className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Première ligne - Image + Palette */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* Image 1 */}
            {project.images[0] && (
              <div className="relative w-full aspect-[4/5] bg-gray-100">
                <Image
                  src={project.images[0]}
                  alt={`${project.client} image 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Palette de couleurs */}
            <div className="grid grid-cols-4 gap-4">
              {project.colors.map((color, index) => (
                <div key={index} className="flex flex-col">
                  <div
                    className="w-full aspect-[4/5]"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="mt-2 text-xs font-medium text-arti-black">
                    {color.name}
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grande image du logo/branding */}
          {project.images[1] && (
            <div className="relative w-full aspect-[21/9] bg-[#0a0a0a] mb-4">
              <Image
                src={project.images[1]}
                alt={`${project.client} logo`}
                fill
                className="object-contain p-12"
                sizes="100vw"
              />
            </div>
          )}

          {/* Deux images côte à côte en bas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images[2] && (
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={project.images[2]}
                  alt={`${project.client} image 3`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            {project.images[3] && (
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={project.images[3]}
                  alt={`${project.client} image 4`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SECTION BLOG */}
      <section className="border-t border-gray-200">
        <BlogSection posts={posts} />
      </section>

      {/* 6. FOOTER CTA */}
      <section className="bg-[#0a0a0a] text-white py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Hey
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal mb-12 max-w-3xl">
            Let's talk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <div className="space-y-2 text-white/70">
                <p>contact@artichaud.studio</p>
                <p>+33 (0)1 XX XX XX XX</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Follow Us</h3>
              <div className="space-y-2 text-white/70">
                <p><Link href="#" className="hover:text-white transition-colors">Instagram</Link></p>
                <p><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></p>
                <p><Link href="#" className="hover:text-white transition-colors">Twitter</Link></p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Overview</h3>
              <div className="space-y-2 text-white/70">
                <p><Link href="/works" className="hover:text-white transition-colors">Works</Link></p>
                <p><Link href="/services" className="hover:text-white transition-colors">Services</Link></p>
                <p><Link href="/about" className="hover:text-white transition-colors">About</Link></p>
                <p><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
