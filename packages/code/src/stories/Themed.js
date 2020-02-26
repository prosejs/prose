/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { ThemeProvider } from 'theme-ui'
import { deepmerge } from '@utilz/deepmerge'
import funkTheme from '@theme-ui/preset-funk'
import nightOwlLight from '@theme-ui/prism/presets/night-owl-light.json'

const Themed = ({ theme, children }) => {
  const defaultTheme = {
    ...funkTheme,
    styles: {
      pre: {
        ...nightOwlLight,
      },
    },
  }

  return (
    <ThemeProvider theme={deepmerge(defaultTheme, theme)}>
      <Styled.root>{children}</Styled.root>
    </ThemeProvider>
  )
}

export default Themed
