const visit = require('unist-util-visit')
const modifyChildren = require('unist-util-modify-children')
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
  return `<Nomlnoml>${EOL}${EOL}${cleanedSvg}${EOL}${EOL}</Nomlnoml>`
}

// remove invalid xmlns:xlink property
const defaultClean = content => {
  const regex = /\sxmlns:xlink.*?\s/gm
  return content.replace(regex, ' ')
}

const plugin = async ({ markdownAST }, options) => {
  const { language = 'nomnoml' } = options

  if (!isImportExists(markdownAST)) {
    const modify = modifyChildren((_, index, parent) => {
      if (index === 0) {
        parent.children.splice(index, 1, { type: 'import', value: importLine })
        return index + 1
      }
    })

    modify(markdownAST)
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
