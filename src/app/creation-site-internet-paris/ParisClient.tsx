'use client'

import Link from "next/link";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, Variants, steps } from "framer-motion";
import { MouseEvent, useState } from "react";

// --- MICRO-INTERACTIONS AVANCÉES ---

// 1. TEXTE GLITCH (NOUVEAU)
const GlitchText = ({ text }: { text: string }) => {
  return (
    <motion.span 
      className="relative inline-block text-[#D0FF00] cursor-pointer"
      whileHover="hover"
    >
      {/* Texte Principal */}
      <span className="relative z-10">{text}</span>
      
      {/* Calque Glitch 1 : Décalage Rapide + Opacité */}
      <motion.span
        className="absolute top-0 left-0 text-white z-[-1] select-none pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 1, 0, 1, 0],
            x: [0, -3, 3, -2, 0],
            y: [0, 2, -2, 0],
            transition: { repeat: Infinity, duration: 0.2, ease: "linear" }
          }
        }}
      >
        {text}
      </motion.span>
      
      {/* Calque Glitch 2 : Effet de découpe (ClipPath) */}
      <motion.span
        className="absolute top-0 left-0 text-[#D0FF00] z-[-1] select-none pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 1, 1, 0],
            clipPath: [
              "inset(0 0 0 0)", 
              "inset(40% 0 10% 0)", 
              "inset(10% 0 60% 0)", 
              "inset(80% 0 5% 0)"
            ],
            x: [0, 4, -4, 2],
            transition: { repeat: Infinity, duration: 0.3, ease: steps(2) }
          }
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

