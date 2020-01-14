const remark = require('remark')
const mdx = require('remark-mdx')
const vfile = require('to-vfile')
const plugin = require('../src/process')

const processFile = async filePath => {
  const file = await vfile.read(filePath)
  return await remark()
    .use(mdx)
    .use(plugin)
    .process(file)
}

describe('plugin', () => {
  it('adds import of Mermaid component if not exist', async () => {
    const result = await processFile('./basic.mdx')
    expect(
      result.contents.includes(`import Mermaid from '@prose/remark-mermaid'`)
    ).toBeTruthy()
  })

  it('adds Mermaid component of Mermaid component if not exist', async () => {
    const result = await processFile('./basic.mdx')
    expect(
      result.contents.includes(`import Mermaid from '@prose/remark-mermaid'`)
    ).toBeTruthy()
  })
})
