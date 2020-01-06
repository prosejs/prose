module.exports = {
  plugins: [
    {
      resolve: '@prose/gatsby-theme-reports',
      options: {
        basePath: '/',
        contentPath: 'content/reports',
        assetPath: 'content/assets',
        mdx: true,
      },
    },
  ],
  siteMetadata: {
    title: `Gatsby Reports Example`,
    author: `My Reports`,
    description: `My reports description...`,
  },
}
