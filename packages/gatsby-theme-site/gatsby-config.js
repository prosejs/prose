const site = require('./site')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: site(themeOptions),
      },
    ],
  }
}
