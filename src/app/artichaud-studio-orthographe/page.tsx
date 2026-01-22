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

const commonMisspellings = [
  { wrong: "artichaut studio", correct: "artichaud studio", note: "C'est avec un D, pas un T" },
  { wrong: "artichaut-studio", correct: "artichaud-studio", note: "Attention à la fin : -aud, pas -aut" },
  { wrong: "artichaut", correct: "artichaud", note: "Le légume s'écrit avec un T, mais pas nous" },
  { wrong: "studio artichaut", correct: "studio artichaud", note: "Dans tous les sens, c'est bien -aud" },
  { wrong: "artichaud studio.com", correct: "artichaud-studio.com", note: "Avec un tiret entre les deux mots" },
  { wrong: "artichaux studio", correct: "artichaud studio", note: "Ce n'est pas le pluriel du légume" },
  { wrong: "artichau studio", correct: "artichaud studio", note: "N'oubliez pas le D final" },
  { wrong: "artishaud studio", correct: "artichaud studio", note: "C'est bien avec un C, pas SH" },
];

export default function OrthographePage() {
  return (
    <main className="w-full bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="max-w-4xl mb-20">
          <h1 className="text-5xl md:text-6xl font-normal mb-6">
            C&apos;est Artichaud Studio
            <br />
            <span className="text-gray-500">avec un D</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Vous nous cherchez ? Vous nous avez trouvés. On confond souvent notre nom avec le légume <em>artichaut</em> (avec un T),
            mais notre studio s&apos;écrit bien <strong>Artichaud</strong> avec un <strong>D</strong>.
          </p>
        </div>

        {/* Erreurs courantes */}
        <div className="max-w-5xl mb-20">
          <h2 className="text-3xl md:text-4xl font-normal mb-12">
            Les erreurs d&apos;orthographe courantes
          </h2>

          <div className="space-y-6">
            {commonMisspellings.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Incorrect</span>
                    <p className="text-2xl text-gray-400 line-through">
                      {item.wrong}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 mb-2 block">Correct</span>
                    <p className="text-2xl font-medium text-black mb-2">
                      {item.correct}
                    </p>
                    <p className="text-base text-gray-600">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pourquoi cette confusion */}
        <div className="max-w-4xl mb-20">
          <div className="border-l-2 border-black pl-8 mb-12">
            <h2 className="text-3xl md:text-4xl font-normal mb-6">
              Pourquoi cette confusion ?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              L&apos;<strong>artichaut</strong> (avec un T) est le délicieux légume que tout le monde connaît.
              Mais <strong>Artichaud Studio</strong> (avec un D) est notre agence de création de sites web et de branding basée à Paris.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nous avons choisi ce nom justement pour son jeu de mots et sa mémorabilité.
              Comme l&apos;artichaut qui cache un cœur tendre sous ses feuilles, nous révélons le cœur de votre marque.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 p-12 bg-gray-50 rounded-2xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-normal mb-4">
              Maintenant que vous savez comment nous écrire
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Découvrez ce qu&apos;Artichaud Studio peut faire pour votre projet
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                Nos Services →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Parlons-en →
              </Link>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="max-w-4xl mt-32 pt-20 border-t border-gray-200">
          <h2 className="text-3xl font-normal mb-6">
            Artichaud Studio : Votre agence de création digitale à Paris
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Que vous ayez cherché &quot;artichaut studio&quot;, &quot;artichaud studio&quot;, &quot;artichaut-studio&quot; ou &quot;artichaud-studio&quot;,
              vous êtes au bon endroit. Artichaud Studio est une agence spécialisée dans la création de sites internet,
              le branding et l&apos;identité visuelle pour les entreprises ambitieuses.
            </p>
            <p>
              Basée à Paris, notre équipe accompagne les marques dans leur transformation digitale avec des solutions
              sur-mesure : création de sites web, refonte de sites existants, développement d&apos;identité visuelle,
              stratégie de marque et référencement naturel (SEO).
            </p>
            <p>
              N&apos;hésitez pas à nous contacter pour discuter de votre projet. Et maintenant, vous saurez toujours comment
              écrire correctement notre nom : <strong>Artichaud Studio</strong> avec un D.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
