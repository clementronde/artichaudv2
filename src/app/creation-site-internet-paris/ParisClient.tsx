'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS ---

const GlitchText = ({ text }: { text: string }) => {
  return <span className="text-gray-400">{text}</span>;
};

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
    "image": "https://www.artichaud-studio.com/images/agence-web-paris.jpg",
    "telephone": "+33100000000",
    "url": "https://www.artichaud-studio.com/creation-site-internet-paris",
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
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF00]"></span>
              </span>
              Agence Web Paris & Île-de-France
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance">
            Agence de création de sites internet à <br className="hidden md:block"/> Paris & en Île-de-France
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Dans la capitale mondiale du style et de l'innovation, un site web standard ne suffit plus. Vous avez besoin d'une identité numérique qui marque les esprits.
            </p>
            <p>
              Artichaud est un <strong>studio web créatif basé à Paris</strong>. Nous accompagnons les marques, TPE, PME et startups dans la conception de sites vitrines sur-mesure qui convertissent.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(208,255,0,0.3)] hover:shadow-[0_0_30px_rgba(208,255,0,0.6)]">
              <span className="relative z-10">Lancer mon projet</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm" />
            </Link>
            <Link href="#portfolio" className="relative px-8 py-4 text-white font-medium group">
              Voir nos réalisations
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-[#D0FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- H2: OBJECTIFS BUSINESS (VERSION DASHBOARD PRO) --- */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Objectifs</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Des sites vitrines pensés pour vos objectifs business.
              </h2>
            </div>
            <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Paris est un marché ultra-concurrentiel. Que vous soyez un cabinet, une startup ou un commerce, l'esthétique ne suffit pas.
              </p>
              <p>
                Nous concevons chaque page pour crédibiliser votre expertise, clarifier votre message et transformer vos visiteurs en contacts qualifiés.
              </p>
              <Link href="/services/creation-site-internet" className="inline-flex rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white">
                Voir le service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F6F6F3]">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Technologie</span>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                WordPress, Webflow ou Wix: le bon outil dépend de votre ambition.
              </h2>
            </div>
            <p className="md:col-span-2 text-lg leading-relaxed text-gray-600">
              Le choix technique vient après la stratégie. Pour aller plus loin, consultez notre comparatif dédié.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
            {[
              ["WordPress", "Pour les sites éditoriaux, les contenus fréquents et les besoins d'évolution à long terme.", "/creation-site-vitrine-wordpress-webflow-wix#wordpress"],
              ["Webflow", "Pour une expérience visuelle premium, un rendu précis et une maintenance technique légère.", "/creation-site-vitrine-wordpress-webflow-wix#webflow"],
              ["Wix Studio", "Pour lancer vite, proprement, avec un budget cadré et une autonomie simple.", "/creation-site-vitrine-wordpress-webflow-wix#wix"],
            ].map(([name, text, href]) => (
              <div key={name} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9 border-b border-black/15">
                <h3 className="md:col-span-2 text-2xl font-normal text-black">{name}</h3>
                <p className="md:col-span-4 text-lg leading-relaxed text-gray-600">{text}</p>
                <Link href={href} className="text-sm font-medium text-black underline underline-offset-4">
                  Lire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white" id="tarifs">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Formats</span>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Des périmètres clairs pour accompagner la croissance des entreprises d'Île-de-France.
              </h2>
            </div>
            <div className="md:col-span-2">
              <Link href="/tarifs" className="inline-flex rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white">
                Voir les tarifs
              </Link>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
            {[
              ["Lancement", "Site court, clair, responsive, avec un socle de référencement local."],
              ["Croissance", "Site sur-mesure, pages stratégiques, CMS adapté et optimisation SEO avancée."],
              ["Transformation", "Refonte globale: branding, site premium, contenu, intégrations et accompagnement au lancement."],
            ].map(([name, text]) => (
              <div key={name} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9 border-b border-black/15">
                <h3 className="md:col-span-2 text-2xl font-normal text-black">{name}</h3>
                <p className="md:col-span-4 text-lg leading-relaxed text-gray-600">{text}</p>
                <Link href="/contact" className="text-sm font-medium text-black underline underline-offset-4">
                  Devis
                </Link>
              </div>
            ))}
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
                        animate={{ opacity: 1, y: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
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

                 {/* Projet 4 : Rockstar (Nouveau) */}
                 <Link href="/works/rockstar" className="group block">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                <div className="w-full md:w-1/2 bg-white border-y border-black/15 py-2">
                    <div className="divide-y divide-black/15">
                        {[
                            { title: "Créer un site complet", href: "/services/creation-site-internet", desc: "Cadrage, design, développement et mise en ligne." },
                            { title: "Préparer la visibilité", href: "/services/seo-referencement-naturel", desc: "Structure, contenus et socle technique pour Google." },
                            { title: "Comparer les CMS", href: "/creation-site-vitrine-wordpress-webflow-wix", desc: "WordPress, Webflow ou Wix selon votre contexte." },
                            { title: "Refondre l'existant", href: "/refonte-site-internet", desc: "Moderniser sans perdre l'historique SEO." },
                        ].map((item) => (
                            <Link key={item.href} href={item.href} className="group block py-7">
                                <span className="text-sm font-medium text-gray-500">{item.title}</span>
                                <p className="mt-2 text-lg font-semibold text-black group-hover:text-[#7A9600] transition-colors">{item.desc}</p>
                            </Link>
                        ))}
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
           animate={{ opacity: 1, y: 0 }}
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
                <Link href="/services/creation-site-internet" className="hover:text-white transition-colors">Service Création de site</Link>
                <Link href="/creation-site-internet-boulogne-billancourt" className="hover:text-white transition-colors">Agence Web Boulogne-Billancourt</Link>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">WordPress & Webflow</Link>
                <Link href="/refonte-site-internet" className="hover:text-white transition-colors">Refonte de site internet</Link>
                <Link href="/services/seo-referencement-naturel" className="hover:text-white transition-colors">SEO & Référencement</Link>
                <Link href="/tarifs" className="hover:text-white transition-colors">Nos tarifs</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog & Conseils</Link>
            </div>
        </div>
      </div>

    </main>
  );
}
