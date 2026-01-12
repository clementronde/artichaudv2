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
    title: "Audit SEO complet",
    description: "Analyse approfondie de votre site : crawl technique, analyse sémantique, étude de la concurrence et des opportunités de mots-clés.",
    deliverables: ["Rapport d'audit détaillé", "Analyse concurrentielle", "Étude de mots-clés", "Opportunités SEO", "Priorisation des actions"]
  },
  {
    number: "02",
    title: "Stratégie SEO",
    description: "Définition de la stratégie SEO alignée avec vos objectifs business : ciblage sémantique, arborescence optimisée, plan de contenu.",
    deliverables: ["Stratégie SEO documentée", "Planning éditorial", "Architecture SEO", "KPIs et objectifs"]
  },
  {
    number: "03",
    title: "Optimisations techniques",
    description: "Mise en place des optimisations techniques : structure HTML, Core Web Vitals, données structurées, sitemap, robots.txt.",
    deliverables: ["Optimisations on-page", "Amélioration vitesse", "Schema.org", "Indexation optimisée", "Mobile-first"]
  },
  {
    number: "04",
    title: "Contenu & Sémantique",
    description: "Création et optimisation de contenu SEO : pages services, articles de blog, cocon sémantique, maillage interne.",
    deliverables: ["Pages optimisées", "Articles SEO", "Maillage interne", "Contenu evergreen", "Guidelines rédaction"]
  },
  {
    number: "05",
    title: "Netlinking & Autorité",
    description: "Stratégie d'acquisition de backlinks de qualité pour renforcer l'autorité de votre domaine et améliorer votre positionnement.",
    deliverables: ["Stratégie netlinking", "Acquisition de liens", "Guest blogging", "Relations presse digitale", "Suivi autorité domaine"]
  },
  {
    number: "06",
    title: "Suivi & Optimisation continue",
    description: "Monitoring des positions, analyse des performances, ajustements continus et reporting mensuel pour garantir la croissance.",
    deliverables: ["Dashboard analytics", "Reporting mensuel", "Suivi positions", "Recommandations", "Support continu"]
  }
]

const seoPillars = [
  {
    title: "SEO Technique",
    description: "Optimisation de la structure, vitesse, indexation et Core Web Vitals pour un site performant et apprécié par Google.",
    includes: ["Audit technique", "Optimisation vitesse", "Structured data", "Architecture URL", "Sitemap XML", "Robots.txt"]
  },
  {
    title: "SEO On-Page",
    description: "Optimisation du contenu et des éléments de chaque page pour maximiser la pertinence et le positionnement sur les mots-clés ciblés.",
    includes: ["Balises title & meta", "Structure Hn", "Contenu optimisé", "Images & alt", "Maillage interne", "Cocon sémantique"]
  },
  {
    title: "Stratégie de Contenu",
    description: "Création de contenu de qualité, optimisé SEO, qui répond aux intentions de recherche et génère du trafic qualifié.",
    includes: ["Recherche mots-clés", "Planning éditorial", "Rédaction SEO", "Contenu long-forme", "Blog SEO", "FAQ optimisées"]
  },
  {
    title: "Netlinking / Off-Page",
    description: "Acquisition de backlinks de qualité pour renforcer l'autorité du domaine et améliorer le classement sur les requêtes compétitives.",
    includes: ["Stratégie netlinking", "Guest posting", "Relations presse", "Link building", "Désaveu liens toxiques", "Suivi autorité"]
  }
]

const seoServices = [
  {
    title: "Audit SEO",
    description: "Analyse complète de votre présence SEO actuelle pour identifier les opportunités et les blocages.",
    price: "À partir de 1 200€",
    duration: "1-2 semaines",
    ideal: "Diagnostic complet avant d'investir"
  },
  {
    title: "SEO Technique",
    description: "Optimisation technique du site pour garantir une indexation optimale et des performances maximales.",
    price: "À partir de 2 500€",
    duration: "3-4 semaines",
    ideal: "Sites avec problèmes techniques"
  },
  {
    title: "Stratégie SEO Globale",
    description: "Accompagnement SEO complet : audit, stratégie, optimisations, contenu et netlinking.",
    price: "À partir de 1 500€/mois",
    duration: "6-12 mois minimum",
    ideal: "Croissance SEO long terme"
  },
  {
    title: "SEO Local",
    description: "Optimisation pour le référencement local : Google Business Profile, citations locales, avis clients.",
    price: "À partir de 800€",
    duration: "2-3 semaines",
    ideal: "Commerces et services locaux"
  }
]

