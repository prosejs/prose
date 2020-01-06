const reportDefinitions = require('./report')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: {
          ...themeOptions,
          definitions: reportDefinitions(themeOptions),
        },
      },
    ],
  }
}
