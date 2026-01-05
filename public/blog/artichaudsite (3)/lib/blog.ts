import 'server-only';
import { parseMarkdown, ParsedBlock } from './markdown-parser';
import { BlogPost, getPostBySlug } from './blog-client';
import fs from 'fs';
import path from 'path';

export interface BlogPostWithContent extends BlogPost {
  content: ParsedBlock[];
}

// Récupérer un article avec son contenu (Server-side uniquement)
export function getPostWithContent(slug: string): BlogPostWithContent | null {
  const post = getPostBySlug(slug);
  if (!post) return null;

  try {
    // Lire le fichier depuis le système de fichiers (Server-side uniquement)
    const filePath = path.join(process.cwd(), 'data', 'blog-content', `${slug}.md`);
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.error(`Fichier non trouvé: ${filePath}`);
      return null;
    }
    
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const parsedContent = parseMarkdown(markdown);
    
    return {
      ...post,
      content: parsedContent,
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${slug}.md:`, error);
    return null;
  }
}

// Estimer le temps de lecture
export function estimateReadingTime(content: ParsedBlock[]): number {
  const wordsPerMinute = 200;
  let totalWords = 0;

  content.forEach(block => {
    if (typeof block.content === 'string') {
      totalWords += block.content.split(/\s+/).length;
    } else if (Array.isArray(block.content)) {
      block.content.forEach(p => {
        totalWords += p.split(/\s+/).length;
      });
    }
  });

  return Math.ceil(totalWords / wordsPerMinute);
}

// Ré-exporter les fonctions client pour faciliter les imports
export * from './blog-client';