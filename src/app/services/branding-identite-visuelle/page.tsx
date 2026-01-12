import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Branding & Identité Visuelle | Agence Créative Paris - Artichaud Studio",
  description: "Agence branding Paris : création de logo, charte graphique, brand book. Identité visuelle sur-mesure pour marques ambitieuses. Tarifs dès 3000€. Devis gratuit.",
  keywords: [
    "agence branding Paris",
    "identité visuelle Paris",
    "création logo Paris",
    "charte graphique",
    "brand book",
    "agence design graphique",
    "rebranding Paris",
    "direction artistique"
  ],
  openGraph: {
    title: "Branding & Identité Visuelle - Artichaud Studio Paris",
    description: "Créez une identité de marque forte et mémorable. Logo, charte graphique, brand book par notre agence branding parisienne.",
    url: "https://artichaud-studio.com/services/branding-identite-visuelle",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Branding & Identité Visuelle - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/branding-identite-visuelle"
  }
};

const services = [
  {
    name: "Logo & Identité",
    price: "3 000 - 8 000 €",
    description: "Création de votre logo et déclinaisons (versions couleur, noir & blanc, pictogramme).",
    includes: [
      "3-5 concepts de logo",
      "2 allers-retours de révisions",
      "Déclinaisons complètes",
      "Fichiers sources (.AI, .SVG, .PNG, .PDF)",
      "Guide d'utilisation du logo",
      "Propriété intellectuelle transférée"
    ]
  },
  {
    name: "Charte Graphique Complète",
    price: "5 000 - 12 000 €",
    description: "Charte graphique professionnelle : logo, couleurs, typographie, règles d'usage.",
    includes: [
      "Logo + déclinaisons",
      "Palette de couleurs (primaire, secondaire)",
      "Typographie (titres, textes, web)",
      "Éléments graphiques (icônes, patterns)",
      "Applications (cartes de visite, templates)",
      "Brand Book PDF (30-50 pages)"
    ]
  },
  {
    name: "Branding Complet",
    price: "12 000 - 30 000 €",
    description: "Stratégie de marque complète : positionnement, identité, applications, guidelines.",
    includes: [
      "Stratégie de marque (workshop, audit)",
      "Positionnement & territoire de marque",
      "Identité visuelle complète",
      "Brand Book professionnel (50-100 pages)",
      "Templates (PPT, Word, réseaux sociaux)",
      "Shooting photo/vidéo (optionnel)",
      "Accompagnement déploiement (3 mois)"
    ]
  }
];

const process = [
  {
    step: "1. Discovery",
    duration: "1 semaine",
    description: "Workshop stratégique pour comprendre votre marque, vos valeurs, votre positionnement et vos ambitions."
  },
  {
    step: "2. Recherche & Inspiration",
    duration: "1 semaine",
    description: "Moodboards, analyse concurrence, recherche de références visuelles, définition de l'univers graphique."
  },
  {
    step: "3. Exploration Créative",
    duration: "2 semaines",
    description: "3 à 5 pistes créatives : concepts de logo, palettes de couleurs, typographies, premiers visuels."
  },
  {
    step: "4. Refinement",
    duration: "1-2 semaines",
    description: "Affinement du concept choisi, déclinaisons, applications sur différents supports, tests."
  },
  {
    step: "5. Brand Book",
    duration: "1 semaine",
    description: "Création du guide de marque complet : règles d'utilisation, exemples d'applications, dos & don'ts."
  },
  {
    step: "6. Livraison",
    duration: "1 semaine",
    description: "Fichiers sources, exports optimisés pour print/web, formation équipe, accompagnement déploiement."
  }
];

