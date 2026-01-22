import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artichaud Studio - Orthographe Correcte | Artichaud, Artichaut ?",
  description: "Vous cherchez Artichaud Studio ? Trouvez facilement notre agence de création de sites web et branding à Paris. Artichaud, artichaut, artichaud-studio : toutes les orthographes expliquées.",
  keywords: [
    "artichaud studio",
    "artichaut studio",
    "artichaud-studio",
    "artichaut-studio",
    "artichaud",
    "artichaut",
    "orthographe artichaud",
    "agence artichaud Paris",
    "studio artichaud",
    "artichaud web",
    "artichaud création site"
  ],
  openGraph: {
    title: "Artichaud Studio - Comment nous écrire correctement",
    description: "Artichaud Studio avec un D ! Découvrez notre agence de création web et branding à Paris.",
    url: "https://artichaud-studio.com/artichaud-studio-orthographe",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Artichaud Studio - Orthographe"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/artichaud-studio-orthographe"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function OrthographePage() {
  const commonMisspellings = [
    { wrong: "artichaut studio", correct: "artichaud studio", note: "C'est avec un D, pas un T !" },
    { wrong: "artichaut-studio", correct: "artichaud-studio", note: "Attention à la fin : -aud, pas -aut" },
    { wrong: "artichaut", correct: "artichaud", note: "Le légume s'écrit avec un T, mais pas nous !" },
    { wrong: "studio artichaut", correct: "studio artichaud", note: "Dans tous les sens, c'est bien -aud" },
    { wrong: "artichaud studio.com", correct: "artichaud-studio.com", note: "Avec un tiret entre les deux mots" },
    { wrong: "artichaux studio", correct: "artichaud studio", note: "Ce n'est pas le pluriel du légume !" },
    { wrong: "artichau studio", correct: "artichaud studio", note: "N'oubliez pas le D final" },
    { wrong: "artishaud studio", correct: "artichaud studio", note: "C'est bien avec un C, pas SH" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            C&apos;est <span className="text-blue-600">Artichaud</span> Studio
            <br />
            <span className="text-3xl md:text-4xl text-gray-600">avec un D !</span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Vous nous cherchez ? Vous nous avez trouvés ! On confond souvent notre nom avec le légume <em>artichaut</em> (avec un T),
            mais notre studio s&apos;écrit bien <strong>Artichaud</strong> avec un <strong>D</strong>.
          </p>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
            <div className="text-5xl md:text-7xl font-black text-blue-600 mb-4">
              ARTICHAUD
            </div>
            <p className="text-lg text-gray-700">
              L&apos;orthographe officielle de notre agence
            </p>
          </div>
        </div>

        {/* Common Mistakes Section */}
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Les erreurs d&apos;orthographe courantes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {commonMisspellings.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                    ✗
                  </div>
                  <div className="flex-1">
                    <p className="text-red-600 line-through font-medium mb-1">
                      {item.wrong}
                    </p>
                    <p className="text-green-600 font-bold text-lg mb-2">
                      ✓ {item.correct}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why the confusion */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-3xl">🥬</span>
              Pourquoi cette confusion ?
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              L&apos;<strong>artichaut</strong> (avec un T) est le délicieux légume que tout le monde connaît.
              Mais <strong>Artichaud Studio</strong> (avec un D) est notre agence de création de sites web et de branding basée à Paris !
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nous avons choisi ce nom justement pour son jeu de mots et sa mémorabilité.
              Comme l&apos;artichaut qui cache un cœur tendre sous ses feuilles, nous révélons le cœur de votre marque !
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Maintenant que vous savez comment nous écrire...
            </h3>
            <p className="text-xl mb-8 text-blue-50">
              Découvrez ce qu&apos;Artichaud Studio peut faire pour votre projet !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/services"
                className="inline-block bg-blue-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Nos Services
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-purple-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Nous Contacter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Liens rapides pour nous retrouver
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                artichaud-studio.com
              </code>
              <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                Artichaud Studio Paris
              </code>
              <code className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                @artichaudstudio
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Artichaud Studio : Votre agence de création digitale à Paris
            </h2>
            <p className="text-gray-700 mb-4">
              Que vous ayez cherché &quot;artichaut studio&quot;, &quot;artichaud studio&quot;, &quot;artichaut-studio&quot; ou &quot;artichaud-studio&quot;,
              vous êtes au bon endroit ! Artichaud Studio est une agence spécialisée dans la création de sites internet,
              le branding et l&apos;identité visuelle pour les entreprises ambitieuses.
            </p>
            <p className="text-gray-700 mb-4">
              Basée à Paris, notre équipe accompagne les marques dans leur transformation digitale avec des solutions
              sur-mesure : création de sites web, refonte de sites existants, développement d&apos;identité visuelle,
              stratégie de marque et référencement naturel (SEO).
            </p>
            <p className="text-gray-700">
              N&apos;hésitez pas à nous contacter pour discuter de votre projet. Et maintenant, vous saurez toujours comment
              écrire correctement notre nom : <strong>Artichaud Studio</strong> avec un D !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
