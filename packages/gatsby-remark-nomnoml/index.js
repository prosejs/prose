const visit = require('unist-util-visit')
const nomnoml = require('nomnoml')

const EOL = '\n'

const importLine = `import Nomnoml from '@prose/gatsby-remark-nomnoml/Nomnoml'`

const isImportExists = tree => {
  let exists = false

  visit(tree, 'import', node => {
    if (node.value && node.value.includes(importLine)) {
      exists = true
    }
  })

  return exists
}

const nomnomlNodes = (markdownAST, language) => {
  const result = []

  visit(markdownAST, 'code', node => {
    if ((node.lang || '').toLowerCase() === language) {
      result.push(node)
    }
  })

  return result
}

const addImport = (tree, importValue) => {
  // TODO: review, as position property is not set
  tree.children = [{ type: 'import', value: importValue }, ...tree.children]
}

const plugin = async ({ markdownAST }, options) => {
  const defaultPreRender = value => value

  const defaultPostRender = value => {
    if (!value) {
      return value
    }

    // replace braces interpreted as JSX vars
    // see https://github.com/facebook/react/issues/1545
    let val = value.replace(/([{}]+)/g, "{'$1'}")

    val = val.replace(/<title >.*?<\/desc>/gms, '')
    return val.replace(/\sxmlns:xlink.*?>/gms, '>')
  }

  const { language = 'nomnoml' } = options || {}
  const { preRender = defaultPreRender, postRender = defaultPostRender } =
    options || {}

  if (!isImportExists(markdownAST)) {
    addImport(markdownAST, importLine)
  }

  const nodes = nomnomlNodes(markdownAST, language)
  if (nodes.length === 0) {
    return
  }

  const toNomnomlComponent = value => {
    const val = preRender(value)
    let svg = nomnoml.renderSvg(val)
    svg = postRender(svg)

    return `<Nomnoml>${EOL}${EOL}${svg}${EOL}${EOL}</Nomnoml>`
  }

  await Promise.all(
    nodes.map(async node => {
      node.type = 'jsx'
      node.value = toNomnomlComponent(node.value)
    })
  )
}

module.exports = plugin