const faqs = [
  {
    question: "Quelle est la différence entre logo et identité visuelle ?",
    answer: "Le logo est le symbole graphique de votre marque. L'identité visuelle est l'ensemble des éléments graphiques : logo, couleurs, typographies, iconographie, style photo... Le logo en fait partie mais ne suffit pas à construire une identité de marque cohérente."
  },
  {
    question: "Combien de temps pour créer une identité visuelle ?",
    answer: "Un logo seul prend 3-4 semaines. Une charte graphique complète nécessite 6-8 semaines. Un projet de branding complet (stratégie + identité) demande 2-3 mois. Tout dépend de la complexité et du nombre d'allers-retours."
  },
  {
    question: "Puis-je utiliser un générateur de logo en ligne à la place ?",
    answer: "Un générateur de logo (99designs, Looka, etc.) peut créer un symbole basique rapidement et à moindre coût. Mais vous n'aurez pas : stratégie de marque, originalité garantie, cohérence globale, accompagnement pro, ni déploiement multi-supports. Pour une marque sérieuse, l'investissement dans un branding pro est essentiel."
  },
  {
    question: "Recevrai-je les fichiers sources de mon logo ?",
    answer: "Oui, absolument. Vous recevrez tous les fichiers sources (.AI, .SVG, .EPS) + exports optimisés (.PNG, .JPG, .PDF) en haute résolution. Vous êtes propriétaire à 100% de votre identité visuelle après livraison."
  },
  {
    question: "Proposez-vous un rebranding pour les marques existantes ?",
    answer: "Oui, nous accompagnons régulièrement des marques dans leur évolution. Le rebranding peut être subtil (modernisation) ou radical (transformation complète). Nous analysons l'existant, définissons la stratégie et créons la nouvelle identité en préservant ce qui fonctionne."
  },
  {
    question: "Qu'est-ce qu'un Brand Book et pourquoi en ai-je besoin ?",
    answer: "Le Brand Book (ou Bible de marque) est le guide d'utilisation de votre identité visuelle. Il garantit la cohérence sur tous les supports : logo (tailles, couleurs, interdictions), typographies, couleurs, applications... Indispensable si plusieurs personnes utilisent votre marque (équipe, agences, partenaires)."
  },
  {
    question: "Combien coûte une charte graphique ?",
    answer: "Logo seul : 3 000-8 000€. Charte graphique complète : 5 000-12 000€. Branding complet (stratégie + identité) : 12 000-30 000€. Le prix dépend du nombre de déclinaisons, d'applications et du niveau de complexité."
  },
  {
    question: "Pouvez-vous créer des applications de marque (cartes de visite, flyers, etc.) ?",
    answer: "Oui, nous créons tous types d'applications : papeterie d'entreprise, brochures, packaging, signalétique, templates réseaux sociaux, présentations PowerPoint, templates emails... Tarifs sur devis selon le nombre d'applications."
  },
  {
    question: "Travaillez-vous avec des marques de tous secteurs ?",
    answer: "Oui, nous avons créé des identités pour : tech (startups SaaS), e-commerce (mode, food), professions libérales (avocats, médecins), événementiel, culture, immobilier... Notre approche s'adapte à chaque secteur et cible."
  },
  {
    question: "Puis-je avoir des exemples de vos créations ?",
    answer: "Bien sûr ! Consultez notre portfolio sur /works : Disobey (streetwear), TheBlkSmith (joaillerie), Paradox (tech), Charit.io (non-profit)... Chaque projet affiche le process créatif et les résultats."
  }
];

export default function BrandingIdentiteVisuellePage() {
  return (
    <main className="w-full bg-white min-h-screen pt-24 md:pt-32">
      <Breadcrumbs 
        items={[
          { name: "Accueil", url: "https://artichaud-studio.com" },
          { name: "Services", url: "https://artichaud-studio.com/services" },
          { name: "Branding & Identité Visuelle", url: "https://artichaud-studio.com/services/branding-identite-visuelle" }
        ]}
      />

      <div className="container mx-auto px-6 md:px-12 pb-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal text-arti-black leading-tight mb-6">
            Branding & Identité Visuelle
          </h1>
          <p className="text-xl md:text-2xl text-arti-gray font-light leading-relaxed mb-8">
            Créez une marque forte et mémorable. <span className="font-medium">Logo, charte graphique, brand book</span> : nous donnons vie à votre identité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors">
              Demander un devis
            </Link>
            <Link href="/works" className="inline-flex items-center justify-center px-8 py-4 border-2 border-arti-black text-arti-black rounded-full font-medium hover:bg-arti-black hover:text-white transition-all">
              Voir nos créations
            </Link>
          </div>
        </div>

        {/* Services */}
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Nos prestations branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="p-8 border border-black/10 rounded-2xl hover:border-black/30 hover:shadow-xl transition-all">
                <h3 className="text-2xl font-medium text-arti-black mb-2">{service.name}</h3>
                <div className="text-3xl font-normal text-arti-black mb-4">{service.price}</div>
                <p className="text-arti-gray mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2 mb-8">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-arti-gray">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-arti-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="block w-full text-center px-6 py-4 bg-arti-black text-white rounded-full font-medium hover:bg-arti-dark transition-colors">
                  Démarrer mon projet
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="max-w-5xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Notre processus créatif</h2>
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

        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-normal mb-12 text-center">Questions fréquentes</h2>
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
            <h2 className="text-3xl md:text-4xl font-normal mb-4">Créons votre identité de marque</h2>
            <p className="text-white/70 mb-8 text-lg">Échangeons sur votre projet et recevez un devis personnalisé.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-arti-black rounded-full font-medium hover:bg-gray-100 transition-colors">
                Demander un devis gratuit
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
