import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Simulateur prix site internet | ${SITE_NAME}`,
  description:
    "Estimez le budget d'un site vitrine, e-commerce ou projet web sur mesure. Simulateur gratuit par Artichaud Studio.",
  alternates: {
    canonical: `${SITE_URL}/simulateur`,
  },
  openGraph: {
    title: `Simulateur de prix site internet - ${SITE_NAME}`,
    description:
      "Calculez rapidement un ordre de grandeur pour votre projet de site web.",
    url: `${SITE_URL}/simulateur`,
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Simulateur prix site internet - ${SITE_NAME}`,
    description: "Estimez gratuitement le budget de votre projet web.",
  },
};

export default function SimulateurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
