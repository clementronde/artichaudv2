import { getAllPosts } from '@/lib/mdx'
import WorkClient from '@/components/works/WorkClient'

export default function WorkPage() {
  // 1. On récupère les articles (Serveur)
  const rawPosts = getAllPosts()

  // 2. On formate les données pour qu'elles correspondent à ce qu'attend BlogSection
  const posts = rawPosts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.meta.title,
    excerpt: post.meta.excerpt,
    image: post.meta.image,
    readTime: post.meta.readingTime,
    tags: post.meta.tags || []
  }))

  // 3. On passe le tout au composant Client
  return <WorkClient posts={posts} />
}