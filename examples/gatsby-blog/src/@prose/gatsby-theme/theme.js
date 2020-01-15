import theme from '@theme-ui/preset-swiss'
import mermaidTheme from '@prose/gatsby-remark-mermaid/theme'

export default {
  ...theme,
  mermaid: {
    ...mermaidTheme('default'),
  },
}
