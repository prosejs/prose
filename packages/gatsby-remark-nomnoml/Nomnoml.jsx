const { jsx } = require('theme-ui')

const Nomnoml = ({ children }) => {
  return jsx('div', { sx: { variant: 'components.nomnoml' } }, children)
}

module.exports = Nomnoml
