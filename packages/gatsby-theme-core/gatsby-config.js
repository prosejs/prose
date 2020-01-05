const getOptions = require('./options').getOptions

module.exports = themeOptions => {
  const options = getOptions(themeOptions)

  // TODO: validate options against schema
  const plugins = [
    ...options.definitions.map(d => ({
      resolve: 'gatsby-source-filesystem',
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
          'gatsby-remark-mermaid',
          //   "gatsby-remark-nomnoml",
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1380, // TODO: make configurable
              sizeByPixelDensity: true,
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
      title: `Blog Title Placeholder`,
      author: `Name Placeholder`,
      description: `Description placeholder`,
      social: [
        {
          name: `Twitter`,
          url: `https://twitter.com/gatsbyjs`,
        },
        {
          name: `GitHub`,
          url: `https://github.com/gatsbyjs`,
        },
      ],
    },
    plugins,
  }
}
