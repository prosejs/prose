/** @jsx jsx */
import { jsx } from 'theme-ui'
import MdxThemed from './MdxThemed'

export default { title: 'code/mdx' }

const defaultProps = {
  code: `
const foo = 'bar'
const bar = 'foo'
`,
  language: null,
}

export const withNoLanguage = () => <MdxThemed {...defaultProps} />

export const withJavascript = () => (
  <MdxThemed {...defaultProps} meta="javascript" />
)

export const withJavascriptWhitespace = () => (
  <MdxThemed {...defaultProps} meta="   javascript   " />
)

export const withJavascriptAndOptions = () => (
  <MdxThemed {...defaultProps} meta="javascript lines:{enabled start:5}" />
)

export const withNoneLanguageAndOptions = () => (
  <MdxThemed {...defaultProps} meta="none lines:{enabled start:5}" />
)

export const withInvalidNoLanguageAndOptions = () => (
  <MdxThemed {...defaultProps} meta="lines:{enabled start:5}" />
)

export const withEmphasiseLines = () => (
  <MdxThemed {...defaultProps} meta="javascript em:[2]" />
)

export const withEmphasiseLinesAdd = () => (
  <MdxThemed {...defaultProps} meta="javascript em:[2+]" />
)

export const withEmphasiseLinesSubtract = () => (
  <MdxThemed {...defaultProps} meta="javascript em:[2-]" />
)

export const withDeemphasiseLines = () => (
  <MdxThemed {...defaultProps} meta="javascript dem:[2]" />
)

export const withDeemphasiseLinesAdd = () => (
  <MdxThemed {...defaultProps} meta="javascript dem:[2+]" />
)

export const withDeemphasiseLinesSubtract = () => (
  <MdxThemed {...defaultProps} meta="javascript dem:[2-]" />
)

export const withDiff = () => {
  const code = `+ const foo = 'bar'
- const bar = 'foo'`

  return <MdxThemed {...defaultProps} meta="diff" code={code} />
}

export const withLineNumbersDisabled = () => (
  <MdxThemed {...defaultProps} meta="javascript lines:{enabled:false}" />
)

export const withLineNumbersStart = () => (
  <MdxThemed {...defaultProps} meta="javascript lines:{start:5}" />
)

export const withTitle = () => (
  <MdxThemed {...defaultProps} meta={`javascript title:'./foo/bar.js'`} />
)
