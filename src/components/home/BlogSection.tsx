'use client'

import React, { useRef, useState, useEffect } from 'react'
import type { RefObject } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ============================================================
   DATA BLOG
   ============================================================ */
const blogPosts = [
  {
    id: 1,
    title: "Why Your Brand Identity is Losing You Clients (And How to Fix It)",
    excerpt:
      "Branding is more than a logo. Discover the 5 pillars of a visual identity that converts visitors into loyal customers.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    tags: ["Branding", "Strategy"],
    readTime: "5 min read",
    slug: "/blog/brand-identity-fix",
    date: "Oct 24, 2024",
  },
  {
    id: 2,
    title: "Headless CMS vs Traditional: Why We Switched to Next.js",
    excerpt:
      "Speed, security, and scalability. Why modern agencies are abandoning WordPress for the JAMstack.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    tags: ["Tech", "Next.js"],
    readTime: "8 min read",
    slug: "/blog/headless-cms-nextjs",
    date: "Oct 18, 2024",
  },
  {
    id: 3,
    title: "The Psychology of Color in UI Design: Beyond Aesthetics",
    excerpt:
      "How to use color theory to guide user behavior and improve your conversion rates on landing pages.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    tags: ["UI/UX", "Design"],
    readTime: "6 min read",
    slug: "/blog/color-psychology-ui",
    date: "Oct 10, 2024",
  },
  {
    id: 4,
    title: "SEO in 2025: Why Content Quality Trumps Keywords",
    excerpt:
      "Google's latest updates changed the game. Here is our checklist to ensure your site ranks number one.",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    tags: ["SEO", "Growth"],
    readTime: "4 min read",
    slug: "/blog/seo-2025-guide",
    date: "Sep 28, 2024",
  },
]

/* ============================================================
   CURSEUR DRAG JAUNE (VERSION A)
   ============================================================ */
type DragCursorProps = {
  containerRef: RefObject<HTMLDivElement>
}

const DragCursor: React.FC<DragCursorProps> = ({ containerRef }) => {
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 50) // 100px de diamètre => -50 pour centrer
      mouseY.set(e.clientY - 50)
    }

    const handleEnter = () => setVisible(true)
    const handleLeave = () => setVisible(false)

    container.addEventListener('mousemove', handleMove)
    container.addEventListener('mouseenter', handleEnter)
    container.addEventListener('mouseleave', handleLeave)

    return () => {
      container.removeEventListener('mousemove', handleMove)
      container.removeEventListener('mouseenter', handleEnter)
      container.removeEventListener('mouseleave', handleLeave)
    }
  }, [containerRef, mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.7,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* halo flou */}
      <div className="absolute w-28 h-28 rounded-full bg-yellow-400 blur-2xl opacity-80" />
      {/* cercle net */}
      <div className="absolute w-20 h-20 rounded-full bg-yellow-300 shadow-xl" />
      {/* texte */}
      <span className="relative text-black font-semibold tracking-wide select-none">
        Drag
      </span>
    </motion.div>
  )
}

/* ============================================================
   BLOG CARD
   ============================================================ */
const BlogCard: React.FC<{ post: (typeof blogPosts)[0] }> = ({ post }) => {
  return (
    <motion.article
      className="relative flex-shrink-0 w-[350px] md:w-[450px] group cursor-grab active:cursor-grabbing"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Link href={post.slug} className="block w-full h-full">
        {/* IMAGE */}
        <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-6 bg-gray-900">
          <Image
            fill
            src={post.image}
            alt={post.title}
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
          />

          {/* OVERLAY VIEW */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <span className="px-6 py-3 bg-white text-black rounded-full text-sm font-medium">
              View article
            </span>
          </div>

          {/* TAGS */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-3 px-2">
          <div className="flex justify-between text-xs font-medium text-gray-400 uppercase tracking-wide">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-2xl font-normal leading-tight text-[#1a1a1a] group-hover:text-amber-600 transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-gray-500 font-light line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

/* ============================================================
   SECTION PRINCIPALE
   ============================================================ */
const BlogSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderWidth, setSliderWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (!sliderRef.current || !containerRef.current) return
      const total =
        sliderRef.current.scrollWidth - containerRef.current.offsetWidth
      setSliderWidth(total > 0 ? total : 0)
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <section className="relative w-full bg-white py-32 overflow-x-hidden overflow-y-visible">
      {/* HEADER */}
      <div className="container mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-wide text-gray-500 mb-4 block">
            Our Journal
          </span>
          <h2 className="text-[40px] md:text-[56px] leading-[1.1] font-normal text-[#1a1a1a]">
            Get the low-down with the <br />
            <span className="text-amber-600 italic">latest news</span> and views.
          </h2>
        </div>

        <Link
          href="/blog"
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300"
        >
          <span className="text-sm font-bold">Discover all articles</span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>

      {/* SLIDER + CURSOR */}
      <div
        ref={containerRef}
        className="relative w-full pl-6 md:pl-12 cursor-none overflow-x-hidden overflow-y-visible pb-6"
      >
        <DragCursor containerRef={containerRef} />

        <motion.div
          ref={sliderRef}
          className="flex gap-8 cursor-grab active:cursor-grabbing pb-12"
          drag="x"
          dragConstraints={{ right: 0, left: -sliderWidth }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}

          {/* CARD VIEW ALL */}
          <div className="flex-shrink-0 w-[220px] flex items-center justify-center">
            <Link
              href="/blog"
              className="group flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              <div className="w-16 h-16 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                →
              </div>
              <span className="font-medium text-sm">View all</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection
