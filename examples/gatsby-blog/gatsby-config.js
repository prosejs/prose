module.exports = {
  plugins: [
    {
      resolve: '@prose/gatsby-theme-blog',
      options: {
        basePath: '/',
        contentPath: 'content/posts',
        assetPath: 'content/assets',
        mdx: {
          allowDuplicateIdentifiers: true,
        },
        components: {
          code: {
            lines: {
              enabled: false,
            },
          },
        },
      },
    },
  ],
  siteMetadata: {
    title: `Gatsby Blog Example`,
    author: `My Blog`,
    description: `My blog description...`,
  },
}
