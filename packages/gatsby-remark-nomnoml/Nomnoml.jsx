const { jsx } = require('theme-ui')

const Nomnoml = ({ children }) => {
  return jsx('div', { sx: { variant: 'nomnoml' } }, children)
}

module.exports = Nomnoml
