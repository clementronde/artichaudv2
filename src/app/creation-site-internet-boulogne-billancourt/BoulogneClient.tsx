'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";

// --- ACCORDION ---
const AccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between py-6 text-left group"
      >
        <span className={`text-lg font-medium ${isOpen ? "text-black" : "text-gray-800"}`}>{question}</span>
        <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#F70046] group-hover:bg-[#F70046]">
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-4 w-4 text-gray-500 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// --- PROJECTS ---
const projects = [
  { title: "Lumyn", cat: "Webflow & Branding", href: "/works/lumyn", img: "/projects/Lumyn.avif" },
  { title: "Keleti Design", cat: "Portfolio Minimaliste", href: "/works/keleti", img: "/projects/Keleti.avif" },
  { title: "Disobey", cat: "E-shop & Identité", href: "/works/disobey", img: "/projects/Disobey.avif" },
  { title: "Jobmi", cat: "Naming & Branding", href: "/works/jobmi", img: "/projects/Jobmi.avif" },
];

// --- OFFERS ---
const offers = [
  {
    name: "Vitrine essentiel",
    detail: "Présenter une activité locale, rassurer vite et générer les premiers contacts qualifiés.",
    items: ["Structure courte", "Design responsive", "Formulaire", "SEO local"],
  },
  {
    name: "Vitrine créatif",
    detail: "Pour une entreprise du 92 qui veut une présence plus distinctive, plus éditoriale et plus orientée conversion.",
    items: ["Direction artistique", "UX/UI sur-mesure", "CMS adapté", "Pages locales"],
  },
  {
    name: "Site + branding",
    detail: "Aligner l'identité, le discours commercial et l'expérience web dans une même refonte locale.",
    items: ["Logo et charte", "Site premium", "Copywriting", "Accompagnement lancement"],
  },
];

// --- PROCESS ---
const steps = [
  { id: "01", title: "Diagnostic local", desc: "Objectifs, concurrence à Boulogne et Paris Ouest, pages prioritaires et parcours de contact." },
  { id: "02", title: "Structure SEO", desc: "Arborescence, messages clés, maillage interne et priorités de recherche géographique." },
  { id: "03", title: "Design & Développement", desc: "Interface sur-mesure, responsive, rapide et adaptée à votre CMS ou stack technique." },
  { id: "04", title: "Mise en ligne", desc: "Tests, indexation, tracking, formation et prochaines actions éditoriales." },
];

// --- TESTIMONIALS ---
const testimonials = [
  {
    name: "Victoria Lauro",
    role: "Fondatrice, Chez June",
    text: "Réactif, professionnel, efficace et toujours disponible pour trouver des solutions adaptées à nos besoins. Un vrai partenaire de confiance au quotidien.",
  },
  {
    name: "Nicolas Perrin",
    role: "Co-fondateur, Atelier Nova",
    text: "La capacité à traduire nos idées en maquettes concrètes sans partir dans tous les sens. Les échanges étaient directs, les choix expliqués.",
  },
  {
    name: "Sophie Lambert",
    role: "Directrice, Studio Lignes",
    text: "L'équipe a pris le temps de regarder les anciennes pages, de prévoir les redirections et de clarifier les priorités. La transition s'est faite bien plus sereinement que prévu.",
  },
];

// --- TISSU ÉCO ---
const ecosystem = [
  ["TF1 & médias", "Boulogne-Billancourt abrite le siège social de TF1 (quai du Point du Jour). L'exigence créative du territoire est inscrite dans l'ADN des entreprises locales — et nos clients en ont intégré les standards."],
  ["ZAC Seguin-Rives de Seine", "La transformation de l'île Seguin attire de nouveaux acteurs économiques et culturels. Un territoire en mutation qui crée de réelles opportunités de visibilité digitale pour ceux qui s'y positionnent tôt."],
  ["PME & indépendants", "Cabinets, commerces de la rue de Silly, studios créatifs, professions libérales : le tissu dense des petites structures du 92 est notre client prioritaire."],
  ["Clientèle exigeante", "Entre Boulogne, Issy-les-Moulineaux, Saint-Cloud, Sèvres et Paris 16e, les codes visuels et les attentes en matière de web sont élevés. Nous les connaissons bien."],
];

