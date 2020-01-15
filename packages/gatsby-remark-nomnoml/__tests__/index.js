const Remark = require(`remark`)
const toHAST = require(`mdast-util-to-hast`)
const hastToHTML = require(`hast-util-to-html`)
const cheerio = require(`cheerio`)
const nomnomlPlugin = require('../index')
const mermaidPlugin = require('@prose/gatsby-remark-mermaid')

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
})

const markdownToMdast = plugins => async markdown => {
  const markdownAST = remark.parse(markdown)

  await asyncForEach(Array.isArray(plugins) ? plugins : [plugins], async p => {
    await p({ markdownAST })
  })

  return markdownAST
}

const markdownAstToHtml = async markdownAST => {
  const htmlAst = toHAST(markdownAST, { allowDangerousHTML: true })
  return hastToHTML(htmlAst, {
    allowDangerousHTML: true,
  })
}

const markdownToHtml = plugins => async markdown => {
  const markdownAST = await markdownToMdast(plugins)(markdown)
  return await markdownAstToHtml(markdownAST)
}

describe('nomnoml plugin', () => {
  it('should add nomnoml component import', async () => {
    const markdownAST = await markdownToMdast(nomnomlPlugin)(`
    \`\`\`nomnoml
    [<start>st]->[<state>plunder]
    [plunder]->[<choice>more loot]
    [more loot]->[st]
    [more loot] no ->[<end>e]
    \`\`\``)

    expect(markdownAST).toBeTruthy()
  })

  it('should add nomnoml and mermaid imports', async () => {
    const markdownAST = await markdownToMdast([mermaidPlugin, nomnomlPlugin])(`
    \`\`\`mermaid
    graph TD
      A[Christmas] -->|Get money| B(Go shopping)
      B --> C{Let me think}
      C -->|One| D[Laptop]
      C -->|Two| E[iPhone]
      C -->|Three| F[fa:fa-car Car]
    \`\`\`

    \`\`\`nomnoml
    [<start>st]->[<state>plunder]
    [plunder]->[<choice>more loot]
    [more loot]->[st]
    [more loot] no ->[<end>e]
    \`\`\``)

    expect(markdownAST).toBeTruthy()
  })
})
