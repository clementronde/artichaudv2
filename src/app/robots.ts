import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'anthropic-ai',
  'CCBot',
  'Bytespider',
  'Amazonbot',
  'FacebookBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
      // Autorisation explicite des crawlers IA (ChatGPT, Claude, Perplexity, etc.)
      // pour une stratégie GEO assumée — cohérent avec llms.txt / llms-full.txt.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ['/'],
        disallow: ['/api/', '/admin/', '/private/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
