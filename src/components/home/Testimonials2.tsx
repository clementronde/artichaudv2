'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { useLocale } from '@/context/LocaleContext'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Testimonials() {
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const { t } = useLocale()
  const testimonials = t.testimonials.items

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
    
    const handleResize = () => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
        }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative w-full bg-white py-24 z-30 overflow-x-clip md:overflow-visible">

      <div className="px-6 md:px-[40px] relative z-10">
        
        {/* HEADER */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-12 gap-y-8 mb-12 md:mb-20"
        >
          <motion.div variants={fadeInUp} className="md:col-span-2 pt-2">
            <span className="text-sm font-medium text-black">{t.testimonials.tagline}</span>
          </motion.div>

          <div className="md:col-span-8">
            <motion.h2
              variants={fadeInUp}
              className="text-[40px] md:text-[60px] font-normal text-black leading-[1.1] tracking-tight mb-8"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              {t.testimonials.heading.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <span className="text-sm font-medium">{t.testimonials.readMore}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* SLIDER */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing w-full"
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            whileTap={{ cursor: "grabbing" }}
            className="flex"
          >
            {testimonials.map((item, index) => (
              <div 
                key={item.id} 
                className={`
                  shrink-0 w-[85vw] md:w-[450px] pr-8 md:pr-12 flex flex-col justify-between h-auto min-h-[300px] select-none
                  ${index !== 0 ? 'border-l border-gray-200 pl-8 md:pl-12' : ''} 
                `}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-black" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <div className="relative group">
                      <p
                          className="text-lg md:text-xl text-black leading-relaxed font-light pointer-events-none transition-colors duration-300 group-hover:text-black/70"
                          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                      >
                          {item.text}
                      </p>
                      {/* Guillemet décoratif */}
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="absolute -top-4 -left-2 text-6xl font-serif text-black/5 leading-none select-none -z-10"
                      >
                          “
                      </motion.span>
                  </div>
                </div>

                <div className="mt-8 pt-6 pointer-events-none border-t border-transparent group-hover:border-black/5 transition-colors duration-500">
                  <h4 className="text-base font-bold text-black">{item.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
