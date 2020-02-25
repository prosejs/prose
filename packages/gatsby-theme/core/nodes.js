const crypto = require('crypto')

exports.createNodes = nodes => async api => {
  const { node, actions, getNode, createNodeId, reporter } = api
  const { createNode, createParentChildLink } = actions

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
  }
}
