const crypto = require('crypto')
const { toCategories } = require('./category')

const createCategoryNode = ({
  getNode,
  createNode,
  createParentChildLink,
}) => async (path, name, parent, child) => {
  let categoryFields = {
    name,
    path,
  }

  const prefixed = value => `category-${value}`

  const id = prefixed(name) // TODO: allow function as option

  let node = getNode(id)
  if (!node) {
    await createNode({
      ...categoryFields,
      id,
      parent: prefixed(parent),
      children: child ? [prefixed(child)] : [],
      internal: {
        type: 'Category',
        description: 'Category',
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(categoryFields))
          .digest(`hex`),
        content: JSON.stringify(categoryFields),
      },
    })

    node = getNode(id)
  }

  if (parent) {
    const parentNode = getNode(prefixed(parent))
    if (parentNode) {
      createParentChildLink({
        parent: parentNode,
        child: node,
      })
    }
  }

  if (child) {
    const childNode = getNode(prefixed(child))
    if (childNode) {
      createParentChildLink({
        parent: node,
        child: childNode,
      })
    }
  }
}

exports.createNodes = nodes => async api => {
  const { node, actions, getNode, createNodeId, reporter } = api
  const { createNode, createNodeField, createParentChildLink } = actions

  for await (const n of nodes) {
    if (!n.include({ node, getNode })) {
      return
    }

    reporter.info('Processing node')

    const fields = {
      ...n.fields({ node, getNode }),
      fileAbsolutePath: node.fileAbsolutePath,
    }

    const oldNode = fields.id ? getNode(fields.id) : null
    if (oldNode) {
      reporter.error(
        `Duplicate id of '${fields.id}' exists within the files '${node.fileAbsolutePath} and '${oldNode.fileAbsolutePath}'.`
      )
    }

    const nodeId = createNodeId(n.id({ node }))
    const id = fields.id || nodeId

    // Update MDX node with slug field
    createNodeField({
      node,
      name: `slug`,
      value: fields.slug,
    })

    // Create entity node
    await createNode({
      ...fields,
      // Required fields.
      id,
      parent: node.id,
      children: [],
      internal: {
        type: n.type,
        description: n.description,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(fields))
          .digest(`hex`),
        content: JSON.stringify(fields),
      },
    })

    createParentChildLink({ parent: node, child: getNode(id) })

    // Create categories
    const createCategory = createCategoryNode({
      getNode,
      createNode,
      createParentChildLink,
    })

    const categories = toCategories(fields.category)
    console.log(categories)
    for await (const category of categories) {
      await createCategory(
        category.path,
        category.name,
        category.parent,
        category.child
      )
    }
  }
}
