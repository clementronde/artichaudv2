'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const processSteps = [
  {
    number: "01",
    title: "Audit & Stratégie",
    description: "Analyse de vos besoins, de votre cible et de la concurrence. Définition de la stratégie UX et de l'architecture de l'information.",
    deliverables: ["Brief détaillé", "Benchmark concurrentiel", "Arborescence du site", "User personas"]
  },
  {
    number: "02",
    title: "UX & Wireframing",
    description: "Conception de l'expérience utilisateur et création de wireframes pour valider la structure avant le design.",
    deliverables: ["Wireframes interactifs", "User flows", "Cartographie du contenu", "Prototype basse fidélité"]
  },
  {
    number: "03",
    title: "Webdesign",
    description: "Création d'une interface moderne, sur mesure et alignée avec votre identité de marque.",
    deliverables: ["Maquettes Figma", "Design System", "Déclinaisons responsive", "Micro-interactions"]
  },
  {
    number: "04",
    title: "Développement",
    description: "Développement sur mesure avec les technologies les plus performantes (Next.js, React, TypeScript).",
    deliverables: ["Site web codé", "SEO technique", "Optimisations performance", "Intégrations API"]
  },
  {
    number: "05",
    title: "Tests & Lancement",
    description: "Tests rigoureux sur tous les devices, optimisation finale et mise en ligne avec accompagnement.",
    deliverables: ["QA complète", "Formation client", "Documentation", "Support post-lancement"]
  }
]

const technologies = [
  { name: "Next.js", description: "Framework React pour des sites ultra-rapides" },
  { name: "React", description: "Bibliothèque JavaScript pour des interfaces modernes" },
  { name: "TypeScript", description: "Code robuste et maintenable" },
  { name: "Tailwind CSS", description: "Design system flexible et performant" },
  { name: "Framer Motion", description: "Animations fluides et engageantes" },
  { name: "Headless CMS", description: "Gestion de contenu flexible (Sanity, Contentful)" }
]

const benefits = [
  {
    title: "Design sur mesure",
    description: "Chaque projet est unique. Nous créons des interfaces qui reflètent parfaitement votre identité de marque et captivent votre audience."
  },
  {
    title: "Performance optimale",
    description: "Sites ultra-rapides, optimisés pour le SEO et pour tous les devices. Temps de chargement minimal garanti."
  },
  {
    title: "SEO technique intégré",
    description: "Architecture SEO-friendly dès la conception. Métadonnées optimisées, données structurées, Core Web Vitals maîtrisés."
  },
  {
    title: "Responsive design",
    description: "Expérience parfaite sur mobile, tablette et desktop. Mobile-first approach pour s'adapter aux usages actuels."
  },
  {
    title: "Animations & Interactions",
    description: "Micro-interactions soignées et animations fluides pour une expérience utilisateur mémorable."
  },
  {
    title: "Évolutif & Maintenable",
    description: "Code propre et documenté. Architecture évolutive qui grandit avec votre business."
  }
]

const faqItems = [
  {
    question: "Combien coûte la création d'un site internet ?",
    answer: "Le prix varie selon la complexité du projet. Un site vitrine démarre à partir de 3 500€, un site avec CMS à partir de 6 000€, et un site e-commerce à partir de 10 000€. Chaque projet étant unique, nous établissons un devis sur mesure après l'étude de vos besoins."
  },
  {
    question: "Quel est le délai pour créer un site web ?",
    answer: "Un site vitrine classique prend 4-6 semaines. Un site avec fonctionnalités avancées ou e-commerce nécessite 8-12 semaines. Le délai dépend de la complexité, du nombre de pages et de la disponibilité du contenu."
  },
  {
    question: "Mon site sera-t-il optimisé pour le référencement Google ?",
    answer: "Absolument ! Nous intégrons le SEO technique dès la conception : architecture optimisée, temps de chargement rapide, métadonnées, données structurées, responsive design, Core Web Vitals. Votre site est prêt à être bien référencé dès le lancement."
  },
  {
    question: "Puis-je gérer mon contenu moi-même après la livraison ?",
    answer: "Oui ! Nous intégrons des CMS headless (Sanity, Contentful) ou WordPress selon vos besoins. Nous vous formons à la gestion de contenu et fournissons une documentation complète. Vous restez autonome sur les mises à jour quotidiennes."
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer: "Nous développons avec Next.js/React pour des sites modernes et performants. TypeScript pour la robustesse, Tailwind CSS pour le design, Framer Motion pour les animations. Nous choisissons toujours les technologies les plus adaptées à votre projet."
  },
  {
    question: "Proposez-vous de la maintenance après le lancement ?",
    answer: "Oui, nous proposons des contrats de maintenance mensuels incluant : mises à jour de sécurité, monitoring, sauvegardes, support technique, évolutions mineures. Vous avez l'esprit tranquille et votre site reste performant."
  }
]

