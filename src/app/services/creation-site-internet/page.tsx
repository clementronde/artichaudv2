import type { Metadata } from "next";
import CreationSiteInternetClient from "./CreationSiteInternetClient";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { relatedLinkGroups } from "@/components/seo/relatedLinksData";

export const metadata: Metadata = {
  title: "Création de site internet sur mesure | Sites vitrines & web apps",
  description: "Création de sites internet sur mesure : site vitrine, site corporate, e-commerce et application web. Design, développement, performance et SEO technique intégrés.",
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
    title: "Création de site internet sur mesure - Artichaud Studio",
    description: "Sites vitrines, e-commerce et applications web modernes. Design, développement, performance et SEO technique.",
    url: "https://www.artichaud-studio.com/services/creation-site-internet",
    images: [
      {
        url: "https://www.artichaud-studio.com/icon.png",
        width: 512,
        height: 512,
        alt: "Création de site internet sur mesure - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://www.artichaud-studio.com/services/creation-site-internet"
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
