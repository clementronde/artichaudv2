import type { Metadata } from "next";
import BoulogneClient from "./BoulogneClient";

export const metadata: Metadata = {
  title: "Création de site internet Boulogne-Billancourt | Agence web créative",
  description: "Agence web créative à Boulogne-Billancourt. Sites vitrines WordPress, Webflow ou Wix qui valorisent votre marque. Parlez-nous de votre projet dès aujourd’hui.",
  keywords: [
    "création site internet Boulogne-Billancourt",
    "agence web Boulogne-Billancourt",
    "site vitrine Boulogne-Billancourt",
    "création site vitrine 92",
    "création site WordPress Boulogne-Billancourt",
    "webdesigner Boulogne-Billancourt",
    "création site Webflow Boulogne"
  ],
  alternates: {
    canonical: "https://artichaud.com/creation-site-internet-boulogne-billancourt",
  },
  openGraph: {
    title: "Création de site internet Boulogne-Billancourt | Agence Artichaud",
    description: "Agence web créative à Boulogne-Billancourt. Sites vitrines WordPress, Webflow ou Wix qui valorisent votre marque.",
    url: "https://artichaud.com/creation-site-internet-boulogne-billancourt",
    siteName: "Agence Artichaud",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://artichaud.com/images/og-boulogne.jpg", // Pensez à ajouter cette image
        width: 1200,
        height: 630,
        alt: "Création site internet Boulogne-Billancourt",
      },
    ],
  },
};

export default function Page() {
  return <BoulogneClient />;
}