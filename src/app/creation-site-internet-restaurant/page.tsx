import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import MetierLanding from "@/components/landing/MetierLanding";
import { restaurant } from "@/components/landing/metiers";
import { SITE_URL } from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Création de site internet pour restaurant, prêt en 7 jours",
  description: "Le site de votre restaurant prêt en 7 jours : design sur mesure, menu en ligne et visibilité sur Google et les IA. Artichaud Studio, Boulogne-Billancourt.",
  alternates: {
    canonical: `${SITE_URL}/creation-site-internet-restaurant`,
  },
  // Page en cours de construction : hors index tant qu'elle n'est pas terminée
  robots: { index: false, follow: true },
};

export default function RestaurantPage() {
  return (
    <div className={dmSans.variable}>
      <MetierLanding content={restaurant} />
    </div>
  );
}
