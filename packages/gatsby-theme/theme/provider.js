/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { theme } from '../src/theme'
import { getComponents } from '../src/components'
import { deepmerge } from '@utilz/deepmerge'

const getOptions = options => {
  const defaultOptions = {
    components: {
      code: {
        lines: {
          enabled: true,
        },
      },
    },
  }

  return deepmerge(defaultOptions, options)
}

// Adapted from https://github.com/system-ui/theme-ui/blob/master/packages/gatsby-plugin-theme-ui/src/provider.js
export const wrapRootElement = ({ element }, options) => {
  const combinedOptions = getOptions(options)

  return jsx(
    ThemeProvider,
    {
      theme,
      components: getComponents(combinedOptions.components),
    },
    element
  )
}
