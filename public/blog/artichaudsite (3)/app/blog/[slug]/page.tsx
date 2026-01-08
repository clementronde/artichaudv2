import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { 
  getPostWithContent, 
  getAllPostSlugs, 
  formatDate, 
  getRelatedPosts,
  getAdjacentPosts,
  estimateReadingTime,
  getPostBySlug
} from '@/lib/blog'; // ✅ Garde cet import (il ré-export tout)
import { notFound } from 'next/navigation';
import ArticleRenderer from '@/components/blog/ArticleRenderer';
import DarkModeToggle from '@/components/blog/DarkModeToggle';
// Génération des pages statiques
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Métadonnées SEO ultra-optimisées
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé - Artichaud Studio',
      description: 'L\'article que vous recherchez n\'existe pas.',
    };
  }

  const publishedDate = new Date(post.date).toISOString();
  const metaTitle = post.metaTitle || `${post.title} | Blog Artichaud Studio`;
  const metaDescription = post.metaDescription || post.excerpt;
  const metaKeywords = post.metaKeywords || [post.category, 'design', 'branding', 'marketing digital'];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: post.author.name, url: 'https://artichaud.studio' }],
    creator: 'Artichaud Studio',
    publisher: 'Artichaud Studio',
    openGraph: {
      title: post.title,
      description: metaDescription,
      url: `https://artichaud.studio/blog/${post.slug}`,
      siteName: 'Artichaud Studio',
      images: [
        {
          url: `https://artichaud.studio${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'fr_FR',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: publishedDate,
      authors: ['https://artichaud.studio/about'],
      section: post.category,
      tags: metaKeywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`https://artichaud.studio${post.image}`],
      creator: '@artichaudstudio',
      site: '@artichaudstudio',
    },
    alternates: {
      canonical: `https://artichaud.studio/blog/${post.slug}`,
      languages: {
        'fr-FR': `https://artichaud.studio/blog/${post.slug}`,
        'en-US': `https://artichaud.studio/en/blog/${post.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: post.category,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Récupérer l'article avec son contenu
  const post = getPostWithContent(params.slug);

  if (!post) {
    notFound();
  }

  // Récupérer dynamiquement les articles similaires
  const relatedPosts = getRelatedPosts(params.slug, 2);
  
  // Récupérer les articles précédent/suivant
  const { previous, next } = getAdjacentPosts(params.slug);
  
  // Calculer le temps de lecture
  const readingTime = estimateReadingTime(post.content);

  const publishedDate = new Date(post.date).toISOString();

  // Schema.org JSON-LD ultra-optimisé pour le SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.excerpt,
    description: post.metaDescription || post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `https://artichaud.studio${post.image}`,
      width: 1200,
      height: 630,
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      url: 'https://artichaud.studio/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Artichaud Studio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://artichaud.studio/img/Logo.svg',
        width: 600,
        height: 60,
      },
      url: 'https://artichaud.studio',
      sameAs: [
        'https://www.instagram.com/artichaudstudio',
        'https://www.linkedin.com/company/artichaud-studio',
        'https://www.tiktok.com/@artichaudstudio',
        'https://www.pinterest.com/artichaudstudio',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://artichaud.studio/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.metaKeywords?.join(', ') || post.category,
    timeRequired: `PT${readingTime}M`,
    inLanguage: 'fr-FR',
    isAccessibleForFree: true,
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://artichaud.studio',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://artichaud.studio/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://artichaud.studio/blog/${post.slug}`,
      },
    ],
  };

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Artichaud Studio',
    url: 'https://artichaud.studio',
    logo: 'https://artichaud.studio/img/Logo.svg',
    description: 'Agence créative spécialisée en branding, webdesign et stratégie digitale',
    email: 'artichaud.studio@gmail.com',
    sameAs: [
      'https://www.instagram.com/artichaudstudio',
      'https://www.linkedin.com/company/artichaud-studio',
      'https://www.tiktok.com/@artichaudstudio',
      'https://www.pinterest.com/artichaudstudio',
    ],
  };

  return (
    <>
      <Header />
      
      {/* Tous les Schema.org JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <main className="pt-24 min-h-screen bg-blanc text-noir">
        {/* Hero Section */}
        <section className="section-padding border-b border-noir/10">
          <div className="container-custom max-w-4xl">
            {/* Date et temps de lecture */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <p 
                style={{
                  fontFamily: 'var(--font-instrument)',
                  fontSize: 'clamp(14px, 1.18vw, 17px)',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                }}
              >
                ( {formatDate(post.date)} )
              </p>
              <span className="text-noir/20">•</span>
              <p 
                style={{
                  fontFamily: 'var(--font-instrument)',
                  fontSize: 'clamp(14px, 1.18vw, 17px)',
                  fontStyle: 'italic',
                  color: '#1A1A1A',
                }}
              >
                ( {readingTime} min de lecture )
              </p>
            </div>

            {/* Titre de l'article */}
            <h1 
              className="text-center mb-12 uppercase"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(40px, 5vw, 70px)',
                fontWeight: 700,
                lineHeight: '110%',
                letterSpacing: '-0.02em',
                color: '#1A1A1A',
              }}
            >
              {post.title}
            </h1>

            {/* Image hero */}
            <div className="mb-16 overflow-hidden rounded-lg">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto"
                loading="eager"
              />
            </div>

            {/* Contenu de l'article avec le renderer */}
            <article className="prose prose-lg max-w-none">
              <ArticleRenderer content={post.content} />
            </article>
          </div>
        </section>

        {/* Section Actuality (crousti) - Articles similaires dynamiques */}
        <section className="section-padding bg-noir">
          <div className="container-custom">
            {/* Titre */}
            <div className="mb-12 lg:mb-20">
              <h2 className="inline">
                <span 
                  className="text-blanc font-bold"
                  style={{ 
                    fontSize: 'clamp(48px, 5vw, 72px)', 
                    fontFamily: 'var(--font-inter)' 
                  }}
                >
                  Actuality
                </span>
                <span 
                  className="text-blanc font-light italic ml-4"
                  style={{ 
                    fontSize: 'clamp(38px, 3.9vw, 56px)', 
                    fontFamily: 'var(--font-instrument)' 
                  }}
                >
                  ( crousti )
                </span>
              </h2>
            </div>

            {/* Articles similaires */}
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group cursor-pointer">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <p 
                        className="mb-3"
                        style={{
                          color: '#F2F2F2',
                          fontFamily: 'var(--font-instrument)',
                          fontSize: 'clamp(14px, 1.18vw, 17px)',
                          fontWeight: 400,
                          fontStyle: 'italic',
                        }}
                      >
                        ( {relatedPost.category.toUpperCase()} )
                      </p>
                      <h3 
                        className="mb-6 uppercase group-hover:text-orange transition-colors"
                        style={{
                          color: '#F2F2F2',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 'clamp(20px, 2.08vw, 30px)',
                          fontWeight: 700,
                          lineHeight: '120%',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {relatedPost.title}
                      </h3>
                      <div className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-blanc/70 text-center">Aucun article similaire pour le moment.</p>
            )}

            {/* Lien vers tous les articles */}
            <div className="mt-16 text-center">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-blanc hover:text-orange transition-colors"
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(16px, 1.39vw, 20px)',
                  fontWeight: 600,
                }}
              >
                Voir tous les articles
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation précédent/suivant dynamique */}
        <section className="section-padding border-t border-noir/10">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Article précédent */}
              {previous ? (
                <Link 
                  href={`/blog/${previous.slug}`}
                  className="group flex items-center gap-3 max-w-[45%]"
                >
                  <svg 
                    className="w-6 h-6 text-noir group-hover:text-orange group-hover:-translate-x-1 transition-all flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <p 
                      className="text-sm text-noir/50 mb-1"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Article précédent
                    </p>
                    <p 
                      className="font-semibold text-noir group-hover:text-orange transition-colors line-clamp-2"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {previous.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div /> 
              )}

              {/* Retour au blog */}
              <Link 
                href="/blog"
                className="text-noir hover:text-orange transition-colors text-center"
                style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}
              >
                Tous les articles
              </Link>

              {/* Article suivant */}
              {next ? (
                <Link 
                  href={`/blog/${next.slug}`}
                  className="group flex items-center gap-3 max-w-[45%] text-right justify-end"
                >
                  <div>
                    <p 
                      className="text-sm text-noir/50 mb-1"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Article suivant
                    </p>
                    <p 
                      className="font-semibold text-noir group-hover:text-orange transition-colors line-clamp-2"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {next.title}
                    </p>
                  </div>
                  <svg 
                    className="w-6 h-6 text-noir group-hover:text-orange group-hover:translate-x-1 transition-all flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* Toggle mode sombre */}
        <DarkModeToggle />
      </main>
      
      <Footer />
    </>
  );
}