const { getSlug, resolverPassthrough } = require('@prose/gatsby')

const { createConfigStandard } = require('./config')
const { createPaths } = require('./pre-bootstrap')
const { createInterfaces, createTypes } = require('./schema')
const { createNodes } = require('./nodes')
const { createPage, createDetailNextPreviousPage } = require('./pages')

const all = (...funcs) => async api => {
  for await (const func of funcs) {
    await func(api)
  }
}

exports.createCoreConfigStandard = configFactory => {
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
          name: 'Category', // TODO: move up to caller
          schema: {
            id: 'ID!',
            name: 'String!',
            child: 'Category',
          },
        },
        {
          name: entityName,
          schema: node.interface,
        },
      ]),
      createTypes([
        {
          name: `CategoryType`,
          fields: {
            id: { type: 'ID!' },
            name: {
              type: 'String!',
            },
            child: {
              type: 'CategoryType',
            },
          },
          interfaces: ['Node', 'Category'],
        },
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

          const predicate = node.include || (() => true)
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
        listQuery: pages.listQuery,
        component: pages.detail,
        include: pages.include,
      })
    ),
  }
}
