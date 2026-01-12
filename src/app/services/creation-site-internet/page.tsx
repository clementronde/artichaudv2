import type { Metadata } from "next";
import Link from "next/link";
import { motion } from "framer-motion";
import CreationSiteInternetClient from "./CreationSiteInternetClient";

export const metadata: Metadata = {
  title: "Création Site Internet Paris | Agence Web & Développement - Artichaud Studio",
  description: "Création de sites internet sur mesure à Paris. Webdesign moderne, développement web performant, SEO optimisé. Artichaud Studio, votre agence web experte pour des sites qui convertissent.",
  keywords: [
    "création site internet Paris",
    "agence web Paris",
    "développement site web",
    "webdesign Paris",
    "site web sur mesure",
    "création site vitrine",
    "site e-commerce Paris",
    "développement web React",
    "agence Next.js Paris",
    "refonte site internet",
    "site web responsive",
    "UX design Paris"
  ],
  openGraph: {
    title: "Création Site Internet Paris - Artichaud Studio",
    description: "Création de sites web modernes et performants. Webdesign, développement, SEO. Votre projet digital en mains expertes.",
    url: "https://artichaud-studio.com/services/creation-site-internet",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Création Site Internet Paris - Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services/creation-site-internet"
  }
};

export default function CreationSiteInternetPage() {
  return <CreationSiteInternetClient />;
}
