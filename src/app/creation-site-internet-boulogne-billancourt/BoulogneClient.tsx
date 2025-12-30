'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, Variants, steps } from "framer-motion";
import { MouseEvent, useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS ---

// 1. Texte Glitch (Effet Cyberpunk/Tech)
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

// 2. Carte avec effet Spotlight
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

// 3. Accordéon FAQ Fluide
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

export default function BoulogneClient() {
  
  // JSON-LD Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agence Artichaud Boulogne",
    "image": "https://artichaud.com/images/agence-web-boulogne.jpg",
    "telephone": "+33100000000",
    "url": "https://artichaud.com/creation-site-internet-boulogne-billancourt",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boulogne-Billancourt",
      "postalCode": "92100",
      "addressRegion": "Hauts-de-Seine",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8397,
      "longitude": 2.2399
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
              Agence Web 📍 Boulogne-Billancourt (92)
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance">
            Création de site internet à <br className="hidden md:block"/> Boulogne‑Billancourt pour marques qui <GlitchText text="se démarquent" />.
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Vous cherchez une <strong>agence web à Boulogne-Billancourt</strong> capable de traduire votre expertise en une expérience digitale mémorable ? Bienvenue chez le studio Artichaud.
            </p>
            <p>
              Nous accompagnons les entreprises des Hauts-de-Seine (PME, cabinets, start-ups) dans la <strong>création de sites internet vitrines</strong> performants. Nous concevons des outils sur-mesure pour capter votre audience.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10">Demander un devis</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </Link>
            <Link href="#offres" className="px-8 py-4 text-white font-medium hover:text-[#D0FF00] transition-colors underline-offset-4 hover:underline">
              Découvrir nos offres
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- H2: AGENCE CRÉATIVE (NOUVELLE MISE EN PAGE) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Colonne Gauche : Image + Titre */}
            <motion.div 
              className="w-full lg:w-1/2 lg:sticky lg:top-24"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black leading-tight text-balance">
                Une agence web créative ancrée à <span className="text-gray-400">Boulogne-Billancourt.</span>
              </h2>
              <div className="relative h-[450px] w-full rounded-2xl overflow-hidden bg-gray-100 group">
                 <Image 
                   src="/LP/creation-site-boulogne-billancourt/google_maps_boulogne_billancourt.avif" 
                   alt="Agence web à Boulogne Billancourt - Quartier Rives de Seine"
                   fill
                   className="object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
                 {/* Badge flottant */}
                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-bold text-black">📍 Quartier Rives de Seine</p>
                 </div>
              </div>
            </motion.div>
            
            {/* Colonne Droite : Texte + Cards Techno */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p>
                  Installée au cœur de l'écosystème dynamique du 92, Artichaud n'est pas une simple agence de développement. Nous sommes des <strong>artisans du web</strong>.
                </p>
                <p>
                  Nous croyons que la <strong>création de site internet à Boulogne-Billancourt</strong> ne doit pas se limiter à aligner du code, mais doit raconter votre histoire. Notre force ? Fusionner <strong className="text-black">Branding stratégique</strong> et <strong className="text-black">Excellence technique</strong>.
                </p>
                <p>
                   Que vous soyez un cabinet d'avocats près du Théâtre de l'Ouest Parisien ou une startup à la Seine Musicale, votre image de marque est votre actif le plus précieux.
                </p>
              </div>

              {/* Liste des Technos en Cartes Interactives */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Nos technologies de prédilection</h3>
              <div className="grid gap-4">
                
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="group block">
                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold">WP</div>
                        <div>
                            <h4 className="font-bold text-black group-hover:text-blue-600 transition-colors">WordPress</h4>
                            <p className="text-sm text-gray-500">La référence pour les sites riches en contenu et évolutifs.</p>
                        </div>
                    </motion.div>
                </Link>

                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="group block">
                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-neutral-900 hover:border-black hover:shadow-lg transition-all duration-300 group">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-lg font-bold">Wf</div>
                        <div>
                            <h4 className="font-bold text-black group-hover:text-white transition-colors">Webflow</h4>
                            <p className="text-sm text-gray-500 group-hover:text-gray-400">Le choix premium : sécurité, animations et performance.</p>
                        </div>
                    </motion.div>
                </Link>

                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="group block">
                    <motion.div whileHover={{ y: -4 }} className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-lg font-bold">Wx</div>
                        <div>
                            <h4 className="font-bold text-black group-hover:text-purple-600 transition-colors">Wix Studio</h4>
                            <p className="text-sm text-gray-500">Agilité et design pour les budgets maîtrisés.</p>
                        </div>
                    </motion.div>
                </Link>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- H2: OFFRES --- */}
      <section className="py-24 bg-[#F9F9F9]" id="offres">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Nos offres de création</h2>
            <p className="text-lg text-gray-600">
              Des packs clairs adaptés aux ambitions des entreprises boulonnaises. Pas de coûts cachés.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* OFFRE 1 */}
            <SpotlightCard className="rounded-3xl p-8 flex flex-col h-full border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                <div className="mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">Lancement</span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">Vitrine Essentiel</h3>
                    <p className="text-gray-500 text-sm">Pour exister rapidement et rassurer.</p>
                </div>
                <div className="space-y-4 mb-8 flex-grow text-gray-600 text-sm leading-relaxed">
                    <p>
                        Idéal pour les commerçants, artisans ou indépendants de Boulogne. Carte de visite digitale parfaite.
                    </p>
                    <ul className="space-y-3 mt-6 font-medium text-black">
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Design Responsive
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Formulaire de contact
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Mentions légales RGPD
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span> Optimisation technique
                        </li>
                    </ul>
                </div>
                <Link href="/contact" className="w-full py-3 px-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                    Demander un devis
                </Link>
            </SpotlightCard>

            {/* OFFRE 2 (Populaire) */}
            <SpotlightCard className="rounded-3xl p-8 flex flex-col h-full bg-black text-white ring-4 ring-[#D0FF00]/30 transform lg:scale-105 shadow-2xl relative z-10">
                <div className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Populaire</div>
                <div className="mb-6">
                    <span className="px-3 py-1 bg-white/10 text-[#D0FF00] text-xs font-bold uppercase tracking-wider rounded-full">Identité</span>
                    <h3 className="text-2xl font-bold mt-4 mb-2 text-black">Vitrine Créatif</h3>
                    <p className="text-neutral-400 text-sm">Pour se démarquer de la concurrence.</p>
                </div>
                <div className="space-y-4 mb-8 flex-grow text-gray-600 text-sm leading-relaxed">
                    <p>
                        L'offre préférée des PME et startups du 92. Déployez votre identité sur <strong>Webflow</strong> ou <strong>WordPress</strong>.
                    </p>
                    <ul className="space-y-3 mt-6 font-medium text-black">
                        <li className="flex items-center gap-2">
                            <span className="text-[#D0FF00]">✓</span> Webdesign Sur-Mesure
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#D0FF00]">✓</span> Animations & Motion
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#D0FF00]">✓</span> SEO Local Avancé
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-[#D0FF00]">✓</span> Formation Admin incluse
                        </li>
                    </ul>
                </div>
                <Link href="/contact" className="w-full py-3 px-3 bg-[#D0FF00] text-black font-bold text-center rounded-lg hover:bg-white transition-colors">
                    Choisir l'excellence
                </Link>
            </SpotlightCard>

            {/* OFFRE 3 */}
            <SpotlightCard className="rounded-3xl p-8 flex flex-col h-full border border-gray-200 bg-white hover:border-gray-300 transition-colors">
                <div className="mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">Transformation</span>
                    <h3 className="text-2xl font-bold mt-4 mb-2">Site + Branding</h3>
                    <p className="text-gray-500 text-sm">La refonte totale de votre image.</p>
                </div>
                <div className="space-y-4 mb-8 flex-grow text-gray-600 text-sm leading-relaxed">
                    <p>
                        Vous lancez une nouvelle marque ou votre image actuelle ne reflète plus la qualité de vos services ?
                    </p>
                    <ul className="space-y-3 mt-6 font-medium text-black">
                        <li className="flex items-center gap-2">
                            <span className="text-purple-500">✓</span> Logo & Charte Graphique
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-purple-500">✓</span> Site Premium (Webflow/WP)
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-purple-500">✓</span> Copywriting & Storytelling
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-purple-500">✓</span> Support prioritaire
                        </li>
                    </ul>
                </div>
                <Link href="/contact" className="w-full py-3 px-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                    Parler de mon branding
                </Link>
            </SpotlightCard>

          </div>
        </div>
      </section>

      {/* --- H2: PROCESSUS --- */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Un processus clair</h2>
             <p className="text-neutral-400 text-lg">
               Nous ne laissons rien au hasard. Voici comment nous collaborons pour garantir le succès de votre projet.
             </p>
           </div>
           
           <div className="space-y-8 max-w-4xl mx-auto">
              {[
                  { id: "01", title: "Découverte & Audit", desc: "Rencontre (visio ou café à Boulogne) pour analyser vos besoins et votre marché." },
                  { id: "02", title: "UX/UI Design", desc: "Création de l'arborescence et des maquettes graphiques haute fidélité." },
                  { id: "03", title: "Développement", desc: "Intégration pixel-perfect sur le CMS choisi avec optimisations techniques." },
                  { id: "04", title: "Mise en ligne", desc: "Tests, formation à l'administration et lancement officiel." }
              ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 md:gap-8 group p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                      <div className="flex-shrink-0 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-xl font-bold text-[#D0FF00] group-hover:bg-[#D0FF00] group-hover:text-black transition-colors duration-300">
                          {step.id}
                      </div>
                      <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-[#D0FF00] transition-colors">{step.title}</h3>
                          <p className="text-neutral-400 leading-relaxed text-sm md:text-base">
                              {step.desc}
                          </p>
                      </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- H2: EXEMPLES DE PROJETS --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-black">
                Projets récents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Lumyn - Agence Digitale", cat: "Webflow & 3D", img: "/projects/Lumyn.avif" },
                    { title: "Keleti Design", cat: "Portfolio Minimaliste", img: "/projects/Keleti.avif" },
                    { title: "Disobey Apparel", cat: "E-shop Shopify", img: "/projects/Disobey.avif" }
                ].map((projet, i) => (
                    <motion.div 
                        key={i} 
                        className="group cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="relative h-72 w-full bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
                            <Image 
                                src={projet.img} 
                                alt={projet.title} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                            />
                            {/* Overlay au survol */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Voir le projet
                                </span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors">{projet.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{projet.cat}</p>
                    </motion.div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link href="/works" className="inline-block px-8 py-3 border border-black text-black font-bold rounded-full hover:bg-black hover:text-white transition-colors">
                    Voir tous nos projets
                </Link>
            </div>
        </div>
      </section>

      {/* --- H2: POURQUOI UNE AGENCE LOCALE (VERSION PRO + SVG) --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Pourquoi choisir Artichaud à Boulogne ?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Plus qu'un prestataire, nous sommes votre partenaire digital de proximité. Voici ce qui fait la différence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Pilier 1 : Réactivité */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                        whileHover="hover"
                        className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
                    >
                        <motion.div 
                            variants={{ hover: { scale: 1.1, rotate: 5 } }}
                            className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-blue-600 group-hover:text-white"
                        >
                            {/* Icone Lightning SVG */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 text-black">Réactivité & Proximité</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Nous vivons et travaillons ici. En cas d'urgence ou pour un point stratégique, nous pouvons être dans vos bureaux en 15 minutes. Fini les délais de réponse de 48h.
                        </p>
                    </motion.div>

                    {/* Pilier 2 : Excellence Technique */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        whileHover="hover"
                        className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-300 transition-all duration-300"
                    >
                        <motion.div 
                            variants={{ hover: { scale: 1.1, rotate: -5 } }}
                            className="w-14 h-14 bg-gray-100 text-black rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-black group-hover:text-[#D0FF00]"
                        >
                            {/* Icone Code/Layers SVG */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 text-black">Excellence Technique</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Être local ne veut pas dire "petit". Nous utilisons les mêmes technologies que les grandes startups (Webflow, Next.js). Vous bénéficiez d'un site de niveau national, géré localement.
                        </p>
                    </motion.div>

                    {/* Pilier 3 : Relation Humaine */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover="hover"
                        className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#D0FF00] transition-all duration-300"
                    >
                        <motion.div 
                            variants={{ hover: { scale: 1.1, rotate: 5 } }}
                            className="w-14 h-14 bg-[#D0FF00]/20 text-black rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-[#D0FF00]"
                        >
                            {/* Icone Handshake/Smile SVG */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 text-black">L'humain avant tout</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Pas de tickets de support anonymes. Vous avez le numéro direct de votre chef de projet. Nous privilégions les relations durables et la transparence totale.
                        </p>
                    </motion.div>

                    {/* Pilier 4 : Culture Locale */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        whileHover="hover"
                        className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                    >
                        <motion.div 
                            variants={{ hover: { scale: 1.1, rotate: -5 } }}
                            className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 transition-colors group-hover:bg-purple-600 group-hover:text-white"
                        >
                            {/* Icone Map Pin SVG */}
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 text-black">Culture Locale 92</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Nous comprenons les codes du marché des Hauts-de-Seine. Nous savons comment parler à une clientèle exigeante, qu'elle soit B2B (Quartier d'affaires) ou B2C (Commerces).
                        </p>
                    </motion.div>

                </div>
            </div>
        </div>
      </section>

      {/* --- H2: FAQ --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">FAQ</h2>
          <div className="space-y-4">
            <AccordionItem 
                question="Quel est le tarif d'un site internet vitrine ?" 
                answer="C'est la question numéro 1. Pour un site vitrine professionnel réalisé par une agence (et non un freelance débutant), les tarifs démarrent généralement autour de 2000€ pour une solution simple (Wix/WordPress starter) et peuvent aller de 4000€ à 8000€ pour un site sur-mesure complet avec stratégie de marque et animations Webflow." 
            />
            <AccordionItem 
                question="Combien de temps faut-il pour créer mon site ?" 
                answer="La durée dépend de la complexité et de votre réactivité pour fournir les contenus (textes, photos). En moyenne, comptez 3 à 4 semaines pour un site vitrine classique et 6 à 8 semaines pour un projet de refonte complet avec identité visuelle." 
            />
            <AccordionItem 
                question="Mon site sera-t-il visible sur Google à Boulogne ?" 
                answer="Oui, c'est notre priorité. Nous structurons le site techniquement pour le SEO (Hn, balises, vitesse). Pour maximiser votre visibilité locale, nous vous conseillons également sur l'optimisation de votre fiche Google My Business pour ressortir sur les recherches comme 'votre activité + Boulogne'." 
            />
            <AccordionItem 
                question="Dois-je payer un abonnement mensuel ?" 
                answer="Non, chez Artichaud, vous payez la création du site une fois pour toutes (ou en plusieurs fois selon devis). Les seuls frais récurrents obligatoires sont l'hébergement et le nom de domaine (environ 50€ à 150€/an selon l'hébergeur). Nous proposons des forfaits de maintenance optionnels." 
            />
            <AccordionItem 
                question="Intervenez-vous ailleurs qu'à Boulogne ?" 
                answer="Bien sûr. Notre cœur bat à Boulogne-Billancourt, mais nous accompagnons des clients dans tout le 92 (Issy-les-Moulineaux, Neuilly, Saint-Cloud) et bien sûr à Paris et en Île-de-France. Le digital n'a pas de frontières, mais la proximité reste notre atout." 
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
             Prêt à digitaliser <br/> 
             <GlitchText text="votre activité ?" />
           </h2>
           <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
             Ne laissez pas vos concurrents prendre toute la place sur le web local. Un site vitrine performant est le meilleur investissement pour votre croissance à Boulogne-Billancourt.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10 group-hover:text-black">Demander un devis</span>
                <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </Link>
              <Link href="tel:+33100000000" className="text-white font-medium hover:text-[#D0FF00] transition-colors">
                Réserver un appel découverte
              </Link>
           </div>
         </motion.div>
      </section>

      {/* --- LIENS INTERNES SEO --- */}
      <div className="bg-black py-8 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center text-xs text-neutral-600">
            <p className="mb-2">Aller plus loin :</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link href="/creation-site-internet-paris" className="hover:text-white transition-colors">Création site internet Paris & IDF</Link>
                <span>|</span>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">Création site vitrine WordPress / Webflow / Wix</Link>
                <span>|</span>
                <Link href="/refonte-site-internet" className="hover:text-white transition-colors">Refonte de site internet</Link>
                <span>|</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog Agence</Link>
            </div>
        </div>
      </div>

    </main>
  );
}