const benefits = [
  {
    title: "Trafic qualifié durable",
    description: "Le SEO génère du trafic organique sur le long terme, contrairement aux publicités payantes qui s'arrêtent dès que vous coupez le budget."
  },
  {
    title: "ROI élevé",
    description: "Le référencement naturel offre l'un des meilleurs ROI en marketing digital. Investissement initial qui génère des résultats durables."
  },
  {
    title: "Crédibilité & Confiance",
    description: "Apparaître en première page de Google renforce votre crédibilité et la confiance des utilisateurs envers votre marque."
  },
  {
    title: "Visibilité 24/7",
    description: "Votre site travaille pour vous en continu, générant des leads et conversions même pendant que vous dormez."
  },
  {
    title: "Avantage concurrentiel",
    description: "Être mieux positionné que vos concurrents sur Google vous donne un avantage décisif pour capter votre marché."
  },
  {
    title: "Meilleure expérience utilisateur",
    description: "Les optimisations SEO (vitesse, mobile, structure) améliorent l'expérience utilisateur et augmentent les conversions."
  }
]

const faqItems = [
  {
    question: "Combien coûte une prestation SEO ?",
    answer: "Le prix varie selon l'ampleur du projet. Un audit SEO démarre à 1 200€, du SEO technique à 2 500€, et un accompagnement SEO mensuel à partir de 1 500€/mois. Le budget dépend de la concurrence sur votre secteur, la taille de votre site et vos objectifs."
  },
  {
    question: "Combien de temps avant de voir des résultats SEO ?",
    answer: "Le SEO est un investissement à moyen/long terme. Les premiers résultats apparaissent généralement entre 3 et 6 mois. Pour des résultats significatifs et durables, comptez 6-12 mois. La patience et la constance sont clés en référencement naturel."
  },
  {
    question: "Quelle est la différence entre SEO et SEA (Google Ads) ?",
    answer: "Le SEO (référencement naturel) génère du trafic organique gratuit mais demande du temps. Le SEA (Google Ads) génère du trafic payant immédiat mais s'arrête quand vous coupez le budget. Le SEO offre un meilleur ROI long terme, le SEA des résultats immédiats. L'idéal est souvent de combiner les deux."
  },
  {
    question: "Puis-je faire mon SEO moi-même ?",
    answer: "Oui, le SEO peut être appris et pratiqué en interne. Cependant, c'est un métier technique qui demande expertise, veille constante et beaucoup de temps. Faire appel à une agence vous fait gagner du temps, éviter les erreurs coûteuses et accélérer les résultats."
  },
  {
    question: "Comment mesurez-vous les résultats SEO ?",
    answer: "Nous suivons plusieurs KPIs : positions sur mots-clés ciblés, trafic organique, taux de conversion, autorité de domaine, backlinks, visibilité globale. Nous fournissons des rapports mensuels détaillés avec Google Analytics, Search Console et nos outils SEO (Ahrefs, Semrush)."
  },
  {
    question: "Garantissez-vous la première position sur Google ?",
    answer: "Non, et méfiez-vous des agences qui le promettent. Les algorithmes de Google sont complexes et personne ne peut garantir une position exacte. En revanche, nous garantissons des optimisations conformes aux best practices, un travail rigoureux et transparent, et une amélioration progressive de vos positions."
  },
  {
    question: "Faut-il refaire mon site pour améliorer mon SEO ?",
    answer: "Pas nécessairement. Dans la majorité des cas, des optimisations techniques, de contenu et de netlinking suffisent. Une refonte n'est nécessaire que si votre site a des problèmes structurels majeurs (architecture, vitesse critique, non-responsive). L'audit SEO détermine les besoins."
  },
  {
    question: "Le SEO fonctionne-t-il pour toutes les activités ?",
    answer: "Oui ! Quelle que soit votre activité, vos clients potentiels cherchent des solutions sur Google. Le SEO s'adapte à tous les secteurs : B2B, B2C, e-commerce, services, local. La stratégie et les tactiques sont adaptées à votre marché et vos objectifs business."
  }
]

