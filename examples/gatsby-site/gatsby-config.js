module.exports = {
  plugins: [
    {
      resolve: '@prose/gatsby-theme-site',
      options: {
        basePath: '/',
        contentPath: 'content/pages',
        assetPath: 'content/assets',
        mdx: true,
      },
    },
  ],
  siteMetadata: {
    title: `Gatsby Site Example`,
    author: `My Site`,
    description: `My site description...`,
  },
}
