const { jsx } = require('theme-ui')

// TODO: review variant name and make configurable, see @theme-ui/components
const Mermaid = ({ children }) => {
  return jsx('div', { sx: { variant: 'components.mermaid' } }, children)
}

module.exports = Mermaid
