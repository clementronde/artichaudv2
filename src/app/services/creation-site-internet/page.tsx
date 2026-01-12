import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Création de Site Internet sur Mesure | Next.js & React - Paris",
  description: "Agence web Paris spécialisée en création de sites internet sur mesure. Next.js, React, performances optimales. Site vitrine dès 3000€, e-commerce dès 8000€. Devis gratuit 24h.",
  keywords: [
    "création site internet Paris",
    "agence web Paris",
    "développement site web sur mesure",
    "site internet professionnel",
    "création site vitrine Paris",
    "création site e-commerce",
    "Next.js React Paris",
    "développeur web Paris"
  ],
  openGraph: {
    title: "Création de Site Internet sur Mesure - Artichaud Studio Paris",
    description: "Site vitrine, e-commerce ou sur-mesure : nous créons votre site internet avec les technologies modernes (Next.js, React). Devis gratuit.",
    url: "https://artichaud-studio.com/services/creation-site-internet",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Création Site Internet - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/creation-site-internet"
  }
};

const pricingPlans = [
  {
    name: "Site Vitrine",
    price: "3 000 - 8 000 €",
    features: [
      "5 à 10 pages optimisées",
      "Design sur-mesure responsive",
      "SEO technique intégré",
      "Formulaire de contact",
      "Google Analytics 4",
      "Formation à la gestion",
      "1 mois de support inclus"
    ],
    ideal: "PME, artisans, professions libérales"
  },
  {
    name: "Site E-commerce",
    price: "8 000 - 20 000 €",
    features: [
      "Boutique complète Shopify/WooCommerce",
      "Paiement sécurisé (Stripe, PayPal)",
      "Gestion produits & stock",
      "Tunnel de vente optimisé",
      "SEO e-commerce avancé",
      "Analytics e-commerce",
      "2 mois de support inclus"
    ],
    ideal: "E-commerçants, marques, retailers"
  },
  {
    name: "Site Sur-Mesure",
    price: "15 000 - 50 000 €",
    features: [
      "Architecture Next.js sur-mesure",
      "Fonctionnalités complexes",
      "API & intégrations tierces",
      "Dashboard admin avancé",
      "Performance maximale",
      "SEO technique expert",
      "6 mois de support prioritaire"
    ],
    ideal: "Startups, scale-ups, grands comptes"
  }
];

const technologies = [
  { name: "Next.js 16", description: "Framework React moderne pour performance SEO maximale" },
  { name: "React 19", description: "Bibliothèque JavaScript pour interfaces interactives" },
  { name: "TypeScript", description: "Code robuste et maintenable" },
  { name: "Tailwind CSS", description: "Design system flexible et performant" },
  { name: "Shopify/WooCommerce", description: "Solutions e-commerce éprouvées" },
  { name: "Stripe/PayPal", description: "Paiements sécurisés internationaux" }
];

const process = [
  {
    step: "1. Discovery",
    duration: "1-2 semaines",
    description: "Audit de vos besoins, analyse concurrence, définition du cahier des charges et de la stratégie digitale."
  },
  {
    step: "2. Design",
    duration: "2-3 semaines",
    description: "Wireframes, maquettes Figma, prototypage interactif, validation du design avec vous."
  },
  {
    step: "3. Développement",
    duration: "3-6 semaines",
    description: "Intégration front-end, développement back-end, connexion API, optimisations performance."
  },
  {
    step: "4. Contenu & SEO",
    duration: "1-2 semaines",
    description: "Intégration contenus, optimisation SEO technique, configuration Analytics, tests."
  },
  {
    step: "5. Tests & QA",
    duration: "1 semaine",
    description: "Tests multi-navigateurs, mobile, performance, sécurité, accessibilité (RGAA)."
  },
  {
    step: "6. Lancement",
    duration: "1 semaine",
    description: "Mise en production, configuration DNS, formation équipe, documentation complète."
  }
];

