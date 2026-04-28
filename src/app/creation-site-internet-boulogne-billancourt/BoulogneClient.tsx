'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS ---

// 1. Texte Glitch (Effet Cyberpunk/Tech)
const GlitchText = ({ text }: { text: string }) => {
  return <span className="text-gray-400">{text}</span>;
};

// 2. Accordéon FAQ Fluide
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
    "image": "https://artichaud-studio.com/images/agence-web-boulogne.jpg",
    "telephone": "+33100000000",
    "url": "https://artichaud-studio.com/creation-site-internet-boulogne-billancourt",
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
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF00]"></span>
              </span>
              Agence Web Boulogne-Billancourt (92)
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance">
            Création de site internet à <br className="hidden md:block"/> Boulogne-Billancourt pour marques qui <GlitchText text="se démarquent" />.
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Vous cherchez une <strong>agence web à Boulogne-Billancourt</strong> capable de traduire votre expertise en une expérience digitale mémorable ? Bienvenue chez le studio Artichaud.
            </p>
            <p>
              Nous accompagnons les entreprises des Hauts-de-Seine dans la création de sites internet vitrines performants, pensés pour capter une audience locale et qualifiée.
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
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Local</span>
            </div>

            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Une agence web créative ancrée à Boulogne-Billancourt.
              </h2>
            </div>

            <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Installée au cœur de l'écosystème dynamique du 92, Artichaud n'est pas une simple agence de développement. Nous sommes des artisans du web.
              </p>
              <p>
                Notre force: faire dialoguer branding stratégique, webdesign et excellence technique pour créer un site qui porte vraiment votre positionnement.
              </p>
              <p>
                Cabinet, commerce, PME ou startup: nous construisons une présence digitale claire, locale et crédible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 mt-16">
            <div className="md:col-span-7 md:col-start-2">
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-gray-100">
                 <Image 
                   src="/LP/creation-site-boulogne-billancourt/google_maps_boulogne_billancourt.avif" 
                   alt="Agence web à Boulogne Billancourt - Quartier Rives de Seine"
                   fill
                   className="object-cover"
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- H2: OFFRES --- */}
      <section className="py-20 md:py-28 bg-[#F6F6F3]" id="offres">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Offres</span>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Des formats de collaboration clairs, adaptés à votre maturité digitale.
              </h2>
            </div>
            <p className="md:col-span-2 text-lg leading-relaxed text-gray-600">
              Pas de pack artificiel ni de fausse promo. On calibre le périmètre selon votre besoin réel.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
            {[
              {
                name: "Vitrine essentiel",
                detail: "Pour présenter une activité, rassurer et générer les premiers contacts.",
                items: ["Structure courte", "Design responsive", "Formulaire", "Socle technique SEO"],
              },
              {
                name: "Vitrine créatif",
                detail: "Pour une entreprise qui veut une présence plus distinctive et plus orientée conversion.",
                items: ["Direction artistique", "UX/UI sur-mesure", "CMS adapté", "SEO local avancé"],
              },
              {
                name: "Site + branding",
                detail: "Pour aligner l'identité, le discours et l'expérience web dans une même refonte.",
                items: ["Logo et charte", "Site premium", "Copywriting", "Accompagnement lancement"],
              },
            ].map((offer) => (
              <div key={offer.name} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-6 py-10 border-b border-black/15">
                <h3 className="md:col-span-2 text-2xl md:text-3xl font-normal text-black">{offer.name}</h3>
                <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">{offer.detail}</p>
                <ul className="md:col-span-2 space-y-2 text-sm font-medium text-black">
                  {offer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] mt-10">
            <Link href="/contact" className="inline-flex rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#D0FF00] hover:text-black">
              Demander un devis
            </Link>
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
                    animate={{ opacity: 1, x: 0 }}
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
                        animate={{ opacity: 1, y: 0 }}
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
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Pourquoi</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Pourquoi choisir Artichaud à Boulogne ?
              </h2>
            </div>
            <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">
              Plus qu'un prestataire, nous sommes un partenaire de proximité: disponible, lisible dans sa méthode, et exigeant sur la qualité du rendu.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] mt-14 border-t border-black/15">
            {[
              ["Réactivité & proximité", "Un interlocuteur direct, des échanges simples, et la possibilité d'organiser rapidement un point de travail."],
              ["Excellence technique", "Webflow, WordPress, Next.js: nous choisissons la technologie selon l'objectif, pas selon une habitude d'agence."],
              ["Relation humaine", "Pas de ticket anonyme ni de tunnel opaque. Vous savez ce qui est fait, pourquoi, et dans quel ordre."],
              ["Culture locale 92", "Nous comprenons les codes d'une clientèle exigeante, entre B2B, commerces de proximité et entreprises en croissance."],
            ].map(([title, text]) => (
              <div key={title} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9 border-b border-black/15">
                <h3 className="md:col-span-2 text-2xl font-normal text-black">{title}</h3>
                <p className="md:col-span-4 text-lg leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
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
           animate={{ opacity: 1, y: 0 }}
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
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <Link href="/services/creation-site-internet" className="hover:text-white transition-colors">Création de site internet</Link>
                <Link href="/creation-site-internet-paris" className="hover:text-white transition-colors">Création site internet Paris & IDF</Link>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">WordPress / Webflow / Wix</Link>
                <Link href="/refonte-site-internet" className="hover:text-white transition-colors">Refonte de site internet</Link>
                <Link href="/services/seo-referencement-naturel" className="hover:text-white transition-colors">SEO & Référencement</Link>
                <Link href="/tarifs" className="hover:text-white transition-colors">Nos tarifs</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog Agence</Link>
            </div>
        </div>
      </div>

    </main>
  );
}
