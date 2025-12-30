'use client'

import Link from "next/link";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, steps, Variants } from "framer-motion";
import { MouseEvent, useState } from "react";

// --- COMPOSANTS UI ---

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

const AccordionItem = ({ question, answer }: { question: string, answer: string | React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full cursor-pointer items-center justify-between py-6 text-left group">
        <span className={`text-lg font-medium duration-300 ${isOpen ? 'text-black' : 'text-gray-800'}`}>{question}</span>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#D0FF00]">
          <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className={`h-4 w-4 ${isOpen ? 'text-black' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></motion.svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
  
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      
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
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#D0FF00]/10 border border-[#D0FF00]/20 text-[#D0FF00] text-sm font-medium mb-8 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D0FF00] animate-pulse"></span>
              Expertise Multi-CMS
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[1]">
            Création de sites vitrines <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">WordPress, Webflow & Wix</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Chaque technologie a ses forces. Nous vous aidons à choisir celle qui fera décoller votre business, sans parti pris, juste de l'expertise.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#comparatif" className="px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg hover:scale-105 transition-transform">
              Voir le comparatif
            </Link>
            <Link href="#tarifs" className="px-8 py-4 text-white font-medium hover:text-[#D0FF00] transition-colors underline-offset-4 hover:underline">
              Découvrir les packs
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION COMPARATIF (RESUME) --- */}
      <section className="py-24 bg-white" id="comparatif">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Quel outil pour votre projet ?</h2>
            <p className="text-lg text-gray-600">
              Il n'y a pas de "meilleur" CMS dans l'absolu, il y a celui qui est adapté à vos objectifs de croissance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* WIX */}
            <SpotlightCard className="rounded-3xl p-8 shadow-lg border-t-4 border-t-purple-500">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-purple-600">W</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Wix Studio</h3>
                <p className="text-purple-600 font-medium text-sm mb-6 uppercase tracking-wide">Rapidité & Simplicité</p>
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="font-bold mb-3 text-sm uppercase text-gray-400">Pourquoi ?</h4>
                    <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-gray-700">⚡ Lancement en &lt; 2 semaines</li>
                        <li className="flex gap-2 text-sm text-gray-700">💰 Budget maîtrisé</li>
                        <li className="flex gap-2 text-sm text-gray-700">🔧 Maintenance incluse</li>
                    </ul>
                </div>
            </SpotlightCard>

            {/* WORDPRESS */}
            <SpotlightCard className="rounded-3xl p-8 shadow-lg border-t-4 border-t-blue-500 transform lg:-translate-y-4 lg:scale-105 z-10">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-blue-600">WP</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">WordPress</h3>
                <p className="text-blue-600 font-medium text-sm mb-6 uppercase tracking-wide">Liberté & Contenu</p>
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="font-bold mb-3 text-sm uppercase text-gray-400">Pourquoi ?</h4>
                    <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-gray-700">📰 Blog & SEO éditorial puissant</li>
                        <li className="flex gap-2 text-sm text-gray-700">🔗 Écosystème Open Source</li>
                        <li className="flex gap-2 text-sm text-gray-700">📈 Évolutivité illimitée</li>
                    </ul>
                </div>
            </SpotlightCard>

            {/* WEBFLOW */}
            <SpotlightCard className="rounded-3xl p-8 shadow-lg border-t-4 border-t-black bg-neutral-900 text-white border-neutral-800">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-[#D0FF00]">Wf</span>
                </div>
                <h3 className="text-3xl font-bold mb-2 text-white">Webflow</h3>
                <p className="text-[#D0FF00] font-medium text-sm mb-6 uppercase tracking-wide">Design & Performance</p>
                <div className="bg-white/5 rounded-xl p-6 mb-8">
                    <h4 className="font-bold mb-3 text-sm uppercase text-gray-500">Pourquoi ?</h4>
                    <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-gray-300">✨ Image de marque Premium</li>
                        <li className="flex gap-2 text-sm text-gray-300">🚀 Performance (Vitesse)</li>
                        <li className="flex gap-2 text-sm text-gray-300">🎨 Animations sur-mesure</li>
                    </ul>
                </div>
            </SpotlightCard>

          </div>
        </div>
      </section>

      {/* --- DEEP DIVE 1: WORDPRESS (VIDEO) --- */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-2 block">Le Leader Mondial</span>
                    <h2 className="text-4xl font-bold mb-6 text-black">WordPress : La puissance de l'Open Source.</h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p>
                            Avec plus de <strong>43% du web mondial</strong> propulsé par ses soins, WordPress est le standard incontesté. C'est le choix de la raison pour les entreprises qui veulent rester maîtres de leurs données.
                        </p>
                        <p>
                            Chez Artichaud, nous développons des thèmes WordPress sur-mesure (pas de templates lourds achetés 50$). Cela garantit un site léger, sécurisé et parfaitement optimisé pour Google (SEO).
                        </p>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <strong>Indépendance totale :</strong> Vous êtes propriétaire de votre code et de votre hébergement.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                <strong>Plugins infinis :</strong> WooCommerce, Yoast SEO, Advanced Custom Fields... tout est possible.
                            </li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-blue-100">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/V3Df0Oel5gk?si=OMEBWdE1rfLHSE5w" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="absolute top-0 left-0"
                        ></iframe>
                    </div>
                    <p className="text-sm text-center text-gray-400 mt-4 italic">Aperçu de l'éditeur Gutenberg de WordPress</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* --- DEEP DIVE 2: WEBFLOW (VIDEO) --- */}
      <section className="py-24 bg-[#050505] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-[#111] to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#D0FF00] font-bold uppercase tracking-wider text-sm mb-2 block">Le Futur du Webdesign</span>
                    <h2 className="text-4xl font-bold mb-6 text-white">Webflow : L'expérience visuelle sans compromis.</h2>
                    <div className="space-y-6 text-lg text-neutral-400 leading-relaxed">
                        <p>
                            Webflow a révolutionné la création web en permettant aux designers de coder visuellement. Le résultat ? Un code HTML/CSS/JS d'une propreté clinique, sans le "gras" des CMS traditionnels.
                        </p>
                        <p>
                            C'est notre outil de prédilection pour les <strong>Startups, la Tech et les marques Premium</strong>. Il permet des interactions (scroll, hover, 3D) impossibles à réaliser aussi fluidement ailleurs.
                        </p>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center gap-3 text-white">
                                <span className="w-2 h-2 bg-[#D0FF00] rounded-full"></span>
                                <strong>Hébergement AWS Global :</strong> Chargement instantané partout dans le monde.
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <span className="w-2 h-2 bg-[#D0FF00] rounded-full"></span>
                                <strong>Sécurité béton :</strong> Fini les mises à jour de sécurité et les failles de plugins.
                            </li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(208,255,0,0.15)] border border-neutral-800">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/MHVEVcJlUAk?si=mcDsL3wbhheDPf6F" 
                            title="What is Webflow?" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="absolute top-0 left-0"
                        ></iframe>
                    </div>
                    <p className="text-sm text-center text-neutral-600 mt-4 italic">L'interface Designer de Webflow en action</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* --- DEEP DIVE 3: WIX STUDIO (VIDEO) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-purple-600 font-bold uppercase tracking-wider text-sm mb-2 block">L'Agilité Tout-en-un</span>
                    <h2 className="text-4xl font-bold mb-6 text-black">Wix Studio : L'efficacité avant tout.</h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                        <p>
                            Oubliez vos préjugés sur Wix. Avec sa nouvelle version <strong>Wix Studio</strong>, la plateforme offre une liberté de design impressionnante et des performances très correctes pour les sites vitrines standards.
                        </p>
                        <p>
                            C'est la solution parfaite si vous avez un budget serré ou besoin d'être en ligne "hier". Tout est intégré : prise de rendez-vous, e-mail marketing, CRM simple. Pas de maintenance technique, juste du business.
                        </p>
                        <ul className="space-y-3 pt-4">
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                <strong>Sérénité technique :</strong> Pas de serveur à gérer, pas de bug de mise à jour.
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                <strong>Autonomie client :</strong> L'éditeur visuel le plus simple du marché pour vos modifs.
                            </li>
                        </ul>
                    </div>
                </motion.div>
                <motion.div 
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-purple-100">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/sB5n6wnT61w?si=e3ByxPM01NZ4BddG" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                            className="absolute top-0 left-0"
                        ></iframe>
                    </div>
                    <p className="text-sm text-center text-gray-400 mt-4 italic">Découverte de l'environnement Wix Studio</p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* --- SECTION PACKS VITRINES --- */}
      <section className="py-24 bg-neutral-50 border-t border-gray-200" id="tarifs">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Nos packs vitrines</h2>
            <p className="text-gray-600">Des offres packagées pour démarrer sereinement, quelle que soit la techno.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pack Essentiel */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col hover:border-black transition-colors duration-300">
                <h3 className="text-xl font-bold mb-2">Vitrine Essentiel</h3>
                <div className="text-3xl font-bold mb-4">Sur devis</div>
                <p className="text-gray-500 text-sm mb-6">Pour exister proprement sur le web.</p>
                
                <div className="mb-6 p-3 bg-purple-50 rounded-lg text-purple-900 text-sm font-medium text-center">
                    Techno recommandée : <span className="font-bold">Wix ou WP Starter</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Page d'accueil + Contact</li>
                    <li className="flex items-center gap-2 text-sm">✓ Design Responsive</li>
                    <li className="flex items-center gap-2 text-sm">✓ Mentions légales</li>
                    <li className="flex items-center gap-2 text-sm">✓ Formation prise en main</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                    Demander ce pack
                </Link>
            </div>

            {/* Pack Créatif (Populaire) */}
            <div className="bg-black text-white rounded-2xl p-8 border border-black flex flex-col ring-4 ring-[#D0FF00]/30 transform scale-105 shadow-2xl relative">
                <div className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Choix Expert</div>
                <h3 className="text-xl font-bold mb-2 text-[#D0FF00]">Vitrine Créative</h3>
                <div className="text-3xl font-bold mb-4">Populaire</div>
                <p className="text-gray-400 text-sm mb-6">Pour se différencier et convertir.</p>
                
                <div className="mb-6 p-3 bg-white/10 rounded-lg text-white text-sm font-medium text-center border border-white/20">
                    Techno recommandée : <span className="font-bold text-[#D0FF00]">Webflow ou WP Custom</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ 5 à 8 pages stratégiques</li>
                    <li className="flex items-center gap-2 text-sm">✓ Webdesign Sur-Mesure</li>
                    <li className="flex items-center gap-2 text-sm">✓ Animations & Interactions</li>
                    <li className="flex items-center gap-2 text-sm">✓ SEO Technique avancé</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 bg-[#D0FF00] text-black font-bold text-center rounded-lg hover:bg-white transition-colors">
                    Lancer le projet
                </Link>
            </div>

            {/* Pack Premium */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 flex flex-col hover:border-black transition-colors duration-300">
                <h3 className="text-xl font-bold mb-2">Vitrine Premium</h3>
                <div className="text-3xl font-bold mb-4">Sur mesure</div>
                <p className="text-gray-500 text-sm mb-6">L'expérience de marque totale.</p>
                
                <div className="mb-6 p-3 bg-gray-100 rounded-lg text-gray-900 text-sm font-medium text-center">
                    Techno recommandée : <span className="font-bold">Webflow Advanced</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-sm">✓ Direction Artistique 360</li>
                    <li className="flex items-center gap-2 text-sm">✓ Copywriting & Storytelling</li>
                    <li className="flex items-center gap-2 text-sm">✓ Intégrations CRM / API</li>
                    <li className="flex items-center gap-2 text-sm">✓ Support prioritaire</li>
                </ul>
                <Link href="/contact" className="block w-full py-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                    Contacter l'équipe
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-black">Questions fréquentes</h2>
            <p className="text-gray-500">On lève vos derniers doutes sur le choix de la techno.</p>
          </div>
          <div className="space-y-4">
            <AccordionItem question="Puis-je migrer mon site Wix vers Webflow plus tard ?" answer="Oui, c'est possible, mais cela demande de reconstruire le site techniquement (le design peut être conservé). C'est pourquoi nous recommandons de bien choisir dès le départ. Si vous avez une forte ambition de croissance, partir directement sur Webflow ou WordPress est souvent un meilleur calcul à long terme." />
            <AccordionItem question="Est-ce que je serai autonome sur mon site ?" answer="Absolument. Que ce soit sur Wix, WordPress ou Webflow, nous vous livrons un site clé en main avec une formation vidéo personnalisée. Vous pourrez modifier les textes, changer les images et ajouter des articles de blog sans toucher une ligne de code." />
            <AccordionItem question="Quel est le meilleur CMS pour le référencement (SEO) ?" answer="Techniquement, WordPress et Webflow offrent les meilleures capacités pour un SEO avancé (structure propre, vitesse de chargement, balisage sémantique). Wix a fait beaucoup de progrès mais reste parfois limité pour des stratégies très complexes. Cela dit, le contenu et la structure que nous créons comptent autant que l'outil." />
            <AccordionItem
              question="Dans quelles zones géographiques intervenez-vous ?"
              answer={
                <span>
                  Nous accompagnons principalement les entreprises basées en Île-de-France. Nous intervenons notamment à <Link href="/creation-site-internet-paris" className="underline underline-offset-4 hover:text-[#D0FF00] transition-colors font-semibold">Paris</Link>, <Link href="/creation-site-internet-boulogne-billancourt" className="underline underline-offset-4 hover:text-[#D0FF00] transition-colors font-semibold">Boulogne-Billancourt</Link> et dans toute la région parisienne. Nous travaillons également avec des clients à distance partout en France pour des projets WordPress, Webflow ou Wix.
                </span>
              }
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white">
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
             Peu importe l'outil, c'est le résultat qui compte. Discutons de votre projet.
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

      {/* --- PROJECTS / TRUSTED SECTION --- */}
      <div id="projets">
        <TrustedSection />
      </div>

    </main>
  );
}