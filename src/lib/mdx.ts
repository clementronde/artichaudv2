import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

export interface Post {
  slug: string;
  meta: {
    id: string;
    title: string;
    slug?: string;
    date: string;
    modifiedDate?: string;
    excerpt: string;
    image: string;
    readingTime: string; // utilisé dans slug/page.tsx
    readTime?: string;   // utilisé dans blog/page.tsx
    tags: string[];
    [key: string]: any;
  };
  content: string;
}

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  // Ton UI affiche déjà un "⏱️", donc format simple :
  return `${minutes} min`;
};

const isMdx = (filename: string) => /\.mdx?$/.test(filename);

const stripExt = (filename: string) => filename.replace(/\.mdx?$/, '');

const stripDatePrefix = (nameNoExt: string) =>
  nameNoExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');

let indexBuilt = false;
let slugToFile = new Map<string, string>();

const buildIndex = () => {
  slugToFile = new Map();

  if (!fs.existsSync(POSTS_PATH)) {
    indexBuilt = true;
    return;
  }

  const files = fs.readdirSync(POSTS_PATH).filter(isMdx);

  for (const file of files) {
    const fullPath = path.join(POSTS_PATH, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    const nameNoExt = stripExt(file);

    // slug par défaut = filename sans date
    const derivedSlug = stripDatePrefix(nameNoExt);

    // slug explicite si frontmatter.slug existe
    const fmSlug = typeof data.slug === 'string' ? data.slug : null;

    // On indexe :
    // 1) slug frontmatter (prioritaire)
    // 2) slug dérivé
    if (fmSlug) slugToFile.set(fmSlug, file);
    slugToFile.set(derivedSlug, file);

    // Bonus: si le fichier n'a pas de date prefix et s'appelle slug.mdx, on le map aussi.
    slugToFile.set(nameNoExt, file);
  }

  indexBuilt = true;
};

export const getPostSlugs = (): string[] => {
  if (!indexBuilt) buildIndex();
  return Array.from(slugToFile.keys());
};

export const getPostBySlug = (slug: string): Post => {
  if (!indexBuilt) buildIndex();

  const realSlug = stripExt(slug);
  const file = slugToFile.get(realSlug);

  if (!file) {
    // fallback: cas où quelqu’un appelle avec "YYYY-MM-DD-slug"
    const fallback = slugToFile.get(stripDatePrefix(realSlug));
    if (!fallback) {
      throw new Error(`Post not found for slug: ${realSlug}`);
    }
    return getPostBySlug(stripDatePrefix(realSlug));
  }

  const fullPath = path.join(POSTS_PATH, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file missing: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const readingTime = calculateReadingTime(content);

  const nameNoExt = stripExt(file);
  const derivedSlug = stripDatePrefix(nameNoExt);

  const meta = {
    id: data.id || data.slug || derivedSlug,
    title: data.title || 'Untitled Post',

    // date: on privilégie frontmatter.date, sinon si filename commence par YYYY-MM-DD, on l’utilise
    date:
      data.date ||
      (nameNoExt.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? new Date().toISOString()),

    modifiedDate: data.modifiedDate || data.date || new Date().toISOString(),

    // excerpt: on accepte aussi description si tu changes de naming plus tard
    excerpt: data.excerpt || data.description || '',

    image: data.image || '',
    tags: data.tags || [],

    readingTime,
    readTime: data.readTime || readingTime, // ✅ compat blog/page.tsx

    ...data,
  };

  // slug final = frontmatter.slug si présent, sinon dérivé du filename
  const finalSlug = (typeof data.slug === 'string' && data.slug) ? data.slug : derivedSlug;

  return {
    slug: finalSlug,
    meta: meta as Post['meta'],
    content,
  };
};

export const getAllPosts = (): Post[] => {
  if (!indexBuilt) buildIndex();

  // On liste les fichiers réels du dossier (plus fiable que keys())
  if (!fs.existsSync(POSTS_PATH)) return [];
  const files = fs.readdirSync(POSTS_PATH).filter(isMdx);

  const posts = files
    .map((file) => {
      try {
        // slug dérivé du filename (sans date)
        const nameNoExt = stripExt(file);
        const derivedSlug = stripDatePrefix(nameNoExt);
        return getPostBySlug(derivedSlug);
      } catch (e) {
        console.error(`Error loading post ${file}:`, e);
        return null;
      }
    })
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));

  return posts;
};
