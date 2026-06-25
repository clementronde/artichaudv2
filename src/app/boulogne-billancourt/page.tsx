import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Boulogne-Billancourt — Tissu économique, entreprises et ressources | Artichaud Studio" },
  description: "Présentation factuelle de Boulogne-Billancourt (92100) : tissu économique, quartiers d'affaires, grandes entreprises, PME et ressources pour les entreprises locales.",
  keywords: [
    "Boulogne-Billancourt entreprises",
    "tissu économique Boulogne-Billancourt",
    "quartier affaires Boulogne",
    "TF1 Boulogne-Billancourt",
    "ZAC Seguin Rives de Seine",
    "92100 Hauts-de-Seine",
    "agence web Boulogne-Billancourt",
  ],
  alternates: {
    canonical: `${SITE_URL}/boulogne-billancourt`,
  },
  openGraph: {
    title: "Boulogne-Billancourt — Tissu économique et ressources pour les entreprises",
    description: "Guide factuel sur Boulogne-Billancourt (92100) : grands groupes, PME, quartiers d'affaires et ressources digitales pour les entreprises locales.",
    url: `${SITE_URL}/boulogne-billancourt`,
    siteName: "Artichaud Studio",
    locale: "fr_FR",
    type: "website",
  },
};

const citySchema = {
  "@context": "https://schema.org",
  "@type": "City",
  "name": "Boulogne-Billancourt",
  "alternateName": "Boulogne",
  "description": "Boulogne-Billancourt est une commune des Hauts-de-Seine (92), en Île-de-France, limitrophe de Paris au sud-ouest. Elle est l'une des villes les plus dynamiques de la région avec un tissu économique dense mêlant grands groupes, PME et indépendants.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8396",
    "longitude": "2.2400"
  },
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": "Hauts-de-Seine",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    }
  },
  "url": `${SITE_URL}/boulogne-billancourt`
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "Boulogne-Billancourt", "item": `${SITE_URL}/boulogne-billancourt` }
  ]
};

const sections = [
  {
    id: "geographie",
    label: "Géographie",
    title: "Une ville limitrophe de Paris au cœur des Hauts-de-Seine.",
    content: [
      "Boulogne-Billancourt est une commune du département des Hauts-de-Seine (92), en région Île-de-France. Elle est limitrophe de Paris (16e arrondissement) à l'est, de Sèvres au sud-ouest et d'Issy-les-Moulineaux au sud.",
      "La ville est traversée par la Seine à l'ouest, avec l'île Seguin — ancienne île industrielle en cours de réaménagement — et les berges aménagées en promenade. Le code postal principal est le 92100.",
      "Boulogne-Billancourt est accessible par la ligne 9 du métro (stations Marcel Sembat et Boulogne – Jean Jaurès) et la ligne 10 (stations Boulogne – Pont de Saint-Cloud et Boulogne – Jean Jaurès). La ligne 10 du tramway T2 longe les berges de Seine.",
    ],
  },
  {
    id: "economie",
    label: "Économie",
    title: "Un tissu économique dense entre grands groupes et PME.",
    content: [
      "Boulogne-Billancourt est l'une des communes les plus économiquement actives d'Île-de-France, avec une concentration remarquable d'entreprises dans les secteurs des médias, de la communication, des services et de la technologie.",
      "TF1 a son siège social à Boulogne-Billancourt (1 quai du Point du Jour), ce qui en fait un pôle majeur du secteur audiovisuel français. De nombreuses entreprises de communication, de production et de créativité gravitent autour de cette ancrage media.",
      "Au-delà des grands groupes, la ville abrite un tissu dense de PME, studios créatifs, cabinets de conseil, agences, professions libérales et commerces qui constituent l'essentiel du tissu économique quotidien. Les rues du centre-ville (rue de Silly, avenue du Général Leclerc, rue Marcel Sembat) concentrent un commerce de proximité actif.",
    ],
  },
  {
    id: "zac-seguin",
    label: "ZAC Seguin",
    title: "La ZAC Seguin-Rives de Seine : un territoire en mutation.",
    content: [
      "L'île Seguin a accueilli les usines Renault de 1929 à 1992. Après la fermeture de l'usine et la démolition des bâtiments, le site a été reconverti dans le cadre de la ZAC Seguin-Rives de Seine, l'un des projets urbains les plus ambitieux de la région parisienne.",
      "Ce vaste programme de réaménagement a transformé les anciens sites industriels en quartiers mixtes mêlant bureaux, logements, équipements culturels et espaces publics. La Seine Musicale, salle de spectacle inaugurée en 2017 sur l'île Seguin, en est le symbole le plus visible.",
      "Le quartier du Trapèze, développé sur l'ancien site de l'usine Renault côté berge, accueille aujourd'hui des bureaux d'entreprises, des logements et des commerces. Il illustre la transformation de Boulogne-Billancourt vers une économie de services et de création.",
    ],
  },
  {
    id: "quartiers",
    label: "Quartiers",
    title: "Les quartiers clés pour les entreprises et indépendants.",
    content: [
      "Le centre-ville historique, autour de la mairie et de la rue de Silly, concentre le commerce de proximité et de nombreux professions libérales (médecins, avocats, architectes, consultants). C'est également là que se trouvent beaucoup d'agences, studios et petites structures.",
      "Le quartier Marcel Sembat, autour de la station de métro, est particulièrement animé en termes de services, restaurants et petits commerces. C'est dans ce secteur qu'Artichaud Studio est installé (18 rue d'Aguesseau).",
      "Le quartier de la Manufacture, au nord de la ville, accueille le Campus Bouygues et plusieurs entreprises de taille importante. Il est en développement continu.",
      "Les berges de Seine offrent un cadre de travail atypique avec des espaces de coworking, des startups et des acteurs culturels attirés par la qualité de l'environnement et la proximité de Paris.",
    ],
  },
  {
    id: "numerique",
    label: "Numérique",
    title: "Un écosystème digital en développement.",
    content: [
      "Boulogne-Billancourt n'est pas qu'un pôle media traditionnel. La ville attire de plus en plus d'acteurs du numérique, de startups et d'agences digitales qui bénéficient à la fois de la proximité de Paris, des loyers légèrement inférieurs et d'un cadre de vie agréable.",
      "Les entreprises du numérique présentes à Boulogne-Billancourt opèrent dans des secteurs variés : communication digitale, développement web, e-commerce, marketing, design, SaaS et applications mobiles.",
      "La demande en création de sites internet, en référencement local et en branding digital est forte dans ce tissu économique. Les commerces locaux, PME et professions libérales de Boulogne-Billancourt cherchent à renforcer leur visibilité en ligne, notamment sur les recherches locales Google.",
    ],
  },
  {
    id: "vie-pratique",
    label: "Pratique",
    title: "Boulogne-Billancourt en pratique pour les entreprises.",
    content: [
      "La ville est desservie par plusieurs lignes de transport en commun depuis Paris et le reste de l'Île-de-France : métro lignes 9 et 10, tramway T2, nombreuses lignes de bus. L'accès en voiture est facilité par le boulevard périphérique et le pont de Sèvres.",
      "Boulogne-Billancourt dispose de plusieurs espaces de coworking et pépinières d'entreprises. La Chambre de Commerce et d'Industrie (CCI) des Hauts-de-Seine accompagne les entrepreneurs locaux.",
      "La ville héberge plusieurs associations et réseaux d'entreprises locaux qui permettent aux professionnels de Boulogne-Billancourt de se connecter et de développer leur activité.",
    ],
  },
];

