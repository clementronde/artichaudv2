'use client'

import { motion, Variants } from 'framer-motion'

const reasons = [
  {
    id: "01",
    title: "Collaborateurs en série",
    text: "Nous croyons que le meilleur travail se produit quand les frontières s'estompent entre agence et client. Nous ne prenons pas simplement un brief ; nous co-créons pour construire quelque chose qui vous appartient vraiment, brisant les silos pour favoriser un véritable partenariat."
  },
  {
    id: "02",
    title: "Nourris par la diversité",
    text: "La créativité prospère grâce à la friction. En réunissant des parcours, cultures et disciplines distincts, nous remettons en question l'attendu pour découvrir l'exceptionnel. Différentes perspectives mènent à des solutions uniques."
  },
  {
    id: "03",
    title: "Guidés par la bienveillance",
    text: "Un excellent travail nécessite de la confiance, pas de l'ego. Nous priorisons la transparence et les conversations honnêtes, garantissant que le processus soit aussi agréable que le résultat final est percutant. Nous construisons des relations, pas seulement des assets."
  },
  {
    id: "04",
    title: "Qui ne se contentent jamais",
    text: "\"Assez bien\" est notre point de départ, pas notre destination. Nous sommes obsédés par les détails, ajustant chaque pixel et stratégie jusqu'à ce que ça ne fonctionne pas seulement — mais que ça résonne. Nous sommes implacables dans la quête de la qualité."
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

          {/* Label Pourquoi */}
          <div className="col-span-4 md:col-span-1 mb-8 md:mb-0">
            <motion.div
              variants={itemVariants}
              className="text-black text-base font-normal"
            >
              Pourquoi
            </motion.div>
          </div>

          {/* Titre */}
          <div className="col-span-4 md:col-span-2 mb-16 md:mb-0">
            <motion.h2
              variants={itemVariants}
              className="text-black leading-[1.1] font-normal"
              style={{
                fontSize: 'clamp(32px, 3.5vw, 45px)'
              }}
            >
              Pourquoi Artichaud c'est bien
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