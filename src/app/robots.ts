import { MetadataRoute } from 'next'

const SITE_URL = 'https://artichaud-studio.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/robots.txt', '/sitemap.xml', '/llms.txt'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
