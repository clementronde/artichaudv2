import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Création de Site Internet à Boulogne-Billancourt | Artichaud Studio',
  description: 'Agence web à Boulogne-Billancourt spécialisée en création de sites internet. Design moderne, développement sur mesure et stratégie digitale pour votre entreprise.',
  keywords: ['création site internet Boulogne-Billancourt', 'agence web Boulogne', 'développement web 92100', 'site vitrine Boulogne-Billancourt'],
  openGraph: {
    title: 'Création de Site Internet à Boulogne-Billancourt | Artichaud Studio',
    description: 'Agence web à Boulogne-Billancourt spécialisée en création de sites internet.',
  }
}

export default function BoulogneBillancourtPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Hero Section */}
        <header className="mb-16">
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4 block">
            Boulogne-Billancourt
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black leading-[1.1] mb-8 tracking-tight">
            Création de site internet à Boulogne-Billancourt
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Agence web locale spécialisée dans la <strong>création de sites internet sur mesure</strong> pour les entreprises de Boulogne-Billancourt et des Hauts-de-Seine.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2>Pourquoi choisir Artichaud Studio à Boulogne-Billancourt ?</h2>
          <p>
            Basée en région parisienne, notre agence accompagne les entreprises de <strong>Boulogne-Billancourt (92100)</strong> dans leur transformation digitale. 
            Nous créons des sites internet qui allient design moderne et performance technique.
          </p>

          <h3>Nos services à Boulogne-Billancourt</h3>
          <ul>
            <li><strong>Création de sites vitrines</strong> - Présentez votre activité avec élégance</li>
            <li><strong>Sites e-commerce</strong> - Vendez vos produits en ligne</li>
            <li><strong>Applications web</strong> - Solutions sur mesure pour votre métier</li>
            <li><strong>Refonte de site</strong> - Modernisez votre présence en ligne</li>
          </ul>

          <h3>Technologies modernes</h3>
          <p>
            Nous utilisons les dernières technologies pour garantir des sites performants : 
            <strong> Next.js, React, WordPress, Webflow</strong> et <strong>Wix</strong> selon vos besoins.
          </p>
        </div>

        {/* Internal Linking Section */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-medium text-arti-black mb-6">Nos autres services de création web</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/creation-site-internet-paris"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Création site internet Paris →</h3>
              <p className="text-gray-600 text-sm">Agence web à Paris pour tous vos projets digitaux</p>
            </Link>
            
            <Link 
              href="/creation-site-vitrine"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Site vitrine professionnel →</h3>
              <p className="text-gray-600 text-sm">WordPress, Wix ou Webflow selon vos besoins</p>
            </Link>

            <Link 
              href="/services"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Tous nos services →</h3>
              <p className="text-gray-600 text-sm">Brand Identity, Web Design, Stratégie digitale</p>
            </Link>

            <Link 
              href="/works"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Nos réalisations →</h3>
              <p className="text-gray-600 text-sm">Découvrez nos projets de création de sites web</p>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Un projet de site internet à Boulogne-Billancourt ?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Discutons de votre projet autour d'un café. Nos bureaux sont facilement accessibles depuis Boulogne-Billancourt.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Demander un devis gratuit <span>→</span>
          </Link>
        </div>

      </article>
    </main>
  )
}
