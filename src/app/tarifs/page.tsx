'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import type { Metadata } from 'next'

// Métadonnées SEO (doivent être dans un fichier séparé en Server Component)
// Voir tarifs/metadata.ts

const pricingPlans = [
  {
    id: 'vitrine',
    name: 'Site Vitrine',
    tagline: 'Pour présenter votre activité',
    price: '3 000 - 8 000 €',
    priceDetail: 'à partir de 3 000€',
    description: 'Un site élégant pour valoriser votre entreprise et convertir vos visiteurs en clients.',
    features: [
      '5 à 10 pages',
      'Design sur-mesure',
      'Responsive (mobile & tablet)',
      'SEO de base optimisé',
      'Formulaire de contact',
      'Intégration Google Analytics',
      'Formation à la gestion',
      '1 mois de support gratuit'
    ],
    highlight: false,
    cta: 'Demander un devis',
    timeline: '4-6 semaines'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    tagline: 'Pour vendre en ligne',
    price: '8 000 - 20 000 €',
    priceDetail: 'à partir de 8 000€',
    description: 'Une boutique en ligne performante pour développer vos ventes et fidéliser vos clients.',
    features: [
      'Boutique complète',
      'Paiement sécurisé (Stripe, PayPal)',
      'Gestion produits & stock',
      'Panier & tunnel de vente optimisé',
      'Espace client',
      'SEO avancé',
      'Analytics e-commerce',
      'Formation & documentation',
      '2 mois de support gratuit'
    ],
    highlight: true,
    cta: 'Demander un devis',
    timeline: '8-12 semaines'
  },
  {
    id: 'custom',
    name: 'Sur-mesure',
    tagline: 'Pour vos besoins spécifiques',
    price: '15 000 - 50 000 €',
    priceDetail: 'à partir de 15 000€',
    description: 'Un développement custom pour des fonctionnalités avancées et une expérience unique.',
    features: [
      'Architecture sur-mesure',
      'Fonctionnalités complexes',
      'API & intégrations tierces',
      'Dashboard admin avancé',
      'Performance maximale',
      'Scalabilité garantie',
      'SEO technique expert',
      'Support prioritaire 6 mois'
    ],
    highlight: false,
    cta: 'Discutons de votre projet',
    timeline: '3-6 mois'
  }
]

const addons = [
  { name: 'Branding complet', price: '3 000 - 8 000 €', description: 'Logo, charte graphique, direction artistique' },
  { name: 'SEO avancé (3 mois)', price: '2 400 €', description: 'Stratégie de contenu, netlinking, suivi mensuel' },
  { name: 'Shooting photo produit', price: '800 - 2 000 €', description: '20-50 produits, retouche professionnelle' },
  { name: 'Maintenance mensuelle', price: '150 - 500 €/mois', description: 'Mises à jour, sauvegardes, support technique' },
  { name: 'Rédaction de contenu', price: '80 €/page', description: 'Rédaction SEO optimisée par un copywriter' },
  { name: 'Formation personnalisée', price: '500 €/jour', description: 'Formation équipe sur-mesure (WordPress, Webflow, etc.)' }
]

const faqsPricing = [
  {
    question: 'Pourquoi une telle fourchette de prix ?',
    answer: 'Le prix dépend de la complexité du projet : nombre de pages, fonctionnalités spécifiques, design custom, intégrations tierces. Un site vitrine de 5 pages sera à 3000€, tandis qu\'un site de 20 pages avec animations avancées sera à 8000€.'
  },
  {
    question: 'Le prix inclut-il l\'hébergement ?',
    answer: 'Non, l\'hébergement est facturé séparément (40-100€/an selon vos besoins). Nous vous conseillons les meilleurs hébergeurs et pouvons gérer la configuration pour vous.'
  },
  {
    question: 'Proposez-vous un paiement échelonné ?',
    answer: 'Oui ! Nous fonctionnons par jalons : 30% à la signature, 40% à la validation des maquettes, 30% à la livraison. Pour les projets >15000€, un échelonnement sur 3-4 mois est possible.'
  },
  {
    question: 'Y a-t-il des frais cachés ?',
    answer: 'Aucun frais caché. Le devis détaille tous les coûts : conception, développement, intégrations. Seuls l\'hébergement, le nom de domaine et les éventuelles licences tierces sont en sus.'
  },
  {
    question: 'Puis-je avoir un devis gratuit ?',
    answer: 'Absolument ! Nous proposons un premier échange gratuit de 30 minutes pour comprendre votre projet, puis nous vous envoyons un devis détaillé sous 48h.'
  }
]

