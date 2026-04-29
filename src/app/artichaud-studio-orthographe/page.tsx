import type { Metadata } from "next";
import Link from "next/link";
import RelatedLinks, { relatedLinkGroups } from "@/components/seo/RelatedLinks";

export const metadata: Metadata = {
  title: "Artichaud Studio - Orthographe Correcte | Artichaud, Artichaut ?",
  description: "Vous cherchez Artichaud Studio ? Notre studio de création web et branding s'écrit Artichaud avec un D.",
  keywords: [
    "artichaud studio",
    "artichaut studio",
    "artichaud-studio",
    "artichaut-studio",
    "orthographe artichaud",
    "agence artichaud Paris",
  ],
  openGraph: {
    title: "Artichaud Studio - Comment nous écrire correctement",
    description: "Artichaud Studio avec un D. Studio de création web, branding et stratégie digitale à Paris.",
    url: "https://artichaud-studio.com/artichaud-studio-orthographe",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Artichaud Studio - Orthographe",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://artichaud-studio.com/artichaud-studio-orthographe",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const commonMisspellings = [
  { wrong: "artichaut studio", correct: "artichaud studio" },
  { wrong: "artichaut-studio", correct: "artichaud-studio" },
  { wrong: "artichaut", correct: "artichaud" },
  { wrong: "studio artichaut", correct: "studio artichaud" },
  { wrong: "artichaud studio.com", correct: "artichaud-studio.com" },
  { wrong: "artishaud studio", correct: "artichaud studio" },
];

export default function OrthographePage() {
  return (
    <main className="w-full bg-white text-arti-black min-h-screen pt-36 md:pt-48 pb-24 overflow-hidden">
      <section className="px-6 md:px-10 mb-24 md:mb-36">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12">
          <div className="hidden md:block md:col-span-1 pt-2">
            <span className="text-sm font-medium text-gray-500">Orthographe</span>
          </div>

          <div className="md:col-span-6 md:col-start-2">
            <h1 className="text-[48px] md:text-[84px] lg:text-[112px] leading-[0.95] font-normal tracking-tight max-w-6xl">
              Artichaud Studio,
              <br />
              avec un D.
            </h1>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-6 gap-5">
              <p className="md:col-span-4 text-xl md:text-2xl leading-relaxed text-gray-600">
                Vous avez peut-être tapé “artichaut studio”. C’est normal, le mot ressemble au légume.
                Notre studio, lui, s’écrit <strong className="font-medium text-black">Artichaud</strong>:
                un nom de marque pensé pour rester en tête.
              </p>
              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-black/10 pt-6 md:pt-0 md:pl-8">
                <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">Adresse officielle</p>
                <p className="text-2xl md:text-3xl font-medium break-words">artichaud-studio.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28 bg-black text-white rounded-t-[32px] md:rounded-t-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12">
          <div className="hidden md:block md:col-span-1 pt-2">
            <span className="text-sm font-medium text-white/50">À retenir</span>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 border-t border-white/15">
              {commonMisspellings.map((item) => (
                <div key={item.wrong} className="py-8 border-b border-white/15">
                  <p className="text-lg md:text-xl text-white/35 line-through mb-2">{item.wrong}</p>
                  <p className="text-2xl md:text-3xl font-normal">{item.correct}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10 items-start">
          <div className="hidden md:block md:col-span-1 pt-2">
            <span className="text-sm font-medium text-gray-500">Studio</span>
          </div>

          <div className="md:col-span-4 md:col-start-2">
            <h2 className="text-[36px] md:text-[56px] leading-[1.05] font-normal tracking-tight mb-8">
              Un nom singulier pour un studio qui construit des marques nettes.
            </h2>
          </div>

          <div className="md:col-span-3 space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              Artichaud Studio accompagne les entreprises ambitieuses dans leur création de site internet,
              leur identité visuelle et leur stratégie digitale.
            </p>
            <p>
              Si vous êtes arrivé ici par une faute de frappe, vous êtes au bon endroit.
              Le plus simple maintenant: voir notre travail ou nous parler de votre projet.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link href="/works" className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#D0FF00] hover:text-black">
                Voir les projets
              </Link>
              <Link href="/services" className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white">
                Nos services
              </Link>
              <Link href="/contact" className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition-colors hover:border-black hover:bg-black hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedLinks
        title="Découvrir le studio Artichaud"
        links={[
          relatedLinkGroups.serviceWeb[0],
          relatedLinkGroups.serviceBranding[0],
          relatedLinkGroups.serviceSeo[0],
          relatedLinkGroups.editorial[3],
        ]}
      />
    </main>
  );
}
