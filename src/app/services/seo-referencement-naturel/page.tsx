import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "SEO & Référencement Naturel | Agence SEO Paris - Artichaud Studio",
  description: "Agence SEO Paris : optimisation technique, contenu, netlinking. Augmentez votre trafic organique et vos conversions. Audit SEO gratuit. Résultats mesurables.",
  keywords: [
    "agence SEO Paris",
    "référencement naturel Paris",
    "consultant SEO Paris",
    "optimisation SEO",
    "audit SEO gratuit",
    "agence référencement Paris",
    "SEO technique",
    "netlinking France"
  ],
  openGraph: {
    title: "SEO & Référencement Naturel - Agence SEO Paris",
    description: "Boostez votre visibilité Google avec notre agence SEO parisienne. Stratégie, technique, contenu, netlinking : résultats mesurables.",
    url: "https://artichaud-studio.com/services/seo-referencement-naturel",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "SEO & Référencement Naturel - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/seo-referencement-naturel"
  }
};

const services = [
  {
    name: "Audit SEO",
    price: "800 - 2 000 €",
    description: "Analyse complète de votre site : technique, contenu, concurrence, opportunités.",
    deliverables: [
      "Audit technique (Core Web Vitals, indexation)",
      "Analyse mots-clés et positionnement",
      "Benchmark concurrence",
      "Plan d'action priorisé",
      "Rapport PDF 30-50 pages"
    ]
  },
  {
    name: "SEO Mensuel",
    price: "1 500 - 5 000 €/mois",
    description: "Accompagnement SEO continu : optimisations, contenu, netlinking, suivi mensuel.",
    deliverables: [
      "Optimisations techniques mensuelles",
      "Création de contenu SEO (2-4 articles/mois)",
      "Stratégie netlinking (5-15 backlinks/mois)",
      "Suivi rankings & trafic",
      "Rapport mensuel détaillé",
      "Visio stratégique mensuelle"
    ]
  },
  {
    name: "SEO Local",
    price: "800 - 2 500 €/mois",
    description: "Dominez les recherches locales : Google My Business, citations, avis, contenu localisé.",
    deliverables: [
      "Optimisation Google My Business",
      "Gestion des avis clients",
      "Citations locales (20+ annuaires)",
      "Contenu localisé (pages, articles)",
      "Suivi Local Pack",
      "Rapport mensuel"
    ]
  }
];

const pillars = [
  {
    name: "SEO Technique",
    description: "Optimisation de la structure, vitesse, indexation, Core Web Vitals, Schema.org.",
    icon: "⚙️"
  },
  {
    name: "Contenu SEO",
    description: "Stratégie éditoriale, rédaction optimisée, topic clusters, mots-clés longue traîne.",
    icon: "📝"
  },
  {
    name: "Netlinking",
    description: "Acquisition de backlinks qualité (DR 40+), guest posting, broken link building.",
    icon: "🔗"
  }
];

