// Fonctions qui peuvent être utilisées côté client (sans fs)
import blogPostsData from '@/data/blog-posts.json';

export interface BlogPost {
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
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
}

// Formater une date (utilisable côté client)
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Récupérer tous les articles (sans contenu)
export function getAllPosts(): BlogPost[] {
  return blogPostsData.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Récupérer les N derniers articles
export function getLatestPosts(count: number = 2): BlogPost[] {
  return getAllPosts().slice(0, count);
}

// Récupérer un article par son slug (sans contenu)
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find(post => post.slug === slug);
}

// Récupérer tous les slugs
export function getAllPostSlugs(): string[] {
  return blogPostsData.map(post => post.slug);
}

// Récupérer toutes les catégories uniques
export function getAllCategories(): string[] {
  const categories = blogPostsData.map(post => post.category);
  return [...new Set(categories)].sort();
}

// Récupérer des articles similaires
export function getRelatedPosts(currentSlug: string, count: number = 2): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return getLatestPosts(count);

  const sameCategoryPosts = blogPostsData
    .filter(post => 
      post.slug !== currentSlug && 
      post.category === currentPost.category
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (sameCategoryPosts.length >= count) {
    return sameCategoryPosts.slice(0, count);
  }

  const otherPosts = blogPostsData
    .filter(post => 
      post.slug !== currentSlug && 
      post.category !== currentPost.category
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...sameCategoryPosts, ...otherPosts].slice(0, count);
}

// Récupérer l'article précédent et suivant
export function getAdjacentPosts(currentSlug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
  };
}