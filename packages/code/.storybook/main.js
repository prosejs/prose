module.exports = {
  addons: ['@storybook/addon-knobs/register'],
  webpackFinal: async (config, { configType }) => {
    config.node = {
      fs: 'empty',
    }

    return config
  },
}
