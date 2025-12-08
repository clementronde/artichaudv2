import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Chemin vers le dossier content/blog
const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

// Type pour tes articles
export interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    readTime: string;
    tags: string[];
    [key: string]: any;
  };
  content: string; // Le contenu brut MDX
}

// 1. Récupérer tous les slugs (noms de fichiers)
export const getPostSlugs = (): string[] => {
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

// 2. Récupérer un article par son slug
export const getPostBySlug = (slug: string): Post => {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // "gray-matter" sépare les métadonnées (data) du contenu (content)
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as Post['meta'],
    content,
  };
};

// 3. Récupérer tous les articles (pour la page blog)
export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Trier par date (du plus récent au plus ancien)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
};