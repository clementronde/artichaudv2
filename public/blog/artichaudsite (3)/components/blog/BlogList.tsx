'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/blog-client';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  author: {
    name: string;
    role: string;
  };
}

interface BlogListProps {
  posts: BlogPost[];
  categories: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrer les articles par catégorie
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  // Calculer la pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Réinitialiser la page quand on change de catégorie
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Filtres par catégorie */}
      <section className="section-padding border-b border-blanc/10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange text-noir'
                  : 'bg-blanc/5 text-blanc hover:bg-blanc/10'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Tous les articles ({posts.length})
            </button>
            {categories.map((category) => {
              const count = posts.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-orange text-noir'
                      : 'bg-blanc/5 text-blanc hover:bg-blanc/10'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
                {paginatedPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="group cursor-pointer"
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {/* Catégorie au-dessus */}
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
                        ( {post.category.toUpperCase()} )
                      </p>

                      {/* Titre au-dessus */}
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
                        {post.title}
                      </h3>

                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Date en dessous */}
                      <time 
                        className="block mb-3"
                        style={{
                          color: '#F2F2F2',
                          fontFamily: 'var(--font-instrument)',
                          fontSize: 'clamp(14px, 1.18vw, 17px)',
                          fontStyle: 'italic',
                          opacity: 0.7,
                        }}
                      >
                        {formatDate(post.date)}
                      </time>

                      {/* Description en dessous */}
                      <p 
                        className="mb-4"
                        style={{
                          color: '#F2F2F2',
                          fontFamily: 'var(--font-inter)',
                          fontSize: 'clamp(14px, 1.18vw, 17px)',
                          fontWeight: 300,
                          lineHeight: '160%',
                          opacity: 0.8,
                        }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Lire l'article en dessous */}
                      <span 
                        className="inline-flex items-center font-medium text-orange group-hover:gap-2 transition-all"
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: 'clamp(14px, 1.18vw, 17px)',
                        }}
                      >
                        Lire l'article
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-blanc/5 text-blanc hover:bg-blanc/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    ← Précédent
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-orange text-noir'
                          : 'bg-blanc/5 text-blanc hover:bg-blanc/10'
                      }`}
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-blanc/5 text-blanc hover:bg-blanc/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Suivant →
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-blanc/50 text-xl" style={{ fontFamily: 'var(--font-inter)' }}>
                Aucun article dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}