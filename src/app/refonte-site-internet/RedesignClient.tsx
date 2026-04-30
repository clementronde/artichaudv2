'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useRef } from "react";

// --- COMPOSANTS UI SPECIFIQUES ---

// 1. Slider Avant/Après Interactif
const BeforeAfterSlider = ({ beforeImg, afterImg, label }: { beforeImg: string, afterImg: string, label: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  return (
    <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-black">{label}</h3>
        <div 
            ref={containerRef}
            className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gray-200 shadow-lg"
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
        >
            {/* Image APRÈS (Fond) */}
            <Image src={afterImg} alt="Site internet après refonte" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            
            {/* Label Après */}
            <div className="absolute top-4 right-4 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-full z-10">
                APRÈS (Artichaud)
            </div>

            {/* Image AVANT (Clip) */}
            <div 
                className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-white"
                style={{ width: `${sliderPosition}%` }}
            >
                {/* CORRECTION ICI : On applique la largeur calculée sur cette div wrapper, pas sur l'Image */}
                <div 
                    className="relative h-full w-screen"
                >
                     <Image 
                        src={beforeImg} 
                        alt="Site internet avant refonte" 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority // Optionnel : charge l'image plus vite pour éviter le clignotement
                     />
                </div>
                
                {/* Label Avant */}
                <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                    AVANT
                </div>
            </div>

            {/* Curseur Central */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" /></svg>
                </div>
            </div>
        </div>
    </div>
  );
};

// 2. Glitch Text
const GlitchText = ({ text }: { text: string }) => {
  return <span className="text-gray-400">{text}</span>;
};

// 3. Accordion FAQ
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full cursor-pointer items-center justify-between py-6 text-left group">
        <span className={`text-lg font-medium ${isOpen ? 'text-black' : 'text-gray-800 '}`}>{question}</span>
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

// --- ANIMATIONS ---
const fadeInUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const staggerContainer: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

export default function RedesignClient() {
  
  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">

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
              <span className="w-2 h-2 rounded-full bg-[#D0FF00]"></span>
              Expertise Refonte & Migration
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-balance">
            Refonte de site internet : <br/> modernisez votre image et <GlitchText text="votre expérience." />
          </motion.h1>

          <motion.div variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed space-y-4 text-balance">
            <p>
              Votre site actuel est lent, daté ou ne convertit plus ? Il est temps de changer. Une refonte n'est pas une dépense, c'est un investissement pour rattraper votre retard technologique.
            </p>
            <p>
              Chez Artichaud, nous transformons les sites vieillissants en outils de performance. Nous gérons la refonte de A à Z : design, développement et conservation de votre SEO existant.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="group relative px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-full text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 group-hover:text-black transition-colors">Auditer mon site actuel</span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </Link>
            <Link href="#avant-apres" className="relative px-8 py-4 text-white font-medium group">
              Voir des exemples
              <span className="absolute bottom-3 left-8 right-8 h-[1px] bg-[#D0FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-medium text-gray-500">Diagnostic</span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-black leading-tight">
                Quand faut-il refondre un site internet ?
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                Une refonte n'est pas seulement un changement de décor. Elle devient utile quand le site freine la conversion, la lecture, le référencement ou l'autonomie de l'équipe.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                <Link href="/services/seo-referencement-naturel" className="underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                  Vérifier le SEO
                </Link>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                  Choisir le bon CMS
                </Link>
              </div>
            </div>

            <div className="divide-y divide-black/15 border-y border-black/15">
              {[
                ["Conversion faible", "Vous avez du trafic, mais peu de contacts. Le parcours, le message ou les preuves ne donnent pas assez envie de passer à l'action."],
                ["Mobile fragile", "Le site demande des zooms, coupe certains textes ou rend les formulaires pénibles sur smartphone."],
                ["Image datée", "La direction artistique ne reflète plus votre niveau de service, votre marché ou vos ambitions commerciales."],
                ["Performance lente", "Le chargement, les scripts ou les anciens plugins abîment l'expérience et compliquent le référencement naturel."],
                ["Back-office bloquant", "Chaque modification dépend d'un prestataire. Une refonte WordPress, Webflow ou Wix peut rendre les contenus vraiment pilotables."],
              ].map(([title, desc]) => (
                <div key={title} className="py-7 md:grid md:grid-cols-[180px_1fr] md:gap-8">
                  <h3 className="text-xl font-bold text-black">{title}</h3>
                  <p className="mt-3 md:mt-0 text-gray-700 leading-relaxed">{desc}</p>
                </div>
              ))}
              <div className="py-8 md:grid md:grid-cols-[180px_1fr_auto] md:items-start md:gap-8">
                <h3 className="text-xl font-bold text-black">Diagnostic Artichaud</h3>
                <p className="mt-3 md:mt-0 text-gray-700 leading-relaxed">
                  Nous auditons le site actuel, isolons ce qu'il faut conserver et priorisons les chantiers : design, contenu, technique, SEO et redirections.
                </p>
                <Link href="/contact" className="mt-4 md:mt-0 inline-flex text-sm font-bold underline underline-offset-4 hover:text-[#7A9600] transition-colors">
                  Demander un audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- H2: PROCESSUS (DESIGN + SEO) --- */}
      <section className="py-24 bg-neutral-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Notre approche : Design + Clarté + SEO</h2>
                <p className="text-lg text-gray-600">
                    Refondre un site, c'est comme rénover une maison. Il faut garder les bonnes fondations (SEO) tout en modernisant l'intérieur (Design).
                </p>
            </div>

            <div className="relative">
                {/* Ligne de connexion (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 z-0" />
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                    {[
                        { step: "01", title: "Audit & Crawl", desc: "Nous scannons votre site actuel pour lister toutes les pages à conserver (mapping d'URL) et identifier les erreurs 404." },
                        { step: "02", title: "UX Strategy", desc: "On repense l'arborescence pour simplifier la navigation. Fini les menus à rallonge, place à la clarté." },
                        { step: "03", title: "Design System", desc: "Création d'une nouvelle identité visuelle moderne (UI) qui valorise votre marque." },
                        { step: "04", title: "Migration", desc: "Développement et mise en place du plan de redirection 301. C'est crucial pour ne pas perdre votre trafic Google." },
                        { step: "05", title: "Lancement", desc: "Mise en ligne, vérification de la Search Console et formation de vos équipes." }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-400 group-hover:border-[#D0FF00] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-sm mb-6">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-black">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- H2: AVANT / APRÈS (INTERACTIF) --- */}
      <section className="py-24 bg-white" id="avant-apres">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-black">
                La preuve par l'image : Avant / Après
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Exemple 1 */}
                <BeforeAfterSlider 
                    label="Refonte Cabinet Avocat"
                    beforeImg="/projects/charitio/charitioprojet1.avif" // À remplacer par vos images
                    afterImg="/projects/charitio/charitioprojet4.avif"
                />
                <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold text-black">Modernisation & Confiance</h3>
                    <p className="text-gray-600 leading-relaxed">
                        <strong>Le problème :</strong> Un site vieux de 10 ans, non responsive, qui ne reflétait pas le prestige du cabinet. <br/>
                        <strong>La solution Artichaud :</strong> Une refonte sur WordPress avec un design sobre, typographique et des photos professionnelles. Résultat : +40% de demandes de contact en 3 mois.
                    </p>
                    <ul className="flex gap-2">
                        <li className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">WordPress</li>
                        <li className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">Branding</li>
                    </ul>
                </div>

                {/* Exemple 2 (Inversé pour le rythme) */}
                <div className="flex flex-col justify-center space-y-4 lg:order-last">
                    <h3 className="text-2xl font-bold text-black">Migration Wix vers Webflow</h3>
                    <p className="text-gray-600 leading-relaxed">
                        <strong>Le problème :</strong> Une startup tech bloquée par les limites de design de Wix et un code "sale". <br/>
                        <strong>La solution Artichaud :</strong> Migration complète vers Webflow. Animations fluides, temps de chargement divisé par 2, et une image de marque enfin à la hauteur de leur levée de fonds.
                    </p>
                    <ul className="flex gap-2">
                        <li className="px-3 py-1 bg-black text-white rounded text-xs font-bold">Webflow</li>
                        <li className="px-3 py-1 bg-gray-100 rounded text-xs font-bold text-gray-600">Migration</li>
                    </ul>
                </div>
                <BeforeAfterSlider 
                    label="Refonte Startup Tech"
                    beforeImg="/projects/comon/comonprojet1.avif" 
                    afterImg="/projects/comon/comonprojet4.avif"
                />
            </div>
            
            <div className="text-center mt-12">
                <p className="text-gray-500 italic mb-4">Glissez le curseur pour voir la transformation.</p>
                <Link href="/works" className="inline-block px-8 py-3 border border-black text-black font-bold rounded-full hover:bg-black hover:text-white transition-colors">
                    Voir toutes nos réalisations
                </Link>
            </div>
        </div>
      </section>

      {/* --- H2: CMS SPECIFICS (TEXTE SEO) --- */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Refonte WordPress, Webflow et Wix : quelle stratégie ?</h2>
            
            <div className="space-y-10">
                <div>
                    <h3 className="text-2xl font-bold text-[#D0FF00] mb-3">Refonte site WordPress</h3>
                    <p className="text-gray-300 leading-relaxed">
                        C'est le cas le plus fréquent. Vous avez un site WordPress lent, avec un thème "usine à gaz" (Divi, Avada) et trop de plugins ? Nous ne nous contentons pas de changer les couleurs. Nous reconstruisons souvent le thème sur des bases saines (Gutenberg ou ACF) pour alléger le code tout en gardant votre base de données d'articles. C'est une cure de jouvence technique.
                    </p>
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold text-[#D0FF00] mb-3">Migration vers Webflow</h3>
                    <p className="text-gray-300 leading-relaxed">
                        De plus en plus d'entreprises quittent WordPress ou Wix pour Webflow. Pourquoi ? Pour la liberté de design et la sécurité. Lors de cette <strong>migration de site web</strong>, nous exportons vos contenus existants et les réimplantons dans Webflow. Nous configurons méticuleusement les redirections 301 pour que Google comprenne le changement sans pénalité.
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-[#D0FF00] mb-3">Modernisation Wix</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Si vous êtes attaché à l'écosystème Wix, nous pouvons effectuer une refonte visuelle complète en passant sur le nouvel éditeur <strong>Wix Studio</strong>. Cela permet de garder votre abonnement actuel tout en faisant un bond en avant en termes de design et de responsive.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* --- H2: FAQ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">Questions fréquentes sur la refonte</h2>
          <div className="space-y-4">
            <AccordionItem 
                question="Vais-je perdre mon référencement (SEO) ?" 
                answer="C'est le risque majeur si c'est mal fait. Chez Artichaud, la conservation du SEO est la priorité N°1. Nous cartographions toutes vos anciennes URL et mettons en place des redirections 301 vers les nouvelles pages. Souvent, nos refontes améliorent même le SEO grâce à un code plus propre et un meilleur maillage interne." 
            />
            <AccordionItem 
                question="Combien coûte une refonte de site ?" 
                answer="Cela dépend de l'état de l'existant. S'il faut juste 'rependre la façade' (UI), c'est moins cher qu'une refonte structurelle (UX + Tech). En général, comptez entre 2500€ et 6000€ pour une refonte complète d'un site vitrine standard." 
            />
            <AccordionItem 
                question="Puis-je garder mes textes actuels ?" 
                answer="Oui, bien sûr. Cependant, une refonte est souvent l'occasion de rafraîchir le discours commercial. Nous pouvons simplement réintégrer vos textes, ou faire appel à notre copywriter pour les optimiser et les rendre plus percutants." 
            />
            <AccordionItem 
                question="Combien de temps le site sera-t-il hors ligne ?" 
                answer="Zéro minute. Nous développons le nouveau site sur un serveur de pré-production (caché). Une fois validé, nous faisons la bascule (le 'switch') qui est instantanée. Vos visiteurs ne verront aucune interruption de service." 
            />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#050505] text-white">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
         <motion.div
           className="relative z-10 max-w-4xl mx-auto text-center"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
         >
           <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white">
             Votre site mérite <br/> 
             <GlitchText text="une seconde vie." />
           </h2>
           <p className="text-xl mb-12 text-neutral-400 max-w-2xl mx-auto font-light">
             Ne laissez pas un design obsolète freiner votre croissance. Discutons de votre projet de refonte.
           </p>
           
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 group-hover:text-black">Demander un devis refonte</span>
                <div className="absolute inset-0 bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              </Link>
              <Link href="tel:+33100000000" className="text-white font-medium hover:text-[#D0FF00] transition-colors relative group">
                Réserver un audit gratuit
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D0FF00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
           </div>
         </motion.div>
      </section>

      {/* --- LIENS INTERNES SEO --- */}
      <div className="bg-black py-12 border-t border-neutral-900">
        <div className="container mx-auto px-6 text-center text-xs text-neutral-600">
            <p className="mb-4 uppercase tracking-widest font-bold text-neutral-500">Explorer</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <Link href="/services/creation-site-internet" className="hover:text-white transition-colors">Création de site internet</Link>
                <Link href="/creation-site-internet-paris" className="hover:text-white transition-colors">Agence Web Paris</Link>
                <Link href="/creation-site-internet-boulogne-billancourt" className="hover:text-white transition-colors">Agence Web Boulogne</Link>
                <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="hover:text-white transition-colors">Comparatif CMS</Link>
                <Link href="/services/seo-referencement-naturel" className="hover:text-white transition-colors">SEO & Référencement</Link>
                <Link href="/tarifs" className="hover:text-white transition-colors">Nos tarifs</Link>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
        </div>
      </div>

    </main>
  );
}
