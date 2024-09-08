const colors = require('tailwindcss/colors')

module.exports = {
  /**
   * Color Palette - Default/Knowlats.dev Red Theme
   */
  default: {
    colors: {
      primary: colors.red[600],
      secondary: colors.red[800],
      dark: {
        primary: colors.red[400],
        secondary: colors.red[500]
      },
      accent: {
        gray: {
          light: colors.zinc[100],
          dark: colors.zinc[950]
        }
      }
    }
  }
}
