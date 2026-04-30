'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS (Identiques page Paris pour cohérence) ---

const GlitchText = ({ text }: { text: string }) => {
  return <span className="text-gray-400">{text}</span>;
};

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
              Artichaud est un studio créatif spécialisé dans la conception de sites vitrines haut de gamme. Nous ne sommes pas mariés à une seule technologie.
            </p>
            <p>
              TPE, PME ou startup: nous sélectionnons le CMS qui sert vos objectifs, pas celui qui nous arrange.
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
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Vitrine</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Un site vitrine qui valorise votre marque.
              </h2>
            </div>
            <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Un site vitrine n'est pas une brochure numérique. C'est souvent le premier point de contact entre votre entreprise et un prospect qualifié.
              </p>
              <p>
                WordPress, Webflow ou Wix: la technologie vient après le positionnement, le contenu et l'expérience attendue.
              </p>
              <p>
                Nous cherchons le bon équilibre entre esthétique, autonomie, performance et référencement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F6F6F3]" id="comparatif">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-medium text-gray-500">Comparatif CMS</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-black leading-tight">
                WordPress, Webflow ou Wix : choisir sans subir la techno.
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  id: "wordpress",
                  name: "WordPress",
                  desc: "Pour les sites éditoriaux, les blogs actifs et les projets qui demandent une vraie propriété du contenu.",
                  links: [
                    { href: "/services/seo-referencement-naturel", label: "Préparer le référencement" },
                    { href: "/refonte-site-internet", label: "Refondre un WordPress existant" },
                  ],
                },
                {
                  id: "webflow",
                  name: "Webflow",
                  desc: "Pour les marques qui veulent une direction artistique très précise, de bonnes performances et peu de maintenance technique.",
                  links: [
                    { href: "/works", label: "Voir nos réalisations" },
                    { href: "/services/creation-site-internet", label: "Voir le service création" },
                  ],
                },
                {
                  id: "wix",
                  name: "Wix Studio",
                  desc: "Pour lancer vite, garder une administration simple et maîtriser le budget sans partir sur un template impersonnel.",
                  links: [
                    { href: "/tarifs", label: "Comparer les budgets" },
                    { href: "/contact", label: "Valider le bon CMS" },
                  ],
                },
              ].map((cms) => (
                <div key={cms.name} id={cms.id} className="border-t border-black/15 pt-8">
                  <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                    <h3 className="text-2xl font-bold text-black">{cms.name}</h3>
                    <div>
                      <p className="text-lg text-gray-700 leading-relaxed">{cms.desc}</p>
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                        {cms.links.map((link) => (
                          <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="offres">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-medium text-gray-500">Offres</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-black leading-tight">
                Des formats clairs, ajustés au niveau d'ambition.
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Le cadrage final dépend du contenu, du niveau de design et de l'autonomie souhaitée. Les fourchettes détaillées sont disponibles sur la page tarifs.
              </p>
              <Link href="/tarifs" className="mt-6 inline-flex text-sm font-bold underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                Consulter les tarifs
              </Link>
            </div>
            <div className="divide-y divide-black/15 border-y border-black/15">
              {[
                ["Vitrine essentiel", "Une présence propre, rapide et administrable pour présenter une activité ou une offre ciblée."],
                ["Vitrine créatif", "Un site plus incarné, avec direction artistique, pages stratégiques et socle SEO complet."],
                ["Site + branding", "Une expérience de marque globale quand l'identité, le discours et le site doivent avancer ensemble."],
              ].map(([title, desc]) => (
                <div key={title} className="py-8 md:grid md:grid-cols-[180px_1fr_auto] md:items-start md:gap-8">
                  <h3 className="text-xl font-bold text-black">{title}</h3>
                  <p className="mt-3 md:mt-0 text-gray-700 leading-relaxed">{desc}</p>
                  <Link href="/contact" className="mt-4 md:mt-0 inline-flex text-sm font-bold underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                    Devis
                  </Link>
                </div>
              ))}
            </div>
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
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Lumyn.avif" alt="Site internet agence digitale Paris" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Disobey.avif" alt="Création site e-commerce Paris" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/Keleti.avif" alt="Webdesign portfolio architecte IDF" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-video overflow-hidden cursor-pointer"
                    >
                        <Image src="/projects/rockstar/rockstarprojet1.avif" alt="Site internet Rockstar Paris" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
           animate={{ opacity: 1, y: 0 }}
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
