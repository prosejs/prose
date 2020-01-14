const { jsx } = require('theme-ui')

const Mermaid = ({ children }) => {
  // return React.createElement('div', { sx: { color: '#c0c' } }, children)
  return jsx('div', { sx: { variant: 'mermaid' } }, children)
}

module.exports = Mermaid
