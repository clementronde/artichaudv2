import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import MetierLanding from "@/components/landing/MetierLanding";
import { express } from "@/components/landing/metiers";
import { SITE_URL } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Création de site internet en 7 jours, sur mesure",
  description: "Votre site internet prêt en 7 jours : design sur mesure, formulaire de contact, modifiable sans coder et visible sur Google et les IA. Dès 1 500 €. Artichaud Studio, partout en France.",
  alternates: {
    canonical: `${SITE_URL}/creation-site-internet-7-jours`,
  },
};

export default function SiteSeptJoursPage() {
  return (
    <div className={dmSans.variable}>
      <MetierLanding content={express} />
    </div>
  );
}
