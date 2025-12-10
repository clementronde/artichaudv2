import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

export interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
    modifiedDate?: string; // Utile pour Google (fraîcheur du contenu)
    excerpt: string;
    image: string;
    readingTime: string; // On force ce champ calculé
    tags: string[];
    [key: string]: any;
  };
  content: string;
}

// Utilitaire de calcul du temps de lecture
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 225; // Moyenne standard
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export const getPostSlugs = (): string[] => {
  if (!fs.existsSync(POSTS_PATH)) return [];
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

export const getPostBySlug = (slug: string): Post => {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);

  // On calcule le temps de lecture dynamiquement
  const readingTime = calculateReadingTime(content);

  return {
    slug: realSlug,
    meta: {
      ...data,
      readingTime, // On écrase ou ajoute la valeur calculée
      // Si pas de date de modif, on met la date de publi par défaut
      modifiedDate: data.modifiedDate || data.date, 
    } as Post['meta'],
    content,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
};