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

const toNomnomlComponent = value => {
  const svg = nomnoml.renderSvg(value)

  let cleanedSvg = svg.replace(/<title >.*?<\/desc>/gms, '')
  cleanedSvg = cleanedSvg.replace(/\sxmlns:xlink.*?>/gms, '>')
  return `<Nomnoml>${EOL}${EOL}${cleanedSvg}${EOL}${EOL}</Nomnoml>`
}

const addImport = (tree, importValue) => {
  // TODO: review, as position property is not set
  tree.children = [{ type: 'import', value: importValue }, ...tree.children]
}

const plugin = async ({ markdownAST }, options) => {
  const { language = 'nomnoml' } = options || {}

  if (!isImportExists(markdownAST)) {
    addImport(markdownAST, importLine)
  }

  const nodes = nomnomlNodes(markdownAST, language)
  if (nodes.length === 0) {
    return
  }

  await Promise.all(
    nodes.map(async node => {
      node.type = 'jsx'
      node.value = toNomnomlComponent(node.value)
    })
  )
}

module.exports = plugin
