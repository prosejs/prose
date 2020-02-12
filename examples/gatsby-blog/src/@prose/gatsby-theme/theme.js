import theme from '@theme-ui/preset-swiss'
import mermaidTheme from '@prose/gatsby-remark-mermaid/theme'

export default {
  ...theme,
  components: {
    base: {
      mb: 1,
    },
    mermaid: {
      variant: 'components.base',
      ...mermaidTheme('default'),
    },
    nomnoml: {
      variant: 'components.base',
      '&': {
        fontFamily: 'body',
      },
      text: {
        fill: '#333 !important',
        fontWeight: '300 !important',
        fontSize: 14,
      },
      'rect, ellipse, circle': {
        fill: '#fbfbfb !important',
        stroke: '#666 !important',
        strokeWidth: '1px',
      },
      path: {
        strokeWidth: '1px',
      },
    },
  },
}
