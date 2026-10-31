import type { Metadata } from "next";
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact et devis gratuit",
  description:
    "Contactez Artichaud Studio pour cadrer votre projet de site web, branding, webdesign ou SEO. Réponse sous 24h.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact - ${SITE_NAME}`,
    description:
      "Parlez-nous de votre projet web, branding ou SEO. Réponse sous 24h.",
    url: `${SITE_URL}/contact`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `Contact - ${SITE_NAME}`,
    description: "Demandez un devis pour votre projet web, branding ou SEO.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
