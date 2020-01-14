const visit = require('unist-util-visit')
const modifyChildren = require('unist-util-modify-children')

const EOL = '\n'

const toSvg = markup => {
  return `<svg></svg>`
}

const importLine = `import Mermaid from '@prose/remark-mermaid/Mermaid'`

const isImportExists = tree => {
  let exists = false

  visit(tree, 'import', node => {
    if (node.value && node.value.includes(importLine)) {
      exists = true
    }
  })

  return exists
}

const mermaidNodes = (markdownAST, language) => {
  const result = []

  visit(markdownAST, 'code', node => {
    if ((node.lang || '').toLowerCase() === language) {
      result.push(node)
    }
  })

  return result
}

const plugin = async ({ markdownAST }, options) => {
  const language = 'mermaid' // TODO: option

  if (!isImportExists(markdownAST)) {
    const modify = modifyChildren((_, index, parent) => {
      if (index === 0) {
        parent.children.splice(index, 1, { type: 'import', value: importLine })
        return index + 1
      }
    })

    modify(markdownAST)
  }

  const nodes = mermaidNodes(markdownAST, language)
  if (nodes.length === 0) {
    return
  }

  await Promise.all(
    nodes.map(async node => {
      node.type = 'jsx'
      node.value = `<Mermaid>${EOL}${toSvg(node.value)}${EOL}</Mermaid>`
    })
  )
}

module.exports = plugin