export default function TarifsPage() {
  const containerRef = useRef<HTMLElement>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  // Animation d'entrée GSAP
  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from('.tarifs-header-line', {
      y: 120,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1
    })
    .from('.tarifs-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15
    }, '-=0.5')

  }, { scope: containerRef })

  return (
    <main ref={containerRef} className="w-full bg-white min-h-screen pt-32 md:pt-40 pb-24">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <div className="overflow-hidden mb-6">
            <h1 className="tarifs-header-line text-5xl md:text-6xl lg:text-7xl font-normal text-arti-black leading-tight">
              Tarifs & Prix
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="tarifs-header-line text-xl text-arti-gray font-light max-w-2xl mx-auto leading-relaxed">
              Des tarifs transparents pour des projets réussis. Choisissez le forfait qui correspond à vos besoins ou créons ensemble une solution sur-mesure.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`tarifs-card relative rounded-2xl border transition-all duration-500 ${
                plan.highlight
                  ? 'border-arti-black bg-arti-black text-white shadow-2xl md:scale-105'
                  : 'border-black/10 bg-white hover:border-black/30'
              }`}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-arti-black text-sm font-medium rounded-full">
                  Le plus populaire
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <h2 className={`text-3xl font-medium mb-2 ${plan.highlight ? 'text-white' : 'text-arti-black'}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-arti-gray'}`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className={`text-4xl font-normal mb-2 ${plan.highlight ? 'text-white' : 'text-arti-black'}`}>
                    {plan.priceDetail}
                  </div>
                  <div className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-arti-gray'}`}>
                    Projet complet : {plan.price}
                  </div>
                </div>

                {/* Description */}
                <p className={`mb-8 leading-relaxed ${plan.highlight ? 'text-white/80' : 'text-arti-gray'}`}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-white' : 'text-arti-black'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-arti-gray'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Timeline */}
                <div className={`text-sm mb-8 ${plan.highlight ? 'text-white/70' : 'text-arti-gray'}`}>
                  ⏱️ Délai : {plan.timeline}
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`block w-full text-center px-6 py-4 rounded-full font-medium transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-white text-arti-black hover:bg-gray-100'
                      : 'bg-arti-black text-white hover:bg-arti-dark'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-normal mb-10 text-center">Comparatif détaillé</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-arti-black">
                  <th className="text-left py-4 px-4 font-medium">Fonctionnalité</th>
                  <th className="text-center py-4 px-4 font-medium">Vitrine</th>
                  <th className="text-center py-4 px-4 font-medium bg-arti-black/5">E-commerce</th>
                  <th className="text-center py-4 px-4 font-medium">Sur-mesure</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">Nombre de pages</td>
                  <td className="text-center py-4 px-4">5-10</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">10-30</td>
                  <td className="text-center py-4 px-4">Illimité</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">Design sur-mesure</td>
                  <td className="text-center py-4 px-4">✓</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">Animations avancées</td>
                  <td className="text-center py-4 px-4">Simple</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">✓</td>
                  <td className="text-center py-4 px-4">✓✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">E-commerce</td>
                  <td className="text-center py-4 px-4">✗</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">✓</td>
                  <td className="text-center py-4 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">API & Intégrations</td>
                  <td className="text-center py-4 px-4">Basique</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">✓</td>
                  <td className="text-center py-4 px-4">✓✓</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">SEO</td>
                  <td className="text-center py-4 px-4">Basique</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">Avancé</td>
                  <td className="text-center py-4 px-4">Expert</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4">Support gratuit</td>
                  <td className="text-center py-4 px-4">1 mois</td>
                  <td className="text-center py-4 px-4 bg-arti-black/5">2 mois</td>
                  <td className="text-center py-4 px-4">6 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add-ons */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-normal mb-4 text-center">Options additionnelles</h2>
          <p className="text-center text-arti-gray mb-10">Complétez votre projet avec nos services complémentaires</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="p-6 border border-black/10 rounded-2xl hover:border-black/30 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium text-arti-black">{addon.name}</h3>
                  <span className="text-arti-black font-medium whitespace-nowrap ml-4">{addon.price}</span>
                </div>
                <p className="text-arti-gray text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Pricing */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-normal mb-10 text-center">Questions fréquentes sur les prix</h2>

          <div className="space-y-6">
            {faqsPricing.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-3 text-arti-black">
                  {faq.question}
                </h3>
                <p className="text-arti-gray leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-arti-black rounded-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Discutons de vos besoins et recevez un devis personnalisé sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-arti-black rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Demander un devis gratuit
              </Link>
              <a
                href="tel:0697538017"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-arti-black transition-all"
              >
                Appeler maintenant
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
