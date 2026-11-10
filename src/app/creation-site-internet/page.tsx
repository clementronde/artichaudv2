import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbsJsonLd from "@/components/seo/BreadcrumbsJsonLd";
import { SECTEURS, villesBySecteur, type Secteur } from "@/data/villes";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// Hub des landings locales : relie toutes les villes entre elles et vers les offres, pour que Google les découvre et les rattache au même service
const title = "Création de site internet en Loire-Atlantique, en 7 jours";
const description = "Création de sites internet pour artisans et TPE à Saint-Nazaire, La Baule, Pornic, Guérande, Nantes et toute la Loire-Atlantique. Sur mesure dès 1 500 €, en ligne en 7 jours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/creation-site-internet` },
  openGraph: { title, description, url: `${SITE_URL}/creation-site-internet`, siteName: SITE_NAME, locale: "fr_FR", type: "website" },
};

const ORDRE: Secteur[] = ["estuaire", "presquile", "jade", "briere", "nantes"];

export default function CreationSiteInternetHub() {
  return (
    <main className="bg-white px-6 pb-24 pt-40 text-[#30041b] md:px-10 md:pb-[150px] md:pt-48">
      <BreadcrumbsJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Création de site internet en Loire-Atlantique", url: `${SITE_URL}/creation-site-internet` },
        ]}
      />
      <div className="mx-auto flex max-w-[1600px] flex-col gap-24 md:gap-[120px]">
        <header className="flex max-w-[980px] flex-col gap-8">
          <p className="text-[16px]">Loire-Atlantique</p>
          <h1 className="text-[44px] leading-[1.15] md:text-[65px]">Création de site internet en Loire-Atlantique</h1>
          <p className="max-w-[760px] text-[18px] leading-[1.5] md:text-[22px]">
            De Saint-Nazaire à Pornic, de La Baule à Guérande et jusqu&apos;à Nantes, on crée les sites des artisans,
            commerçants et TPE du département : un design sur mesure, un prix fixe dès 1 500 €, une mise en ligne en
            7 jours et un référencement local pensé commune par commune.
          </p>
          <div className="flex flex-wrap gap-[10px]">
            <Link href="/creation-site-internet-artisan" className="inline-flex rounded-full bg-[#30041b] px-[30px] py-[18px] text-[18px] text-white transition-opacity hover:opacity-80">
              Notre offre pour les artisans
            </Link>
            <Link href="/creation-site-internet-7-jours" className="inline-flex rounded-full border border-[#30041b] px-[30px] py-[18px] text-[18px] transition-opacity hover:opacity-80">
              Site internet en 7 jours
            </Link>
          </div>
        </header>

        {ORDRE.map((secteur) => (
          <section key={secteur} className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-5">
            <div className="flex flex-col gap-4 md:col-span-4">
              <h2 className="text-[32px] leading-[1.2] md:text-[40px]">{SECTEURS[secteur].name}</h2>
              <p className="max-w-[420px] text-[16px] leading-[1.5] text-[#30041b]/70">{SECTEURS[secteur].text}</p>
            </div>
            <ul className="grid grid-cols-1 gap-[5px] sm:grid-cols-2 md:col-span-8 md:grid-cols-3">
              {villesBySecteur(secteur).map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/creation-site-internet/${v.slug}`}
                    className="group flex h-full flex-col gap-2 bg-[#f2f2f2] px-[30px] py-[26px] transition-colors duration-300 hover:bg-[#f70046] hover:text-white"
                  >
                    <span className="text-[20px] font-medium">Création de site internet {v.in}</span>
                    <span className="text-[14px] text-[#30041b]/60 transition-colors group-hover:text-white/80">{v.postalCode}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
