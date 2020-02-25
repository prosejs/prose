const { createCoreConfigStandard } = require('@prose/gatsby-theme')

const isDevelopment = () => process.env.NODE_ENV !== 'production'

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
    pages: {
      listQuery: ({ entityName }) => `{
        all${entityName}(sort: { fields: [date, title], order: DESC }, limit: 1000) {
          edges {
            node {
              id
              slug
              draft
            }
          }
        }
      }`,
      list: require.resolve(`./src/templates/posts-query`),
      detail: require.resolve(`./src/templates/post-query`),
      include: ({ node }) => {
        if (isDevelopment()) {
          return true
        }

        return !node.draft
      },
    },
  }))
}

module.exports = blog
