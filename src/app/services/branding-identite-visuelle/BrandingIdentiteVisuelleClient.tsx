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
    title: "Audit & Ateliers de marque",
    description: "Immersion dans votre univers pour comprendre votre ADN, vos valeurs, votre positionnement et votre audience cible.",
    deliverables: ["Questionnaire approfondi", "Atelier stratégique", "Analyse concurrentielle", "Territoire de marque"]
  },
  {
    number: "02",
    title: "Stratégie de marque",
    description: "Définition de votre positionnement, promesse de marque, personnalité et territoire d'expression.",
    deliverables: ["Plateforme de marque", "Positionnement", "Ton de voix", "Storytelling"]
  },
  {
    number: "03",
    title: "Identité verbale",
    description: "Création du nom de marque, baseline, slogan et messages clés pour raconter votre histoire.",
    deliverables: ["Naming (si besoin)", "Baseline & slogan", "Messages clés", "Manifeste de marque"]
  },
  {
    number: "04",
    title: "Identité visuelle",
    description: "Conception du logo, palette de couleurs, typographie et univers graphique complet.",
    deliverables: ["Logo & déclinaisons", "Palette de couleurs", "Typographie", "Éléments graphiques", "Design system"]
  },
  {
    number: "05",
    title: "Brand Guidelines",
    description: "Création de la charte graphique complète pour garantir la cohérence sur tous vos supports.",
    deliverables: ["Charte graphique PDF", "Fichiers sources", "Templates", "Guide d'utilisation"]
  }
]

const deliverables = [
  {
    title: "Logo & Variations",
    description: "Logo principal, déclinaisons (noir, blanc, monochrome), versions responsive et fichiers vectoriels.",
    icon: "🎨"
  },
  {
    title: "Charte Graphique",
    description: "Document complet présentant toutes les règles d'utilisation de votre identité visuelle.",
    icon: "📘"
  },
  {
    title: "Palette de Couleurs",
    description: "Couleurs primaires et secondaires avec codes (HEX, RGB, CMJN, Pantone).",
    icon: "🎨"
  },
  {
    title: "Typographie",
    description: "Sélection de polices de caractères et règles d'utilisation pour titres et textes.",
    icon: "✍️"
  },
  {
    title: "Éléments Graphiques",
    description: "Motifs, illustrations, icônes et photographies qui composent votre univers visuel.",
    icon: "✨"
  },
  {
    title: "Applications",
    description: "Exemples d'applications sur différents supports (carte de visite, papeterie, réseaux sociaux, etc.).",
    icon: "📱"
  }
]

const benefits = [
  {
    title: "Démarquez-vous",
    description: "Une identité visuelle unique et mémorable qui vous différencie de vos concurrents et marque les esprits."
  },
  {
    title: "Cohérence visuelle",
    description: "Une charte graphique complète pour garantir l'uniformité de votre communication sur tous les canaux."
  },
  {
    title: "Crédibilité renforcée",
    description: "Une identité professionnelle qui inspire confiance et valorise votre expertise auprès de votre audience."
  },
  {
    title: "Stratégie de marque solide",
    description: "Un positionnement clair, un territoire de marque défini et des messages percutants qui résonnent avec votre cible."
  },
  {
    title: "Évolutivité garantie",
    description: "Un système flexible et scalable qui grandit avec votre entreprise et s'adapte à tous vos besoins."
  },
  {
    title: "Valorisation de votre entreprise",
    description: "Une marque forte augmente la valeur perçue de votre offre et facilite la fidélisation client."
  }
]

