import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Création de Site Internet à Paris | Agence Web Artichaud Studio',
  description: 'Agence de création de sites internet à Paris. Design moderne, développement web sur mesure et stratégie digitale pour votre entreprise parisienne.',
  keywords: ['création site internet Paris', 'agence web Paris', 'développement web Paris', 'site vitrine Paris'],
  openGraph: {
    title: 'Création de Site Internet à Paris | Agence Web Artichaud Studio',
    description: 'Agence de création de sites internet à Paris.',
  }
}

export default function ParisPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <article className="container mx-auto px-6 md:px-12 max-w-5xl">
        
        {/* Hero Section */}
        <header className="mb-16">
          <span className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4 block">
            Paris - Île-de-France
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-arti-black leading-[1.1] mb-8 tracking-tight">
            Agence de création de site internet à Paris
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Studio créatif parisien spécialisé en <strong>création de sites web sur mesure</strong>. 
            Du site vitrine à l'application web complexe, nous donnons vie à vos projets digitaux.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2>Votre partenaire digital au cœur de Paris</h2>
          <p>
            En plein cœur de <strong>Paris</strong>, Artichaud Studio accompagne startups, PME et grands comptes 
            dans leurs projets de <strong>création de sites internet</strong>. Notre approche allie créativité, 
            stratégie et excellence technique.
          </p>

          <h3>Notre expertise parisienne</h3>
          <ul>
            <li><strong>Design UI/UX premium</strong> - Interfaces modernes et intuitives</li>
            <li><strong>Développement web avancé</strong> - Next.js, React, Node.js</li>
            <li><strong>Stratégie digitale</strong> - SEO, analytics, conversion</li>
            <li><strong>Brand identity</strong> - Logo, charte graphique, storytelling</li>
          </ul>

          <h3>Pourquoi nous choisir à Paris ?</h3>
          <p>
            Parce que nous comprenons les enjeux d'une entreprise parisienne : <strong>rapidité, agilité, 
            excellence</strong>. Nous livrons des projets en 4 à 6 semaines, avec une méthodologie éprouvée 
            qui a fait ses preuves auprès de dizaines de clients parisiens.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
            <p className="mb-0">
              <strong>🚀 Démarrage rapide :</strong> Premier rendez-vous sous 48h, kickoff sous une semaine, 
              livraison en 4-6 semaines.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-normal text-arti-black mb-8">Nos solutions web à Paris</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-arti-black mb-3">Site vitrine</h3>
              <p className="text-gray-600 text-sm mb-4">
                Présentez votre activité avec un site élégant et performant. WordPress, Webflow ou développement sur mesure.
              </p>
              <Link href="/creation-site-vitrine" className="text-amber-600 text-sm font-medium hover:underline">
                En savoir plus →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-arti-black mb-3">E-commerce</h3>
              <p className="text-gray-600 text-sm mb-4">
                Boutique en ligne performante avec Shopify, WooCommerce ou solution custom selon vos besoins.
              </p>
              <Link href="/services" className="text-amber-600 text-sm font-medium hover:underline">
                Découvrir →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-arti-black mb-3">Application web</h3>
              <p className="text-gray-600 text-sm mb-4">
                Plateforme sur mesure, SaaS, dashboard : nous développons votre outil métier avec React & Next.js.
              </p>
              <Link href="/services" className="text-amber-600 text-sm font-medium hover:underline">
                Nos services →
              </Link>
            </div>
          </div>
        </div>

        {/* Internal Linking */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-medium text-arti-black mb-6">Interventions en Île-de-France</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/creation-site-internet-boulogne-billancourt"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Boulogne-Billancourt →</h3>
              <p className="text-gray-600 text-sm">Création de sites internet au 92100</p>
            </Link>
            
            <Link 
              href="/works"
              className="block p-6 bg-white rounded-xl hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-medium text-arti-black mb-2">Portfolio Paris →</h3>
              <p className="text-gray-600 text-sm">Nos réalisations pour clients parisiens</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-normal mb-4">
            Rencontrons-nous à Paris
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Premier café offert pour discuter de votre projet de création de site internet.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-amber-500 hover:text-white transition-all duration-300"
          >
            Prendre rendez-vous <span>→</span>
          </Link>
        </div>

      </article>
    </main>
  )
}
