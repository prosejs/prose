const blog = require('./blog')

module.exports = themeOptions => {
  return {
    plugins: [
      {
        resolve: `@prose/gatsby-theme`,
        options: blog(themeOptions),
      },
    ],
  }
}
