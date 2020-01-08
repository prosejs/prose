/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import Code, { fromMdxProps } from './index'
import { ThemeProvider } from 'theme-ui'
import funkTheme from '@theme-ui/preset-funk'
import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import nightOwlLight from '@theme-ui/prism/presets/night-owl-light.json'
import MDX from '@mdx-js/runtime'
import deepmerge from '@utilz/deepmerge'
import languageLabels from './render/language-labels'
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs'

const defaultProps = {
  language: 'javascript',
  code: `const foo = 'bar'
const bar = 'foo'`,
}

export default { title: 'Code', decorators: [withKnobs] }

export const withDefault = () => <Code language={undefined} {...defaultProps} />

const Themed = ({ theme, children }) => (
  <ThemeProvider theme={theme}>
    <Styled.root>{children}</Styled.root>
  </ThemeProvider>
)

export const withTheme = () => {
  const theme = {
    ...funkTheme,
    styles: {
      pre: {
        ...nightOwlLight,
      },
    },
  }

  return (
    <Themed theme={theme}>
      <Code {...defaultProps} />
    </Themed>
  )
}

export const withLines = () => (
  <Code {...defaultProps} options={{ lines: { enabled: true } }} />
)

export const withMultipleLines = () => {
  const code = Array(1000)
    .fill()
    .map(() => `const foo = 'bar'`)
    .join('\n')

  return (
    <Code
      {...defaultProps}
      code={code}
      options={{ lines: { enabled: true } }}
    />
  )
}

const defaultMdxProps = {
  components: {
    pre: ({ children }) => <>{children}</>,
    code: props => <Code {...fromMdxProps(props)} />,
  },

  children: null,
}

const codeWithMeta = code => meta => {
  return {
    children: `
  \`\`\`${meta}
  ${code}
  \`\`\`
  `,
  }
}

const standardCode = codeWithMeta(`
const foo = 'bar'
const bar = 'foo'
`)

const diffCode = codeWithMeta(`
+ const foo = 'bar'
- const bar = 'foo'
`)

const mdxProps = obj => deepmerge(defaultMdxProps, obj)

export const withMdxNoLanguage = () => <MDX {...mdxProps(standardCode())} />

export const withMdxJavascript = () => (
  <MDX {...mdxProps(standardCode('javascript'))} />
)

export const withMdxJavascriptWhitespace = () => (
  <MDX {...mdxProps(standardCode('   javascript   '))} />
)

export const withMdxJavaScriptAndOptions = () => (
  <MDX {...mdxProps(standardCode('javascript numbers:{enabled start:5}'))} />
)

export const withMdxNoneLanguageAndOptions = () => (
  <MDX {...mdxProps(standardCode('none numbers:{enabled start:5}'))} />
)

export const withMdxInvalidNoLanguageAndOptions = () => (
  <MDX {...mdxProps(standardCode('numbers:{enabled start:5}'))} />
)

const mdxThemed = code => {
  const theme = {
    ...funkTheme,
    styles: {
      pre: {
        ...nightOwlLight,
      },
    },
  }

  return (
    <Themed theme={theme}>
      <MDX {...mdxProps(code)} />
    </Themed>
  )
}

const MdxT = ({ language, code }) => {
  const theme = {
    ...funkTheme,
    styles: {
      pre: {
        ...nightOwlLight,
      },
    },
  }

  return (
    <Themed theme={theme}>
      <MDX {...mdxProps(code)} />
    </Themed>
  )
}

export const withMdxThemed = () => mdxThemed(standardCode('javascript'))

export const withMdxEmphasiseLines = () =>
  mdxThemed(standardCode('javascript em:[2]'))

export const withMdxEmphasiseLinesAdd = () =>
  mdxThemed(standardCode('javascript em:[2+]'))

export const withMdxEmphasiseLinesSubtract = () =>
  mdxThemed(standardCode('javascript em:[2-]'))

export const withMdxDeemphasiseLines = () =>
  mdxThemed(standardCode('javascript dem:[2]'))

export const withMdxDeemphasiseLinesAdd = () =>
  mdxThemed(standardCode('javascript dem:[2+]'))

export const withMdxDeemphasiseLinesSubtract = () =>
  mdxThemed(standardCode('javascript dem:[2-]'))

export const withMdxDiff = () => mdxThemed(diffCode('diff'))

export const withMdxLineNumbersDisabled = () =>
  mdxThemed(standardCode('javascript lines:{enabled:false}'))

export const withTitle = () =>
  mdxThemed(standardCode(`javascript title:'./foo/bar.js'`))

const Foo = ({ language }) => <MdxT code={standardCode(language)} />

export const withLanguage = () => {
  const values = {
    unknown: 'unknown',
    none: 'none',
  }

  Object.keys(languageLabels).forEach(key => {
    const label = languageLabels[key]
    values[label.title] = key
  })

  const language = options(
    'Language',
    values,
    'javascript',
    { display: 'select' },
    'groupid1'
  )

  return <Foo language={language} />
}