export default function BoulognePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="w-full bg-white min-h-screen pt-32 md:pt-40 pb-24 overflow-x-hidden">

        {/* Hero */}
        <section className="px-6 md:px-10 mb-20 md:mb-28">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
            <div className="hidden md:block md:col-span-1 pt-2">
              <span className="text-sm font-medium text-gray-500">Guide local</span>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">Boulogne-Billancourt — 92100 Hauts-de-Seine</p>
              <h1 className="text-[40px] md:text-[72px] lg:text-[88px] leading-[0.95] font-normal tracking-tight text-black">
                Tissu économique, entreprises et ressources à Boulogne-Billancourt.
              </h1>
            </div>
            <div className="md:col-span-2 md:col-start-7 md:pt-2">
              <p className="text-base leading-relaxed text-gray-500">
                Un guide factuel sur la ville, ses quartiers, ses entreprises et son écosystème économique.
              </p>
            </div>
          </div>
        </section>

        {/* Chiffres-clés */}
        <section className="px-6 md:px-10 py-16 md:py-20 bg-[#F6F6F3] mb-0">
          <div className="md:ml-[calc(12.5%+0.625rem)] grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "120 000", label: "habitants" },
              { value: "92100", label: "code postal principal" },
              { value: "Ligne 9 & 10", label: "métros desservant la ville" },
              { value: "1er", label: "pôle audiovisuel francilien (TF1)" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-normal text-black mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="px-6 md:px-10 py-16 md:py-20 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
              <div className="hidden md:block md:col-span-1 pt-1">
                <span className="text-sm font-medium text-gray-400">{section.label}</span>
              </div>
              <div className="md:col-span-3 md:col-start-2">
                <h2 className="text-[28px] md:text-[40px] leading-[1.1] font-normal tracking-tight text-black">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-4 space-y-5 text-lg leading-relaxed text-gray-600">
                {section.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Section Artichaud Studio */}
        <section className="px-6 md:px-10 py-16 md:py-20 bg-[#F6F6F3] border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
            <div className="hidden md:block md:col-span-1 pt-1">
              <span className="text-sm font-medium text-gray-400">Studio local</span>
            </div>
            <div className="md:col-span-3 md:col-start-2">
              <h2 className="text-[28px] md:text-[40px] leading-[1.1] font-normal tracking-tight text-black">
                Artichaud Studio, agence web et branding à Boulogne-Billancourt.
              </h2>
            </div>
            <div className="md:col-span-4 space-y-5 text-lg leading-relaxed text-gray-600">
              <p>
                Installé au 18 rue d'Aguesseau (quartier Marcel Sembat), Artichaud Studio accompagne les entreprises de Boulogne-Billancourt et du 92 dans leur création de site internet, leur identité visuelle et leur référencement local.
              </p>
              <p>
                Studio indépendant réunissant un développeur-stratège digital et une directrice artistique, Artichaud travaille avec des commerces, cabinets, PME, startups et professions libérales de la ville et des communes voisines (Issy-les-Moulineaux, Saint-Cloud, Sèvres, Neuilly-sur-Seine, Paris 16e).
              </p>
              <div className="pt-2 text-base text-gray-500">
                <p>18 rue d'Aguesseau, 92100 Boulogne-Billancourt</p>
                <p>Métro Marcel Sembat (ligne 9) · hello@artichaud-studio.com · 07 66 48 99 82</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/creation-site-internet-boulogne-billancourt"
                  className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-[#F70046] transition-colors"
                >
                  Création site web à Boulogne →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  Prendre contact
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation interne */}
        <section className="px-6 md:px-10 py-12 border-t border-gray-100">
          <div className="md:ml-[calc(12.5%+0.625rem)]">
            <p className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">Sections de ce guide</p>
            <div className="flex flex-wrap gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-black/10 px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
