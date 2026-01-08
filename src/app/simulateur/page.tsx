'use client'

import { useState, useMemo, MouseEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, AnimatePresence, steps } from 'framer-motion'
import Link from 'next/link'

// --- 1. COMPOSANTS UI (DESIGN SYSTEM DARK/NEON) ---

const GlitchText = ({ text }: { text: string }) => {
  return (
    <motion.span 
      className="relative inline-block text-[#D0FF00] cursor-pointer font-bold"
      whileHover="hover"
    >
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute top-0 left-0 text-white z-[-1] select-none pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 1, 0, 1, 0],
            x: [0, -3, 3, -2, 0],
            y: [0, 2, -2, 0],
            transition: { repeat: Infinity, duration: 0.2, ease: "linear" }
          }
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-[#D0FF00] z-[-1] select-none pointer-events-none"
        variants={{
          hover: {
            opacity: [0, 1, 1, 0],
            clipPath: ["inset(0 0 0 0)", "inset(40% 0 10% 0)", "inset(10% 0 60% 0)", "inset(80% 0 5% 0)"],
            x: [0, 4, -4, 2],
            transition: { repeat: Infinity, duration: 0.3, ease: steps(2) }
          }
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  );
};

// Spotlight Card pour la section SEO (Light Mode)
function SpotlightCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string, onClick?: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-neutral-200 bg-white overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(0, 0, 0, 0.05), transparent 80%)
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full cursor-pointer items-center justify-between py-6 text-left group">
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>{question}</span>
        <span className={`relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-black border-black text-white' : 'border-gray-200 bg-white text-gray-400 group-hover:border-black group-hover:text-black'}`}>
          <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></motion.svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="pb-6 pt-0 text-gray-600 leading-relaxed text-sm md:text-base">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. LOGIQUE SIMULATEUR ---

const SIMULATOR_DATA = {
    baseRates: { vitrine: 2000, ecommerce: 5000, custom: 8000 },
    pagePrice: { vitrine: 150, ecommerce: 250, custom: 400 },
    features: [
      { id: 'design', label: 'Branding & Logo', price: 1500, type: 'all' },
      { id: 'seo', label: 'SEO Avancé', price: 800, type: 'all' },
      { id: 'cms', label: 'Formation Admin', price: 400, type: 'vitrine' },
      { id: 'payment', label: 'Paiement Complexe', price: 1000, type: 'ecommerce' },
      { id: 'migration', label: 'Migration Produits', price: 1200, type: 'ecommerce' },
      { id: 'api', label: 'API Externe', price: 2500, type: 'custom' },
      { id: 'multi', label: 'Multilingue', price: 1000, type: 'all' },
    ]
}

