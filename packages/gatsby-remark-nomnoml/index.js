const visit = require('unist-util-visit')
const nomnoml = require('nomnoml')

function nomnomlNodes(markdownAST, language) {
  const result = []
  visit(markdownAST, 'code', node => {
    if ((node.lang || '').toLowerCase() === language) {
      result.push(node)
    }
  })
  return result
}

const defaultProcess = (language, content) => {
  return `<div class="${language}">${content}</div>`
}

// remove invalid xmlns:xlink property
const defaultClean = content => {
  const regex = /\sxmlns:xlink.*?\s/gm
  return content.replace(regex, ' ')
}

module.exports = async ({ markdownAST }, options) => {
  const { language = 'nomnoml' } = options

  const nodes = nomnomlNodes(markdownAST, language)
  if (nodes.length === 0) {
    return
  }

  const process = options.process || defaultProcess
  const clean = options.clean || defaultClean

  await Promise.all(
    nodes.map(async node => {
      node.type = 'html'
      node.value = process(language, clean(nomnoml.renderSvg(node.value)))
    })
  )
}
