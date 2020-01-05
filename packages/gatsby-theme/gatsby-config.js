module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme-core`,
        options: themeOptions,
      },
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-twitter`,
      `gatsby-plugin-emotion`,
      // `gatsby-plugin-theme-ui`,
    ],
  }
}
