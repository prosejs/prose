const {
  createCoreConfigStandard,
  pagesWithDraft,
} = require('@prose/gatsby-theme')

const blog = (options) => {
  return createCoreConfigStandard(({ resolverPassthrough }) => ({
    entityName: 'BlogPost', // TODO: make option,
    categoryItemsName: 'posts',
    options,
    node: {
      interface: {
        id: 'ID!',
        date: 'Date! @dateformat',
        title: 'String!',
        subTitle: 'String',
        draft: 'Boolean!',
        tags: '[String]!',
        keywords: '[String]!',
        excerpt: 'String!',
        body: 'String!',
        maturity: 'Int',
      },
      fields: {
        id: { type: 'ID!' },
        title: {
          type: 'String!',
        },
        subTitle: {
          type: 'String',
        },
        draft: {
          type: 'Boolean!',
        },
        date: { type: 'Date!', extensions: { dateformat: {} } },
        tags: { type: '[String]!' },
        keywords: { type: '[String]!' },
        excerpt: {
          type: 'String!',
          args: {
            pruneLength: {
              type: 'Int',
              defaultValue: 140,
            },
          },
          resolve: resolverPassthrough('excerpt'),
        },
        body: {
          type: 'String!',
          resolve: resolverPassthrough('body'),
        },
        maturity: {
          type: 'Int',
        },
      },
      getFields: ({ node }) => {
        const {
          id,
          title,
          subTitle,
          draft,
          date,
          tags = [],
          keywords = [],
          maturity,
        } = node.frontmatter

        return {
          id,
          title,
          subTitle,
          draft: draft || false,
          date,
          tags,
          keywords,
          maturity,
        }
      },
    },
    pages: pagesWithDraft({
      list: require.resolve(`./src/templates/posts`),
      detail: require.resolve(`./src/templates/post`),
    }),
  }))
}

module.exports = blog
