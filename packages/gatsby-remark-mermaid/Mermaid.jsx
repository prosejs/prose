const { jsx } = require('theme-ui')

const Mermaid = ({ children }) => {
  return jsx('div', { sx: { variant: 'mermaid' } }, children)
}

module.exports = Mermaid
