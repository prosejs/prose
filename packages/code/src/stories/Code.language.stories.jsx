/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Code } from '../index'
import Themed from './Themed'
import MdxThemed from './MdxThemed'
import languageLabels from '../render/language-labels'
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs'
import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'

export default { title: 'code/language', decorators: [withKnobs] }

const defaultProps = {
  code: `
const foo = 'bar'
const bar = 'foo'
`,
  meta: null,
}

export const withLanguageSelect = () => {
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

  return <MdxThemed {...defaultProps} meta={language} />
}

export const withAdditionalLanguage = () => (
  <Themed>
    <Code
      language="csharp"
      code="var x = 5;"
      prism={Prism}
      options={{ lines: { enabled: true } }}
    />
  </Themed>
)

export const withNoneLanguage = () => (
  <Themed>
    <Code
      language="none"
      code="var x = 5;"
      options={{ lines: { enabled: true } }}
    />
  </Themed>
)

export const withNoneLanguageLineNumbersInMeta = () => (
  <Themed>
    <Code
      language="none"
      code="var x = 5;"
      meta={{ lines: { enabled: true } }}
      options={{ lines: { enabled: false } }}
    />
  </Themed>
)
