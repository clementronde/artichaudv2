'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, Variants, steps } from "framer-motion";
import { MouseEvent, useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS ---

const GlitchText = ({ text }: { text: string }) => {
  return (
    <motion.span 
      className="relative inline-block text-[#D0FF00] cursor-pointer"
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
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
      <motion.span
        className="absolute top-0 left-0 text-[#D0FF00] z-[-1] select-none pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 1, 1, 0],
            clipPath: ["inset(0 0 0 0)", "inset(40% 0 10% 0)", "inset(10% 0 60% 0)", "inset(80% 0 5% 0)"],
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
            radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(208, 255, 0, 0.15), transparent 80%)
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full cursor-pointer items-center justify-between py-6 text-left group">
        <span className={`text-lg font-medium ${isOpen ? 'text-black' : 'text-gray-800'}`}>{question}</span>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#D0FF00] group-hover:bg-[#D0FF00] group-hover:text-black">
          <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`h-4 w-4 ${isOpen ? 'text-black' : 'text-gray-500 group-hover:text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></motion.svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="pb-6 pt-0 text-gray-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- ANIMATIONS GLOBALES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ParisClient() {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agence Artichaud Paris",
    "image": "https://artichaud.com/images/agence-web-paris.jpg",
    "telephone": "+33100000000",
    "url": "https://artichaud.com/creation-site-internet-paris",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressRegion": "Île-de-France",
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
      <section className="relative pt-32 pb-24 md:pb-40 px-6 overflow-hidden bg-neutral-950 text-white">
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
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#D0FF00]/10 border border-[#D0FF00]/20 text-[#D0FF00] text-sm font-medium mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0FF00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF00]"></span>
              </span>
              Agence Web Paris & Île-de-France
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance">
            Agence de création de sites internet à <br className="hidden md:block"/> Paris & en Île‑de‑France
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Dans la capitale mondiale du style et de l'innovation, un site web standard ne suffit plus. Vous avez besoin d'une identité numérique qui marque les esprits.
            </p>
            <p>
              Artichaud est un <strong>studio web créatif basé à Paris</strong>. Nous accompagnons les marques audacieuses, TPE, PME et Startups de la région parisienne dans la conception de <strong>sites vitrines sur-mesure</strong> qui convertissent vos visiteurs en clients fidèles.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* CTA 1 : Magnétique au survol */}
            <Link href="/contact" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(208,255,0,0.3)] hover:shadow-[0_0_30px_rgba(208,255,0,0.6)]">
              <span className="relative z-10">Lancer mon projet</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm" />
            </Link>
            {/* CTA 2 : Souligné animé */}
            <Link href="#portfolio" className="relative px-8 py-4 text-white font-medium group">
              Voir nos réalisations
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-[#D0FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- H2: OBJECTIFS BUSINESS (VERSION DASHBOARD PRO) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* COLONNE GAUCHE : TEXTE */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black leading-tight">
                Des sites vitrines pensés pour vos <span className="text-gray-400">objectifs business.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Paris est un marché ultra-concurrentiel. Que vous soyez un cabinet d'avocats dans le <strong>8ème</strong>, une startup à <strong>Station F</strong> ou un commerce dans le <strong>Marais</strong>, l'esthétique ne suffit pas.
                </p>
                <p>
                  Nous ne faisons pas de l'art pour l'art. Nous créons des <strong>machines à croissance</strong>. Chaque pixel et chaque ligne de code a un but précis : crédibiliser votre expertise et transformer vos visiteurs en clients.
                </p>
                <p>
                  En tant qu'<Link href="/contact" className="text-black font-bold underline decoration-[#D0FF00] hover:bg-[#D0FF00] transition-colors">agence de création de site web à Paris</Link>, nous intégrons nativement les standards du marché : rapidité mobile, structure SEO sémantique et UX orientée conversion.
                </p>
                
                <div className="pt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-black">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SEO Friendly
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-black">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Mobile First
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-black">
                        <span className="w-2 h-2 bg-[#D0FF00] rounded-full"></span>
                        Conversion Rate
                    </div>
                </div>
              </div>
            </motion.div>
            
            {/* COLONNE DROITE : VISUEL DASHBOARD ANALYTICS */}
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
                {/* Fond abstrait */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

                {/* Carte Principale : Graphique Trafic */}
                <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden p-6 z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Trafic Organique (SEO)</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-black">12,450</span>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+158%</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    {/* Graphique SVG Animé */}
                    <div className="relative h-40 w-full">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradientGraph" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#D0FF00" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#D0FF00" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path 
                                d="M0 150 C 50 140, 100 130, 150 90 S 250 100, 300 60 S 400 40, 500 10" 
                                fill="none" 
                                stroke="black" 
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <motion.path 
                                d="M0 150 C 50 140, 100 130, 150 90 S 250 100, 300 60 S 400 40, 500 10 V 160 H 0 Z" 
                                fill="url(#gradientGraph)" 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Widget Flottant 1 : Score Performance */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-6 -left-4 md:left-[-20px] bg-black text-white p-5 rounded-xl shadow-2xl border border-gray-800 z-20 w-48"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-400 uppercase">Performance</span>
                        <svg className="w-4 h-4 text-[#D0FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-white">99</span>
                        <span className="text-sm text-gray-400 mb-1">/100</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <motion.div 
                            className="h-full bg-[#D0FF00]" 
                            initial={{ width: 0 }}
                            whileInView={{ width: "99%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </motion.div>

                {/* Widget Flottant 2 : Conversion Lead */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-6 -right-4 md:right-[-10px] bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-20 flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Nouveau Lead</p>
                        <p className="text-sm font-bold text-black">Contact via Site Web</p>
                    </div>
                </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- H2: COMPARATIF CMS (DÉTAILLÉ + LIENS ANCRÉS) --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">WordPress, Webflow ou Wix : le bon outil.</h2>
            <p className="text-lg text-gray-600">
              Nous sommes agnostiques technologiquement. Nous choisissons le CMS qui sert votre ambition, pas celui qui nous arrange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* WordPress */}
            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full bg-white">
                <h3 className="text-2xl font-bold mb-4">WordPress</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    Le leader mondial (Open Source). Idéal si vous avez besoin d'une flexibilité totale, d'un blog puissant ou de connecteurs complexes (API). Nous développons des thèmes sur-mesure (Gutenberg ou ACF), garantissant un code propre et un site rapide, loin des templates lourds du marché.
                </p>
                {/* Lien corrigé : Vers ancre spécifique */}
                <Link href="/creation-site-vitrine-wordpress-webflow-wix#wordpress" className="group inline-flex items-center text-sm font-bold text-black hover:text-blue-600 transition-colors">
                    Tout savoir sur WordPress <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </SpotlightCard>

            {/* Webflow */}
            <SpotlightCard className="p-8 rounded-2xl bg-black text-white border border-gray-800 ring-4 ring-[#D0FF00]/20 flex flex-col h-full">
                 <h3 className="text-2xl font-bold mb-4 text-black">Webflow</h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 flex-grow">
                    L'arme absolue des startups parisiennes. Design "pixel-perfect", animations fluides (GSAP natif), hébergement AWS ultra-rapide et sécurité militaire. C'est le choix premium pour marquer les esprits sans se soucier de la maintenance technique.
                </p>
                {/* Lien corrigé : Couleur visible (Jaune) */}
                <Link href="/creation-site-vitrine-wordpress-webflow-wix#webflow" className="group inline-flex items-center text-sm font-bold text-black hover:text-[#D0FF00] transition-colors">
                    Pourquoi choisir Webflow <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </SpotlightCard>

            {/* Wix */}
            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full bg-white">
                <h3 className="text-2xl font-bold mb-4">Wix Studio</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    La solution tout-en-un pour lancer une activité rapidement à Paris. Parfait pour les budgets maîtrisés qui veulent un résultat esthétique sans maintenance technique complexe. Wix Studio offre désormais des capacités de design et de SEO très performantes.
                </p>
                {/* Lien corrigé : Vers ancre spécifique */}
                <Link href="/creation-site-vitrine-wordpress-webflow-wix#wix" className="group inline-flex items-center text-sm font-bold text-black hover:text-purple-600 transition-colors">
                    Découvrir l'offre Wix <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- H2: PACKS PARIS --- */}
      <section className="py-24 bg-white" id="tarifs">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Nos packs de création de site à Paris</h2>
            <p className="text-lg text-gray-600">
              Des forfaits clairs pour accompagner la croissance des entreprises d'Île-de-France.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full hover:border-black transition-colors">
                <h3 className="text-xl font-bold text-gray-500 mb-2">Lancement</h3>
                <div className="text-3xl font-bold mb-4 text-black">Pack Essentiel</div>
                <p className="text-sm text-gray-600 mb-6">Pour les commerces et indépendants parisiens.</p>
                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Site One-Page ou 3 pages</li>
                    <li className="flex items-center gap-2 text-sm">✓ CMS Wix ou WordPress</li>
                    <li className="flex items-center gap-2 text-sm">✓ Mobile Responsive</li>
                    <li className="flex items-center gap-2 text-sm">✓ Référencement local de base</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">Demander un devis</Link>
            </SpotlightCard>

            <SpotlightCard className="p-8 rounded-2xl bg-black text-white border border-black flex flex-col h-full relative z-10 transform lg:scale-105 shadow-2xl">
                <div className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Best-Seller</div>
                <h3 className="text-xl font-bold text-[#D0FF00] mb-2">Croissance</h3>
                <div className="text-3xl font-bold mb-4 text-black">Pack Créatif</div>
                <p className="text-sm text-neutral-400 mb-6">Pour les PME et Startups ambitieuses.</p>
                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm text-black">✓ 5 à 10 pages sur-mesure</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ Expert Webflow ou WP</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ SEO Sémantique Avancé</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ Animations & Motion Design</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ Formation Back-office</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 bg-[#D0FF00] text-black font-bold text-center rounded-lg hover:bg-white transition-colors">Lancer le projet</Link>
            </SpotlightCard>

            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full hover:border-black transition-colors">
                <h3 className="text-xl font-bold text-gray-500 mb-2">360°</h3>
                <div className="text-3xl font-bold mb-4 text-black">Transformation</div>
                <p className="text-sm text-gray-600 mb-6">Refonte globale Image + Site.</p>
                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Branding (Logo & Charte)</li>
                    <li className="flex items-center gap-2 text-sm">✓ Site Vitrine Premium</li>
                    <li className="flex items-center gap-2 text-sm">✓ Stratégie de Contenu (SEO)</li>
                    <li className="flex items-center gap-2 text-sm">✓ Intégrations CRM & API</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">Discuter Branding</Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- H2: RÉALISATIONS (4 PROJETS) --- */}
      <section className="py-24 bg-white" id="portfolio">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-black">
                Nos réalisations récentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 
                 {/* Projet 1 : Lumyn */}
                 <Link href="/works/lumyn" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Lumyn.avif" alt="Site internet agence digitale Paris" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Lumyn Paris</h3>
                                <p className="text-sm text-neutral-300">Webflow & 3D</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                 </Link>

                 {/* Projet 2 : Disobey */}
                 <Link href="/works/disobey" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Disobey.avif" alt="Création site e-commerce Paris" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Disobey Apparel</h3>
                                <p className="text-sm text-neutral-300">E-shop & Branding</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                 </Link>

                 {/* Projet 3 : Keleti */}
                 <Link href="/works/keleti" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Keleti.avif" alt="Webdesign portfolio architecte IDF" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Keleti Architectes</h3>
                                <p className="text-sm text-neutral-300">Portfolio Minimaliste</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                 </Link>

                 {/* Projet 4 : Utopia (Nouveau) */}
                 <Link href="/works/Utopia" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Utopia.avif" alt="Site internet Utopia Paris" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Utopia</h3>
                                <p className="text-sm text-neutral-300">Site Vitrine & Identité</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                 </Link>

            </div>
            <div className="text-center">
                <Link href="/works" className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-[#D0FF00] hover:text-black transition-colors shadow-lg hover:shadow-xl">
                    Explorer tous les projets
                </Link>
            </div>
        </div>
      </section>

      {/* --- H2: STRATÉGIE & DESIGN --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Un accompagnement de la stratégie au design.</h2>
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <p>
                            Créer un site internet à Paris ne s'improvise pas. C'est un processus rigoureux où le design doit servir la fonction.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#D0FF00] rounded-full flex items-center justify-center text-xs font-bold text-black mt-1">1</span>
                                <div>
                                    <strong className="text-black block">Direction Artistique (DA)</strong>
                                    Nous définissons un univers visuel unique qui incarne vos valeurs et vous distingue de la concurrence parisienne.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#D0FF00] rounded-full flex items-center justify-center text-xs font-bold text-black mt-1">2</span>
                                <div>
                                    <strong className="text-black block">Expérience Utilisateur (UX)</strong>
                                    Nous concevons des parcours fluides pour guider le visiteur vers l'action (contact, achat, inscription).
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#D0FF00] rounded-full flex items-center justify-center text-xs font-bold text-black mt-1">3</span>
                                <div>
                                    <strong className="text-black block">SEO Technique</strong>
                                    Nous appliquons les <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr" target="_blank" rel="nofollow" className="underline hover:text-black">bonnes pratiques Google</a> (Core Web Vitals) pour assurer votre visibilité durable.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-8 flex items-center justify-center">
                    {/* Abstract Representation of Process */}
                    <div className="relative w-full h-full">
                         <div className="absolute top-10 left-10 w-32 h-32 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                         <div className="absolute top-10 right-10 w-32 h-32 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                         <div className="absolute -bottom-8 left-20 w-32 h-32 bg-yellow-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                         <div className="relative z-10 flex flex-col gap-4 h-full justify-center">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transform translate-x-4">
                                <div className="w-8 h-8 bg-black rounded-lg"></div>
                                <div className="h-2 w-24 bg-gray-200 rounded"></div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transform -translate-x-4">
                                <div className="w-8 h-8 bg-[#D0FF00] rounded-lg"></div>
                                <div className="h-2 w-32 bg-gray-200 rounded"></div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transform translate-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                                <div className="h-2 w-20 bg-gray-200 rounded"></div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- H2: FAQ --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">FAQ création de site internet à Paris</h2>
          <div className="space-y-4">
            <AccordionItem 
                question="Quel est le prix d'un site internet à Paris ?" 
                answer="Les tarifs parisiens peuvent varier du simple au décuple. Chez Artichaud, nous misons sur la transparence. Un site vitrine démarre à 2000€ (offre Essentiel). Un site sur-mesure complet (Design + Dév Webflow/WP) se situe entre 4000€ et 10 000€ selon les fonctionnalités et le niveau d'animation demandé." 
            />
            <AccordionItem 
                question="Peut-on se rencontrer à Paris pour le projet ?" 
                answer="Absolument. Bien que nous soyons digital-first, nous adorons rencontrer nos clients. Nous pouvons organiser des ateliers de travail dans vos locaux à Paris ou en Île-de-France, ou autour d'un café pour discuter de votre vision." 
            />
            <AccordionItem 
                question="Faites-vous la maintenance du site ?" 
                answer="Oui. Une fois le site en ligne, nous ne vous abandonnons pas. Nous proposons des contrats de maintenance (TMA) pour gérer les mises à jour de sécurité (WordPress), les sauvegardes et les petites évolutions de contenu mensuelles." 
            />
            <AccordionItem 
                question="Combien de temps prend la création ?" 
                answer="Pour un site vitrine de qualité agence, comptez 4 à 8 semaines. Ce délai inclut la phase de découverte, la conception graphique (allers-retours inclus), le développement et les tests. Nous pouvons accélérer la cadence pour des lancements urgents (offre Sprint)." 
            />
          </div>
        </div>
      </section>

      {/* --- CONCLUSION + CTA (ANIMATION REVISITÉE) --- */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
         <motion.div
           className="relative z-10 max-w-4xl mx-auto text-center"
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
             Prêt à digitaliser <br/> 
             <GlitchText text="votre activité ?" />
           </h2>
           <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
             Ne laissez pas votre image au hasard. Collaborez avec un studio web parisien qui comprend vos enjeux de marque et de business.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 group-hover:text-black">Demander un devis</span>
                <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </Link>
              <Link href="tel:+33100000000" className="text-white font-medium hover:text-[#D0FF00] transition-colors relative group">
                Réserver un appel découverte
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
           </div>
         </motion.div>
      </section>

      {/* --- LIENS INTERNES SEO (FOOTER LINKING) --- */}
      <div className="bg-black py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center text-xs text-neutral-600">
            <p className="mb-4 uppercase tracking-widest font-bold text-neutral-500">Navigation Rapide Île-de-France</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <Link href="/creation-site-internet-boulogne-billancourt" className="hover:text-white transition-colors">Agence Web Boulogne-Billancourt</Link>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">Expertise WordPress & Webflow</Link>
                <Link href="/refonte-site-internet" className="hover:text-white transition-colors">Refonte de site internet</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog & Conseils</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact Agence Paris</Link>
            </div>
        </div>
      </div>

    </main>
  );
}