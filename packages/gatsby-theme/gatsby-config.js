module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme-core`,
        options: themeOptions,
      },
      `gatsby-plugin-react-helmet`, // TODO: review plugins
      `gatsby-plugin-twitter`,
      `gatsby-plugin-emotion`,
    ],
  }
}
