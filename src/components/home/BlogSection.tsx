'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'

// --- DONNÉES BLOG ---
const blogPosts = [
  {
    id: 1,
    title: "Why Your Brand Identity is Losing You Clients (And How to Fix It)",
    excerpt: "Branding is more than a logo. Discover the 5 pillars of a visual identity.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    tags: ["Branding", "Strategy"],
    readTime: "5 min",
    slug: "/blog/brand-identity-fix",
    date: "Oct 24"
  },
  {
    id: 2,
    title: "Headless CMS vs Traditional: Why We Switched to Next.js",
    excerpt: "Speed, security, and scalability. A deep-dive into the JAMstack.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    tags: ["Tech", "Next.js"],
    readTime: "8 min",
    slug: "/blog/headless-cms-nextjs",
    date: "Oct 18"
  },
  {
    id: 3,
    title: "The Psychology of Color in UI Design: Beyond Aesthetics",
    excerpt: "How to use color theory to guide user behavior on landing pages.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    tags: ["UI/UX", "Design"],
    readTime: "6 min",
    slug: "/blog/color-psychology-ui",
    date: "Oct 10"
  },
  {
    id: 4,
    title: "SEO in 2025: Why Content Quality Trumps Keywords",
    excerpt: "Google's latest core updates have changed the game.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    tags: ["SEO", "Growth"],
    readTime: "4 min",
    slug: "/blog/seo-2025-guide",
    date: "Sep 28"
  }
]

// --- COMPOSANT CURSEUR PERSONNALISÉ ---
// Correction : On utilise un type générique ou `any` pour éviter le conflit strict si nécessaire,
// mais ici RefObject<HTMLDivElement> est le standard correct.
const DragCursor = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const [isVisible, setIsVisible] = useState(false)
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      // Centrage du curseur (taille 100px / 2 = 50px de décalage)
      // On utilise e.clientX directement car c'est un element fixed
      x.set(e.clientX - 50)
      y.set(e.clientY - 50)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [containerRef, x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center w-[100px] h-[100px]"
      style={{ x, y, opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
    >
      {/* 1. Le cercle flou (Derrière) */}
      <div className="absolute inset-0 bg-[#ccff00] rounded-full blur-xl opacity-90" />
      
      {/* 2. Le texte Net (Devant) */}
      <span className="relative z-10 text-black font-extrabold text-sm uppercase tracking-widest">
        Drag
      </span>
    </motion.div>
  )
}

// --- COMPOSANT CARTE BLOG ---
const BlogCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <motion.article 
      className="relative flex-shrink-0 w-[300px] md:w-[400px] group select-none"
    >
      <Link href={post.slug} className="block w-full h-full" suppressHydrationWarning>
        
        {/* IMAGE CONTAINER : Carrée + Effet Border Radius */}
        <div className="w-full aspect-square mb-6 overflow-hidden bg-gray-100 relative
                        rounded-lg transition-all duration-500 ease-out 
                        group-hover:rounded-[100px]"> 
          
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay léger au survol */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* METADATA (Date & Tags) */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
           <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
             {post.date} — {post.readTime}
           </span>
           <div className="flex gap-1">
             {post.tags.map(tag => (
               <span key={tag} className="px-2 py-0.5 rounded-full border border-black/10 text-[10px] font-medium text-gray-500 uppercase bg-white">
                 {tag}
               </span>
             ))}
           </div>
        </div>

        {/* TITRE & EXCERPT */}
        <div className="flex flex-col gap-2 pr-4">
            <h3 className="text-xl md:text-2xl font-normal leading-tight text-[#1a1a1a] group-hover:text-amber-600 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm font-light line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
        </div>
        
      </Link>
    </motion.article>
  )
}

// --- COMPOSANT PRINCIPAL ---
export default function BlogSection() {
  // On initialise avec null, typescript infère RefObject<HTMLDivElement>
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderWidth, setSliderWidth] = useState(0)

  useEffect(() => {
    if (sliderRef.current && containerRef.current) {
      // Calculer la limite de drag (largeur contenu - largeur écran + marge padding)
      setSliderWidth(sliderRef.current.scrollWidth - containerRef.current.offsetWidth + 100)
    }
  }, [])

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden">
      
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-6 block">
            Our Journal
          </span>
          <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-[#1a1a1a] tracking-tight">
            Get the low-down with the <br />
            <span className="text-gray-400 italic">latest news</span> and views.
          </h2>
        </div>
        
        <Link 
          href="/blog"
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300"
          suppressHydrationWarning
        >
          <span className="text-sm font-medium">Discover all articles</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* SLIDER ZONE */}
      <div ref={containerRef} className="relative w-full pl-6 md:pl-12 cursor-none">
        
        {/* Curseur custom passé avec la ref container */}
        <DragCursor containerRef={containerRef} />

        {/* Zone Draggable */}
        <motion.div 
          ref={sliderRef}
          className="flex gap-8 md:gap-8 cursor-grab active:cursor-grabbing pb-12"
          drag="x"
          dragConstraints={{ right: 0, left: -sliderWidth }} 
          whileTap={{ cursor: "grabbing" }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          
          {/* Carte "Voir plus" à la fin */}
          <div className="flex-shrink-0 w-[200px] md:w-[300px] aspect-square flex items-center justify-center">
             <Link 
                href="/blog" 
                className="group flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity"
                suppressHydrationWarning
             >
                <div className="w-20 h-20 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                   <span className="text-2xl">→</span>
                </div>
                <span className="font-medium text-lg">View all articles</span>
             </Link>
          </div>
        </motion.div>
      </div>

    </section>
  )
}