/**
 * Navbar
 */

export type NavItems = {
  [key: string]: NavItem
}

export type NavItem = {
  path: string
  title: string
}

/**
 * Blog
 */

export interface BlogFrontmatter {
  slug: string
  title: string
  description: string
  tags: string[]
  author: string
  date: string
  category: string
  image?: string
  canonical_url?: string
  authorImage?: string
  authorTwitter?: string
}
