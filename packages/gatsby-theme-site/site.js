const {
  createCoreConfigStandard,
  pagesWithDraft,
} = require('@prose/gatsby-theme')

const site = options => {
  return createCoreConfigStandard(({ resolverPassthrough }) => ({
    entityName: 'Page', // TODO: make option,
    categoryItemsName: 'pages',
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
      },
      include: () => {
        return true
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
        } = node.frontmatter

        return {
          id,
          title,
          subTitle,
          draft: draft || false,
          date,
          tags,
          keywords,
        }
      },
    },
    pages: pagesWithDraft({
      list: require.resolve(`./src/templates/pages`),
      detail: require.resolve(`./src/templates/page`),
    }),
  }))
}

module.exports = site
