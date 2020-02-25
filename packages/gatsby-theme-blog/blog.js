const { getSlug, resolverPassthrough } = require('@prose/gatsby')

const {
  createConfigStandard,
  createPaths,
  createInterfaces,
  createTypes,
  createNodes,
  createPage,
  createDetailNextPreviousPage,
  // createCoreConfigStandard,
} = require('@prose/gatsby-theme')

const all = (...funcs) => async api => {
  for await (const func of funcs) {
    await func(api)
  }
}

const createCoreConfigStandard = configFactory => {
  const nodeType = 'Mdx'
  const typePrefix = 'Mdx'

  // TODO: validate params

  const config = configFactory({
    resolverPassthrough: resolverPassthrough(nodeType),
  })

  const { entityName, options, node, pages } = config

  // TODO: validate params

  return {
    config: createConfigStandard({
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
          schema: node.interface,
        },
      ]),
      createTypes([
        {
          name: `${typePrefix}${entityName}`,
          fields: node.fields,
          interfaces: ['Node', entityName],
        },
      ])
    ),
    onCreateNode: createNodes([
      {
        id: ({ node }) => `${node.id} >>> ${typePrefix}${entityName}`,
        type: `${typePrefix}${entityName}`,
        description: `${typePrefix} implementation of the ${entityName} interface`,
        include: props => {
          const { node, getNode } = props

          // Create source field (according to contentPath)
          const fileNode = getNode(node.parent)
          const source = fileNode ? fileNode.sourceInstanceName : null

          if (
            node.internal.type !== nodeType ||
            source !== options.contentPath
          ) {
            return false
          }

          const defaultPredicate = () => true
          const predicate = node.include || defaultPredicate
          return predicate(props)
        },
        fields: props => {
          const { node: gatsbyNode, getNode } = props

          const fields = node.getFields(props)
          return {
            ...fields,
            slug: getSlug()(options.basePath, gatsbyNode, getNode),
          }
        },
      },
    ]),
    createPages: all(
      createPage({
        path: '/',
        component: pages.list,
        context: {},
      }),
      createDetailNextPreviousPage({
        entityName,
        component: pages.detail,
      })
    ),
  }
}

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
      include: () => {
        return true
      },
      getFields: ({ node }) => {
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
      },
    },
    pages: {
      list: require.resolve(`./src/templates/posts-query`),
      detail: require.resolve(`./src/templates/post-query`),
    },
  }))

  // return {
  //   config: createConfigFromOptions(options),
  //   onPreBootstrap: createPathsFromOptions(options),
  //   createSchemaCustomization: all(
  //     createInterfaces([
  //       {
  //         name: entityName,
  //         schema: {
  //           id: 'ID!',
  //           date: 'Date! @dateformat',
  //           title: 'String!',
  //           subTitle: 'String',
  //           slug: 'String!',
  //           tags: '[String]!',
  //           keywords: '[String]!',
  //           excerpt: 'String!',
  //           body: 'String!',
  //         },
  //       },
  //     ]),
  //     createTypes([
  //       {
  //         name: `${typePrefix}${entityName}`,
  //         fields: {
  //           id: { type: 'ID!' },
  //           title: {
  //             type: 'String!',
  //           },
  //           subTitle: {
  //             type: 'String',
  //           },
  //           slug: {
  //             type: 'String!',
  //           },
  //           date: { type: 'Date!', extensions: { dateformat: {} } },
  //           tags: { type: '[String]!' },
  //           keywords: { type: '[String]!' },
  //           excerpt: {
  //             type: 'String!',
  //             args: {
  //               pruneLength: {
  //                 type: 'Int',
  //                 defaultValue: 140,
  //               },
  //             },
  //             resolve: resolverPassthrough(nodeType)('excerpt'),
  //           },
  //           body: {
  //             type: 'String!',
  //             resolve: resolverPassthrough(nodeType)('body'),
  //           },
  //         },
  //         interfaces: ['Node', entityName],
  //       },
  //     ])
  //   ),
  //   onCreateNode: createNodes([
  //     {
  //       id: ({ node }) => `${node.id} >>> ${typePrefix}${entityName}`,
  //       type: `${typePrefix}${entityName}`,
  //       description: `${typePrefix} implementation of the ${entityName} interface`,
  //       include: ({ node, getNode }) => {
  //         // Create source field (according to contentPath)
  //         const fileNode = getNode(node.parent)
  //         const source = fileNode ? fileNode.sourceInstanceName : null

  //         return (
  //           node.internal.type === nodeType && source === options.contentPath
  //         )
  //       },
  //       fields: props => {
  //         const getFields = ({ node }) => {
  //           const {
  //             id,
  //             title,
  //             subTitle,
  //             date,
  //             tags = [],
  //             keywords = [],
  //           } = node.frontmatter

  //           return {
  //             id,
  //             title,
  //             subTitle,
  //             date,
  //             tags,
  //             keywords,
  //           }
  //         }

  //         const fields = getFields(props)
  //         const { node, getNode } = props
  //         return {
  //           ...fields,
  //           slug: getSlug()(options.basePath, node, getNode),
  //         }
  //       },
  //     },
  //   ]),
  //   createPages: all(
  //     createPage({
  //       path: '/',
  //       component: require.resolve(`./src/templates/posts-query`),
  //       context: {},
  //     }),
  //     createDetailNextPreviousPage({
  //       entityName,
  //       component: require.resolve(`./src/templates/post-query`),
  //     })
  //   ),
  // }
}

module.exports = blog