const brandingTypes = [
  {
    title: "Brand Identity (Création)",
    description: "Création complète d'identité de marque from scratch pour nouvelles entreprises ou rebranding total.",
    includes: ["Stratégie de marque", "Naming (optionnel)", "Logo & identité visuelle", "Charte graphique", "Brand guidelines"],
    ideal: "Startups, nouveaux projets, refonte totale"
  },
  {
    title: "Logo & Identité Visuelle",
    description: "Focus sur la création du logo et des éléments visuels essentiels.",
    includes: ["Recherches créatives", "Logo & déclinaisons", "Palette & typo", "Mini charte graphique", "Fichiers sources"],
    ideal: "PME, artisans, freelances"
  },
  {
    title: "Refonte d'Identité",
    description: "Modernisation et évolution de votre identité existante tout en préservant l'héritage de marque.",
    includes: ["Audit de l'existant", "Repositionnement", "Évolution du logo", "Nouvelle charte graphique", "Plan de transition"],
    ideal: "Entreprises établies en transformation"
  },
  {
    title: "Design System",
    description: "Système de design complet et scalable pour grandes structures avec besoins multiples.",
    includes: ["Composants UI", "Librairie graphique", "Guidelines détaillées", "Déclinaisons multiples", "Formation équipe"],
    ideal: "Scale-ups, grands groupes, organisations complexes"
  }
]

const faqItems = [
  {
    question: "Combien coûte la création d'une identité visuelle ?",
    answer: "Le prix varie selon l'ampleur du projet. Un logo seul démarre à 1 500€, une identité visuelle complète (logo + charte) à partir de 3 500€, et un projet de branding complet (stratégie + identité) à partir de 6 000€. Nous établissons un devis personnalisé après étude de vos besoins."
  },
  {
    question: "Combien de temps prend la création d'une identité de marque ?",
    answer: "Un logo seul nécessite 2-3 semaines. Une identité visuelle complète prend 4-6 semaines. Un projet de branding complet (stratégie + identité) demande 6-10 semaines. Le délai dépend de la complexité du projet et de vos délais de validation."
  },
  {
    question: "Qu'est-ce qui est inclus dans la charte graphique ?",
    answer: "La charte graphique comprend : le logo et ses variations, la palette de couleurs (codes HEX, RGB, CMJN, Pantone), la typographie, les règles d'utilisation, les éléments graphiques (motifs, icônes), des exemples d'applications sur différents supports, et tous les fichiers sources."
  },
  {
    question: "Combien de propositions de logo recevrai-je ?",
    answer: "Nous présentons généralement 3 pistes créatives différentes lors de la première phase. Après votre feedback, nous affinons la direction choisie avec 2-3 variations. Notre approche privilégie la qualité et la pertinence stratégique plutôt que la quantité de propositions."
  },
  {
    question: "Puis-je utiliser mon logo sur tous les supports ?",
    answer: "Absolument ! Nous vous fournissons tous les fichiers nécessaires : formats vectoriels (AI, EPS, SVG) pour l'impression et le print, formats web (PNG, JPG) optimisés, et versions adaptées pour les réseaux sociaux. Vous aurez tout pour déployer votre identité partout."
  },
  {
    question: "Proposez-vous un accompagnement après la livraison ?",
    answer: "Oui ! Nous incluons une période de révisions et ajustements mineurs post-livraison. Nous pouvons également vous accompagner dans le déploiement de votre identité (création de supports, templates, déclinaisons) et proposons des contrats d'accompagnement design au long cours."
  },
  {
    question: "Faites-vous aussi le naming (création de nom) ?",
    answer: "Oui, nous proposons des ateliers de naming pour trouver le nom parfait pour votre marque. Cela inclut : recherches créatives, propositions de noms, vérifications juridiques (disponibilité), tests de sonorité et mémorabilité. Le naming peut être intégré à votre projet de branding."
  },
  {
    question: "Peut-on moderniser un logo existant sans tout refaire ?",
    answer: "Absolument ! Nous réalisons régulièrement des évolutions de logos existants : modernisation graphique, simplification, adaptation aux usages digitaux, tout en préservant la reconnaissance de votre marque. C'est souvent plus pertinent qu'une refonte totale pour les marques établies."
  }
]

const whenNeedBranding = [
  {
    title: "Lancement d'entreprise",
    description: "Vous créez votre entreprise et avez besoin d'une identité forte dès le départ pour vous démarquer."
  },
  {
    title: "Refonte / Repositionnement",
    description: "Votre identité actuelle ne reflète plus qui vous êtes, vos valeurs ou votre positionnement."
  },
  {
    title: "Croissance & Scale-up",
    description: "Votre entreprise grandit et votre identité bricolée au départ ne suit plus le niveau d'ambition."
  },
  {
    title: "Différenciation concurrentielle",
    description: "Vous êtes noyé dans la masse et avez besoin de vous démarquer clairement de vos concurrents."
  },
  {
    title: "Levée de fonds",
    description: "Vous préparez une levée de fonds et avez besoin d'une identité professionnelle et crédible."
  },
  {
    title: "Incohérence visuelle",
    description: "Votre communication manque de cohérence entre les différents supports et canaux."
  }
]

