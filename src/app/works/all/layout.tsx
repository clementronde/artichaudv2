import type { Metadata } from 'next';
import { OG_IMAGE_URL, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tous nos projets',
  description: 'Découvrez tous les projets réalisés par Artichaud Studio : sites web, branding, identité visuelle et refonte de sites.',
  alternates: {
    canonical: `${SITE_URL}/works/all`,
  },
  openGraph: {
    url: `${SITE_URL}/works/all`,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630 }],
  },
};

export default function WorksAllLayout({ children }: { children: React.ReactNode }) {
  return children;
}
