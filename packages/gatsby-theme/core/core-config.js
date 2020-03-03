const { isNil, isString } = require('@utilz/types')
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

// Converts /foo/bar/page to foo/bar
const slugToCategory = value => {
  if (isNil(value)) {
    return null
  }

  if (!isString(value)) {
    return null
  }

  if (value.length === 0) {
    return null
  }

  let val = value
  if (val.startsWith('/')) {
    val = val.substring(1)
  }

  const parts = val.split('/')
  return parts.length === 1 ? null : parts.slice(0, parts.length - 1).join('/')
}

// Shared config across OOTB themes
exports.createCoreConfigStandard = configFactory => {
  const nodeType = 'Mdx'
  const typePrefix = 'Mdx'

  // TODO: validate params

  const config = configFactory({
    resolverPassthrough: resolverPassthrough(nodeType),
  })

  const { entityName, categoryItemsName, options, node, pages } = config

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
          schema: {
            ...node.interface,
            slug: 'String!',
            category: 'Category',
          },
        },
      ]),
      createTypes([
        {
          name: `${typePrefix}${entityName}`,
          fields: {
            ...node.fields,
            slug: {
              type: 'String!',
            },
            category: {
              type: 'Category',
              resolve: (source, _, context) => {
                const categoryNodes = context.nodeModel.getAllNodes({
                  type: 'Category',
                })

                return categoryNodes.find(
                  category => category.path === source.category
                )
              },
            },
          },
          interfaces: ['Node', entityName],
        },
        {
          name: 'Category',
          fields: {
            id: { type: 'ID!' },
            name: { type: 'String!' },
            [categoryItemsName]: {
              type: `[${typePrefix}${entityName}]`,
              resolve: (source, _, context) => {
                const entityNodes = context.nodeModel.getAllNodes({
                  type: entityName,
                })

                return entityNodes.filter(
                  blogPost => blogPost.category === source.path
                )
              },
            },
          },
          interfaces: ['Node'],
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
          const slug = getSlug({ basePath: options.basePath, getNode })(
            gatsbyNode
          )

          const category =
            gatsbyNode.frontmatter.category || slugToCategory(slug)

          return {
            ...fields,
            slug,
            category,
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
