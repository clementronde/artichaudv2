import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DM_Sans } from "next/font/google";
import MetierLanding from "@/components/landing/MetierLanding";
import VilleSeo, { villeFaq } from "@/components/landing/VilleSeo";
import { villeLanding } from "@/components/landing/metiers";
import BreadcrumbsJsonLd from "@/components/seo/BreadcrumbsJsonLd";
import { villeBySlug, villes } from "@/data/villes";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-dm-sans", display: "swap" });

type Props = { params: Promise<{ ville: string }> };

// Une page statique par ville, aucune autre URL servie
export const dynamicParams = false;
export const generateStaticParams = () => villes.map((v) => ({ ville: v.slug }));

const url = (slug: string) => `${SITE_URL}/creation-site-internet/${slug}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ville = villeBySlug((await params).ville);
  if (!ville) return {};
  const title = `Création de site internet ${ville.in}, prêt en 7 jours`;
  const description = `Création de site internet ${ville.in} (${ville.postalCode}) pour artisans, commerçants et TPE : design sur mesure dès 1 500 €, en ligne en 7 jours, référencé sur Google et les IA.`;
  return {
    title,
    description,
    alternates: { canonical: url(ville.slug) },
    openGraph: { title, description, url: url(ville.slug), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  };
}

export default async function VillePage({ params }: Props) {
  const ville = villeBySlug((await params).ville);
  if (!ville) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url(ville.slug)}#service`,
    name: `Création de site internet ${ville.in}`,
    serviceType: "Création de site internet",
    url: url(ville.slug),
    provider: { "@id": `${SITE_URL}/#organization`, "@type": "ProfessionalService", name: SITE_NAME, url: SITE_URL, telephone: "+33766489982" },
    areaServed: [
      {
        "@type": "City",
        name: ville.name,
        address: { "@type": "PostalAddress", postalCode: ville.postalCode, addressLocality: ville.name, addressRegion: "Pays de la Loire", addressCountry: "FR" },
        geo: { "@type": "GeoCoordinates", latitude: ville.geo.lat, longitude: ville.geo.lng },
      },
      ...ville.voisines.map((slug) => villeBySlug(slug)?.name).filter(Boolean).map((name) => ({ "@type": "City", name })),
    ],
    offers: [
      { "@type": "Offer", name: "Site web", price: "1500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Pack complet (identité + site)", price: "2000", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Identité graphique", price: "1000", priceCurrency: "EUR" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: villeFaq(ville).map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className={dmSans.variable}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbsJsonLd
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Création de site internet en Loire-Atlantique", url: `${SITE_URL}/creation-site-internet` },
          { name: ville.name, url: url(ville.slug) },
        ]}
      />
      <MetierLanding content={villeLanding(ville)}>
        <VilleSeo ville={ville} />
      </MetierLanding>
    </div>
  );
}
