const report = require('./report')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: report(themeOptions),
      },
    ],
  }
}
