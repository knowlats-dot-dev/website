# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Playwright MCP

This project has the [Playwright MCP server](https://github.com/microsoft/playwright-mcp) configured at `.claude/settings.json`. It provides browser automation tools directly in Claude Code sessions — no separate test framework needed.

Available tools: `browser_navigate`, `browser_click`, `browser_type`, `browser_screenshot`, `browser_snapshot`, and more.

The dev server runs on `http://localhost:3000` — start it with `pnpm dev` before using browser tools.

> **Do not download the `chrome-for-testing` browser.** The Playwright MCP is configured to use the already-installed `chromium` channel (`--browser chromium` in `.mcp.json`). If a tool call asks to install `chrome-for-testing`, do not run the install — stay on the existing channel.

## Commands

```bash
pnpm dev        # Start dev server on port 3000
pnpm build      # Build for production
pnpm preview    # Preview production build locally
pnpm lint       # Format with Prettier and fix ESLint issues
pnpm check      # Run Astro type checking
```

No test suite exists.

## Architecture

**Stack:** Astro (SSR via Vercel adapter) + Svelte (interactive components) + Tailwind CSS v4 + MDX

### Path alias

`$` resolves to `./src` everywhere (configured in `astro.config.mjs` via Vite alias).

### Component split: Astro vs Svelte

- **Astro components** (`src/components/*.astro`) — static/server-rendered UI (layouts, post previews, prose wrapper)
- **Svelte components** (`src/components/*.svelte`) — any client-side interactivity: theme switching, search modal, mobile nav, navbar

### State management (Svelte 5 reactive stores)

All shared client-side state lives in `src/store/`. Stores use Svelte 5 `$state` in `.svelte.ts` files — **not** Svelte 4 `writable`. State is accessed via `.value` (read) and `.set(v)` (write), never with the `$store` auto-subscribe sigil.

- `theme.svelte.ts` — `'dark' | 'light'` state, consumed by `ModeSwitcher.svelte`; dark mode applied via `.dark` class on `<html>`
- `search.svelte.ts` — `isSearchVisible` boolean controlling the search modal
- `mobile-navbar.svelte.ts` — mobile menu open/close state
- `bool.svelte.ts` — shared `createBooleanStore()` factory used by the two boolean stores above
- `collections/blog.ts` — Astro content collection definition with Zod schema

To add a new boolean store:

```ts
import { createBooleanStore } from '$/store/bool.svelte'
export const isMyThing = createBooleanStore()
// read: isMyThing.value  |  write: isMyThing.set(true)
```

### Content

Blog posts live in `src/content/blog/` as `.md`/`.mdx` files. Required frontmatter fields (enforced by Zod in `src/store/collections/blog.ts`):

```
title, description, date, tags (array), category
```

Optional: `image`, `canonical_url`, `author`, `authorImage`, `authorTwitter`

Drafts have their own pages at `src/pages/drafts/` and layout at `src/layouts/post-draft.astro`. Setting `SITE.listDrafts: false` in `src/config.ts` hides them from listings.

### Routing

Pages in `src/pages/` follow Astro file-based routing:

- `/` → `index.astro`
- `/posts/[slug]` → fetches a single blog entry via `getEntry('blog', slug)`
- `/tags/[tag]/[page]` → paginated tag listings
- `/rss.xml` → RSS feed

The layout chain: `src/layouts/post.astro` wraps `src/components/MainLayout.astro` → `src/components/BaseLayout.astro`.

### Styling

Tailwind v4 with two config files:

- `tailwind.theme.config.cjs` — color palette (red-based: `theme-primary`, `theme-secondary`, `theme-dark-primary`, etc.; backgrounds: `theme-accent-gray-light`/`dark`)
- `tailwind.config.cjs` — extends theme with those colors, typography plugin dark variant, `darkMode: 'class'`

Custom CSS in `src/styles/global.css` sets `--font-primary` (Bai Jamjuree) and `--font-display` (Bitcount Prop Single pixel font).

### Search

Full-text search uses [lunr](https://lunrjs.com/) with Thai language support via [lunr-languages](https://github.com/MihaiValentin/lunr-languages). The search index at `/search-index.json` is generated as a prerendered Astro endpoint at `src/pages/search-index.json.ts` using `getCollection('blog')` — no postbuild script needed.

The client-side search logic lives in `src/components/Search.svelte`. On mount it:

1. Registers the lunr Thai tokeniser (`lunr-languages/lunr.th`) for character-level n-gram matching
2. Fetches `/search-index.json` and builds a lunr index with `multiLanguage('en', 'th')`
3. Searches with a trailing `*` wildcard for prefix matching

### Site configuration

`src/config.ts` is the single source of truth for:

- `SITE` — name, URL, author info, social links, OG image
- `NAV_ITEMS` — navigation links
- Feature flags: `USE_POST_IMG_OVERLAY`, `USE_MEDIA_THUMBNAIL`, `USE_AUTHOR_CARD`, `listDrafts`
- `PAGE_SIZE` — posts per paginated page (default 8)
- `TIMEZONE` — used by `getLocalDate()` in `src/utils.ts` for formatting post dates (default `'Asia/Bangkok'`)
