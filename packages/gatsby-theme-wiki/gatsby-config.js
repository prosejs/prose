const wikiDefinitions = require('./wiki')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: {
          ...themeOptions,
          definitions: wikiDefinitions(themeOptions),
        },
      },
    ],
  }
}
