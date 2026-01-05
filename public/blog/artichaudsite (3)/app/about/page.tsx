import type { Metadata } from 'next';
import Header from '@/components/header'; // ← AJOUTE CETTE LIGNE
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'À propos - Artichaud Studio | Notre équipe et notre mission',
  description: 'Découvrez l\'équipe d\'Artichaud Studio : Charlotte, Clément et Arti. Notre mission : transformer vos idées en projets digitaux exceptionnels.',
  keywords: ['à propos', 'équipe créative', 'agence Paris', 'design studio'],
  openGraph: {
    title: 'À propos - Artichaud Studio',
    description: 'Découvrez l\'équipe d\'Artichaud Studio et notre mission.',
    url: 'https://artichaud.studio/about',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-noir text-blanc">
        <section className="section-padding">
          <div className="container-custom">
            <h1 className="mb-12">About Artichaud</h1>
            
            {/* Votre section About avec les polaroids */}
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}