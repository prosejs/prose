const path = require('path')

const render = async (browser, definition, theme, viewport, mermaidOptions) => {
  const page = await browser.newPage()

  page.setViewport(viewport)

  await page.goto(`file://${path.join(__dirname, 'render.html')}`)

  await page.addScriptTag({
    path: require.resolve('mermaid/dist/mermaid.min.js'),
  })

  return await page.$eval(
    '#container',
    (container, definition, theme, mermaidOptions) => {
      container.innerHTML = `<div class="mermaid">${definition}</div>`

      try {
        window.mermaid.initialize({
          ...mermaidOptions,
          theme,
        })
        window.mermaid.init()

        return container.getElementsByTagName('svg')[0].outerHTML
      } catch (e) {
        return `${e}`
      }
    },
    definition,
    theme,
    mermaidOptions
  )
}

module.exports = render
