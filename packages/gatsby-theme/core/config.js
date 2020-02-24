const proseConfig = ({ sources, mdxEnabled = true }) => () => {
  const plugins = [
    ...sources.map(s => ({
      resolve: `gatsby-source-filesystem`,
      options: s,
    })),
    mdxEnabled && {
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

module.exports = {
  proseConfig,
}