export default function BoulogneClient() {
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────── */}
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
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#F70046]/10 border border-[#F70046]/20 text-[#F70046] text-sm font-medium mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F70046]" />
              </span>
              Agence Web Boulogne-Billancourt — Hauts-de-Seine 92
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 text-balance"
          >
            Création de site internet<br className="hidden md:block" /> à Boulogne-Billancourt.
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance"
          >
            <p>
              Dans la ville la plus active des Hauts-de-Seine, un site générique ne suffit plus. Vous avez besoin d'une présence locale qui convertit les recherches Google en demandes qualifiées.
            </p>
            <p>
              Artichaud Studio est un <strong className="text-white">studio web créatif basé à Boulogne-Billancourt</strong>. Nous accompagnons les TPE, PME et indépendants du 92 dans la conception de sites sur mesure pensés pour votre marché local.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="group relative px-8 py-4 bg-[#F70046] text-white font-bold rounded-full text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(247,0,70,0.3)] hover:shadow-[0_0_30px_rgba(247,0,70,0.6)]"
            >
              <span className="relative z-10">Demander un devis</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            <Link href="#realisations" className="relative px-8 py-4 text-white font-medium group">
              Voir nos réalisations
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-[#F70046] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── INTRO LOCAL ──────────────────────────────────────────── */}
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
                Installée au cœur de l'écosystème du 92, Artichaud accompagne les entreprises de Boulogne-Billancourt qui veulent être plus visibles sur Google et plus convaincantes avant le premier échange commercial.
              </p>
              <p>
                Notre force : faire dialoguer branding, webdesign, développement et SEO local pour créer une présence digitale cohérente, de la page d'accueil jusqu'au formulaire.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 pt-2 text-sm font-medium">
                <Link href="/services/creation-site-internet" className="hover:text-[#F70046] transition-colors">Notre méthode →</Link>
                <Link href="/services/seo-referencement-naturel" className="hover:text-[#F70046] transition-colors">SEO local →</Link>
                <Link href="/tarifs" className="hover:text-[#F70046] transition-colors">Tarifs →</Link>
                <Link href="/boulogne-billancourt" className="hover:text-[#F70046] transition-colors">La ville & son tissu éco →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OFFRES ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F6F6F3]" id="offres">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Offres</span>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Des périmètres clairs pour les entreprises de Boulogne-Billancourt.
              </h2>
            </div>
            <div className="md:col-span-2">
              <Link href="/tarifs" className="inline-flex rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white">
                Voir les tarifs
              </Link>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-black/15">
            {offers.map((offer) => (
              <div key={offer.name} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-6 py-10 border-b border-black/15">
                <h3 className="md:col-span-2 text-2xl md:text-3xl font-normal text-black">{offer.name}</h3>
                <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">{offer.detail}</p>
                <ul className="md:col-span-2 space-y-2 text-sm font-medium text-black">
                  {offer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#F70046] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] mt-10">
            <Link href="/contact" className="inline-flex rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#F70046]">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PROCESSUS ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-neutral-50 border-y border-gray-200">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-16">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Méthode</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Un processus clair, sans tunnel opaque.
              </h2>
            </div>
            <p className="md:col-span-3 text-lg leading-relaxed text-gray-600">
              Vous savez ce qui est travaillé, pourquoi, et comment chaque décision sert votre visibilité à Boulogne-Billancourt.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400 group-hover:border-[#F70046] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm mb-6">
                    {step.id}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RÉALISATIONS ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white" id="realisations">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Preuves</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Quelques projets pour évaluer le niveau avant de lancer le vôtre.
              </h2>
            </div>
            <div className="md:col-span-3 flex items-end">
              <Link href="/works" className="inline-flex rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors">
                Voir toutes les réalisations
              </Link>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <Link key={i} href={p.href} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative aspect-video overflow-hidden rounded-2xl"
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{p.title}</h3>
                      <p className="text-sm text-neutral-300">{p.cat}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F6F6F3]">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Avis clients</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Ce que nos clients disent de nous.
              </h2>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 flex flex-col gap-6 border border-black/5">
                <p className="text-lg leading-relaxed text-gray-700 flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="border-t border-gray-100 pt-5">
                  <p className="font-semibold text-black">{t.name}</p>
                  <p className="text-sm text-gray-400 mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POURQUOI LOCAL ────────────────────────────────────────── */}
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
              Plus qu'un prestataire, un partenaire de proximité : disponible, lisible dans sa méthode, attentif aux enjeux des entreprises de Boulogne-Billancourt.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] mt-14 divide-y divide-black/15 border-t border-black/15">
            {[
              ["Réactivité & proximité", "Un interlocuteur direct, des échanges simples, et la possibilité d'organiser rapidement un point de travail autour de Boulogne ou Paris Ouest."],
              ["Excellence technique", "Webflow, WordPress, Next.js : nous choisissons la technologie selon l'objectif, pas selon une habitude d'agence."],
              ["Relation humaine", "Pas de ticket anonyme ni de tunnel opaque. Vous savez ce qui est fait, pourquoi, et dans quel ordre."],
              ["Culture locale 92", "Nous comprenons les codes d'une clientèle exigeante entre Boulogne, Issy-les-Moulineaux, Saint-Cloud, Sèvres et Paris 16e."],
            ].map(([title, text]) => (
              <div key={title} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9">
                <h3 className="md:col-span-2 text-2xl font-normal text-black">{title}</h3>
                <p className="md:col-span-4 text-lg leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TISSU ÉCONOMIQUE ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-neutral-950 text-white">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-white/40">Territoire</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight">
                À deux pas d&apos;un tissu économique unique en France.
              </h2>
            </div>
            <p className="md:col-span-3 text-lg leading-relaxed text-white/60">
              Boulogne-Billancourt concentre des sièges de grands groupes et un tissu de PME et d&apos;indépendants ambitieux que nous accompagnons au quotidien.
            </p>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] border-t border-white/15">
            {ecosystem.map(([title, text]) => (
              <div key={title} className="grid grid-cols-1 md:grid-cols-7 gap-x-5 gap-y-4 py-9 border-b border-white/15">
                <h3 className="md:col-span-2 text-2xl font-normal text-white">{title}</h3>
                <p className="md:col-span-4 text-lg leading-relaxed text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ADRESSE & CARTE ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Adresse</span>
            </div>
            <div className="md:col-span-3 md:col-start-2">
              <h2 className="text-[36px] md:text-[48px] leading-[1.05] font-normal tracking-tight text-black">
                Notre studio au cœur de Boulogne-Billancourt.
              </h2>
            </div>
            <div className="md:col-span-3 md:col-start-6 space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                18 rue d&apos;Aguesseau<br />
                92100 Boulogne-Billancourt<br />
                <span className="text-sm text-gray-400">Métro Marcel Sembat (ligne 9) — 5 min à pied</span>
              </p>
              <p className="text-base">Réunions en présentiel sur rendez-vous, lundi–vendredi.</p>
              <a
                href="https://www.google.com/maps/place/Artichaud+Studio/@48.8374942,2.2428601,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-black hover:text-[#F70046] transition-colors"
              >
                Voir sur Google Maps →
              </a>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] overflow-hidden rounded-2xl h-[380px] md:h-[480px] border border-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=18+rue+d+Aguesseau+Boulogne-Billancourt+92100&output=embed&z=16"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Artichaud Studio — 18 rue d'Aguesseau, Boulogne-Billancourt"
            />
          </div>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#F6F6F3] border-t border-gray-100">
        <div className="px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 mb-14">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">FAQ</span>
            </div>
            <div className="md:col-span-4 md:col-start-2">
              <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight text-black">
                Questions fréquentes sur la création de site à Boulogne-Billancourt.
              </h2>
            </div>
          </div>

          <div className="md:ml-[calc(12.5%+0.625rem)] max-w-3xl">
            <AccordionItem
              question="Quel est le tarif d'un site internet vitrine à Boulogne-Billancourt ?"
              answer="Les tarifs démarrent à 3 000€ pour une solution simple (5-10 pages, responsive, formulaire, SEO de base) et vont de 5 000€ à 8 000€ pour un site sur-mesure avec stratégie SEO locale, animations et CMS. Devis gratuit sous 48h après un premier échange."
            />
            <AccordionItem
              question="Combien de temps faut-il pour créer mon site ?"
              answer="Un site vitrine classique prend 4 à 6 semaines. Un projet de refonte complet avec identité visuelle prend 6 à 8 semaines. La durée dépend aussi de votre réactivité pour fournir les contenus (textes, photos)."
            />
            <AccordionItem
              question="Mon site sera-t-il visible sur Google à Boulogne ?"
              answer="Oui, c'est notre priorité. Nous structurons techniquement chaque site pour le SEO (balises Hn, métadonnées, vitesse, données structurées). Pour maximiser la visibilité locale, nous vous conseillons également sur votre fiche Google Business Profile pour ressortir sur les recherches 'votre activité + Boulogne'."
            />
            <AccordionItem
              question="Dois-je payer un abonnement mensuel ?"
              answer="Non. Vous payez la création une seule fois. Les seuls frais récurrents sont l'hébergement et le nom de domaine (50-150€/an). Nous proposons des contrats de maintenance optionnels à partir de 150€/mois."
            />
            <AccordionItem
              question="Intervenez-vous ailleurs qu'à Boulogne ?"
              answer="Bien sûr. Nous accompagnons des clients dans tout le 92 (Issy-les-Moulineaux, Neuilly-sur-Seine, Saint-Cloud, Sèvres) et à Paris en Île-de-France. Le digital n'a pas de frontières, mais la proximité reste notre atout."
            />
            <AccordionItem
              question="Où sont situés vos bureaux ?"
              answer="Notre studio est au 18 rue d'Aguesseau à Boulogne-Billancourt (92100), à 5 minutes à pied du métro Marcel Sembat (ligne 9). Nous recevons sur rendez-vous, en semaine."
            />
            <AccordionItem
              question="Proposez-vous des réunions en présentiel ?"
              answer="Oui. Les réunions en présentiel sont possibles dans notre studio à Boulogne-Billancourt ou chez vous si vous êtes dans le 92 ou à Paris. Pour les clients en dehors d'Île-de-France, nous travaillons facilement en visioconférence."
            />
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
            Parlons de votre<br />
            <span className="text-gray-500">futur site.</span>
          </h2>
          <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
            Si vous voulez améliorer votre visibilité à Boulogne-Billancourt ou créer un site plus crédible avant vos prochains rendez-vous commerciaux, on peut cadrer les priorités ensemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span className="relative z-10">Demander un devis</span>
              <div className="absolute inset-0 bg-[#F70046] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </Link>
            <Link href="/tarifs" className="text-white font-medium hover:text-[#F70046] transition-colors relative group">
              Voir les tarifs
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F70046] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── LIENS INTERNES SEO ────────────────────────────────────── */}
      <div className="bg-black py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center text-xs text-neutral-600">
          <p className="mb-4 uppercase tracking-widest font-bold text-neutral-500">Services & Ressources</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/services/creation-site-internet" className="hover:text-white transition-colors">Création de site internet</Link>
            <Link href="/creation-site-internet-paris" className="hover:text-white transition-colors">Agence Web Paris</Link>
            <Link href="/boulogne-billancourt" className="hover:text-white transition-colors">Tissu éco Boulogne</Link>
            <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">Comparatif CMS</Link>
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
