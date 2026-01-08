import { MetadataRoute } from 'next'
import { projects } from '@/data/project'
import { getAllPosts } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artichaud-studio.com'

  // 1. Pages principales (haute priorité)
  const mainPages = [
    { route: '', priority: 1.0, changeFreq: 'daily' as const },           // Homepage
    { route: '/services', priority: 0.95, changeFreq: 'weekly' as const }, // Services
    { route: '/tarifs', priority: 0.95, changeFreq: 'monthly' as const },  // Tarifs (haute valeur SEO)
    { route: '/works', priority: 0.9, changeFreq: 'weekly' as const },     // Portfolio
    { route: '/contact', priority: 0.85, changeFreq: 'monthly' as const }, // Contact
  ].map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  // 2. Pages secondaires
  const secondaryPages = [
    { route: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/blog', priority: 0.85, changeFreq: 'daily' as const },      // Blog index mis à jour souvent
    { route: '/faq', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/works/all', priority: 0.8, changeFreq: 'weekly' as const }, // Portfolio complet
  ].map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  // 3. Pages SEO locales (importantes pour référencement local)
  const localSeoPages = [
    { route: '/creation-site-internet-paris', priority: 0.85, changeFreq: 'monthly' as const },
    { route: '/creation-site-internet-boulogne-billancourt', priority: 0.75, changeFreq: 'monthly' as const },
    { route: '/creation-site-vitrine-wordpress-webflow-wix', priority: 0.8, changeFreq: 'monthly' as const },
    { route: '/refonte-site-internet', priority: 0.8, changeFreq: 'monthly' as const },
  ].map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  // 4. Pages Projets (Dynamique - portfolio)
  const projectRoutes = projects.map((project) => ({
    url: project.slug.startsWith('/')
      ? `${baseUrl}${project.slug}`
      : `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Projets individuels moins prioritaires que pages principales
  }))

  // 5. Pages Blog (Dynamique - articles)
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.meta.date),
    changeFrequency: 'monthly' as const, // Articles rarement modifiés après publication
    priority: 0.65, // Articles moins prioritaires que pages de service
  }))

  return [
    ...mainPages,
    ...secondaryPages,
    ...localSeoPages,
    ...projectRoutes,
    ...blogRoutes
  ]
}
