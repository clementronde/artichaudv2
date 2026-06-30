import { NextRequest, NextResponse } from 'next/server'
import { projects } from '@/data/project'
import { getAllPosts } from '@/lib/mdx'
import { SITE_URL } from '@/lib/seo'

const INDEXNOW_KEY = '1484784033661957'
const INDEXNOW_HOST = 'artichaud-studio.fr'
const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`

function getAllUrls(): string[] {
  const staticUrls = [
    '',
    '/services',
    '/tarifs',
    '/works',
    '/works/all',
    '/contact',
    '/about',
    '/blog',
    '/faq',
    '/simulateur',
    '/mentions-legales',
    '/artichaud-studio-orthographe',
    '/services/creation-site-internet',
    '/services/branding-identite-visuelle',
    '/services/seo-referencement-naturel',
    '/creation-site-internet-paris',
    '/creation-site-internet-boulogne-billancourt',
    '/boulogne-billancourt',
    '/creation-site-vitrine-wordpress-webflow-wix',
    '/refonte-site-internet',
  ].map((route) => `${SITE_URL}${route}`)

  const projectUrls = projects.map((p) =>
    p.slug.startsWith('/') ? `${SITE_URL}${p.slug}` : `${SITE_URL}/works/${p.slug}`
  )

  const posts = getAllPosts()
  const blogUrls = posts
    .filter((post) => post.meta.noindex !== true)
    .map((post) => `${SITE_URL}/blog/${post.slug}`)

  return [...staticUrls, ...projectUrls, ...blogUrls]
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expectedSecret = process.env.INDEXNOW_SECRET

  if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const urlList = getAllUrls()

  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList,
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const text = await response.text()
    return NextResponse.json(
      { error: 'IndexNow submission failed', status: response.status, detail: text },
      { status: 500 }
    )
  }

  return NextResponse.json({
    success: true,
    submitted: urlList.length,
    urls: urlList,
  })
}

export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urls: getAllUrls().length,
  })
}
