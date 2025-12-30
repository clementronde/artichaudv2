import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Création de Site Vitrine | WordPress, Wix, Webflow | Artichaud Studio',
  description: 'Création de sites vitrine professionnels avec WordPress, Wix ou Webflow. Design sur mesure, optimisé SEO et responsive pour votre entreprise.',
  keywords: ['site vitrine', 'WordPress', 'Wix', 'Webflow', 'création site vitrine', 'site internet professionnel'],
  openGraph: {
    title: 'Création de Site Vitrine | WordPress, Wix, Webflow',
    description: 'Sites vitrine professionnels adaptés à vos besoins',
  }
}

export default function SiteVitrinePage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Hero Section */}
        <header className="mb-16">
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4 block">
            Site vitrine professionnel
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black leading-[1.1] mb-8 tracking-tight">
            Création de site vitrine : WordPress, Wix ou Webflow
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Nous créons des <strong>sites vitrine sur mesure</strong> qui reflètent votre identité de marque. 
            Choisissez la technologie adaptée à vos besoins et votre budget.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2>Quelle plateforme choisir pour votre site vitrine ?</h2>
          <p>
            Le choix de la technologie dépend de vos objectifs, votre budget et votre niveau d'autonomie souhaité. 
            Nous vous guidons vers la meilleure solution.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-normal text-arti-black mb-8">Nos solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* WordPress */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-amber-500 transition-colors">
              <div className="mb-4">
                <h3 className="text-2xl font-medium text-arti-black mb-2">WordPress</h3>
                <span className="text-sm text-amber-600 font-medium">Le plus populaire</span>
              </div>
              <p className="text-gray-600 mb-6">
                CMS open-source flexible et puissant. Parfait pour les sites évolutifs avec blog intégré.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Grande flexibilité</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">SEO optimisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Blog intégré</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Autonomie totale</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">À partir de 3 500€</p>
            </div>

            {/* Webflow */}
            <div className="border-2 border-amber-500 rounded-2xl p-8 bg-amber-50/50">
              <div className="mb-4">
                <h3 className="text-2xl font-medium text-arti-black mb-2">Webflow</h3>
                <span className="text-sm text-amber-600 font-medium">Notre recommandation</span>
              </div>
              <p className="text-gray-600 mb-6">
                Plateforme no-code professionnelle. Design pixel-perfect et animations fluides.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Design sur mesure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Animations avancées</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Hébergement inclus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Rapide à déployer</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">À partir de 4 500€</p>
            </div>

            {/* Wix */}
            <div className="border-2 border-gray-200 rounded-2xl p-8 hover:border-amber-500 transition-colors">
              <div className="mb-4">
                <h3 className="text-2xl font-medium text-arti-black mb-2">Wix</h3>
                <span className="text-sm text-amber-600 font-medium">Budget maîtrisé</span>
              </div>
              <p className="text-gray-600 mb-6">
                Solution clé en main simple et accessible. Idéal pour les petites structures.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Facile à gérer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Tout-en-un</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Mise en ligne rapide</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-sm text-gray-700">Prix abordable</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">À partir de 2 500€</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-medium text-arti-black mb-8">Notre processus de création</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
              <h3 className="font-medium text-arti-black mb-2">Atelier stratégie</h3>
              <p className="text-sm text-gray-600">Compréhension de vos objectifs et de votre cible</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
              <h3 className="font-medium text-arti-black mb-2">Design UI/UX</h3>
              <p className="text-sm text-gray-600">Maquettes sur mesure selon votre identité</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
              <h3 className="font-medium text-arti-black mb-2">Développement</h3>
              <p className="text-sm text-gray-600">Intégration et animations fluides</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold mb-4">4</div>
              <h3 className="font-medium text-arti-black mb-2">Livraison</h3>
              <p className="text-sm text-gray-600">Formation et mise en ligne</p>
            </div>
          </div>
        </div>

        {/* Internal Links */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-medium text-arti-black mb-6">Nos services par région</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/creation-site-internet-paris"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Création site vitrine Paris →</h3>
              <p className="text-gray-600 text-sm">Agence web au cœur de la capitale</p>
            </Link>
            
            <Link 
              href="/creation-site-internet-boulogne-billancourt"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Site vitrine Boulogne →</h3>
              <p className="text-gray-600 text-sm">Proximité et réactivité à Boulogne-Billancourt</p>
            </Link>

            <Link 
              href="/services"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Tous nos services →</h3>
              <p className="text-gray-600 text-sm">Brand identity, e-commerce, applications web</p>
            </Link>

            <Link 
              href="/works"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Nos réalisations →</h3>
              <p className="text-gray-600 text-sm">Portfolio de sites vitrine</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Créons ensemble votre site vitrine
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Devis gratuit sous 48h. Premier rendez-vous stratégique offert.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Demander un devis <span>→</span>
          </Link>
        </div>

      </article>
    </main>
  )
}