export default function BrandingIdentiteVisuelleClient() {
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
              Branding & Identité Visuelle à Paris
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 font-light leading-relaxed"
            >
              Créez une identité de marque forte, cohérente et mémorable. Logo, charte graphique, stratégie de marque.
            </motion.p>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-gray-500 font-light leading-relaxed"
            >
              Votre identité de marque est bien plus qu'un logo. C'est l'essence de qui vous êtes, ce que vous défendez, et comment vous vous démarquez. Nous créons des identités qui racontent votre histoire.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">Parlons de votre marque</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. QUAND AVEZ-VOUS BESOIN DE BRANDING ? */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Quand avez-vous besoin d'une identité de marque ?
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Plusieurs moments clés justifient la création ou la refonte de votre identité visuelle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whenNeedBranding.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-3 p-6"
            >
              <h3 className="text-xl font-medium text-arti-black">{item.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. BÉNÉFICES - GRID */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Les avantages d'une identité de marque forte
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Une identité visuelle bien pensée n'est pas qu'esthétique : c'est un investissement stratégique qui génère des résultats mesurables.
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

      {/* 4. TYPES DE PROJETS BRANDING */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Nos offres branding
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Chaque projet est unique. Nous adaptons notre approche à votre stade de développement et vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brandingTypes.map((project, index) => (
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
                <h4 className="text-sm font-medium text-arti-black mb-3 uppercase tracking-wide">Inclus</h4>
                <ul className="space-y-2">
                  {project.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {item}
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

      {/* 5. PROCESSUS (SECTION NOIRE ANIMÉE) */}
      <section ref={containerRef} className="relative z-0 w-full mb-32 flex justify-center overflow-hidden">
        <div
            ref={blackBoxRef}
            className="bg-[#0a0a0a] text-white rounded-[40px] p-8 md:p-12 lg:p-20 mx-auto will-change-transform"
        >
            <h2 className="text-[40px] md:text-[60px] font-normal mb-8 tracking-tight">Notre processus de branding</h2>
            <p className="text-lg text-white/60 font-light mb-20 max-w-2xl">
              Une approche en 5 étapes pour créer une identité de marque authentique, cohérente et impactante.
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

      {/* 6. CE QUE VOUS RECEVEZ */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Ce que vous recevez
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Package complet pour déployer votre identité sur tous vos supports de communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-3 p-6 border border-black/10 rounded-xl hover:border-black/30 transition-all"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="text-xl font-medium text-arti-black">{item.title}</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Tout ce que vous devez savoir sur la création d'identité de marque avec Artichaud Studio.
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

      {/* 8. CTA FINAL */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="bg-arti-black text-white rounded-[40px] p-12 md:p-20 text-center">
          <h2 className="text-[32px] md:text-[56px] font-normal mb-6 tracking-tight">
            Prêt à créer votre identité de marque ?
          </h2>
          <p className="text-lg text-white/60 font-light mb-8 max-w-2xl mx-auto">
            Racontons ensemble l'histoire de votre marque et créons une identité qui vous ressemble.
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

      {/* 9. MAILLAGE INTERNE - AUTRES SERVICES */}
      <section className="container mx-auto px-6 md:px-12 mt-32">
        <div className="mb-12">
          <h2 className="text-[28px] md:text-[40px] font-normal text-arti-black tracking-tight">
            Nos autres services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/services/creation-site-internet"
            className="group border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:bg-gray-50 transition-all duration-300"
          >
            <h3 className="text-2xl font-medium text-arti-black mb-3 group-hover:text-amber-600 transition-colors">
              Création de Site Internet
            </h3>
            <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
              Développez un site web moderne, performant et optimisé pour convertir vos visiteurs.
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
