const crypto = require('crypto')

const createCategoryNode = ({ getNode, createNode }) => async (
  name,
  parent,
  child
) => {
  let categoryFields = {
    name,
  }

  const existingNode = getNode(name) // TODO: append category
  if (existingNode) {
    return name
  }

  await createNode({
    ...categoryFields,
    id: name,
    parent,
    children: child ? [child] : [],
    internal: {
      type: 'Category',
      description: 'This is a description',
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(categoryFields))
        .digest(`hex`),
      content: JSON.stringify(categoryFields),
    },
  })

  return name
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
      createNodeId,
    })

    await createCategory('cloud', null, 'cloud/aws') // no parent
    await createCategory('cloud/aws', 'cloud', 'cloud/aws/solution-architect')
    await createCategory('cloud/aws/solution-architect', 'cloud/aws', null) // no child
  }
}
