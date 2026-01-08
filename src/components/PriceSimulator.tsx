'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// --- CONFIGURATION DES PRIX ---
const BASE_RATES = {
  vitrine: 2000,
  ecommerce: 5000,
  custom: 8000
}

const PAGE_PRICE = {
  vitrine: 150,
  ecommerce: 250,
  custom: 400
}

const FEATURES = [
  { id: 'design', label: 'Design Premium & Branding', price: 1500, type: 'all' },
  { id: 'seo', label: 'SEO Avancé (Setup)', price: 800, type: 'all' },
  { id: 'cms', label: 'Formation CMS (Admin)', price: 400, type: 'vitrine' },
  { id: 'payment', label: 'Passerelle Paiement Complexe', price: 1000, type: 'ecommerce' },
  { id: 'migration', label: 'Migration de produits', price: 1200, type: 'ecommerce' },
  { id: 'api', label: 'Connexion API Externe', price: 2500, type: 'custom' },
  { id: 'multi', label: 'Multilingue', price: 1000, type: 'all' },
]

export default function PriceSimulator() {
  // État du simulateur
  const [projectType, setProjectType] = useState<'vitrine' | 'ecommerce' | 'custom'>('vitrine')
  const [pages, setPages] = useState(5)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  
  // Reset des features quand on change de type de projet (optionnel, mais plus propre)
  useEffect(() => {
    setSelectedFeatures([])
    setPages(projectType === 'vitrine' ? 5 : projectType === 'ecommerce' ? 10 : 1)
  }, [projectType])

  // --- CALCUL DU PRIX ---
  const totalPrice = useMemo(() => {
    let total = BASE_RATES[projectType]
    
    // Coût des pages (les 5 premières sont souvent incluses dans le forfait de base, ajustons ici)
    const extraPages = Math.max(0, pages - (projectType === 'custom' ? 0 : 5))
    total += extraPages * PAGE_PRICE[projectType]

    // Coût des options
    selectedFeatures.forEach(featId => {
      const feature = FEATURES.find(f => f.id === featId)
      if (feature) total += feature.price
    })

    return total
  }, [projectType, pages, selectedFeatures])

  // --- HANDLERS ---
  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  // Filtrer les features pertinentes pour le type choisi
  const currentFeatures = FEATURES.filter(f => f.type === 'all' || f.type === projectType)

  return (
    <section className="w-full py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-normal text-arti-black mb-6">Estimez votre projet</h2>
          <p className="text-arti-gray max-w-2xl mx-auto">
            Utilisez notre simulateur pour obtenir une fourchette de prix indicative. 
            Le montant final sera affiné lors de notre premier échange.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* GAUCHE : LE FORMULAIRE */}
          <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            
            {/* 1. Type de projet */}
            <div>
              <h3 className="text-lg font-medium text-arti-black mb-4">1. Quel type de site ?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'vitrine', label: 'Site Vitrine', icon: '✨' },
                  { id: 'ecommerce', label: 'E-commerce', icon: '🛍️' },
                  { id: 'custom', label: 'Sur-mesure', icon: '🚀' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      projectType === type.id
                        ? 'border-arti-black bg-arti-black text-white'
                        : 'border-gray-100 hover:border-gray-300 text-arti-black'
                    }`}
                  >
                    <span className="block text-2xl mb-2">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Complexité (Pages) */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-arti-black">
                  2. Envergure ({pages} {projectType === 'custom' ? 'fonctionnalités clés' : 'pages'})
                </h3>
              </div>
              <input
                type="range"
                min={projectType === 'custom' ? 1 : 1}
                max={projectType === 'custom' ? 10 : 50}
                step={1}
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-arti-black"
              />
              <div className="flex justify-between text-xs text-arti-gray mt-2">
                <span>Petit projet</span>
                <span>Projet d'envergure</span>
              </div>
            </div>

            {/* 3. Options */}
            <div>
              <h3 className="text-lg font-medium text-arti-black mb-4">3. Options & Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-arti-black bg-gray-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${
                       selectedFeatures.includes(feature.id) ? 'bg-arti-black border-arti-black' : 'border-gray-300'
                    }`}>
                      {selectedFeatures.includes(feature.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium text-arti-black">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* DROITE : LE RÉCAP (STICKY) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-arti-black text-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-light text-white/60 mb-8">Estimation</h3>
              
              <div className="space-y-4 mb-8 border-b border-white/10 pb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Base {projectType}</span>
                  <span>{BASE_RATES[projectType]} €</span>
                </div>
                
                {(pages > (projectType === 'custom' ? 0 : 5)) && (
                   <div className="flex justify-between text-sm">
                    <span className="text-white/70">Pages supp. ({pages - (projectType === 'custom' ? 0 : 5)})</span>
                    <span>+{((pages - (projectType === 'custom' ? 0 : 5)) * PAGE_PRICE[projectType])} €</span>
                  </div>
                )}

                {selectedFeatures.length > 0 && (
                   <div className="flex justify-between text-sm">
                    <span className="text-white/70">Options ({selectedFeatures.length})</span>
                    <span>+{selectedFeatures.reduce((acc, curr) => {
                      const f = FEATURES.find(item => item.id === curr)
                      return acc + (f ? f.price : 0)
                    }, 0)} €</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <div className="text-white/60 text-sm mb-1">Total estimé</div>
                {/* Animation du chiffre */}
                <div className="text-5xl font-medium flex items-start gap-1">
                  <Counter value={totalPrice} /> 
                  <span className="text-2xl mt-1">€</span>
                </div>
                <p className="text-xs text-white/40 mt-2">*Prix indicatif hors taxes</p>
              </div>

              <Link
                href={`/contact?plan=${projectType}&budget=${totalPrice}`} // On peut pré-remplir le formulaire de contact via URL
                className="block w-full py-4 bg-white text-arti-black text-center font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Réserver ce devis
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// Petit composant pour animer le compteur de prix
function Counter({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="inline-block"
    >
      {value.toLocaleString('fr-FR')}
    </motion.span>
  )
}