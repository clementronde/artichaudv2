import { MetadataRoute } from 'next'
import { projects } from '@/data/project'
import { blogPosts } from '@/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artichaud-studio.com' // ⚠️ Mets ton vrai domaine ici

  // 1. Pages statiques
  const staticRoutes = [
    '',
    '/services',
    '/works',
    '/about',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Pages Projets (Dynamique)
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(), // Idéalement, une date de modif réelle si tu en as une
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // 3. Pages Blog (Dynamique)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}