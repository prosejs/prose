const wiki = require('./wiki')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: wiki(themeOptions),
      },
    ],
  }
}
