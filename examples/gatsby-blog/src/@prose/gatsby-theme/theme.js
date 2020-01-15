import theme from '@theme-ui/preset-swiss'
import mermaidTheme from '@prose/gatsby-remark-mermaid/theme'

export default {
  ...theme,
  mermaid: {
    ...mermaidTheme('default'),
  },
  nomnoml: {
    '&': {
      fontFamily: 'body',
      fontSize: 12,
    },
    text: {
      fill: '#333 !important',
      fontWeight: '300 !important',
      fontSize: '0.9rem',
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
}
