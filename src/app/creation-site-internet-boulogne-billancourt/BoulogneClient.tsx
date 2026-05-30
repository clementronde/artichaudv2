'use client'

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

// --- COMPOSANTS UI & MICRO-INTERACTIONS ---

// 2. Accordéon FAQ Fluide
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full cursor-pointer items-center justify-between py-6 text-left group">
        <span className={`text-lg font-medium ${isOpen ? 'text-black' : 'text-gray-800'}`}>{question}</span>
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#F70046] group-hover:bg-[#F70046] group-hover:text-white">
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
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[88vh] bg-[#050505] px-6 pt-32 pb-10 text-white md:px-10 md:pt-40">
        <motion.div
          className="flex min-h-[calc(88vh-10rem)] flex-col justify-between"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div>
            <motion.div variants={fadeInUp} className="mb-8 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-wide text-white/50">
              <span>Boulogne-Billancourt</span>
              <span>Hauts-de-Seine</span>
              <span>Site vitrine & SEO local</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="max-w-[1180px] text-[48px] font-normal leading-[0.94] tracking-tight text-balance md:text-[92px] lg:text-[128px]">
              Création de site internet à Boulogne-Billancourt.
            </motion.h1>
          </div>

          <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-1 gap-8 border-t border-white/15 pt-8 md:grid-cols-8 md:gap-x-5">
            <p className="max-w-2xl text-lg leading-relaxed text-white/65 md:col-span-4 md:text-xl">
              Artichaud Studio accompagne les entreprises de Boulogne, Paris Ouest et des Hauts-de-Seine avec des sites vitrines pensés pour convertir les recherches locales en demandes qualifiées.
            </p>
            <div className="flex flex-col gap-3 md:col-span-2 md:col-start-6">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-colors hover:bg-[#F70046] hover:text-white">
                Demander un devis
              </Link>
              <Link href="/works" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black">
                Voir les réalisations
              </Link>
            </div>
            <div className="text-sm leading-relaxed text-white/45 md:col-span-1">
              Boulogne, Issy-les-Moulineaux, Saint-Cloud, Sèvres, Paris 16.
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- H2: AGENCE CRÉATIVE --- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Local</span>
            </div>

            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Une agence web à Boulogne-Billancourt pour les entreprises du 92.
              </h2>
            </div>

            <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-gray-600">
              <p>
                Installée au cœur de l’écosystème du 92, Artichaud accompagne les entreprises de Boulogne-Billancourt qui veulent être plus visibles sur Google et plus convaincantes avant le premier échange commercial.
              </p>
              <p>
                Notre force : faire dialoguer branding, webdesign, développement et SEO local pour créer une présence digitale cohérente, de la page d’accueil jusqu’au formulaire.
              </p>
              <p>
                Cabinet, commerce, PME ou startup locale : nous adaptons la structure du site à vos recherches prioritaires, notamment création site internet Boulogne-Billancourt, agence web Boulogne ou vos propres requêtes métier dans les Hauts-de-Seine.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2 text-sm font-medium">
                <Link href="/services/creation-site-internet" className="hover:text-[#F70046] transition-colors">Notre méthode générale →</Link>
                <Link href="/services/seo-referencement-naturel" className="hover:text-[#F70046] transition-colors">SEO local →</Link>
                <Link href="/tarifs" className="hover:text-[#F70046] transition-colors">Voir les tarifs →</Link>
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
                Des formats adaptés aux entreprises de Boulogne-Billancourt.
              </h2>
            </div>
            <p className="md:col-span-2 text-lg leading-relaxed text-gray-600">
              On calibre le périmètre selon votre besoin réel : visibilité sur Boulogne, refonte, génération de leads, autonomie de contenu ou repositionnement.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
            {[
              {
                name: "Vitrine essentiel",
                detail: "Pour présenter une activité locale, rassurer vite et générer les premiers contacts qualifiés.",
                items: ["Structure courte", "Design responsive", "Formulaire", "SEO local"],
              },
              {
                name: "Vitrine créatif",
                detail: "Pour une entreprise du 92 qui veut une présence plus distinctive, plus éditoriale et plus orientée conversion.",
                items: ["Direction artistique", "UX/UI sur-mesure", "CMS adapté", "Pages locales"],
              },
              {
                name: "Site + branding",
                detail: "Pour aligner l'identité, le discours commercial et l'expérience web dans une même refonte locale.",
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
            <Link href="/contact" className="inline-flex rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#F70046] hover:text-white">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* --- H2: PROCESSUS --- */}
      <section className="py-20 md:py-28 bg-neutral-950 text-white overflow-hidden relative">
        <div className="px-6 md:px-10 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
             <div className="hidden md:block md:col-span-1 pt-2">
               <span className="text-sm font-medium text-white/40">Méthode</span>
             </div>
             <div className="md:col-span-4 md:col-start-2">
               <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight">Un processus clair, sans tunnel opaque.</h2>
             </div>
             <p className="md:col-span-3 text-lg leading-relaxed text-white/60">
               Vous savez ce qui est travaillé, pourquoi, et comment chaque décision sert votre visibilité à Boulogne-Billancourt ou votre conversion.
             </p>
           </div>

           <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-white/15">
              {[
                  { id: "01", title: "Diagnostic local", desc: "Objectifs, concurrence à Boulogne et Paris Ouest, pages prioritaires et parcours de contact." },
                  { id: "02", title: "Structure SEO locale", desc: "Arborescence, messages clés, maillage interne et priorités de recherche géographique." },
                  { id: "03", title: "Design & développement", desc: "Interface sur mesure, responsive, rapide et adaptée à votre CMS ou stack." },
                  { id: "04", title: "Mise en ligne", desc: "Tests, indexation, tracking, formation et prochaines actions éditoriales." }
              ].map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9 border-b border-white/15"
                  >
                      <span className="md:col-span-1 text-white/35">{step.id}</span>
                      <h3 className="md:col-span-2 text-2xl font-normal text-white">{step.title}</h3>
                      <div className="md:col-span-4">
                          <p className="text-white/60 leading-relaxed text-base md:text-lg">
                              {step.desc}
                          </p>
                      </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* --- H2: EXEMPLES DE PROJETS --- */}
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
              <div className="hidden md:block md:col-span-1 pt-2">
                <span className="text-sm font-medium text-gray-500">Preuves</span>
              </div>
              <div className="md:col-span-4 md:col-start-2">
                <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                  Des références pour évaluer le niveau avant de lancer votre site local.
                </h2>
              </div>
              <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">
                Quelques projets pour évaluer notre direction artistique, notre sens de la structure et notre capacité à rendre une offre lisible.
              </p>
            </div>
            <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
                {[
                    { title: "Lumyn", cat: "Plateforme créative, branding et développement", href: "/works/lumyn" },
                    { title: "Keleti Design", cat: "Identité premium et expérience éditoriale", href: "/works/keleti" },
                    { title: "Jobmi", cat: "Naming et identité pour plateforme emploi", href: "/works/jobmi" }
                ].map((projet, i) => (
                    <motion.div
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={projet.href} className="group grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-3 py-8 border-b border-black/15">
                          <h3 className="md:col-span-2 text-2xl md:text-3xl font-normal text-black group-hover:text-[#F70046] transition-colors">{projet.title}</h3>
                          <p className="md:col-span-4 text-lg text-gray-600 leading-relaxed">{projet.cat}</p>
                          <span className="md:col-span-1 text-sm font-medium text-black md:text-right">Voir →</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
            <div className="md:ml-[calc(12.5%+0.625rem)] mt-10">
                <Link href="/works" className="inline-flex rounded-full border border-black/15 px-7 py-4 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors">
                    Voir toutes les réalisations
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
                Pourquoi choisir une agence web locale à Boulogne ?
              </h2>
            </div>
            <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">
              Plus qu’un prestataire, nous sommes un partenaire de proximité : disponible, lisible dans sa méthode, et attentif aux enjeux des entreprises de Boulogne-Billancourt.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] mt-14 border-t border-black/15">
            {[
              ["Réactivité & proximité", "Un interlocuteur direct, des échanges simples, et la possibilité d'organiser rapidement un point de travail autour de Boulogne ou Paris Ouest."],
              ["Excellence technique", "Webflow, WordPress, Next.js: nous choisissons la technologie selon l'objectif, pas selon une habitude d'agence."],
              ["Relation humaine", "Pas de ticket anonyme ni de tunnel opaque. Vous savez ce qui est fait, pourquoi, et dans quel ordre."],
              ["Culture locale 92", "Nous comprenons les codes d'une clientèle exigeante entre Boulogne, Issy-les-Moulineaux, Saint-Cloud, Sèvres et Paris 16."],
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
      <section className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden bg-[#050505] text-white">
         <motion.div
           className="relative z-10 grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
           <div className="hidden md:block md:col-span-1 pt-2">
             <span className="text-sm font-medium text-white/40">Contact</span>
           </div>
           <div className="md:col-span-4">
             <h2 className="text-[42px] md:text-[72px] leading-[1] font-normal tracking-tight text-white">
               Parlons de votre futur site.
             </h2>
           </div>
           <div className="md:col-span-3 md:pt-20">
             <p className="text-lg mb-8 text-neutral-400 font-light leading-relaxed">
               Si vous voulez améliorer votre visibilité à Boulogne-Billancourt ou créer un site plus crédible avant vos prochains rendez-vous commerciaux, on peut cadrer les priorités ensemble.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full transition-colors hover:bg-[#F70046] hover:text-white"
              >
                Demander un devis
              </Link>
              <Link href="/tarifs" className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white hover:text-black transition-colors">
                Voir les tarifs
              </Link>
             </div>
           </div>
         </motion.div>
      </section>

    </main>
  );
}