const seoFactors = [
  {
    category: "Performance Technique",
    factors: ["Temps de chargement < 3s", "Core Web Vitals optimaux", "Mobile-first", "HTTPS sécurisé", "Indexation optimale", "Structure URL propre"]
  },
  {
    category: "Contenu de Qualité",
    factors: ["Contenu unique et expert", "Réponse aux intentions", "Mots-clés stratégiques", "Fraîcheur du contenu", "Profondeur des articles", "Multimedia (images, vidéos)"]
  },
  {
    category: "Architecture & Navigation",
    factors: ["Arborescence claire", "Maillage interne", "Breadcrumbs", "Sitemap XML", "Pagination optimisée", "Cocons sémantiques"]
  },
  {
    category: "Autorité & Popularité",
    factors: ["Backlinks de qualité", "Domain Authority élevé", "Mentions de marque", "Signaux sociaux", "Trust flow", "Diversité des liens"]
  }
]

export default function SeoReferencementNaturelClient() {
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
              SEO & Référencement Naturel à Paris
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-xl text-gray-600 font-light leading-relaxed"
            >
              Boostez votre visibilité sur Google et générez du trafic qualifié. Audit SEO, stratégie de contenu, optimisations techniques et netlinking.
            </motion.p>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base text-gray-500 font-light leading-relaxed"
            >
              75% des utilisateurs ne dépassent jamais la première page de Google. Si vous n'êtes pas visible, vous n'existez pas. Nous vous aidons à dominer votre marché sur les moteurs de recherche.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">Boostez votre SEO</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. BÉNÉFICES DU SEO */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Pourquoi investir dans le SEO ?
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Le référencement naturel est l'un des leviers marketing les plus rentables et durables pour développer votre activité en ligne.
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

      {/* 3. LES 4 PILIERS DU SEO */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Les 4 piliers du SEO
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Une stratégie SEO efficace repose sur 4 domaines d'expertise complémentaires que nous maîtrisons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seoPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-all duration-300"
            >
              <h3 className="text-3xl font-medium text-arti-black mb-3">{pillar.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed mb-6">{pillar.description}</p>

              <div>
                <h4 className="text-sm font-medium text-arti-black mb-3 uppercase tracking-wide">Inclus</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pillar.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. NOS OFFRES SEO */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Nos offres SEO
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Des prestations adaptées à votre maturité SEO et vos objectifs de croissance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seoServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-black/10 rounded-2xl p-8 hover:border-black/30 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-3xl font-medium text-arti-black mb-3">{service.title}</h3>
              <p className="text-base text-gray-600 font-light leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between py-3 border-t border-black/10">
                  <span className="text-sm text-gray-500">Prix</span>
                  <span className="text-base font-medium text-arti-black">{service.price}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-black/10">
                  <span className="text-sm text-gray-500">Durée</span>
                  <span className="text-base font-medium text-arti-black">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-b border-black/10">
                  <span className="text-sm text-gray-500">Idéal pour</span>
                  <span className="text-base font-medium text-arti-black text-right">{service.ideal}</span>
                </div>
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
            <h2 className="text-[40px] md:text-[60px] font-normal mb-8 tracking-tight">Notre méthodologie SEO</h2>
            <p className="text-lg text-white/60 font-light mb-20 max-w-2xl">
              Une approche structurée en 6 étapes pour construire votre domination SEO sur le long terme.
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

      {/* 6. FACTEURS DE CLASSEMENT GOOGLE */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Les facteurs clés de classement Google
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Google utilise plus de 200 critères pour classer les sites. Nous optimisons les plus impactants pour votre secteur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seoFactors.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-4 p-8 border border-black/10 rounded-xl"
            >
              <h3 className="text-2xl font-medium text-arti-black">{category.category}</h3>
              <ul className="space-y-2">
                {category.factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="mb-16">
          <h2 className="text-[32px] md:text-[48px] font-normal text-arti-black tracking-tight mb-4">
            Questions fréquentes sur le SEO
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-3xl">
            Tout ce que vous devez savoir sur le référencement naturel et nos prestations SEO.
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
            Prêt à dominer Google ?
          </h2>
          <p className="text-lg text-white/60 font-light mb-8 max-w-2xl mx-auto">
            Commençons par un audit SEO gratuit pour identifier vos opportunités de croissance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-arti-black rounded-full hover:bg-gray-100 transition-all duration-300 font-medium"
            >
              Demander un audit SEO
              <span>→</span>
            </Link>
            <Link
              href="/works"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-medium"
            >
              Voir nos résultats
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
        </div>
      </section>

    </main>
  )
}
