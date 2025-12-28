'use client'

import Link from "next/link";
import Image from "next/image";
import { CanvasEffect } from "@/components/ui/canvas-effect";
import TrustedSection from "@/components/about/TrustedSection";
import { motion, Variants } from "framer-motion";

// --- ANIMATION VARIANTS ---
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
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleOnHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300 }
  }
};

export default function BoulogneLandingPage() {
  
  // JSON-LD pour le SEO Local (Code Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Agence Artichaud",
    "image": "LP/creation-site-boulogne-billancourt/google_maps_boulogne_billancourt.png",
    "telephone": "+33100000000",
    "url": "https://artichaud.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boulogne-Billancourt",
      "postalCode": "92100",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8397,
      "longitude": 2.2399
    },
    "priceRange": "€€"
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
            Création de site internet à Boulogne‑Billancourt pour marques qui veulent <span className="text-[#D0FF00]">se démarquer</span>.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
            Nous sommes une agence créative locale. Nous concevons des sites <strong>WordPress, Webflow et Wix</strong> performants pour les TPE, freelances et startups d'Île-de-France qui refusent le "déjà-vu".
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-[#D0FF00] text-black font-bold rounded-lg hover:bg-white transition-colors duration-300">
              Nous contacter
            </Link>
            <Link href="#portfolio" className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
              Voir nos réalisations
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 1: POUR QUI ? --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                 Vous êtes expert dans votre domaine.<br/>
                 <span className="text-gray-400">Votre site doit l'être aussi.</span>
               </h2>
               <p className="text-gray-600 mb-6 text-lg">
                 À Boulogne et dans l'ouest parisien, la concurrence est rude. Avoir un site "correct" ne suffit plus. Nous accompagnons :
               </p>
               <ul className="space-y-4">
                 {[
                   "Les TPE & Commerçants locaux qui veulent digitaliser leur offre.",
                   "Les Freelances & Consultants qui soignent leur personal branding.",
                   "Les Cabinets (Avocats, Archis, Santé) qui inspirent la confiance.",
                   "Les Startups du 92 qui ont besoin de scalabilité (Webflow)."
                 ].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <div className="w-6 h-6 rounded-full bg-[#D0FF00] flex items-center justify-center mt-1 flex-shrink-0">
                       <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <span className="text-black font-medium">{item}</span>
                   </li>
                 ))}
               </ul>
            </motion.div>
            
            <motion.div 
              className="w-full md:w-1/2 relative h-[400px] bg-gray-100 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
               {/* IMAGE À CHANGER ICI : Idéalement une photo avec un repère local ou un écran montrant une map de Boulogne */}
               <Image 
                 src="/LP/creation-site-boulogne-billancourt/google_maps_boulogne_billancourt.avif" 
                 alt="Agence web avec des clients à Boulogne Billancourt"
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: OFFRES --- */}
      <section className="py-20 bg-[#F9F9F9]" id="offres">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">Des offres claires, sans surprise.</h2>
            <p className="text-gray-500">Choisissez le pack adapté à votre stade de développement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard 
              title="Site Vitrine Essentiel"
              price="Sur devis"
              desc="Pour être visible rapidement avec un design propre et rassurant."
              features={["WordPress ou Wix", "1 à 3 pages", "Design responsive", "Formulaire de contact", "Optimisation technique"]}
              delay={0}
            />
            <PriceCard 
              title="Site Vitrine Créatif"
              price="Populaire"
              isPopular
              desc="Une identité forte pour vous démarquer de la concurrence locale."
              features={["Webflow ou WordPress", "4 à 8 pages", "Design & DA sur-mesure", "Animations & Interactions", "SEO Local (GMB)", "Formation incluse"]}
              delay={0.1}
            />
            <PriceCard 
              title="Site + Branding 360"
              price="Premium"
              desc="La refonte totale de votre image pour passer un cap."
              features={["Création Logo & Charte", "Site Vitrine Complet", "Storytelling & Copywriting", "Shooting photo (option)", "Support prioritaire"]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PROCESS (REDESIGNÉ) --- */}
      <section className="py-24 bg-neutral-950 text-white overflow-hidden relative">
        {/* Un peu de déco néon en fond */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
             <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-[#D0FF00] blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <motion.div 
             className="text-center mb-16"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="text-3xl md:text-5xl font-bold mb-4">De l'idée à la mise en ligne</h2>
             <p className="text-neutral-400">Un processus rodé pour un site livré dans les temps.</p>
           </motion.div>
           
           {/* Grid Responsive pour le process */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <ProcessStep number="01" title="Découverte" desc="Call visio ou café à Boulogne pour comprendre vos enjeux." delay={0} />
              <ProcessStep number="02" title="Stratégie" desc="Atelier identité, arborescence et structure des contenus." delay={0.1} />
              <ProcessStep number="03" title="Design" desc="Maquettes graphiques (UI) haute fidélité validées ensemble." delay={0.2} />
              <ProcessStep number="04" title="Dév" desc="Intégration pixel-perfect sur WordPress, Webflow ou Wix." delay={0.3} />
              <ProcessStep number="05" title="Lancement" desc="Mise en ligne, tests SEO et formation admin." delay={0.4} />
           </div>
        </div>
      </section>

      {/* --- SECTION 4: PROJETS --- */}
      <div id="portfolio">
        <TrustedSection /> 
      </div>

      {/* --- SECTION 5: FAQ --- */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Questions fréquentes
          </motion.h2>
          <div className="space-y-4">
            <FaqItem question="Combien de temps pour créer mon site ?" answer="Pour un site vitrine essentiel, comptez 2 à 3 semaines. Pour un site créatif complet sur Webflow avec des animations, le délai est généralement de 4 à 6 semaines selon votre réactivité sur les contenus." />
            <FaqItem question="Pouvez-vous nous rencontrer à Boulogne ?" answer="Absolument. Bien que nous soyons une agence digitale, nous privilégions la proximité avec nos clients du 92. Nous pouvons organiser un rendez-vous dans vos locaux ou dans un espace de coworking boulonnais." />
            <FaqItem question="Le site sera-t-il bien référencé sur Google ?" answer="Oui, tous nos sites sont construits avec les meilleures pratiques SEO (structure Hn, balises meta, rapidité de chargement, mobile-first). Pour l'offre 'Créatif', nous incluons une configuration avancée du SEO local (Google My Business)." />
            <FaqItem question="Suis-je propriétaire de mon site ?" answer="À 100%. Une fois le solde réglé, vous êtes pleinement propriétaire de votre nom de domaine, de l'hébergement et de tout le contenu du site. Nous vous formons pour le gérer." />
          </div>
        </div>
      </section>

      {/* --- CTA FINAL (MODIFIÉ) --- */}
      <section className="py-24 bg-[#D0FF00] text-black text-center px-6" id="contact">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
         >
           <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Prêt à décoller ?</h2>
           <p className="text-xl mb-10 max-w-2xl mx-auto font-medium">
             Discutons de votre projet de vive voix ou envoyez-nous votre brief.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* LIEN MODIFIÉ : Redirection vers /contact */}
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-black text-white font-bold rounded-lg text-lg hover:scale-105 transition-transform"
              >
                Commencer mon projet
              </Link>
              
              <a href="mailto:hello@artichaud.com" className="px-8 py-4 border-2 border-black text-black font-bold rounded-lg text-lg hover:bg-black hover:text-[#D0FF00] transition-colors">
                Nous écrire un email
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
    variants={scaleOnHover}
    viewport={{ once: true }}
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
      Choisir cette offre
    </Link>
  </motion.div>
);

// NOUVEAU DESIGN DE CARTE PROCESS
const ProcessStep = ({ number, title, desc, delay }: any) => (
  <motion.div 
    className="relative p-6 rounded-xl bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/10 transition-colors"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
  >
    {/* Numéro en fond (Watermark) */}
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
  <details className="group border border-gray-200 rounded-lg bg-white overflow-hidden">
    <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-black group-open:bg-gray-50 transition-colors">
      {question}
      <span className="transition-transform duration-300 group-open:rotate-180">
        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
      </span>
    </summary>
    <div className="p-6 pt-0 text-gray-600 leading-relaxed bg-gray-50">
      {answer}
    </div>
  </details>
);