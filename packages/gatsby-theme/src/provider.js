/** @jsx jsx */
import { jsx, ThemeProvider, ThemeStateProvider, ColorMode } from 'theme-ui'
import React from 'react'
import theme from './index'
import getComponents from './components'
import { deepmerge } from '@utilz/deepmerge'

const hasColorModes = t =>
  t.colors && t.colors.modes && Object.keys(t.colors.modes).length

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

export const wrapRootElement = ({ element }, options) => {
  const combinedOptions = getOptions(options)
  return jsx(
    ThemeStateProvider,
    { theme },
    jsx(
      ThemeProvider,
      {
        components: getComponents(combinedOptions.components),
      },
      hasColorModes(theme) &&
        jsx(ColorMode, {
          key: 'theme-ui-color-mode',
        }),
      React.cloneElement(element, { key: 'element' })
    )
  )
}
