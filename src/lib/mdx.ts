import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

// Interface identique à celle attendue par BlogSection
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string; 
  tags: string[];
  date: string;
  content: string;
}

// Calcul du temps de lecture
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

export const getPostBySlug = (slug: string): BlogPost => {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  const readTime = calculateReadingTime(content);

  // On retourne un objet "plat" facile à utiliser
  return {
    id: realSlug,
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
    readTime: readTime,
    tags: data.tags,
    date: data.date,
    content: content,
  };
};

export const getAllPosts = (): BlogPost[] => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};