const faqs = [
  {
    question: "Quel est le délai pour créer un site internet ?",
    answer: "Un site vitrine prend 4-6 semaines, un site e-commerce 8-12 semaines, et un projet sur-mesure 3-6 mois. Le délai dépend de la complexité, du nombre de fonctionnalités et de la rapidité de vos retours."
  },
  {
    question: "Pourquoi choisir Next.js plutôt que WordPress ?",
    answer: "Next.js offre des performances SEO supérieures (temps de chargement 3x plus rapides), une sécurité renforcée (pas de plugins vulnérables), et une scalabilité illimitée. Idéal pour les projets ambitieux nécessitant rapidité et flexibilité."
  },
  {
    question: "Le prix inclut-il l'hébergement ?",
    answer: "Non, l'hébergement est facturé séparément (40-100€/an selon vos besoins). Nous recommandons Vercel (Next.js) ou O2Switch (WordPress) et gérons la configuration pour vous."
  },
  {
    question: "Puis-je modifier le site moi-même après livraison ?",
    answer: "Oui ! Nous intégrons un CMS (Sanity, Strapi ou WordPress Headless) pour que vous puissiez modifier facilement textes, images et articles. Formation incluse à la livraison."
  },
  {
    question: "Proposez-vous la maintenance après livraison ?",
    answer: "Oui, nous proposons des forfaits maintenance de 150 à 500€/mois incluant : mises à jour, sauvegardes quotidiennes, surveillance sécurité, support technique prioritaire et évolutions mineures."
  },
  {
    question: "Mon site sera-t-il optimisé pour le référencement Google ?",
    answer: "Absolument. Tous nos sites incluent un SEO technique de base : balises optimisées, vitesse maximale, mobile-first, Schema.org, sitemap. Pour un SEO avancé (contenu, netlinking), découvrez notre service dédié."
  },
  {
    question: "Puis-je voir des exemples de sites que vous avez créés ?",
    answer: "Bien sûr ! Consultez notre portfolio sur /works : Charit.io, Disobey, Paradox, TheBlkSmith, etc. Chaque projet affiche les technologies utilisées et les résultats obtenus."
  },
  {
    question: "Travaillez-vous avec des clients hors de Paris ?",
    answer: "Oui ! Nous travaillons avec des clients partout en France (et francophones à l'international). Nos process sont 100% digitaux : visios, Slack, Notion. Nous restons disponibles et réactifs où que vous soyez."
  },
  {
    question: "Proposez-vous des paiements échelonnés ?",
    answer: "Oui. Paiement en 3 fois : 30% à la signature, 40% à la validation des maquettes, 30% à la livraison. Pour les projets >15K€, échelonnement sur 3-4 mois possible."
  },
  {
    question: "Quelle est la différence entre un site vitrine et un site e-commerce ?",
    answer: "Un site vitrine présente votre activité (pages institutionnelles, blog, contact). Un site e-commerce permet de vendre en ligne (catalogue produits, panier, paiement, gestion commandes). Le coût et la complexité sont différents."
  },
  {
    question: "Créez-vous des sites multilingues ?",
    answer: "Oui, nous gérons le multilangue via Next.js i18n ou des plugins WordPress WPML. Coût additionnel : +1000€ par langue supplémentaire (traduction non incluse)."
  },
  {
    question: "Mon site sera-t-il accessible sur mobile et tablette ?",
    answer: "Oui, tous nos sites sont responsive (adaptés à tous les écrans) et mobile-first. En 2026, 70% du trafic web est mobile : c'est un impératif, pas une option."
  },
  {
    question: "Puis-je avoir un devis personnalisé gratuit ?",
    answer: "Oui ! Remplissez notre formulaire de contact ou appelez-nous au 06 97 53 80 17. Nous vous proposons un premier échange de 30 minutes gratuit, puis un devis détaillé sous 48h."
  },
  {
    question: "Offrez-vous une garantie sur votre travail ?",
    answer: "Oui. Nous corrigeons gratuitement tout bug ou dysfonctionnement pendant 30 jours après livraison. Les évolutions ou modifications majeures sont facturées séparément."
  },
  {
    question: "Comment se passe le suivi après la mise en ligne ?",
    answer: "Nous incluons 1 à 6 mois de support selon le forfait : réponse sous 48h par email/Slack, corrections bugs, conseils d'optimisation. Ensuite, vous pouvez souscrire à un forfait maintenance mensuel."
  }
];

export default function CreationSiteInternetPage() {
  return (
    <main className="w-full bg-white min-h-screen pt-24 md:pt-32">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { name: "Accueil", url: "https://artichaud-studio.com" },
          { name: "Services", url: "https://artichaud-studio.com/services" },
          { name: "Création de Site Internet", url: "https://artichaud-studio.com/services/creation-site-internet" }
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 pb-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-arti-black leading-tight mb-6">
            Création de Site Internet sur Mesure
          </h1>
          <p className="text-xl md:text-2xl text-arti-gray font-light leading-relaxed mb-8">
            Votre site web professionnel créé avec les technologies modernes <span className="font-medium">(Next.js, React)</span>. 
            Performance, SEO et design au rendez-vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors"
            >
              Demander un devis gratuit
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-arti-black text-arti-black rounded-full font-medium hover:bg-arti-black hover:text-white transition-all"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Technologies utilisées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="p-6 border border-black/10 rounded-2xl hover:border-black/30 transition-all">
                <h3 className="text-xl font-medium text-arti-black mb-3">{tech.name}</h3>
                <p className="text-arti-gray text-sm leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-4 text-center">Nos forfaits de création de site</h2>
          <p className="text-center text-arti-gray mb-12 text-lg">Choisissez la solution adaptée à vos besoins</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="p-8 border border-black/10 rounded-2xl hover:border-black/30 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-medium text-arti-black mb-2">{plan.name}</h3>
                <div className="text-3xl font-normal text-arti-black mb-6">{plan.price}</div>
                <p className="text-sm text-arti-gray mb-6 italic">{plan.ideal}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-arti-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-arti-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors"
                >
                  Demander un devis
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Notre processus de création</h2>
          <div className="space-y-8">
            {process.map((item, index) => (
              <div key={index} className="flex gap-6 p-6 border border-black/10 rounded-2xl hover:border-black/30 transition-all">
                <div className="flex-shrink-0 w-16 h-16 bg-arti-black text-white rounded-full flex items-center justify-center font-medium text-xl">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-xl font-medium text-arti-black">{item.step}</h3>
                    <span className="text-sm text-arti-gray font-medium">{item.duration}</span>
                  </div>
                  <p className="text-arti-gray leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio CTA */}
        <div className="max-w-4xl mx-auto mb-24 text-center p-12 bg-gray-50 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">Découvrez nos réalisations</h2>
          <p className="text-arti-gray mb-8 text-lg">
            Plus de 50 projets livrés : sites vitrines, e-commerce, applications web sur-mesure
          </p>
          <Link
            href="/works"
            className="inline-flex items-center justify-center px-8 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors"
          >
            Voir le portfolio
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
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

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-arti-black rounded-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Prêt à créer votre site internet ?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Discutons de votre projet et recevez un devis détaillé sous 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-arti-black rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Demander un devis gratuit
              </Link>
              <a
                href="tel:0697538017"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-arti-black transition-all"
              >
                06 97 53 80 17
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
