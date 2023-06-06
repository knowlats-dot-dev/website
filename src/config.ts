import type { NavItems } from './types'

export const NAV_ITEMS: NavItems = {
  home: {
    path: '/',
    title: 'Home'
  },
  blog: {
    path: '/posts',
    title: 'Posts'
  },
  tags: {
    path: '/tags',
    title: 'tags'
  }
}

export const SITE = {
  name: 'Knowlats.dev',
  title: 'Knowlats.dev',
  description:
    "Icegotcha's blog. Contains nerdy notes about coding and lifestyle.",
  listDrafts: false,
  url: 'https://knowlats.dev',
  githubUrl: 'https://github.com/knowlats-dot-dev',
  logo: '/assets/logo.svg',
  image:
    'https://icegotcha-web-screenshot-capture.vercel.app/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrbm93bGF0cyIsInVybCI6Imh0dHBzOi8va25vd2xhdHMuZGV2IiwiZGV2aWNlU2NhbGVGYWN0b3IiOjEsIndhaXRVbnRpbCI6Im5ldHdvcmtpZGxlMCJ9.XGWFhyYIQbaSN2aqWMDFHaWDIlkO0rX30_9tpsXK8go3ZntWfROlAg8BzBwt-SLjNL-Q4l4pmQDGh_NgowasruQzxCi-w8WD49cLsV8MQn7NtnaXKnxvgoYk9c06q6jebGEiS13dFviriIgxGQeIam-CajSIoVvlRHBTO1QJGYTmk9YDt6SyTIoN44aB0kZiNrKsbU4ziPUZvBxOijG34P_MUBFGKDxAyi7oRmqMNxJi2nuM_879Jb4P1fXkJbVhZ3A3iTzpSfsxfQ953i4u3r6hbnno1aMDnBEDKST8cB8nn97S7J-oNr001Y22zk6F4tlpUiabVq7hXElrpwZ578bIL6smD8eHQefdqU_C1V2cSakCTflKLHRJti2l9ERTv29YA-VUJNf2jfzOURckuxdBzAT0-4tPBfO-br31mnbtWbEdWBoLl6X-DDJLUoOdtSOSZOpIcDOACszo1cm8iNID_f55usVFozmhcYf3Rv-nXbD6zugnVdgjkgBNtyh58cOQPvPbk82-G9af1Z6jBwZvoRm9poiGoI9E-YodU9jFQ4aW6R2mrH6BIjD_jMLu3LlZksLIUDKqsMFa33iDzn5fYnB_UxwrfzlgeHBEsNVZMDuPZZVOKnBnTEQvizQ2VJmkSHaSp_tCTwj4HcPsZ2kx4gMEOPiKbYHdfujPP_Y.png',
  // Optional, user/author settings
  // Author: name
  author: 'Icegotcha',
  // Author: Twitter handler
  authorTwitter: 'icegotcha_dev',
  // Author: Image external source
  authorImage: '/assets/author.jpg',
  // Author: Bio
  authorBio: 'Web developer'
}

export const SCREEN_WIDTH_BREAKPOINT = 768

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION =
  false /* works only when USE_AUTHOR_CARD is true */
