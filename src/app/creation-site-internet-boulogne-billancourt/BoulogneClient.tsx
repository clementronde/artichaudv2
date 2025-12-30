'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
import { MouseEvent } from "react";

// --- ANIMATIONS & UTILS ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// Composant Spotlight pour les cartes (Effet premium)
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(208, 255, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function BoulogneClient() {
  
  // JSON-LD Local Business (Données structurées)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agence Artichaud Boulogne",
    "image": "https://artichaud.com/images/agence-web-boulogne.jpg",
    "telephone": "+33100000000",
    "url": "https://artichaud.com/creation-site-internet-boulogne-billancourt",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boulogne-Billancourt",
      "postalCode": "92100",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8397,
      "longitude": 2.2399
    },
    "priceRange": "€€-€€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:30"
      }
    ]
  };

  return (
    <main className="w-full bg-white min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden bg-neutral-950 text-white">
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
            <span className="inline-block py-1 px-3 rounded-full bg-[#D0FF00]/10 border border-[#D0FF00]/20 text-[#D0FF00] text-sm font-medium mb-6 backdrop-blur-md">
              Agence Web 📍 Boulogne-Billancourt (92)
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Création de site internet à Boulogne‑Billancourt pour marques <span className="text-[#D0FF00]">ambitieuses</span>.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Nous sommes l'agence digitale de proximité des entreprises du 92. Nous concevons des <Link href="/creation-site-vitrine-wordpress-webflow-wix" className="underline underline-offset-4 hover:text-[#D0FF00] transition-colors"><strong>sites WordPress, Webflow et Wix</strong></Link> performants pour les TPE, PME et startups qui veulent dominer leur marché local.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-lg hover:bg-white transition-colors duration-300">
              Discuter de votre projet
            </Link>
            <Link href="#portfolio" className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
              Voir nos réalisations
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 1: CONTEXTE LOCAL (SEO ENRICHI) --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black leading-tight">
                Une expertise digitale au cœur <br/>
                <span className="text-gray-400">de l'économie boulonnaise.</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Boulogne-Billancourt est le deuxième pôle économique d'Île-de-France après Paris. Des <strong>Passages</strong> au quartier du <strong>Point du Jour</strong>, en passant par le nouveau quartier <strong>Rives de Seine</strong>, la dynamique est forte.
                </p>
                <p>
                  Pour émerger face à une concurrence dense, votre entreprise a besoin d'un site web qui soit plus qu'une simple vitrine : un véritable outil commercial.
                </p>
                <p>
                  Chez Artichaud, nous comprenons les enjeux locaux. Nous créons des sites optimisés pour le <strong>référencement local (SEO)</strong> afin que vos clients du 92 vous trouvent immédiatement sur Google. Notre expertise s'étend également à <Link href="/creation-site-internet-paris" className="underline underline-offset-4 hover:text-[#D0FF00] transition-colors font-semibold">Paris</Link> et toute l'Île-de-France.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex gap-8">
                 <div>
                    <span className="block text-3xl font-bold text-black">100%</span>
                    <span className="text-sm text-gray-500">Made in 92</span>
                 </div>
                 <div>
                    <span className="block text-3xl font-bold text-black">SEO</span>
                    <span className="text-sm text-gray-500">Local optimisé</span>
                 </div>
              </div>
            </motion.div>
            
            <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SpotlightCard className="rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">Commerçants & Artisans</h3>
                        <p className="text-sm text-gray-500">Digitalisez votre point de vente avec un site Click & Collect ou vitrine efficace.</p>
                    </SpotlightCard>
                    <SpotlightCard className="rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">Professions Libérales</h3>
                        <p className="text-sm text-gray-500">Avocats, Architectes, Santé. Inspirez confiance avec un design sobre et premium.</p>
                    </SpotlightCard>
                    <SpotlightCard className="rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">Startups & Tech</h3>
                        <p className="text-sm text-gray-500">Des sites Webflow scalables pour les pépites de la French Tech basées à Boulogne.</p>
                    </SpotlightCard>
                    <SpotlightCard className="rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">PME & Industries</h3>
                        <p className="text-sm text-gray-500">Refonte de site corporatif pour moderniser votre image de marque.</p>
                    </SpotlightCard>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: OFFRES --- */}
      <section className="py-24 bg-[#F9F9F9]" id="offres">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Des offres transparentes</h2>
            <p className="text-gray-500">Investissez dans un outil rentable, adapté à votre stade de développement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard 
              title="Pack Présence"
              price="Essentiel"
              desc="Pour être visible rapidement avec un budget maîtrisé."
              features={["Site One-Page ou Vitrine", "CMS Wix ou WordPress", "Design Responsive Mobile", "Formulaire de contact", "Mentions légales RGPD"]}
              delay={0}
            />
            <PriceCard 
              title="Pack Croissance"
              price="Populaire"
              isPopular
              desc="Une identité forte pour vous démarquer de la concurrence locale."
              features={["Site complet 5-10 pages", "Webflow ou WordPress", "Design Sur-Mesure", "SEO Local Avancé", "Formation Back-office"]}
              delay={0.1}
            />
            <PriceCard 
              title="Sur-Mesure"
              price="Premium"
              desc="La refonte totale de votre image pour passer un cap stratégique."
              features={["Identité Visuelle (Logo)", "Site Web Haut de Gamme", "Animations & Interactions", "Copywriting Stratégique", "Support Prioritaire"]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PROCESS --- */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-[#D0FF00] blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">De l'idée à la mise en ligne</h2>
            <p className="text-neutral-400">Un processus rodé pour livrer votre site dans les temps.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <ProcessStep number="01" title="Rencontre" desc="Call ou café à Boulogne pour cerner vos enjeux." delay={0} />
              <ProcessStep number="02" title="Stratégie" desc="Arborescence, UX et choix de la technologie adaptée." delay={0.1} />
              <ProcessStep number="03" title="Design" desc="Création des maquettes graphiques haute fidélité." delay={0.2} />
              <ProcessStep number="04" title="Dév" desc="Intégration technique et optimisations SEO." delay={0.3} />
              <ProcessStep number="05" title="Livraison" desc="Mise en ligne, formation et champagne !" delay={0.4} />
          </div>
        </div>
      </section>

      {/* --- SECTION 4: PROJETS --- */}
      <div id="portfolio">
        <TrustedSection /> 
      </div>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-black">Questions Fréquentes</h2>
            <p className="text-gray-500">Tout ce que vous devez savoir avant de lancer votre projet.</p>
          </div>
          <div className="space-y-4">
            <FaqItem question="Combien coûte la création d'un site internet à Boulogne ?" answer="Le budget dépend de la complexité. Un site vitrine simple démarre autour de 2000€. Un site complet sur-mesure (Webflow/WordPress) se situe généralement entre 4000€ et 8000€. Nous fournissons un devis détaillé après notre premier échange." />
            <FaqItem question="Pouvez-vous nous rencontrer physiquement ?" answer="Absolument. La proximité est notre force. Nous pouvons organiser un rendez-vous dans vos bureaux à Boulogne-Billancourt, à Paris, ou dans un café pour discuter de votre projet de vive voix." />
            <FaqItem question="Le site sera-t-il bien référencé sur Google ?" answer="Oui, le SEO est au cœur de notre démarche. Nous structurons le site techniquement (Hn, balises, vitesse) pour plaire à Google. Pour l'offre Croissance, nous optimisons spécifiquement le référencement local pour vous faire ressortir sur les recherches liées au 92." />
            <FaqItem question="Proposez-vous la maintenance du site ?" answer="Oui, nous proposons des forfaits de maintenance pour assurer la sécurité, les mises à jour et les sauvegardes de votre site WordPress. Sur Webflow et Wix, la maintenance technique est minime, nous assurons plutôt un support d'évolution." />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-32 bg-[#D0FF00] text-black text-center px-6 relative overflow-hidden">
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Prêt à digitaliser votre activité ?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto font-medium">
            Ne laissez pas vos concurrents prendre toute la place sur le web local. Discutons de votre projet dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                className="px-10 py-5 bg-black text-white font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-xl"
              >
                Demander mon devis gratuit
              </Link>
              
              <a href="tel:+33100000000" className="px-10 py-5 border-2 border-black text-black font-bold rounded-full text-lg hover:bg-black hover:text-[#D0FF00] transition-colors">
                Appeler l'agence
              </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}

// --- SOUS-COMPOSANTS ---

const PriceCard = ({ title, price, desc, features, isPopular = false, delay }: any) => (
  <motion.div 
    className={`relative p-8 rounded-2xl border ${isPopular ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'} flex flex-col h-full`}
    initial="rest"
    whileHover="hover"
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
  >
    {isPopular && (
      <span className="absolute top-0 right-0 bg-[#D0FF00] text-black text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-wider">
        Recommandé
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-4">{price}</div>
    <p className={`text-sm mb-8 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feat: string, i: number) => (
        <li key={i} className="flex items-center gap-2 text-sm">
          <span className={isPopular ? 'text-[#D0FF00]' : 'text-black'}>✓</span>
          {feat}
        </li>
      ))}
    </ul>
    <Link href="/contact" className={`w-full py-3 rounded-lg text-center font-bold text-sm transition-colors ${isPopular ? 'bg-[#D0FF00] text-black hover:bg-white' : 'bg-black text-white hover:bg-[#D0FF00] hover:text-black'}`}>
      Choisir ce pack
    </Link>
  </motion.div>
);

const ProcessStep = ({ number, title, desc, delay }: any) => (
  <motion.div 
    className="relative p-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/10 transition-colors"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
  >
    <span className="absolute -top-4 -right-4 text-8xl font-bold text-white/5 group-hover:text-[#D0FF00]/10 transition-colors pointer-events-none select-none">
      {number}
    </span>
    <div className="relative z-10">
      <div className="w-10 h-1 bg-[#D0FF00] mb-6 rounded-full" />
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const FaqItem = ({ question, answer }: any) => (
  <details className="group border-b border-gray-100 last:border-0">
    <summary className="flex cursor-pointer items-center justify-between py-6 font-medium text-lg text-black hover:text-[#D0FF00] transition-colors">
      {question}
      <span className="transition-transform duration-300 group-open:rotate-180">
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
      </span>
    </summary>
    <div className="pb-6 pt-0 text-gray-600 leading-relaxed">
      {answer}
    </div>
  </details>
);