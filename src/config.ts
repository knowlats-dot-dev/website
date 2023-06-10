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
  logo: '/assets/image/logo.svg',
  image:
    'https://icegotcha-web-screenshot-capture.vercel.app/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrbm93bGF0cyIsInVybCI6Imh0dHBzOi8va25vd2xhdHMuZGV2IiwiZGV2aWNlU2NhbGVGYWN0b3IiOjEsIndhaXRVbnRpbCI6Im5ldHdvcmtpZGxlMCJ9.jRsnL6I6mHISw_NmdRHbAeXP-sOQZps7y5ikzGoXz0AkV_eSC1D9b7WU_qI4sZpewUt_3L28Q0VM8XIf2HRgLsFIsh0BYIGO9pW4Tm3hJxyaCQUSmuQAtZmLuxXnHkBXI8LM8jEb3eQ2U58xsmXA31FHpGLiGceF2SSg7TuOhnIfjfWdZMoTnMgsUaMd-IGNJGn4IfIshzD8cp6HSuchok7eGT6nYj4IEOsXvNh5kMqvxzPR_Aa35RoYlbWBJkssVBbCzPGyC0viqVRUbYogLR2pTXAnI4A3GbFoVWG_MaMUucwieBdC_YPwn4br2uOF4N3DXukCxf5c-JnsWJaVnBpcR-rkhb63T7VDTG-j7jbyph2kRBKLe9B3sdswszfufyi2GmhePpwBzw7F46HpH_7ynNtoxiacFqKEmgjIU7ZMX-MATlLF0Xbxksb0jEwQb3AVOb79cAsIOxf6oa-QshpD4gOrBeyoowhx70U-YHhcoQMxogPrg2x-8PhGTKVyhq6EwCAvzdEQNRvem2Fq9HxCvgYz5pspO17AUA7KS_Ec8Rcyi3pzKhO_CXNUmW8dWw0mjUd7_kBe7cAjNpkG4HHiKgxIxzWm04W2Xl6BAOeyRMdJn0s864wMCrHuN8Y3gcDChXXbJBd8qz2HMp3EbXudxKuauccPEILQIavObe4.png',
  // Optional, user/author settings
  // Author: name
  author: 'Icegotcha',
  // Author: Twitter handler
  authorTwitter: 'icegotcha_dev',
  // Author: Image external source
  authorImage: '/assets/image/author.jpg',
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
