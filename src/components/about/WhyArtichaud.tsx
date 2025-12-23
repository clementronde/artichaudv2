'use client'

import { motion, Variants } from 'framer-motion'

const reasons = [
  {
    id: "01",
    title: "Serial collaborators",
    text: "We believe the best work happens when lines blur between agency and client. We don't just take a brief; we co-create to build something that truly belongs to you, breaking down silos to foster genuine partnership."
  },
  {
    id: "02",
    title: "Fueled by diversity",
    text: "Creativity thrives on friction. By bringing together distinct backgrounds, cultures, and disciplines, we challenge the expected to discover the exceptional. Different perspectives lead to unique solutions."
  },
  {
    id: "03",
    title: "Guided by kindness",
    text: "Great work requires trust, not ego. We prioritize transparency and honest conversations, ensuring that the process is as enjoyable as the final result is impactful. We build relationships, not just assets."
  },
  {
    id: "04",
    title: "That never settle",
    text: "\"Good enough\" is where we start, not where we finish. We obsess over the details, pushing every pixel and strategy until it doesn't just work—it resonates. We are relentless in the pursuit of quality."
  }
]

// Variants pour l'animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function WhyArtichaud() {
  return (
    <section className="w-full bg-[#FFFFFF] py-20 md:py-32 border-t border-black/5">
      
      <div className="w-full px-5 md:px-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-4 md:grid-cols-8 gap-5 w-full"
        >

          {/* Label Why */}
          <div className="col-span-4 md:col-span-1 mb-8 md:mb-0">
            <motion.div 
              variants={itemVariants}
              className="text-black"
              style={{ 
                fontSize: '16px', 
                fontFamily: 'Helvetica Now Display, Arial, sans-serif',
                fontWeight: '400'
              }}
            >
              Why
            </motion.div>
          </div>

          {/* Titre */}
          <div className="col-span-4 md:col-span-2 mb-16 md:mb-0">
            <motion.h2 
              variants={itemVariants}
              className="text-black"
              style={{
                fontSize: 'clamp(32px, 3.5vw, 45px)', 
                lineHeight: '110%',
                fontFamily: 'Helvetica Now Display, Arial, sans-serif',
                fontWeight: '400'
              }}
            >
              Why Artichaud is good
            </motion.h2>
          </div>

          {/* Espace vide */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Liste des raisons */}
          <div className="col-span-4 md:col-span-4">
            <div className="flex flex-col">
              {reasons.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="group border-t border-black/10 py-8 md:py-10 first:border-t-0 md:first:border-t"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:gap-0">
                    
                    {/* Numéro + Titre */}
                    <div className="w-full md:w-1/2 flex items-baseline gap-6 pr-4">
                      <span className="text-sm font-medium text-black/40 font-mono">
                        {item.id}
                      </span>
                      <h3 className="text-2xl md:text-3xl text-black font-normal group-hover:translate-x-2 transition-transform duration-300 ease-out">
                        {item.title}
                      </h3>
                    </div>

                    {/* Texte descriptif */}
                    <div className="w-full md:w-1/2">
                      <p className="text-black/60 text-base leading-relaxed group-hover:text-black/90 transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="border-t border-black/10 w-full" />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}