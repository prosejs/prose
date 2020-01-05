const {
  listDetailDefinitions,
  listNodesBasic,
  detailNextPrevious,
  listBasic,
} = require('@prose/gatsby')

const entityName = 'WikiPage' // TODO: make option?

module.exports = listDetailDefinitions({
  entityName,
  nodeType: 'Mdx',
  typePrefix: 'Mdx',
  interfaceSchema: {
    id: 'ID!',
    title: 'String!',
    body: 'String!',
    slug: 'String!',
    date: 'Date! @dateformat',
    tags: '[String]!',
    keywords: '[String]!',
    excerpt: 'String!',
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
    return {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
    }
  },
  listNodes: listNodesBasic({ entityName }),
  list: listBasic({
    path: '/',
    listComponent: require.resolve(`./src/templates/wikis-query`),
  }),
  detail: detailNextPrevious({
    detailComponent: require.resolve(`./src/templates/wiki-query`),
  }),
})
