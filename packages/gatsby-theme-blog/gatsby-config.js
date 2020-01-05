const blogDefinitions = require('./blog')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: {
          ...themeOptions,
          definitions: blogDefinitions(themeOptions),
        },
      },
    ],
  }
}
