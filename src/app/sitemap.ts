import { MetadataRoute } from 'next'
import { projects } from '@/data/project'
// 1. On change l'import : on utilise la lib MDX au lieu du fichier supprimé
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artichaud-studio.com' // Assurez-vous que c'est le bon domaine

  // 1. Pages statiques
  const staticRoutes = [
    '',
    '/services',
    '/works',
    '/about',
    '/contact',
    '/blog',
    "/creation-site-internet-boulogne-billancourt",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Pages Projets (Dynamique - depuis data/project.ts)
  const projectRoutes = projects.map((project) => ({
    // Attention : vos slugs dans project.ts contiennent parfois "/works/", 
    // on s'assure ici de construire une URL propre.
    // Si project.slug est déjà "/works/charitio", on ne rajoute pas /works
    url: project.slug.startsWith('/') 
      ? `${baseUrl}${project.slug}` 
      : `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // 3. Pages Blog (Dynamique - depuis les fichiers MDX)
  const posts = getAllPosts(); // On récupère les vrais fichiers
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.meta.date), // On utilise la date du frontmatter
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}