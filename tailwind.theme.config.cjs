const colors = require('tailwindcss/colors')

module.exports = {
  /**
   * Color Palette - Default/Knowlats.dev Red Theme
   */
  default: {
    colors: {
      primary: colors.red[600],
      secondary: colors.red[800],
      'primary-background-color': colors.zinc[100],
      dark: {
        primary: colors.red[300],
        secondary: colors.red[500],
        'primary-background-color': colors.zinc[950]
      },
      accent: {
        gray: {
          light: colors.zinc[300],
          dark: colors.zinc[500]
        },
        default: colors.zinc[800]
      }
    }
  }
}
