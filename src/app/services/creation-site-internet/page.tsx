import type { Metadata } from "next";
import CreationSiteInternetClient from "./CreationSiteInternetClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Création de site internet | Site vitrine, SEO & design sur mesure",
  description: "Création de site internet professionnel : stratégie, UX/UI, développement, SEO technique et contenus pensés pour convertir vos visiteurs en demandes qualifiées.",
  keywords: [
    "création site internet",
    "développement site web",
    "webdesign",
    "site web sur mesure",
    "création site vitrine",
    "site e-commerce",
    "développement web React",
    "agence Next.js",
    "refonte site internet",
    "site web responsive",
    "UX design"
  ],
  openGraph: {
    title: "Création de site internet professionnel - Artichaud Studio",
    description: "Sites vitrines, e-commerce et applications web pensés pour votre image, votre visibilité Google et vos conversions.",
    url: `${SITE_URL}/services/creation-site-internet`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "Création de site internet sur mesure - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: `${SITE_URL}/services/creation-site-internet`
  }
};

export default function CreationSiteInternetPage() {
  return (
    <>
      <CreationSiteInternetClient />
      <RelatedLinks
        title="Relier la création du site aux bonnes décisions"
        links={relatedLinkGroups.serviceWeb}
      />
    </>
  );
}
