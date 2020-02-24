const { getSlug, resolverPassthrough } = require('@prose/gatsby')

const {
  proseConfig,
  createPaths,
  createInterfaces,
  createTypes,
  createNodes,
  createPage,
  createDetailNextPreviousPage,
} = require('@prose/gatsby-theme')

const all = (...funcs) => async api => {
  for await (const func of funcs) {
    await func(api)
  }
}

const blog = options => {
  const entityName = 'BlogPost' // TODO: make option?
  const nodeType = 'Mdx'
  const typePrefix = 'Mdx'

  return {
    config: proseConfig({
      sources: [
        {
          name: options.contentPath, // TODO: review optional
          path: options.contentPath,
        },
        {
          name: options.assetPath,
          path: options.assetPath,
        },
      ],
      mdxEnabled: options.mdx,
    }),
    onPreBootstrap: createPaths([options.contentPath, options.assetPath]), // TODO: review optional
    createSchemaCustomization: all(
      createInterfaces([
        {
          name: entityName,
          schema: {
            id: 'ID!',
            date: 'Date! @dateformat',
            title: 'String!',
            subTitle: 'String',
            slug: 'String!',
            tags: '[String]!',
            keywords: '[String]!',
            excerpt: 'String!',
            body: 'String!',
          },
        },
      ]),
      createTypes([
        {
          name: `${typePrefix}${entityName}`,
          fields: {
            id: { type: 'ID!' },
            title: {
              type: 'String!',
            },
            subTitle: {
              type: 'String',
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
              resolve: resolverPassthrough(nodeType)('excerpt'),
            },
            body: {
              type: 'String!',
              resolve: resolverPassthrough(nodeType)('body'),
            },
          },
          interfaces: ['Node', entityName],
        },
      ])
    ),
    onCreateNode: createNodes([
      {
        id: ({ node }) => `${node.id} >>> ${typePrefix}${entityName}`,
        type: `${typePrefix}${entityName}`,
        description: `${typePrefix} implementation of the ${entityName} interface`,
        include: ({ node, getNode }) => {
          // Create source field (according to contentPath)
          const fileNode = getNode(node.parent)
          const source = fileNode ? fileNode.sourceInstanceName : null

          return (
            node.internal.type === nodeType && source === options.contentPath
          )
        },
        fields: props => {
          const getFields = ({ node }) => {
            const {
              id,
              title,
              subTitle,
              date,
              tags = [],
              keywords = [],
            } = node.frontmatter

            return {
              id,
              title,
              subTitle,
              date,
              tags,
              keywords,
            }
          }

          const fields = getFields(props)
          const { node, getNode } = props
          return {
            ...fields,
            slug: getSlug()(options.basePath, node, getNode),
          }
        },
      },
    ]),
    onCreatePage: all(
      createPage({
        path: '/',
        component: require.resolve(`./src/templates/posts-query`),
        context: {},
      }),
      createDetailNextPreviousPage({
        entityName,
        component: require.resolve(`./src/templates/post-query`),
      })
    ),
  }
}

module.exports = blog

// module.exports = listDetailDefinitions({
//   entityName,
//   nodeType: 'Mdx',
//   typePrefix: 'Mdx',
//   interfaceSchema: {
//     id: 'ID!',
//     date: 'Date! @dateformat',
//     title: 'String!',
//     slug: 'String!',
//     tags: '[String]!',
//     keywords: '[String]!',
//     excerpt: 'String!',
//     body: 'String!',
//   },
//   nodeSchema: resolverPassthrough => ({
//     id: { type: 'ID!' },
//     title: {
//       type: 'String!',
//     },
//     slug: {
//       type: 'String!',
//     },
//     date: { type: 'Date!', extensions: { dateformat: {} } },
//     tags: { type: '[String]!' },
//     keywords: { type: '[String]!' },
//     excerpt: {
//       type: 'String!',
//       args: {
//         pruneLength: {
//           type: 'Int',
//           defaultValue: 140,
//         },
//       },
//       resolve: resolverPassthrough('excerpt'),
//     },
//     body: {
//       type: 'String!',
//       resolve: resolverPassthrough('body'),
//     },
//   }),
//   nodeFields: ({ node }) => {
//     const { id, title, date, tags = [], keywords = [] } = node.frontmatter

//     return {
//       id,
//       title,
//       date,
//       tags,
//       keywords,
//     }
//   },
//   listNodes: listNodesBasic({ entityName }),
//   list: listBasic({
//     path: '/',
//     listComponent: require.resolve(`./src/templates/posts-query`),
//   }),
//   detail: detailNextPrevious({
//     detailComponent: require.resolve(`./src/templates/post-query`),
//   }),
// })
