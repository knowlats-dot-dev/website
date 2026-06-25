import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE } from '$/config'
import { sortPosts } from '$/utils'

const allPosts = await getCollection('blog')
const sortedPosts = sortPosts(Object.values(allPosts))

export async function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: `${SITE.name} | Blog`,
    // `<description>` field in output xml
    description: SITE.description,
    // base URL for RSS <item> links
    // SITE will use "site" from your project's astro.config.
    site: context.site,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: sortedPosts.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      link: `posts/${item.id}`,
      pubDate: new Date(item.data.date)
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`
  })
}
