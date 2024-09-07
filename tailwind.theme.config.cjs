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
        'primary-background-color': colors.zinc[900]
      },
      accent: {
        gray: {
          light: colors.gray[300],
          dark: colors.gray[500]
        },
        default: colors.blue[700]
      }
    }
  }
}
