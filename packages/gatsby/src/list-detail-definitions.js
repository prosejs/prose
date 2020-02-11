import { resolverPassthrough } from './resolver-pass-through'
import { getSlug } from './get-slug'
import { deepmerge } from '@utilz/deepmerge'

const getOptions = options => {
  const defaultOptions = {
    basePath: '/',
    contentPath: 'content/posts',
    assetPath: 'content/assets',
  }

  return deepmerge(defaultOptions, options)
}

export const listDetailDefinitions = typeOptions => options => {
  const combinedOptions = getOptions(options)
  const {
    entityName,
    typePrefix,
    nodeType,
    interfaceSchema,
    nodeSchema,
    nodeFields,
    listNodes,
    list,
    detail,
  } = typeOptions

  const type = {
    name: `${typePrefix}${entityName}`,
    fields: nodeSchema(resolverPassthrough(nodeType)),
    interfaces: ['Node', entityName],
  }

  return [
    {
      source: {
        name: combinedOptions.contentPath,
        path: combinedOptions.contentPath,
        // TODO: add ignore so only md/mdx files included
      },
      interfaces: [
        {
          name: entityName,
          schema: interfaceSchema,
        },
      ],
      types: [type],
      nodes: [
        {
          include: ({ node, getNode }) => {
            // Create source field (according to contentPath)
            const fileNode = getNode(node.parent)
            const source = fileNode ? fileNode.sourceInstanceName : null

            return (
              node.internal.type === nodeType &&
              source === combinedOptions.contentPath
            )
          },
          id: ({ node }) => `${node.id} >>> ${typePrefix}${entityName}`,
          type: `${typePrefix}${entityName}`,
          description: `${typePrefix} implementation of the ${entityName} interface`,
          fields: props => {
            const fields = nodeFields(props)
            const { node, getNode } = props
            return {
              ...fields,
              slug: getSlug()(combinedOptions.basePath, node, getNode),
            }
          },
        },
      ],
      pages: [
        {
          listNodes,
          list,
          detail,
        },
      ],
    },
    {
      source: {
        name: combinedOptions.assetPath,
        path: combinedOptions.assetPath,
      },
    },
  ]
}
