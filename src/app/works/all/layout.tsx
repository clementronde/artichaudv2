import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tous nos projets | Artichaud Studio',
  description: 'Découvrez tous les projets réalisés par Artichaud Studio : sites web, branding, identité visuelle et refonte de sites.',
  alternates: {
    canonical: `${SITE_URL}/works/all`,
  },
  openGraph: {
    url: `${SITE_URL}/works/all`,
  },
};

export default function WorksAllLayout({ children }: { children: React.ReactNode }) {
  return children;
}
