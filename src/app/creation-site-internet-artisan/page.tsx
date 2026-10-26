import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import MetierLanding from "@/components/landing/MetierLanding";
import { artisan } from "@/components/landing/metiers";
import { SITE_URL } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Création de site internet pour artisan, prêt en 7 jours",
  description: "Le site de votre entreprise artisanale prêt en 7 jours : design sur mesure, galerie de réalisations, demande de devis en ligne et visibilité sur Google et les IA. Artichaud Studio, partout en France.",
  alternates: {
    canonical: `${SITE_URL}/creation-site-internet-artisan`,
  },
};

export default function ArtisanPage() {
  return (
    <div className={dmSans.variable}>
      <MetierLanding content={artisan} />
    </div>
  );
}