const projectTypes = [
  {
    title: "Site Vitrine",
    description: "Présentez votre activité avec élégance et professionnalisme.",
    features: ["Design sur mesure", "5-10 pages", "Formulaire de contact", "SEO optimisé", "Responsive design", "Animations"],
    ideal: "PME, artisans, professions libérales"
  },
  {
    title: "Site Corporate",
    description: "Valorisez votre entreprise et votre expertise métier.",
    features: ["Architecture complexe", "CMS intégré", "Espace presse", "Multilingue", "Blog", "Intégrations API"],
    ideal: "Grandes entreprises, groupes, scale-ups"
  },
  {
    title: "Site E-commerce",
    description: "Vendez en ligne avec une expérience d'achat optimale.",
    features: ["Catalogue produits", "Paiement sécurisé", "Gestion commandes", "Tunnel de conversion optimisé", "Intégrations (CRM, ERP)", "Analytics avancés"],
    ideal: "Marques, retailers, créateurs"
  },
  {
    title: "Application Web",
    description: "Développez des interfaces complexes et interactives.",
    features: ["Interface personnalisée", "Dashboard analytics", "Authentification", "Base de données", "API REST/GraphQL", "Architecture scalable"],
    ideal: "SaaS, startups, produits digitaux"
  }
]

export default function CreationSiteInternetClient() {
  const containerRef = useRef(null)
  const blackBoxRef = useRef(null)

  useGSAP(() => {
    if (!blackBoxRef.current || !containerRef.current) return;

    gsap.fromTo(blackBoxRef.current,
      { width: "85%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top 60%",
          scrub: 0.5,
        }
      }
    )

    gsap.to(blackBoxRef.current, {
      y: '10%',
      scale: 0.98,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      }
    })

  }, { scope: containerRef })

  return (
    <main className="w-full bg-white min-h-screen pt-40 pb-32 overflow-x-hidden">

      {/* 1. HERO SECTION */}
      <div className="container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
          <div className="hidden md:block col-span-1 pt-2">
            <Link href="/services" className="text-sm font-medium text-gray-400 hover:text-arti-black transition-colors">
              ← Services
            </Link>
          </div>
          <div className="col-span-1 md:col-span-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[64px] leading-[1.05] font-normal text-arti-black tracking-tight mb-8"
            >
              Création de site internet à Paris
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 font-light leading-relaxed"
            >
              Des sites web modernes, performants et pensés pour convertir. Design sur mesure, développement de pointe et SEO intégré.
            </motion.p>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-gray-500 font-light leading-relaxed"
            >
              Votre site web est votre premier vendeur. Il doit refléter votre identité, capter l'attention et convertir vos visiteurs en clients. Nous créons des sites qui font tout ça.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">Discutons de votre projet</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. BÉNÉFICES - GRID */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Pourquoi créer votre site web avec Artichaud Studio ?
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Nous combinons design d'exception, développement de pointe et stratégie digitale pour créer des sites qui marquent les esprits et génèrent des résultats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-black/10 rounded-2xl p-8 hover:border-black/30 transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-2xl font-medium text-arti-black mb-3">{benefit.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TYPES DE PROJETS */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Quel type de site web créer ?
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Chaque projet est unique. Nous adaptons notre approche à vos objectifs, votre cible et votre budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectTypes.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300"
            >
              <h3 className="text-3xl font-medium text-arti-black mb-3">{project.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed mb-6">{project.description}</p>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-arti-black mb-3 uppercase tracking-wide">Fonctionnalités</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10">
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-arti-black">Idéal pour : </span>
                  {project.ideal}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. PROCESSUS (SECTION NOIRE ANIMÉE) */}
      <section ref={containerRef} className="relative z-0 w-full mb-32 flex justify-center overflow-hidden">
        <div
            ref={blackBoxRef}
            className="bg-[#0a0a0a] text-white rounded-[40px] p-8 md:p-12 lg:p-20 mx-auto will-change-transform"
        >
            <h2 className="text-[40px] md:text-[60px] font-normal mb-8 tracking-tight">Notre processus de création</h2>
            <p className="text-lg text-white/60 font-light mb-20 max-w-2xl">
              Une méthodologie éprouvée en 5 étapes pour garantir le succès de votre projet web.
            </p>

            <div className="flex flex-col">
                {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-x-5 gap-y-6 py-12 md:py-16 border-t border-white/20 ${index === processSteps.length - 1 ? 'border-b border-white/20' : ''}`}
                    >
                        <div className="col-span-1 md:col-span-1">
                            <span className="text-4xl md:text-5xl font-light text-white/40">{step.number}</span>
                        </div>
                        <div className="col-span-1 md:col-span-4 mb-4 md:mb-0">
                            <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">{step.title}</h3>
                            <p className="text-base text-white/60 font-light leading-relaxed">{step.description}</p>
                        </div>
                        <div className="col-span-1 md:col-span-6 md:col-start-7">
                            <h4 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wide">Livrables</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {step.deliverables.map((deliverable, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                                        <span className="text-green-400 mt-0.5">✓</span>
                                        {deliverable}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Technologies modernes et performantes
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Nous travaillons avec les meilleurs outils pour garantir rapidité, sécurité et évolutivité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-2 p-6 border border-black/10 rounded-xl hover:border-black/30 transition-all"
            >
              <h3 className="text-xl font-medium text-arti-black">{tech.name}</h3>
              <p className="text-sm text-gray-600 font-light">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Tout ce que vous devez savoir sur la création d'un site internet avec Artichaud Studio.
          </p>
        </div>

        <div className="max-w-4xl">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-t border-black/10 py-8 last:border-b"
            >
              <h3 className="text-xl md:text-2xl font-medium text-arti-black mb-4">{item.question}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="bg-arti-black text-white rounded-[40px] p-12 md:p-20 text-center">
          <h2 className="text-[32px] md:text-[56px] font-normal mb-6 tracking-tight">
            Prêt à créer votre site web ?
          </h2>
          <p className="text-lg text-white/60 font-light mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et créons ensemble un site qui vous ressemble et qui performe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-arti-black rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
            >
              Démarrer un projet
              <span>→</span>
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </section>

      {/* 8. MAILLAGE INTERNE - AUTRES SERVICES */}
      <section className="container mx-auto px-6 md:px-12 mt-32">
        <div className="mb-12">
          <h2 className="text-[28px] md:text-[40px] font-normal text-arti-black tracking-tight">
            Nos autres services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/services/branding-identite-visuelle"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              Branding & Identité Visuelle
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
              Créez une identité de marque forte et mémorable qui vous distingue de la concurrence.
            </p>
            <span className="text-sm font-medium text-arti-black group-hover:translate-x-2 inline-block transition-transform">
              En savoir plus →
            </span>
          </Link>

          <Link
            href="/services/seo-referencement-naturel"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              SEO & Référencement Naturel
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
              Améliorez votre visibilité sur Google et générez du trafic qualifié vers votre site.
            </p>
            <span className="text-sm font-medium text-arti-black group-hover:translate-x-2 inline-block transition-transform">
              En savoir plus →
            </span>
          </Link>
        </div>
      </section>

    </main>
  )
}
