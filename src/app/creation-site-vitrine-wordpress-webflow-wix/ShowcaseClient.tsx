'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, Variants, steps } from "framer-motion";
import { MouseEvent, useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS (Identiques page Paris pour cohérence) ---

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
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-black' : 'text-gray-800 group-hover:text-[#D0FF00]'}`}>{question}</span>
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

// --- ANIMATIONS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ShowcaseClient() {
  
  // Données Structurées (FAQ + Service)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de sites vitrines WordPress, Webflow, Wix",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Agence Artichaud"
    },
    "areaServed": "France",
    "description": "Création de sites internet vitrines sur-mesure. Expertise CMS WordPress, Webflow et Wix."
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
              Expertise Multi-CMS
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance">
            Création de sites vitrines <br/> WordPress, Webflow & <GlitchText text="Wix" />.
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Artichaud est un studio créatif spécialisé dans la conception de <strong>sites vitrines haut de gamme</strong>. Nous ne sommes pas mariés à une seule technologie.
            </p>
            <p>
              Que vous soyez une TPE cherchant l'efficacité, une PME en pleine croissance ou une Startup visant l'excellence, nous sélectionnons le CMS (WordPress, Webflow ou Wix) qui sert vos objectifs, et non l'inverse.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#comparatif" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 group-hover:text-black transition-colors">Comparer les solutions</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </Link>
            <Link href="#offres" className="relative px-8 py-4 text-white font-medium group">
              Voir les packs
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-[#D0FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- H2: VALORISER VOTRE MARQUE (DASHBOARD VISUAL) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* Texte */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-black leading-tight">
                Un site vitrine qui valorise <span className="text-gray-400">votre marque.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Un site vitrine n'est pas une simple brochure numérique. C'est le pilier central de votre écosystème digital. C'est souvent le premier point de contact entre votre entreprise et un prospect qualifié.
                </p>
                <p>
                  Qu'il soit développé sur <strong>WordPress</strong> pour le contenu, <strong>Webflow</strong> pour l'expérience visuelle, ou <strong>Wix</strong> pour la rapidité, l'objectif reste le même : crédibiliser votre savoir-faire et rassurer vos futurs clients.
                </p>
                <p>
                  Chez Artichaud, nous concevons des sites vitrines qui allient esthétique (UI), ergonomie (UX) et performance technique. Nous transformons votre identité en un atout concurrentiel majeur, visible partout en France et optimisé pour le référencement local (Paris & Île-de-France).
                </p>
              </div>
            </motion.div>
            
            {/* Visuel Dashboard (Crédibilité Tech) */}
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-100 to-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

                <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden p-6 z-10">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Impressions Google</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-black">85,200</span>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+24%</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    {/* Graphique SVG */}
                    <div className="relative h-40 w-full">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradientGraph2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <motion.path 
                                d="M0 120 C 80 120, 150 100, 250 50 S 350 60, 500 10" 
                                fill="none" 
                                stroke="black" 
                                strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <motion.path 
                                d="M0 120 C 80 120, 150 100, 250 50 S 350 60, 500 10 V 150 H 0 Z" 
                                fill="url(#gradientGraph2)" 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-6 -left-4 md:left-[-20px] bg-black text-white p-5 rounded-xl shadow-2xl border border-gray-800 z-20 w-52"
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-gray-400 uppercase">Core Web Vitals</span>
                        <svg className="w-4 h-4 text-[#D0FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-white">100%</span>
                        <span className="text-sm text-gray-400 mb-1">Mobile</span>
                    </div>
                    <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                        <motion.div className="h-full bg-[#D0FF00]" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }} />
                    </div>
                </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- H2: COMPARATIF TECHNIQUE (CMS) --- */}
      <section className="py-24 bg-gray-50" id="comparatif">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">WordPress, Webflow ou Wix : lequel choisir ?</h2>
            <p className="text-lg text-gray-600">
              Chaque plateforme a ses forces. Voici notre guide pour vous aider à décider en fonction de vos priorités (budget, design, autonomie).
            </p>
          </div>

          {/* SECTION 1: WORDPRESS */}
          <div className="mb-16 bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 items-center" id="wordpress">
             <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto lg:mx-0">WP</div>
                <h3 className="text-3xl font-bold mb-4 text-black">WordPress</h3>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Le standard Open Source</span>
             </div>
             <div className="lg:w-2/3 space-y-6 text-gray-600 leading-relaxed">
                <p>
                    WordPress propulse plus de 43% du web. C'est la solution idéale pour la <strong>création de site vitrine WordPress</strong> si vous visez une stratégie de contenu agressive (Blog, Actualités) ou si vous avez besoin d'évolutivité à long terme.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                        <li className="font-bold text-black mb-2">✅ Avantages</li>
                        <li className="text-sm">• Écosystème de plugins infini</li>
                        <li className="text-sm">• Propriété totale du code et des données</li>
                        <li className="text-sm">• Excellent pour le SEO éditorial</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-bold text-black mb-2">⚠️ Points d'attention</li>
                        <li className="text-sm">• Demande une maintenance technique (Mises à jour)</li>
                        <li className="text-sm">• Peut devenir lent si mal optimisé</li>
                    </ul>
                </div>
                <div className="pt-4">
                    <a href="https://wordpress.org" target="_blank" rel="nofollow" className="text-black font-bold underline hover:text-blue-600 transition-colors">Documentation officielle WordPress ↗</a>
                </div>
             </div>
          </div>

          {/* SECTION 2: WEBFLOW */}
          <div className="mb-16 bg-black text-white rounded-3xl p-8 lg:p-12 shadow-xl ring-4 ring-[#D0FF00]/20 flex flex-col lg:flex-row gap-12 items-center" id="webflow">
             <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-white/20 text-[#D0FF00] rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto lg:mx-0">Wf</div>
                <h3 className="text-3xl font-bold mb-4 text-white">Webflow</h3>
                <span className="inline-block px-3 py-1 bg-[#D0FF00] text-black text-xs font-bold uppercase tracking-wider rounded-full mb-6">Design & Performance</span>
             </div>
             <div className="lg:w-2/3 space-y-6 text-neutral-300 leading-relaxed">
                <p>
                    La <strong>création de site vitrine Webflow</strong> est le choix des marques premium et des startups. Il permet un design "pixel-perfect" sans les contraintes des templates classiques. Le code généré est ultra-propre, garantissant des performances (vitesse) exceptionnelles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                        <li className="font-bold text-white mb-2">✅ Avantages</li>
                        <li className="text-sm">• Liberté créative totale (Animations 3D, Parallaxe)</li>
                        <li className="text-sm">• Hébergement AWS ultra-rapide inclus</li>
                        <li className="text-sm">• Sécurité maximale (Pas de failles plugins)</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-bold text-white mb-2">⚠️ Points d'attention</li>
                        <li className="text-sm">• Courbe d'apprentissage pour l'admin</li>
                        <li className="text-sm">• Budget généralement plus élevé</li>
                    </ul>
                </div>
                <div className="pt-4">
                    <a href="https://webflow.com" target="_blank" rel="nofollow" className="text-white font-bold underline hover:text-[#D0FF00] transition-colors">Site officiel Webflow ↗</a>
                </div>
             </div>
          </div>

          {/* SECTION 3: WIX */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 items-center" id="wix">
             <div className="lg:w-1/3 text-center lg:text-left">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 mx-auto lg:mx-0">Wx</div>
                <h3 className="text-3xl font-bold mb-4 text-black">Wix Studio</h3>
                <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full mb-6">Tout-en-un & Agile</span>
             </div>
             <div className="lg:w-2/3 space-y-6 text-gray-600 leading-relaxed">
                <p>
                    Avec l'arrivée de <strong>Wix Studio</strong>, la plateforme est devenue une option sérieuse pour un <strong>site vitrine Wix</strong> professionnel. C'est la solution parfaite pour les lancements rapides avec un budget maîtrisé, sans sacrifier l'esthétique.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                        <li className="font-bold text-black mb-2">✅ Avantages</li>
                        <li className="text-sm">• Interface Drag & Drop très intuitive</li>
                        <li className="text-sm">• Maintenance technique gérée par Wix</li>
                        <li className="text-sm">• Outils marketing intégrés (Newsletter, CRM)</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-bold text-black mb-2">⚠️ Points d'attention</li>
                        <li className="text-sm">• Moins flexible pour le code sur-mesure</li>
                        <li className="text-sm">• Migration vers un autre CMS difficile</li>
                    </ul>
                </div>
                <div className="pt-4">
                    <a href="https://fr.wix.com" target="_blank" rel="nofollow" className="text-black font-bold underline hover:text-purple-600 transition-colors">Découvrir Wix ↗</a>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* --- H2: PACKS (TECHNO FOCUSED) --- */}
      <section className="py-24 bg-white" id="offres">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Nos packs site vitrine</h2>
            <p className="text-lg text-gray-600">
              Des solutions packagées pour démarrer sereinement, quelle que soit la techno choisie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full hover:border-black transition-colors">
                <h3 className="text-xl font-bold text-gray-500 mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4 text-black">Vitrine Essentiel</div>
                <p className="text-sm text-gray-600 mb-6">Pour exister proprement sur le web.</p>
                
                <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-wide text-center text-gray-500">
                    Techno : Wix ou WP Starter
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Page d'accueil + Contact</li>
                    <li className="flex items-center gap-2 text-sm">✓ Design Responsive</li>
                    <li className="flex items-center gap-2 text-sm">✓ Mentions légales</li>
                    <li className="flex items-center gap-2 text-sm">✓ Formation prise en main</li>
                </ul>
                <Link href="/contact" className="group relative block w-full py-3 bg-black text-white font-bold text-center rounded-lg overflow-hidden">
                    <span className="relative z-10 group-hover:text-black transition-colors">Demander un devis</span>
                    <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </Link>
            </SpotlightCard>

            <SpotlightCard className="p-8 rounded-2xl bg-black text-white border border-black flex flex-col h-full relative z-10 transform lg:scale-105 shadow-2xl">
                <div className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Recommandé</div>
                <h3 className="text-xl font-bold text-[#D0FF00] mb-2">Business</h3>
                <div className="text-3xl font-bold mb-4 text-black">Vitrine Créatif</div>
                <p className="text-sm text-neutral-400 mb-6">Pour se différencier et convertir.</p>
                
                <div className="mb-6 p-3 bg-black/50 rounded-lg text-xs font-bold uppercase tracking-wide text-center text-[#D0FF00] border border-white/20">
                    Techno : Webflow ou WP Custom
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm text-black">✓ 5 à 10 pages stratégiques</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ Webdesign Sur-Mesure</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ Animations & Interactions</li>
                    <li className="flex items-center gap-2 text-sm text-black">✓ SEO Technique avancé</li>
                </ul>
                <Link href="/contact" className="group relative block w-full py-3 bg-[#D0FF00] text-black font-bold text-center rounded-lg overflow-hidden">
                    <span className="relative z-10 transition-colors">Lancer le projet</span>
                    <div className="absolute inset-0 bg-white opacity-30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </Link>
            </SpotlightCard>

            <SpotlightCard className="p-8 rounded-2xl border border-gray-200 flex flex-col h-full hover:border-black transition-colors">
                <h3 className="text-xl font-bold text-gray-500 mb-2">Premium</h3>
                <div className="text-3xl font-bold mb-4 text-black">Site + Branding</div>
                <p className="text-sm text-gray-600 mb-6">L'expérience de marque totale.</p>
                
                <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs font-bold uppercase tracking-wide text-center text-gray-500">
                    Techno : Webflow Advanced
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Direction Artistique 360</li>
                    <li className="flex items-center gap-2 text-sm">✓ Copywriting & Storytelling</li>
                    <li className="flex items-center gap-2 text-sm">✓ Intégrations CRM / API</li>
                    <li className="flex items-center gap-2 text-sm">✓ Support prioritaire</li>
                </ul>
                <Link href="/contact" className="group relative block w-full py-3 bg-black text-white font-bold text-center rounded-lg overflow-hidden">
                    <span className="relative z-10 group-hover:text-black transition-colors">Contacter l'équipe</span>
                    <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </Link>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- H2: PORTFOLIO (4 PROJETS) --- */}
      <section className="py-24 bg-white" id="portfolio">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-black">
                Exemples de sites vitrines créatifs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                 
                 {/* Projet 1 */}
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

                 {/* Projet 2 */}
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

                 {/* Projet 3 */}
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
                                <h3 className="text-xl font-bold text-white">Keleti Tautu</h3>
                                <p className="text-sm text-neutral-300">Portfolio Minimaliste</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </div>
                    </motion.div>
                 </Link>

                 {/* Projet 4 */}
                 <Link href="/works/rockstar" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/rockstar/rockstarprojet1.avif" alt="Site internet Rockstar Paris" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
                            <div>
                                <h3 className="text-xl font-bold text-white">Rockstar</h3>
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

      {/* --- H2: SEO INCLUS --- */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black text-center">SEO de base inclus sur chaque site</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <p>
                    Avoir un beau site ne suffit pas s'il est invisible. Chez Artichaud, nous ne livrons jamais une coquille vide. Que vous choisissiez Wix, WordPress ou Webflow, nous appliquons un socle technique SEO rigoureux.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Structure Hn optimisée</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Balises Meta Title & Desc</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Optimisation des images (WebP)</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Vitesse de chargement</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Responsive Mobile & Tablette</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Configuration Google Search Console</span>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      {/* --- H2: FAQ --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">FAQ site vitrine</h2>
          <div className="space-y-4">
            <AccordionItem 
                question="Quel CMS est le moins cher ?" 
                answer="Wix est souvent la solution la plus économique à court terme car elle inclut l'hébergement et la maintenance. WordPress est gratuit (Open Source) mais nécessite un hébergement payant et une maintenance. Webflow représente un coût mensuel plus élevé mais offre une qualité supérieure sans maintenance technique." 
            />
            <AccordionItem 
                question="Puis-je modifier mon site moi-même ?" 
                answer="Oui, c'est l'avantage d'utiliser des CMS modernes. Que ce soit sur WordPress (Gutenberg/Elementor), Webflow (Editor) ou Wix, nous vous formons à la fin du projet pour que vous puissiez modifier les textes, changer les images et ajouter des articles de blog en toute autonomie." 
            />
            <AccordionItem 
                question="Suis-je propriétaire de mon site ?" 
                answer="Avec WordPress, vous êtes propriétaire à 100% du code et de la base de données. Avec Webflow et Wix, vous êtes propriétaire du design et du contenu, mais vous restez dépendant de leur plateforme d'hébergement (SaaS). Nous vous conseillons sur le meilleur choix selon votre stratégie." 
            />
            <AccordionItem 
                question="Combien coûte un site vitrine chez Artichaud ?" 
                answer="Nos packs démarrent à partir de 2000€ pour une solution vitrine essentielle. Pour un site sur-mesure avec stratégie de marque et développement complexe, les budgets se situent généralement entre 4000€ et 8000€. Contactez-nous pour un devis précis." 
            />
          </div>
        </div>
      </section>

      {/* --- CONCLUSION + CTA --- */}
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
             Prêt à lancer <br/> 
             <GlitchText text="votre projet ?" />
           </h2>
           <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
             Ne laissez pas le choix technologique freiner votre ambition. Discutons de vos objectifs et trouvons la solution adaptée.
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

      {/* --- LIENS INTERNES SEO --- */}
      <div className="bg-black py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center text-xs text-neutral-600">
            <p className="mb-4 uppercase tracking-widest font-bold text-neutral-500">Navigation</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <Link href="/creation-site-internet-paris" className="hover:text-white transition-colors">Création site internet Paris & IDF</Link>
                <Link href="/creation-site-internet-boulogne-billancourt" className="hover:text-white transition-colors">Agence Web Boulogne-Billancourt</Link>
                <Link href="/refonte-site-internet" className="hover:text-white transition-colors">Refonte de site internet</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Comparatifs & Conseils</Link>
            </div>
        </div>
      </div>

    </main>
  );
}