const faqs = [
  {
    question: "Combien de temps pour voir des résultats SEO ?",
    answer: "Les premiers résultats apparaissent après 2-3 mois (amélioration de positionnements). Les résultats significatifs (top 3-5) nécessitent 4-6 mois. Le SEO est un investissement moyen/long terme qui génère du trafic durable, contrairement aux ads qui s'arrêtent dès que vous coupez le budget."
  },
  {
    question: "Quelle est la différence entre SEO et SEA (Google Ads) ?",
    answer: "Le SEO (référencement naturel) consiste à optimiser votre site pour apparaître dans les résultats organiques gratuitement. Le SEA (publicité Google Ads) vous fait apparaître en haut via des annonces payantes. Le SEO demande plus de temps mais génère un trafic pérenne. Le SEA donne des résultats immédiats mais coûte cher en continu."
  },
  {
    question: "Garantissez-vous la première position sur Google ?",
    answer: "Non, et fuyez les agences qui le promettent (c'est impossible). Google utilise 200+ critères de ranking que personne ne contrôle à 100%. Nous garantissons en revanche : amélioration mesurable du trafic, montée en positions top 10-3, méthodologie éprouvée, transparence totale."
  },
  {
    question: "Combien coûte le référencement naturel ?",
    answer: "Audit SEO : 800-2000€ (ponctuel). Accompagnement mensuel : 1500-5000€/mois selon l'ampleur (taille site, concurrence, objectifs). SEO local : 800-2500€/mois. Le ROI est généralement de 500-1000% sur 12 mois (trafic organique vs coût SEO)."
  },
  {
    question: "Proposez-vous un audit SEO gratuit ?",
    answer: "Oui, nous offrons un audit rapide (30 minutes) lors du premier échange : analyse de vos positions actuelles, opportunités principales, estimation du potentiel. Pour un audit complet (30-50 pages), comptez 800-2000€ selon la taille du site."
  },
  {
    question: "Quels outils SEO utilisez-vous ?",
    answer: "Nous utilisons les meilleurs outils du marché : Ahrefs (backlinks, mots-clés), SEMrush (concurrence, audit), Google Search Console (performance), Google Analytics 4 (trafic), Screaming Frog (audit technique), PageSpeed Insights (performance)."
  },
  {
    question: "Travaillez-vous sur des sites e-commerce ?",
    answer: "Oui, nous sommes spécialisés en SEO e-commerce (Shopify, WooCommerce, PrestaShop). Nous optimisons : fiches produits, catégories, structure, rich snippets, Core Web Vitals. Résultats moyens : +150% trafic organique en 6 mois."
  },
  {
    question: "Le SEO fonctionne-t-il pour toutes les niches ?",
    answer: "Oui, le SEO fonctionne dans tous les secteurs. Les niches très concurrentielles (assurance, immobilier, finance) demandent plus d'efforts et de budget. Les niches moins compétitives donnent des résultats plus rapides. Nous adaptons notre stratégie à votre marché."
  },
  {
    question: "Puis-je gérer le SEO moi-même sans agence ?",
    answer: "C'est possible si vous avez du temps et des compétences techniques. Le SEO nécessite : expertise technique (indexation, vitesse), rédaction optimisée, stratégie netlinking, veille constante des updates Google. Une agence vous fait gagner du temps et évite les erreurs coûteuses."
  },
  {
    question: "Comment mesurez-vous les résultats SEO ?",
    answer: "Nous suivons chaque mois : nombre de mots-clés en top 3/10/50, trafic organique (visites, pages vues), taux de conversion, backlinks obtenus, Domain Rating, positions sur mots-clés cibles. Rapport mensuel complet avec graphs et recommandations."
  }
];

export default function SEOReferencementPage() {
  return (
    <main className="w-full bg-white min-h-screen pt-24 md:pt-32">
      <Breadcrumbs 
        items={[
          { name: "Accueil", url: "https://artichaud-studio.com" },
          { name: "Services", url: "https://artichaud-studio.com/services" },
          { name: "SEO & Référencement Naturel", url: "https://artichaud-studio.com/services/seo-referencement-naturel" }
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-arti-black leading-tight mb-6">
            SEO & Référencement Naturel
          </h1>
          <p className="text-xl md:text-2xl text-arti-gray font-light leading-relaxed mb-8">
            Augmentez votre trafic organique et vos conversions. <span className="font-medium">Stratégie SEO complète</span> : technique, contenu, netlinking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors">
              Demander un audit SEO gratuit
            </Link>
            <Link href="/blog" className="inline-flex items-center justify-center px-8 py-4 border-2 border-arti-black text-arti-black rounded-full font-medium hover:bg-arti-black hover:text-white transition-all">
              Lire nos guides SEO
            </Link>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Les 3 piliers du SEO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="p-8 border border-black/10 rounded-2xl hover:border-black/30 transition-all text-center">
                <div className="text-5xl mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-medium text-arti-black mb-4">{pillar.name}</h3>
                <p className="text-arti-gray leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Nos prestations SEO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 border border-black/10 rounded-2xl hover:border-black/30 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-medium text-arti-black mb-2">{service.name}</h3>
                <div className="text-3xl font-normal text-arti-black mb-4">{service.price}</div>
                <p className="text-arti-gray mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-arti-gray">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-arti-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full text-center px-6 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors">
                  Démarrer
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Questions fréquentes sur le SEO</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-medium mb-3 text-arti-black">{faq.question}</h3>
                <p className="text-arti-gray leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-arti-black rounded-2xl text-white">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">Boostez votre trafic organique</h2>
            <p className="text-white/70 mb-8 text-lg">Demandez votre audit SEO gratuit et découvrez votre potentiel de croissance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-arti-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Demander un audit gratuit
              </Link>
              <a href="tel:0697538017" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-arti-black transition-all">
                06 97 53 80 17
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
