// Gatsby does not currently support React 17/jsx import source
// because of waiting for Theme UI and MDX
// See https://github.com/gatsbyjs/gatsby/pull/27615 for more info

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    // name: '@babel/plugin-transform-react-jsx',
    name: '@babel/preset-react',
    options: {
      runtime: 'automatic',
    },
  })
}
