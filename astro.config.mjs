import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'astro/config'

import svelte from '@astrojs/svelte'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'
import qwikdev from '@qwikdev/astro'
import remarkToc from 'remark-toc'
import rehypeToc from 'rehype-toc'
import rehypeExternalLinks from 'rehype-external-links'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */ {
    // root: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // outDir: './dist',       // When running `astro build`, path to final static output
    publicDir: './public',
    // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    output: 'server',
    site: 'https://knowlats.dev',
    server: {
      port: 3000
    },
    integrations: [
      mdx(),
      svelte(),
      tailwind({
        config: {
          applyBaseStyles: false
        }
      }),
      sitemap(),
      qwikdev()
    ],
    vite: {
      plugins: [],
      resolve: {
        alias: {
          $: path.resolve(__dirname, './src')
        }
      },
      optimizeDeps: {
        allowNodeBuiltins: true
      }
    },
    markdown: {
      remarkPlugins: [remarkToc],
      rehypePlugins: [
        [rehypeToc, { heading: ['h1', 'h2', 'h3'], maxDepth: 3 }],
        [
          rehypeExternalLinks,
          {
            content: { type: 'text', value: ' 🔗' },
            target: '_blank'
          }
        ]
      ]
    },
    adapter: vercel(),
    prefetch: true
  }
)
