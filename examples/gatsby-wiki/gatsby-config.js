module.exports = {
  plugins: [
    {
      resolve: '@prose/gatsby-theme-wiki',
      options: {
        basePath: '/',
        contentPath: 'content/pages',
        assetPath: 'content/assets',
        mdx: true,
      },
    },
  ],
  siteMetadata: {
    title: `Gatsby Wiki Example`,
    author: `My Wiki`,
    description: `My wiki description...`,
  },
}
