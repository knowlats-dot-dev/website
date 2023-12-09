import type { CollectionEntry } from 'astro:content'
import dayjs from 'dayjs'
import path from 'path'
import { TIMEZONE } from '$/config'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getLocalDate = (date: Date) => {
  return dayjs(date).tz(TIMEZONE)
}

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

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
