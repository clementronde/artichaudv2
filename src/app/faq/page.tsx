import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Questions Fréquentes - Artichaud Studio",
  description: "Toutes les réponses à vos questions sur la création de sites web, le branding et nos services. Tarifs, délais, processus et plus encore.",
  keywords: [
    "faq agence web",
    "questions création site internet",
    "tarif site web Paris",
    "délai création site",
    "agence branding questions"
  ],
  alternates: {
    canonical: "https://artichaud-studio.com/faq"
  },
  openGraph: {
    title: "FAQ - Artichaud Studio",
    description: "Questions fréquentes sur nos services de branding et création web à Paris.",
    url: "https://artichaud-studio.com/faq"
  }
};

const faqs = [
  {
    question: "Combien coûte un site web sur mesure ?",
    answer: "Le coût d'un site web varie selon vos besoins : un site vitrine démarre à 3000€, un site e-commerce à partir de 8000€, et un développement sur mesure à partir de 15000€. Nous proposons un devis gratuit après analyse de votre projet."
  },
  {
    question: "Quel est le délai pour créer un site internet ?",
    answer: "Un site vitrine prend généralement 4 à 6 semaines, un site e-commerce 8 à 12 semaines. Pour un projet de branding complet, comptez 6 à 8 semaines. Les délais dépendent de la complexité et de votre réactivité sur les feedbacks."
  },
  {
    question: "Quelle est la différence entre WordPress, Webflow et un développement custom ?",
    answer: "WordPress est idéal pour les blogs et sites éditoriaux (flexible, nombreux plugins). Webflow offre un design sans code avec une liberté créative totale. Un développement custom (Next.js, React) est recommandé pour les sites complexes nécessitant des fonctionnalités spécifiques et des performances optimales."
  },
  {
    question: "Comment se déroule un projet de branding ?",
    answer: "Notre processus de branding se déroule en 5 étapes : 1) Découverte et audit de marque, 2) Stratégie et positionnement, 3) Exploration créative, 4) Design de l'identité visuelle, 5) Déploiement et charte graphique complète. Chaque étape inclut des points de validation avec vous."
  },
  {
    question: "Travaillez-vous avec des startups ?",
    answer: "Absolument ! Nous accompagnons régulièrement des startups en early-stage ou en phase de levée de fonds. Nous proposons des forfaits adaptés aux budgets startup, avec possibilité de paiement échelonné et focus sur les livrables essentiels (MVP, pitch deck, identité visuelle)."
  },
  {
    question: "Quelle est votre zone d'intervention ?",
    answer: "Nous sommes basés à Paris et intervenons principalement en Île-de-France (75, 92, 93, 94). Cependant, nous travaillons également en remote avec des clients partout en France et à l'international. La plupart de nos projets peuvent se dérouler à distance avec des points réguliers en visio."
  },
  {
    question: "Proposez-vous de la maintenance après livraison ?",
    answer: "Oui, nous proposons des contrats de maintenance mensuels incluant : mises à jour de sécurité, sauvegardes, monitoring, support technique et petites modifications. Les tarifs démarrent à 150€/mois selon les besoins."
  },
  {
    question: "Puis-je modifier mon site moi-même après livraison ?",
    answer: "Oui ! Nous utilisons des CMS (WordPress, Webflow) qui vous permettent de modifier facilement vos contenus (textes, images, articles). Nous incluons systématiquement une formation pour que vous soyez autonome. Pour les sites custom, nous pouvons intégrer un CMS headless."
  },
  {
    question: "Incluez-vous le SEO dans vos prestations ?",
    answer: "Nos sites sont optimisés SEO dès la conception (structure, vitesse, métadonnées). Pour un accompagnement SEO avancé (stratégie de contenu, netlinking, suivi), nous proposons un forfait dédié à partir de 800€/mois ou des prestations ponctuelles."
  },
  {
    question: "Comment se passe le paiement ?",
    answer: "Nous fonctionnons par jalons : 30% à la signature, 40% à la validation des maquettes, 30% à la livraison. Pour les projets >15000€, un échelonnement sur 3-4 mois est possible. Nous acceptons les paiements par virement et carte bancaire."
  }
];

// Schema.org FAQ
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="w-full bg-white min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="max-w-3xl mb-20">
            <h1 className="text-5xl md:text-6xl font-normal mb-6">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Vous avez des questions sur nos services ? Nous avons les réponses.
              Si vous ne trouvez pas ce que vous cherchez, <a href="/contact" className="underline">contactez-nous</a>.
            </p>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-medium mb-4 text-black">
                  {faq.question}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 p-12 bg-gray-50 rounded-2xl text-center">
            <h2 className="text-3xl font-normal mb-4">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-gray-600 mb-8">
              Discutons de votre projet autour d'un café (virtuel ou réel)
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Parlons-en →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