function PriceSimulatorWidget() {
    const [projectType, setProjectType] = useState<'vitrine' | 'ecommerce' | 'custom'>('vitrine')
    const [pages, setPages] = useState(5)
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

    const currentFeatures = SIMULATOR_DATA.features.filter(f => f.type === 'all' || f.type === projectType)

    const totalPrice = useMemo(() => {
        let total = SIMULATOR_DATA.baseRates[projectType]
        const extraPages = Math.max(0, pages - (projectType === 'custom' ? 0 : 5))
        total += extraPages * SIMULATOR_DATA.pagePrice[projectType]
        selectedFeatures.forEach(featId => {
            const feature = SIMULATOR_DATA.features.find(f => f.id === featId)
            if (feature) total += feature.price
        })
        return total
    }, [projectType, pages, selectedFeatures])

    const toggleFeature = (id: string) => {
        setSelectedFeatures(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* GAUCHE : CONTROLES (Dark Mode) */}
            <div className="lg:col-span-2 space-y-10">
                
                {/* 1. Type */}
                <div>
                    <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#D0FF00] text-black flex items-center justify-center text-xs font-bold">1</span>
                        Typologie
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { id: 'vitrine', label: 'Vitrine', icon: '✨' },
                            { id: 'ecommerce', label: 'E-commerce', icon: '🛍️' },
                            { id: 'custom', label: 'Sur-mesure', icon: '🚀' }
                        ].map((type) => (
                            <button
                                key={type.id}
                                onClick={() => setProjectType(type.id as any)}
                                className={`p-6 rounded-2xl border text-left transition-all duration-300 group relative overflow-hidden ${
                                    projectType === type.id
                                    ? 'border-[#D0FF00] bg-[#D0FF00]/10 text-white shadow-[0_0_20px_rgba(208,255,0,0.1)]'
                                    : 'border-white/10 bg-white/5 hover:border-white/30 text-gray-400'
                                }`}
                            >
                                <span className={`block text-2xl mb-2 transition-transform duration-300 ${projectType === type.id ? 'scale-110 grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>{type.icon}</span>
                                <span className={`font-bold text-lg ${projectType === type.id ? 'text-[#D0FF00]' : 'text-white'}`}>{type.label}</span>
                                {projectType === type.id && <div className="absolute inset-0 bg-[#D0FF00]/5 animate-pulse pointer-events-none"/>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Slider */}
                <div>
                     <div className="flex justify-between items-end mb-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#D0FF00] text-black flex items-center justify-center text-xs font-bold">2</span>
                            Envergure
                        </h3>
                        <span className="text-[#D0FF00] font-bold text-xl font-mono">
                            {pages} {projectType === 'custom' ? 'Fonctionnalités' : 'Pages'}
                        </span>
                    </div>
                    <input
                        type="range"
                        min={1}
                        max={50}
                        value={pages}
                        onChange={(e) => setPages(parseInt(e.target.value))}
                        className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D0FF00]"
                    />
                    <div className="flex justify-between text-xs text-neutral-500 mt-2 font-medium uppercase">
                        <span>Petit projet</span>
                        <span>Plateforme complexe</span>
                    </div>
                </div>

                {/* 3. Features */}
                <div>
                    <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#D0FF00] text-black flex items-center justify-center text-xs font-bold">3</span>
                        Options & Modules
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentFeatures.map((feature) => (
                            <div
                                key={feature.id}
                                onClick={() => toggleFeature(feature.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                                    selectedFeatures.includes(feature.id)
                                    ? 'border-[#D0FF00] bg-[#D0FF00]/10'
                                    : 'border-white/10 bg-white/5 hover:border-white/30'
                                }`}
                            >
                                <span className={`font-medium ${selectedFeatures.includes(feature.id) ? 'text-white' : 'text-gray-400'}`}>{feature.label}</span>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                    selectedFeatures.includes(feature.id) ? 'bg-[#D0FF00] border-[#D0FF00] text-black' : 'border-gray-600'
                                }`}>
                                    {selectedFeatures.includes(feature.id) && (
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* DROITE : RESULTAT STICKY (Carte Dashboard) */}
            <div className="lg:col-span-1">
                <div className="sticky top-32 bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-30" />
                    
                    {/* Decorative Icon Background */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                         <svg className="w-32 h-32 text-[#D0FF00]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39h-2.01c-.06-.89-.48-1.54-2.04-1.54-1.24 0-1.92.56-1.92 1.34 0 .73.55 1.25 2.47 1.77 2.7.74 4.38 1.63 4.38 3.74 0 1.82-1.39 2.98-3.32 3.44z"/></svg>
                    </div>

                    <h3 className="text-white text-xl font-bold mb-8 relative z-10 border-b border-white/10 pb-4">Estimation</h3>
                    
                    <div className="space-y-4 mb-8 text-sm text-gray-400 relative z-10">
                         <div className="flex justify-between">
                            <span>Base {projectType}</span>
                            <span className="text-white font-mono">{SIMULATOR_DATA.baseRates[projectType]}€</span>
                         </div>
                         <div className="flex justify-between">
                            <span>Extension ({pages})</span>
                            <span className="text-white font-mono">+{Math.max(0, pages - (projectType === 'custom' ? 0 : 5)) * SIMULATOR_DATA.pagePrice[projectType]}€</span>
                         </div>
                         {selectedFeatures.length > 0 && (
                            <div className="flex justify-between">
                                <span>Options ({selectedFeatures.length})</span>
                                <span className="text-white font-mono">+{selectedFeatures.reduce((acc, curr) => {
                                    const f = SIMULATOR_DATA.features.find(item => item.id === curr)
                                    return acc + (f ? f.price : 0)
                                }, 0)}€</span>
                            </div>
                         )}
                    </div>

                    <div className="mb-8 relative z-10 pt-4 border-t border-white/10">
                        <span className="block text-gray-500 text-xs mb-1 uppercase tracking-wider">Budget estimé (HT)</span>
                        <div className="text-5xl font-bold text-white flex items-start tracking-tighter">
                            
                            {/* FIX HYDRATION ERROR : suppressHydrationWarning */}
                            <motion.span
                                key={totalPrice}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[#D0FF00]"
                                suppressHydrationWarning
                            >
                                {totalPrice.toLocaleString('fr-FR')}
                            </motion.span>
                            
                            <span className="text-2xl mt-1 text-[#D0FF00]">€</span>
                        </div>
                    </div>

                    <Link
                        href={`/contact?plan=${projectType}&budget=${totalPrice}`}
                        className="block w-full py-4 bg-[#D0FF00] text-black font-bold text-center rounded-lg hover:bg-white transition-colors relative z-10"
                    >
                        Valider mon budget
                    </Link>
                </div>
            </div>
        </div>
    )
}

// --- 3. PAGE PRINCIPALE ---

export default function SimulatorPage() {
  
  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Simulateur de Devis Site Web Artichaud Studio',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'EUR' },
    'description': 'Outil en ligne gratuit pour estimer le coût de création d\'un site internet vitrine ou e-commerce.'
  }

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HERO SECTION (DARK MODE comme Tarifs) --- */}
      <section className="relative pt-32 pb-24 md:pb-32 px-6 overflow-hidden bg-neutral-950 text-white">
        {/* Fond Grille */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-[#D0FF00]/10 border border-[#D0FF00]/20 text-[#D0FF00] text-sm font-medium mb-8 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0FF00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF00]"></span>
                    </span>
                    Outil Gratuit & Immédiat
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                    Combien coûte <br className="hidden md:block"/> votre futur <GlitchText text="site internet ?" />
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Obtenez une estimation précise et immédiate. Configurez les options de votre projet et découvrez le budget à prévoir avant de nous contacter.
                </p>
            </motion.div>
        </div>
      </section>

      {/* --- SIMULATEUR (Intégré dans une section Dark pour faire "Dashboard") --- */}
      <section className="py-24 bg-neutral-950 border-t border-white/5 relative z-10 -mt-10">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
               <PriceSimulatorWidget />
          </div>
      </section>

      {/* --- CONTENU SEO (Light Mode pour la lecture) --- */}
      <div className="w-full bg-white py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Comprendre le tarif en 2026</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Chez Artichaud Studio, nous prônons la transparence. Le coût d'un site web varie principalement selon trois facteurs clés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                  { title: "1. La Typologie", text: "Un site vitrine demande moins de développement technique qu'une boutique e-commerce avec gestion de stocks, paiements et espace client." },
                  { title: "2. Le Design", text: "L'utilisation d'un thème préconçu est moins onéreuse qu'une Direction Artistique sur-mesure avec des animations complexes (GSAP, WebGL)." },
                  { title: "3. Les Fonctionnalités", text: "Espace membre, système de réservation, connexion API, ou multilingue sont des options qui demandent du temps de développement spécifique." }
              ].map((item, idx) => (
                <SpotlightCard key={idx} className="p-8 rounded-2xl bg-white border border-gray-200">
                    <h3 className="text-xl font-bold text-black mb-4">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </SpotlightCard>
              ))}
          </div>

          {/* Tableaux de prix texte */}
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-black mb-8">Fourchettes de prix moyennes du marché</h3>
            <div className="space-y-4">
              {[
                  { type: "Site One-Page", price: "1 500€ - 3 000€", desc: "Idéal pour lancer une offre ou un événement." },
                  { type: "Site Vitrine (5-10 pages)", price: "3 000€ - 8 000€", desc: "Le standard pour les PME et artisans." },
                  { type: "Site E-commerce", price: "8 000€ - 20 000€+", desc: "Pour des boutiques sous Shopify ou WooCommerce." }
              ].map((row, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl hover:bg-white transition-colors border-b border-gray-200 last:border-0">
                      <div>
                          <span className="font-bold text-black block mb-1">{row.type}</span>
                          <span className="text-sm text-gray-500">{row.desc}</span>
                      </div>
                      <div className="mt-2 md:mt-0 font-mono font-medium text-black bg-white border border-gray-200 px-3 py-1 rounded-lg w-fit">
                          {row.price}
                      </div>
                  </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* --- FAQ SECTION --- */}
      <div className="w-full bg-white pb-24 border-t border-gray-100 pt-24">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Questions fréquentes</h2>
          
          <div className="space-y-4">
            <AccordionItem 
                question="Ce simulateur engage-t-il à quelque chose ?" 
                answer="Non, c'est un outil purement informatif. Vous pouvez l'utiliser autant de fois que vous le souhaitez pour ajuster votre budget. Si le tarif vous convient, vous pouvez alors nous contacter." 
            />
            <AccordionItem 
                question="Le prix affiché est-il définitif ?" 
                answer="C'est une estimation très proche de la réalité. Le prix final sera affiné lors de notre premier rendez-vous découverte, en fonction de vos besoins très spécifiques (rédaction de contenu, photos, etc.)." 
            />
            <AccordionItem 
                question="Pourquoi êtes-vous moins cher / plus cher que d'autres ?" 
                answer="Nous nous situons dans la moyenne haute de la qualité. Contrairement aux plateformes 'low-cost', nous livrons des sites optimisés pour Google (SEO), rapides, et avec un design unique qui vous appartient. Nous ne vendons pas de simples templates." 
            />
             <AccordionItem 
                question="Quels sont les frais récurrents à prévoir ?" 
                answer="En dehors de la création, vous devrez payer votre hébergement et nom de domaine (environ 50€/an) et éventuellement une maintenance si vous souhaitez que nous gérions les mises à jour pour vous (à partir de 150€/mois)." 
            />
          </div>
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <div className="container mx-auto px-6 md:px-12 pb-24">
        <div className="bg-neutral-950 rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D0FF00] opacity-10 blur-[100px] rounded-full pointer-events-none group-hover:opacity-20 transition-opacity duration-700" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Vous avez une idée du budget ?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg relative z-10">
            Passons à l'étape suivante. Réservez un appel gratuit de 30 minutes pour valider la faisabilité technique de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
             <Link 
                href="/contact" 
                className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#D0FF00] transition-colors"
            >
                Discuter avec un développeur
            </Link>
            <Link 
                href="tel:+33600000000" 
                className="inline-block border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
                Nous appeler
            </Link>
          </div>
        </div>
      </div>

    </main>
  )
}