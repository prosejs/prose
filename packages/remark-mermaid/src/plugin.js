import map from 'unist-util-map'
import modifyChildren from 'unist-util-modify-children'
import visit from 'unist-util-visit'

const EOL = '\n'

const toSvg = markup => {
  return `<svg></svg>`
}

const importLine = `import { Mermaid } from '@prose/remark-mermaid'`

const isImportExists = tree => {
  let exists = false

  visit(tree, 'import', node => {
    if (node.value && node.value.includes(importLine)) {
      exists = true
    }
  })

  return exists
}

const process = tree => {
  const updatedTree = map(tree, node => {
    if (node.type === 'code' && node.lang === 'mermaid') {
      return {
        type: 'jsx',
        value: `<Mermaid>${EOL}${toSvg(node.value)}${EOL}</Mermaid>`,
      }
    }

    return node
  })

  if (!isImportExists(updatedTree)) {
    const modify = modifyChildren((_, index, parent) => {
      if (index === 0) {
        parent.children.splice(index, 1, { type: 'import', value: importLine })
        return index + 1
      }
    })

    modify(updatedTree)
  }

  return updatedTree
}

// const plugin = options => {
//   console.log(options)
//   return tree => {
//     console.log(tree)
//     return process(tree)
//   }
// }

const plugin = tree => process(tree)

// const plugin = ({ markdownAST }, options) => {
//   console.log('foo')
//   return process(markdownAST)
// }

export default plugin
