/** @jsx jsx */
import { jsx } from 'theme-ui'
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
      code: {
        lineNumber: {
          color: '#ccc',
          borderRight: '1px solid #ccc',
        },
      },
    }}
  >
    <Code {...defaultProps} />
  </Themed>
)
