const {
  listDetailDefinitions,
  listNodesBasic,
  detailNextPrevious,
  listBasic,
} = require('@prose/gatsby')

const entityName = 'BlogPost' // TODO: make option?

module.exports = listDetailDefinitions({
  entityName,
  nodeType: 'Mdx',
  typePrefix: 'Mdx',
  interfaceSchema: {
    id: 'ID!',
    date: 'Date! @dateformat',
    title: 'String!',
    slug: 'String!',
    tags: '[String]!',
    keywords: '[String]!',
    excerpt: 'String!',
    body: 'String!',
  },
  nodeSchema: resolverPassthrough => ({
    id: { type: 'ID!' },
    title: {
      type: 'String!',
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
  }),
  nodeFields: ({ node }) => {
    const {
      id,
      title,
      date,
      tags = [],
      keywords = [],
      ...rest
    } = node.frontmatter

    return {
      id,
      title,
      date,
      tags,
      keywords,
      // frontmatter: rest,
    }
  },
  listNodes: listNodesBasic({ entityName }),
  list: listBasic({
    path: '/',
    listComponent: require.resolve(`./src/templates/posts-query`),
  }),
  detail: detailNextPrevious({
    detailComponent: require.resolve(`./src/templates/post-query`),
  }),
})
