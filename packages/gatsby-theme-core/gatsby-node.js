const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)

const debug = Debug(`gatsby-theme-core`)
const getOptions = require('./options').getOptions

const asyncForEach = async (array, callback) => {
  if (!callback) {
    throw new Error('No callback specified on async for each.')
  }

  if (!array || !Array.isArray(array)) {
    return
  }

  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { definitions } = getOptions(themeOptions)

  const dirs = definitions.map(d => path.join(program.directory, d.source.path))

  dirs.forEach(dir => {
    debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes } = actions
  const { definitions } = getOptions(themeOptions)

  definitions.forEach(d => {
    if (d.interfaces && Array.isArray(d.interfaces)) {
      d.interfaces.forEach(i => {
        const interfaceSchema = Object.entries(i.schema)
          .map(entry => `${entry[0]}: ${entry[1]}`)
          .join('\n')

        const typeDefinition = `interface ${i.name} @nodeInterface {\n${interfaceSchema}\n}`
        createTypes(typeDefinition)
      })
    }

    if (d.types && Array.isArray(d.types)) {
      d.types.forEach(t => {
        createTypes(schema.buildObjectType(t))
      })
    }
  })
}

exports.onCreateNode = async (
  { node, actions, getNode, createNodeId, reporter },
  themeOptions
) => {
  const { createNode, createParentChildLink } = actions
  const { definitions } = getOptions(themeOptions)

  await asyncForEach(definitions, async d => {
    await asyncForEach(d.nodes, async n => {
      if (!n.include({ node, getNode })) {
        return
      }

      reporter.info('Processing node')

      const nodeId = createNodeId(n.id({ node }))
      const fields = n.fields({ node, getNode })
      const id = fields.id || nodeId

      await createNode({
        ...fields,
        // Required fields.
        id,
        parent: node.id,
        children: [],
        internal: {
          type: n.type,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(fields))
            .digest(`hex`),
          content: JSON.stringify(fields),
          description: n.description,
        },
      })

      createParentChildLink({ parent: node, child: getNode(id) })
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const { definitions } = getOptions(themeOptions)

  await asyncForEach(definitions, async d => {
    await asyncForEach(d.pages, async p => {
      const nodes = await p.listNodes({ graphql })

      // Create the list page
      const listPage = await p.list({ nodes })
      createPage(listPage)

      // Create a page for each node
      await asyncForEach(nodes, async ({ node }, index) => {
        const detailPage = await p.detail({ nodes, node, index })
        createPage(detailPage)
      })
    })
  })
}
