import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getAllPosts, getAllCategories } from '@/lib/blog-client'; // 🆕 Import depuis blog-client
import BlogList from '@/components/blog/BlogList';

// ... reste du code identique

export const metadata: Metadata = {
  title: 'Blog - Artichaud Studio | Actualités Design & Marketing Digital',
  description: 'Découvrez nos articles sur le design, le branding, le webdesign et les dernières tendances en marketing digital.',
  keywords: ['blog design', 'articles branding', 'tendances webdesign', 'marketing digital'],
  openGraph: {
    title: 'Blog - Artichaud Studio',
    description: 'Articles, conseils et inspirations sur le design et le marketing digital.',
    url: 'https://artichaud.studio/blog',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function BlogPage() {
  // Charger les données côté serveur
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen bg-noir text-blanc">
        {/* Hero Section */}
        <section className="section-padding border-b border-blanc/10">
          <div className="container-custom">
            <h1 className="mb-6">
              <span 
                className="text-blanc font-bold"
                style={{ fontSize: 'clamp(63px, 6.25vw, 90px)', fontFamily: 'var(--font-inter)' }}
              >
                Blog
              </span>
              <span 
                className="text-blanc font-light italic ml-4"
                style={{ fontSize: 'clamp(49px, 4.86vw, 70px)', fontFamily: 'var(--font-instrument)' }}
              >
                (Insights)
              </span>
            </h1>
            <p 
              className="max-w-3xl text-blanc/70"
              style={{ 
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(16px, 1.53vw, 22px)',
                fontWeight: 300,
                lineHeight: '140%'
              }}
            >
              Découvrez nos articles, conseils et inspirations sur le design, le branding et le marketing digital.
            </p>
          </div>
        </section>

        {/* Liste des articles avec filtres et pagination (Client Component) */}
        <BlogList posts={posts} categories={categories} />

        {/* CTA Section */}
        <section className="section-padding bg-blanc/5 border-t border-blanc/10">
          <div className="container-custom text-center">
            <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
              Envie d'en savoir plus ?
            </h2>
            <p className="text-xl text-blanc/70 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
              Abonnez-vous à notre newsletter pour recevoir nos derniers articles.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-6 py-3 bg-blanc/5 border border-blanc/10 rounded-lg text-blanc placeholder:text-blanc/40 focus:outline-none focus:border-orange transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                S'abonner
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}