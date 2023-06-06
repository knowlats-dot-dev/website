import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    title: z
      .string()
      .max(100, 'The title length must be less than or equal to 100 chars'),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    canonical_url: z.string().optional(),
    author: z.string().optional(),
    authorImage: z.string().optional(),
    authorTwitter: z.string().optional()
  })
})

export const collections = {
  blog: blogCollection
}
