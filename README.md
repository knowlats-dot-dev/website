# Knowlats.dev

[Knowlats.dev](https://knowlats.dev), [@icegotcha](https://github.com/icegotcha)'s personal blog about software development, technology, and lifestyle, with posts in Thai and English (soon).

Built with Astro and a custom theme based on [Astro Ink](https://github.com/one-aalam/astro-ink).

## Features

- Markdown and MDX blog posts with validated frontmatter.
- Paginated post listings and tag pages.
- Full-text search with English and Thai support using Lunr.
- Light and dark themes and responsive navigation.
- RSS feed at `/rss.xml` and sitemap generation.
- Server rendering through the Vercel adapter, with selected routes prerendered.

## Tech stack

- **Astro** for routing, layouts, and content collections.
- **Svelte 5** for interactive components and shared client state.
- **TypeScript** for application types.
- **Tailwind CSS 4** for styling and typography.
- **pnpm** for dependency management.

## Local development

Use Node.js 22.12.0 or newer and pnpm. From the repository root:

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The development server reloads as files change.

Site metadata is configured in `src/config.ts`, and the canonical site URL is also set in `astro.config.mjs`. The `SITE_URI` placeholder in `.env.example` is not currently read by the application; no environment variables are required for local development.

## Commands

| Command        | Purpose                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| `pnpm dev`     | Start the development server on port 3000.                              |
| `pnpm build`   | Build the production site with the Vercel adapter.                      |
| `pnpm preview` | Run Astro's local production preview command.                           |
| `pnpm check`   | Run Astro diagnostics and type checking.                                |
| `pnpm lint`    | Format files with Prettier and apply ESLint fixes; this modifies files. |

## Project structure

```text
src/
  components/        Astro and Svelte UI components
  content/blog/      Markdown and MDX blog posts
  layouts/           Page and post layouts
  pages/             Routes, RSS feed, and search index endpoint
  store/             Svelte state and blog collection schema
  styles/            Global styles
  config.ts          Site metadata, navigation, and theme options
  content.config.ts  Astro content collection registration
public/assets/       Images, logos, and favicons
astro.config.mjs     Astro integrations, Vercel adapter, and fonts
```

## Writing posts

Add a `.md` or `.mdx` file to `src/content/blog/` with the required frontmatter:

```markdown
---
title: My first post
description: A short summary of the post.
date: 2026-11-13T00:00:00.000Z
tags:
  - development
category: notes
---

Write the post here.
```

Titles must be 100 characters or fewer. Optional fields include `image`, `canonical_url`, `author`, `authorImage`, `authorTwitter`, and `draft`. The schema is defined in `src/store/collections/blog.ts`.

Store post images in `public/assets/image/post/` and reference them with paths such as `/assets/image/post/my-first-post/heading.jpg`.
