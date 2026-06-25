import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const prerender = true

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', (post) => !post.data.draft)

  const index = posts.map((post) => ({
    id: post.id,
    slug: post.id,
    category: 'posts',
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    body: post.body ?? ''
  }))

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' }
  })
}
