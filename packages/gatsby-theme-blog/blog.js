const {
  createCoreConfigStandard,
  pagesWithDraft,
} = require('@prose/gatsby-theme')

const blog = options => {
  return createCoreConfigStandard(({ resolverPassthrough }) => ({
    entityName: 'BlogPost', // TODO: make option,
    options,
    node: {
      interface: {
        id: 'ID!',
        date: 'Date! @dateformat',
        title: 'String!',
        subTitle: 'String',
        draft: 'Boolean!',
        slug: 'String!',
        tags: '[String]!',
        keywords: '[String]!',
        excerpt: 'String!',
        body: 'String!',
        category: 'Category',
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
        slug: {
          type: 'String!',
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
        category: {
          type: 'Category',
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
          category,
        } = node.frontmatter

        return {
          id,
          title,
          subTitle,
          draft: draft || false,
          date,
          tags,
          keywords,
          category,
        }
      },
    },
    pages: pagesWithDraft({
      list: require.resolve(`./src/templates/posts-query`),
      detail: require.resolve(`./src/templates/post-query`),
    }),
  }))
}

module.exports = blog
