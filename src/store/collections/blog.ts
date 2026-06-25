import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

export const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z
      .string()
      .max(100, 'The title length must be less than or equal to 100 chars'),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    canonical_url: z.string().optional(),
    author: z.string().optional(),
    authorImage: z.string().optional(),
    authorTwitter: z.string().optional()
  })
})