// 2. Carte avec effet "Spotlight"
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-neutral-200 bg-white overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(208, 255, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// 3. Accordéon FAQ (Animation Fluide)
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between py-6 text-left group"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-black' : 'text-gray-800 group-hover:text-[#D0FF00]'}`}>
          {question}
        </span>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#D0FF00]">
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`h-4 w-4 ${isOpen ? 'text-black' : 'text-gray-500'}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-0 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Variantes d'animation
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function ParisClient() {
  
  // JSON-LD Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agence Artichaud Paris",
    "image": "https://artichaud.com/images/paris-web-agency.jpg",
    "telephone": "+33100000000",
    "url": "https://artichaud.com/creation-site-internet-paris",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
      "postalCode": "75000",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "priceRange": "€€-€€€"
  };

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <CanvasEffect />
        </div>
        
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#D0FF00]/10 border border-[#D0FF00]/20 text-[#D0FF00] text-sm font-medium mb-8 backdrop-blur-md hover:bg-[#D0FF00]/20 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF00]"></span>
              </span>
              Agence Web 📍 Paris & Île-de-France
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            Création de site internet <br/> à Paris & en Île‑de‑France
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Nous concevons des expériences digitales sur-mesure pour les entreprises parisiennes exigeantes. Experts <strong>WordPress, Webflow et Wix</strong>, nous transformons votre visibilité locale en levier de croissance.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 group-hover:text-black transition-colors">Lancer mon projet</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            </Link>
            <Link href="#technologies" className="px-8 py-4 text-white font-medium hover:text-[#D0FF00] transition-colors underline-offset-4 hover:underline">
              Découvrir nos technologies →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 1: CONTEXTE LOCAL --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl md:text-5xl font-bold mb-8 text-black leading-tight"
               >
                 Une expertise web ancrée dans l'économie <span className="text-gray-400">parisienne.</span>
               </motion.h2>
               
               <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                 <p>
                   Paris n'est pas seulement la capitale de la mode, c'est le cœur battant de l'innovation et du business en France. Que vous soyez installé dans le <strong>Sentier</strong>, à <strong>La Défense</strong>, près de <strong>Station F</strong> ou dans les quartiers d'affaires du <strong>8ème arrondissement</strong>, la compétition est féroce.
                 </p>
                 <p>
                   Avoir un site web ne suffit plus. Il vous faut une plateforme performante, rapide et optimisée pour le référencement local (SEO Paris) afin de capter une clientèle francilienne volatile et exigeante.
                 </p>
                 <p>
                   Chez Artichaud, nous connaissons les codes du marché parisien. Nous créons des sites qui parlent à votre audience, qu'elle soit B2B (Grands comptes, PME) ou B2C (Commerces, Artisans, Services).
                 </p>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-black">100%</span>
                    <span className="text-sm text-gray-500">Made in Paris/IDF</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-black">4.9/5</span>
                    <span className="text-sm text-gray-500">Note Clients</span>
                  </div>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SpotlightCard className="rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-4 text-white">💼</div>
                    <h3 className="font-bold text-xl mb-2">Cabinets & Conseil</h3>
                    <p className="text-sm text-gray-500">Avocats, Architectes, Consulting. Des sites sobres et rassurants.</p>
                  </SpotlightCard>
                  <SpotlightCard className="rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 bg-[#D0FF00] rounded-full flex items-center justify-center mb-4 text-black">🚀</div>
                    <h3 className="font-bold text-xl mb-2">Startups & Tech</h3>
                    <p className="text-sm text-gray-500">Sites Webflow scalables pour lever des fonds et convertir.</p>
                  </SpotlightCard>
                  <SpotlightCard className="rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-black">🎨</div>
                    <h3 className="font-bold text-xl mb-2">Agences & Créatifs</h3>
                    <p className="text-sm text-gray-500">Portfolios immersifs avec animations (GSAP, Framer Motion).</p>
                  </SpotlightCard>
                  <SpotlightCard className="rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-black">🛍️</div>
                    <h3 className="font-bold text-xl mb-2">Commerces Locaux</h3>
                    <p className="text-sm text-gray-500">Click & Collect, réservation en ligne et visibilité GMB.</p>
                  </SpotlightCard>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION TECHNOLOGIES --- */}
      <section className="py-24 bg-neutral-50" id="technologies">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Nos armes de construction massive.</h2>
            <p className="text-lg text-gray-600">
              Nous ne sommes pas mariés à une seule technologie. Nous sélectionnons le CMS (Content Management System) le plus adapté à votre ambition et votre budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WordPress */}
            <SpotlightCard className="rounded-3xl p-8 shadow-sm">
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-black mb-1">WordPress</h3>
                    <p className="text-sm font-medium text-blue-600">Le standard évolutif</p>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    La solution idéale pour les sites riches en contenu (blogs, actualités) qui nécessitent une flexibilité totale.
                </p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-700">✅ Back-office intuitif</li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">✅ Écosystème de plugins infini</li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">✅ Excellent pour le SEO</li>
                </ul>
                <div className="mt-auto pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Idéal pour : PME, Médias</span>
                </div>
            </SpotlightCard>

            {/* Webflow */}
            <SpotlightCard className="rounded-3xl p-8 bg-neutral-900 text-white border-neutral-800 ring-4 ring-[#D0FF00]/20">
                <div className="mb-6 pb-6 border-b border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-1">Webflow</h3>
                    <p className="text-sm font-medium text-[#D0FF00]">Le choix Premium</p>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                    Pour des sites au design époustouflant, des animations fluides et un code ultra-propre sans maintenance technique lourde.
                </p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-300">⚡ Performances extrêmes</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">✨ Liberté créative totale</li>
                    <li className="flex items-center gap-2 text-sm text-gray-300">🔒 Sécurité maximale (AWS)</li>
                </ul>
                <div className="mt-auto pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Idéal pour : Startups, Tech, Luxe</span>
                </div>
            </SpotlightCard>

            {/* Wix Studio */}
            <SpotlightCard className="rounded-3xl p-8 shadow-sm">
                <div className="mb-6 pb-6 border-b border-gray-100">
                    <h3 className="text-2xl font-bold text-black mb-1">Wix Studio</h3>
                    <p className="text-sm font-medium text-purple-600">Rapidité & Efficacité</p>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Une solution tout-en-un parfaite pour lancer rapidement une activité avec un budget maîtrisé, sans compromis sur le look.
                </p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-sm text-gray-700">🚀 Mise en ligne rapide</li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">🔧 Maintenance incluse</li>
                    <li className="flex items-center gap-2 text-sm text-gray-700">💰 Budget optimisé</li>
                </ul>
                <div className="mt-auto pt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Idéal pour : Freelances, Artisans</span>
                </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- SECTION PROCESS --- */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Notre méthodologie <br/>projet.</h2>
                  <p className="text-neutral-400 text-lg mb-8">
                    Créer un site web, c'est construire une maison. On ne commence pas par la peinture, mais par les fondations. Voici comment nous collaborons avec nos clients parisiens.
                  </p>
                  <div className="space-y-8">
                      <Step number="01" title="Audit & Stratégie" desc="Analyse de votre marché, de vos concurrents à Paris et définition de vos objectifs de conversion." />
                      <Step number="02" title="UX & Maquettage" desc="Création de l'architecture (Sitemap) et des maquettes graphiques haute fidélité." />
                      <Step number="03" title="Développement & SEO" desc="Intégration technique et optimisation sémantique pour Google (Référencement local)." />
                      <Step number="04" title="Formation & Lancement" desc="On vous remet les clés. Session de formation pour que vous soyez autonome." />
                  </div>
              </div>
              <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D0FF00]/20 to-transparent opacity-50" />
                  <p className="text-white/30 font-mono text-sm">Zone d'image process ou vidéo</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION PROJETS --- */}
      <div id="portfolio">
        <TrustedSection /> 
      </div>

      {/* --- SECTION 2: OFFRES --- */}
      <section className="py-20 bg-white border-t border-gray-100" id="offres">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Des offres transparentes</h2>
            <p className="text-gray-500">Un investissement clair pour votre croissance digitale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard 
              title="Starter Presence"
              price="Sur devis"
              desc="L'essentiel pour exister sur Google et rassurer vos prospects."
              features={["Wix ou WordPress", "Site One-Page ou 3 pages", "Responsive Mobile", "Formulaire de contact", "Mentions légales"]}
              delay={0}
            />
            <PriceCard 
              title="Identité & Performance"
              price="Populaire"
              isPopular
              desc="Le standard pour les PME et Startups ambitieuses."
              features={["Webflow ou WordPress", "5 à 10 pages", "Webdesign sur-mesure", "Animations (Motion UI)", "Optimisation SEO Technique", "Formation Back-office"]}
              delay={0.1}
            />
            <PriceCard 
              title="Expérience Premium"
              price="Sur mesure"
              desc="Pour dominer votre marché avec une image de marque irréprochable."
              features={["Direction Artistique 360", "Site Vitrine ou E-commerce", "Stratégie de contenu (SEO)", "Intégrations CRM/API", "Maintenance annuelle"]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* --- FAQ SEO (ACCORDÉON) --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-black">Questions Fréquentes</h2>
            <p className="text-gray-500">Tout ce que vous devez savoir avant de lancer votre projet web.</p>
          </div>
          <div className="space-y-4">
            <AccordionItem question="Pourquoi faire appel à une agence web parisienne ?" answer="La proximité est clé. Même à l'ère du digital, pouvoir se rencontrer physiquement à Paris pour un atelier de co-conception ou un point stratégique accélère le projet et évite les malentendus. De plus, nous comprenons les spécificités du tissu économique local." />
            <AccordionItem question="Combien coûte la création d'un site internet à Paris ?" answer="Le budget varie selon la technologie et la complexité. Un site vitrine simple sur Wix commence autour de 2000€. Un site WordPress sur-mesure se situe entre 3500€ et 7000€. Pour une expérience Webflow haut de gamme avec animations, les budgets démarrent généralement à 5000€. Nous fournissons toujours un devis détaillé." />
            <AccordionItem question="Combien de temps faut-il pour créer le site ?" answer="Comptez 3 à 4 semaines pour un site vitrine standard, et 6 à 8 semaines pour un projet complet avec identité visuelle et développement complexe. Nous nous engageons sur un planning précis au début du projet." />
            <AccordionItem question="Le site sera-t-il optimisé pour le référencement (SEO) ?" answer="Oui, c'est natif chez nous. Structure Hn, balises Title/Meta, optimisation des images (WebP), rapidité de chargement (Core Web Vitals) et maillage interne. Pour aller plus loin, nous proposons des prestations de rédaction de contenu optimisé." />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL (GLITCH) --- */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white">
         
         {/* Texture de fond subtile (Grid) */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

         <motion.div
           className="relative z-10 max-w-4xl mx-auto text-center"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white">
             Prêt à marquer <br/> 
             <GlitchText text="les esprits ?" />
           </h2>
           <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
             L'excellence digitale est à portée de clic. Construisons ensemble l'outil qui fera décoller votre business.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 group-hover:text-black">Démarrer maintenant</span>
                <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </Link>
           </div>
         </motion.div>
      </section>

    </main>
  );
}

// --- SOUS-COMPOSANTS ---

const Step = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
    <div className="flex gap-6 group">
        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center font-mono text-[#D0FF00] group-hover:bg-[#D0FF00] group-hover:text-black transition-colors duration-300">
            {number}
        </div>
        <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#D0FF00] transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const PriceCard = ({ title, price, desc, features, isPopular = false, delay }: any) => (
  <motion.div 
    className={`relative p-8 rounded-2xl border ${isPopular ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'} flex flex-col h-full`}
    initial="rest"
    whileHover="hover"
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
  >
    {isPopular && (
      <span className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
        Best-seller
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-4">{price}</div>
    <p className={`text-sm mb-8 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feat: string, i: number) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          <span className={isPopular ? 'text-[#D0FF00]' : 'text-black'}>✓</span>
          {feat}
        </li>
      ))}
    </ul>
    <Link href="/contact" className={`w-full py-3 rounded-lg text-center font-bold text-sm transition-colors ${isPopular ? 'bg-[#D0FF00] text-black hover:bg-white' : 'bg-black text-white hover:bg-[#D0FF00] hover:text-black'}`}>
      Demander un devis
    </Link>
  </motion.div>
);