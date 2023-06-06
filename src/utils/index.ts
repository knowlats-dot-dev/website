import type { CollectionEntry } from 'astro:content'
import path from 'path'

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

export const getMonthName = (date: string) => MONTHS[new Date(date).getMonth()]

export const getSlugFromPathname = (pathname: string) =>
  path.basename(pathname, path.extname(pathname))

export const getRandomFooterEmoji = () => {
  const emojis = ['❤️', '🥰', '😊', '😁', '😆', '😂', '🤩', '😎', '🤖']
  return emojis[~~(Math.random() * emojis.length)]
}

export const sortPosts = (posts: CollectionEntry<'blog'>[]) => {
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )
}
