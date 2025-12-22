import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

export interface Post {
  slug: string;
  meta: {
    id: string; // Ajout explicite de l'ID dans l'interface
    title: string;
    date: string;
    modifiedDate?: string;
    excerpt: string;
    image: string;
    readingTime: string;
    tags: string[];
    [key: string]: any;
  };
  content: string;
}

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 225;
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
  
  // Safety check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContents);

  const readingTime = calculateReadingTime(content);

  // Default meta to prevent 'undefined' errors
  const meta = {
    // CORRECTION : Si pas d'ID, on utilise le slug. Si pas de titre, 'Untitled'.
    id: data.id || realSlug,
    title: data.title || 'Untitled Post',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    // CORRECTION : Image est une string vide par défaut, jamais undefined
    image: data.image || '', 
    tags: data.tags || [],
    ...data, // Overwrite with actual data if it exists
    readingTime,
    modifiedDate: data.modifiedDate || data.date || new Date().toISOString(),
  };

  return {
    slug: realSlug,
    meta: meta as Post['meta'],
    content,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      try {
        return getPostBySlug(slug);
      } catch (e) {
        console.error(`Error loading post ${slug}:`, e);
        return null;
      }
    })
    .filter((post): post is Post => post !== null) // Filter out failed posts
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
};