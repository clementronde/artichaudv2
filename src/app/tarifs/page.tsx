    'use client'

    import { useState, useRef, MouseEvent } from 'react'
    import { motion, useMotionTemplate, useMotionValue, AnimatePresence, steps } from 'framer-motion'
    import Link from 'next/link'

    // --- COMPOSANTS UI DU DESIGN SYSTEM ---

    // 1. Texte Glitch (Pour le titre)
    const GlitchText = ({ text }: { text: string }) => {
    return (
        <motion.span 
        className="relative inline-block text-[#D0FF00] cursor-pointer"
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

    // 2. Carte avec effet Spotlight (Pour les prix)
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
                radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(208, 255, 0, 0.15), transparent 80%)
            `,
            }}
        />
        <div className="relative h-full">{children}</div>
        </div>
    );
    }

    // 3. Accordéon FAQ Fluide
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

    // --- DATA ---
    const pricingPlans = [
    {
        id: 'vitrine',
        name: 'Site Vitrine',
        tagline: 'L\'essentiel pour démarrer',
        price: '3 000 - 8 000 €',
        priceDetail: 'dès 3 000€',
        description: 'Une présence digitale élégante pour présenter votre activité et rassurer vos prospects.',
        features: ['Design Responsive', 'SEO de base', 'Formulaire contact', '5 à 10 pages', 'Formation Admin'],
        highlight: false,
        cta: 'Demander un devis'
    },
    {
        id: 'custom',
        name: 'Sur-Mesure',
        tagline: 'Expérience unique & Branding',
        price: '15 000 - 50 000 €',
        priceDetail: 'dès 15 000€',
        description: 'Un développement custom (React/Next.js) pour des performances maximales et un design primé.',
        features: ['Architecture Custom', 'Animations GSAP', 'Dashboard avancé', 'SEO Technique Expert', 'Support prioritaire'],
        highlight: true, // LE PLUS POPULAIRE
        cta: 'Discutons du projet'
    },
    {
        id: 'ecommerce',
        name: 'E-commerce',
        tagline: 'Pour vendre en ligne',
        price: '8 000 - 20 000 €',
        priceDetail: 'dès 8 000€',
        description: 'Une boutique performante (Shopify/WooCommerce) optimisée pour la conversion.',
        features: ['Paiement Sécurisé', 'Gestion Stocks', 'Tunnel de vente', 'SEO E-commerce', 'Espace Client'],
        highlight: false,
        cta: 'Lancer ma boutique'
    }
    ]

    const faqsPricing = [
    { question: 'Pourquoi une telle fourchette de prix ?', answer: 'Le prix dépend de la complexité technique et créative. Un site vitrine simple template n\'a pas le même coût qu\'une expérience immersive sur-mesure développée en React.' },
    { question: 'Le prix inclut-il l\'hébergement ?', answer: 'Non, l\'hébergement et le nom de domaine sont à votre charge (environ 50€/an). Nous vous accompagnons pour la configuration.' },
    { question: 'Proposez-vous un paiement échelonné ?', answer: 'Oui, nous fonctionnons par jalons : 30% à la commande, 40% à la validation maquette, 30% à la livraison.' },
    ]

    export default function TarifsPage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

    return (
        <main className="w-full bg-white min-h-screen overflow-x-hidden">
        
        {/* --- HERO SECTION (Style Dark + Glitch) --- */}
        <section className="relative pt-32 pb-24 md:pb-32 px-6 overflow-hidden bg-neutral-950 text-white">
            
            {/* Fond Grille (Simulation CanvasEffect si non dispo) */}
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
                        Transparence & ROI
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                        Des investissements clairs <br className="hidden md:block"/> pour des résultats <GlitchText text="mesurables" />.
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Choisissez le niveau d'accompagnement adapté à vos ambitions. Du site vitrine efficace à l'expérience digitale sur-mesure.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="#simulateur" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105">
                            <span className="relative z-10">Simuler mon devis</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* --- PRICING CARDS (Style Spotlight) --- */}
        <section className="py-24 bg-[#F9F9F9]">
            <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                
                {pricingPlans.map((plan, index) => {
                // Si c'est le plan "Sur-mesure" (highlight), on utilise le style Dark/Neon
                if (plan.highlight) {
                    return (
                        <SpotlightCard key={plan.id} className="rounded-3xl p-8 flex flex-col h-full bg-neutral-950 text-white ring-4 ring-[#D0FF00]/30 transform lg:scale-105 shadow-2xl relative z-10" onClick={() => setSelectedPlan(plan.id)}>
                            <div className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl uppercase">Le plus populaire</div>
                            <div className="mb-6">
                                <span className="px-3 py-1 bg-white/10 text-black text-xs font-bold uppercase tracking-wider rounded-full">Excellence</span>
                                <h3 className="text-3xl font-bold mt-4 mb-2 text-black">{plan.name}</h3>
                                <p className="text-neutral-400 text-sm">{plan.tagline}</p>
                            </div>
                            
                            <div className="mb-8 pb-8 border-b border-white/10">
                                <div className="text-4xl font-bold text-black mb-2">{plan.priceDetail}</div>
                                <div className="text-sm text-neutral-500">Projet complet : {plan.price}</div>
                            </div>

                            <div className="space-y-4 mb-8 flex-grow text-gray-600 text-sm leading-relaxed">
                                <p>{plan.description}</p>
                                <ul className="space-y-3 mt-6 font-medium text-black">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="text-gray-400">✓</span> {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link href="/contact" className="w-full py-4 px-3 bg-[#D0FF00] text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                                {plan.cta}
                            </Link>
                        </SpotlightCard>
                    )
                }

                // Style Standard (Blanc)
                return (
                    <SpotlightCard key={plan.id} className="rounded-3xl p-8 flex flex-col h-full border border-gray-200 bg-white hover:border-gray-300 transition-colors" onClick={() => setSelectedPlan(plan.id)}>
                        <div className="mb-6">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">Standard</span>
                            <h3 className="text-2xl font-bold mt-4 mb-2 text-black">{plan.name}</h3>
                            <p className="text-gray-500 text-sm">{plan.tagline}</p>
                        </div>

                        <div className="mb-8 pb-8 border-b border-gray-100">
                            <div className="text-4xl font-bold text-black mb-2">{plan.priceDetail}</div>
                            <div className="text-sm text-gray-500">Projet complet : {plan.price}</div>
                        </div>

                        <div className="space-y-4 mb-8 flex-grow text-gray-600 text-sm leading-relaxed">
                            <p>{plan.description}</p>
                            <ul className="space-y-3 mt-6 font-medium text-black">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="text-gray-400">✓</span> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href="/contact" className="w-full py-4 px-3 border border-black text-black font-bold text-center rounded-lg hover:bg-black hover:text-white transition-colors">
                            {plan.cta}
                        </Link>
                    </SpotlightCard>
                )
                })}

            </div>
            </div>
        </section>

        {/* --- TABLEAU COMPARATIF (Adapté Style Clean) --- */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-black">Comparatif détaillé</h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-6 px-6 font-bold text-black uppercase text-xs tracking-wider">Fonctionnalité</th>
                                <th className="text-center py-6 px-6 font-bold text-gray-600">Vitrine</th>
                                <th className="text-center py-6 px-6 font-bold text-black bg-[#D0FF00]/20 border-x border-[#D0FF00]/30">Sur-mesure</th>
                                <th className="text-center py-6 px-6 font-bold text-gray-600">E-commerce</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            <tr>
                                <td className="py-4 px-6 font-medium">Design</td>
                                <td className="text-center py-4 px-6 text-gray-500">Template Premium</td>
                                <td className="text-center py-4 px-6 font-bold bg-[#D0FF00]/5 border-x border-[#D0FF00]/10">100% Unique (Figma)</td>
                                <td className="text-center py-4 px-6 text-gray-500">Thème optimisé</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium">Technologie</td>
                                <td className="text-center py-4 px-6 text-gray-500">WordPress / Wix</td>
                                <td className="text-center py-4 px-6 font-bold bg-[#D0FF00]/5 border-x border-[#D0FF00]/10">Next.js / Webflow</td>
                                <td className="text-center py-4 px-6 text-gray-500">Shopify / Woo</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium">Performance</td>
                                <td className="text-center py-4 px-6 text-gray-500">Standard</td>
                                <td className="text-center py-4 px-6 font-bold bg-[#D0FF00]/5 border-x border-[#D0FF00]/10">Score 95+ (Core Web Vitals)</td>
                                <td className="text-center py-4 px-6 text-gray-500">Optimisé conversion</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-medium">SEO</td>
                                <td className="text-center py-4 px-6 text-gray-500">Configuration de base</td>
                                <td className="text-center py-4 px-6 font-bold bg-[#D0FF00]/5 border-x border-[#D0FF00]/10">Audit + Stratégie sémantique</td>
                                <td className="text-center py-4 px-6 text-gray-500">SEO Fiches produits</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* --- ADDONS (Grid simple et propre) --- */}
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-black">Options à la carte</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { name: 'Branding complet', price: '2 500 €', desc: 'Logo, charte, direction artistique' },
                    { name: 'Rédaction SEO', price: '80 € / page', desc: 'Contenus optimisés pour Google' },
                    { name: 'Shooting Photo', price: 'sur devis', desc: 'Mettez en valeur vos produits' },
                    { name: 'Maintenance', price: 'dès 150 €/mois', desc: 'Mises à jour et sécurité garanties' },
                    { name: 'Multilingue', price: 'dès 1 000 €', desc: 'Traduction et configuration' },
                    { name: 'Formation équipe', price: '500 € / jour', desc: 'Devenez autonome sur votre site' },
                ].map((addon, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-black/20 transition-all shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-black">{addon.name}</h4>
                            <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 whitespace-nowrap">{addon.price}</span>
                        </div>
                        <p className="text-sm text-gray-500">{addon.desc}</p>
                    </div>
                ))}
            </div>
            </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-3xl font-bold mb-12 text-center text-black">Questions fréquentes</h2>
            <div className="space-y-4">
                {faqsPricing.map((faq, index) => (
                    <AccordionItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            </div>
        </section>

        {/* --- CTA FINAL (Style Footer Grid) --- */}
        <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white" id="simulateur">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
                Un projet précis ? <br/> 
                <GlitchText text="Parlons budget." />
            </h2>
            <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
                Vous avez une idée du plan qu'il vous faut ? Obtenez une estimation finale en discutant avec un développeur (pas un commercial).
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link 
                    href="/simulateur" 
                    className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105"
                >
                    <span className="relative z-10 group-hover:text-black">Utiliser le simulateur</span>
                    <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                </Link>
                <Link href="tel:+33697538017" className="text-white font-medium hover:text-[#D0FF00] transition-colors">
                    Appeler l'agence
                </Link>
            </div>
            </motion.div>
        </section>

        </main>
    )
    }