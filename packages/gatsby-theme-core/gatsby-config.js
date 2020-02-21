const { getOptions } = require('./options')

module.exports = themeOptions => {
  const options = getOptions(themeOptions)

  // TODO: validate options against schema
  const plugins = [
    ...options.definitions.map(d => ({
      resolve: `gatsby-source-filesystem`,
      options: d.source,
    })),
    options.mdx && {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-slug')],
        rehypePlugins: [
          /*require('rehype-toc')*/
        ],
        gatsbyRemarkPlugins: [
          `@prose/gatsby-remark-mermaid`,
          `@prose/gatsby-remark-nomnoml`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1380, // TODO: make configurable
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ].filter(Boolean)

  return {
    siteMetadata: {
      title: `Title Placeholder`,
      author: `Author Placeholder`,
      description: `Description placeholder`,
    },
    plugins,
  }
}
