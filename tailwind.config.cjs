const { fontFamily } = require('tailwindcss/defaultTheme')
const config = require('./tailwind.theme.config.cjs')
/**
 * Find the applicable theme color palette, or use the default one
 */
const themeConfig = config.default
const { colors } = themeConfig
module.exports = {
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{astro,js,ts}'],
  safelist: ['dark'],
  theme: {
    fontFamily: {
      sans: ['Fira Code', ...fontFamily.sans]
    },
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      },
      colors: {
        theme: colors
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              '&:hover': {
                backgroundColor: theme('colors.zinc.800'),
                textDecoration: 'none'
              }
            },
            strong: {
              color: theme('colors.gray.200')
            },
            code: {
              padding: theme('padding.1'),
              color: theme('colors.gray.200'),
              background: theme('colors.gray.600')
            },
            pre: {
              code: {
                padding: theme('padding.0'),
                background: theme('colors.transparent')
              }
            },
            blockquote: {
              color: colors.dark.primary,
              borderColor: colors.primary
            },
            'blockquote > p::before, p::after': {
              color: colors.primary
            }
          }
        },
        DEFAULT: {
          css: {
            a: {
              color: colors.dark.primary,
              '&:hover': {
                backgroundColor: 'none',
                textDecoration: 'none'
              }
            },
            code: {
              padding: theme('padding.1'),
              background: theme('colors.gray.200')
            },
            pre: {
              code: {
                padding: theme('padding.0'),
                background: theme('colors.transparent')
              }
            },
            blockquote: {
              color: colors.primary,
              fontSize: theme('fontSize.2xl'),
              borderColor: colors.dark.primary
            },
            'blockquote > p::before, p::after': {
              color: colors.dark.primary
            },
            h1: {
              color: colors.dark.secondary,
              strong: {
                color: theme('colors.black')
              }
            },
            h2: {
              color: colors.dark.secondary,
              strong: {
                color: theme('colors.black')
              }
            },
            h3: {
              color: colors.dark.secondary,
              strong: {
                color: theme('colors.black')
              }
            }
          }
        }
      })
    }
  },
  variants: {
    extend: { typography: ['dark'] }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-hyphens')
  ]
}
