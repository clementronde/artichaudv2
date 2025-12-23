import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  category?: string;
  image?: string;
  imageAlt?: string;
  imageAttribution?: string;
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));

  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        title: data.title ?? "",
        slug: data.slug ?? file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.mdx$/, ""),
        date: data.date ?? file.slice(0, 10),
        description: data.description ?? "",
        tags: data.tags ?? [],
        category: data.category ?? "",
        image: data.image ?? "",
        imageAlt: data.imageAlt ?? "",
        imageAttribution: data.imageAttribution ?? "",
        content
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find(p => p.slug === slug) ?? null;
}
