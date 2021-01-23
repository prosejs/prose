/** @jsxImportSource theme-ui */
import { Code } from '../index'
import Themed from './Themed'

export default { title: 'code/styling' }

const defaultProps = {
  code: `const foo = 'bar'
const bar = 'foo'`,
  language: 'javascript',
}

export const withLineNumberStyle = () => (
  <Themed
    theme={{
      components: {
        code: {
          lineNumber: {
            color: '#ccc',
            borderRight: '1px solid #ccc',
          },
        },
      },
    }}
  >
    <Code {...defaultProps} />
  </Themed>
)

export const withLanguageLabelStyle = () => (
  <Themed
    theme={{
      components: {
        code: {
          languageLabel: {
            fontSize: '1rem',
            marginBottom: '0.2rem',
            paddingLeft: 5,
            paddingRight: 5,
          },
          pre: {
            paddingTop: '2rem',
          },
        },
      },
    }}
  >
    <Code {...defaultProps} />
  </Themed>
)

export const withTitleStyle = () => (
  <Themed
    theme={{
      components: {
        code: {
          title: {
            container: {
              padding: '0.3rem 2rem',
              backgroundColor: '#ccc',
              borderBottom: '4px solid #555',
            },
            text: {
              fontSize: 3,
              color: '#555',
            },
          },
        },
      },
    }}
  >
    <Code {...defaultProps} meta={{ title: `./foo.js` }} />
  </Themed>
)
