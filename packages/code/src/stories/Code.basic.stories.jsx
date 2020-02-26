/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Code } from '../index'
import Themed from './Themed'

const defaultProps = {
  language: 'javascript',
  code: `const foo = 'bar'
const bar = 'foo'`,
}

export default { title: 'code/basic' }

export const withDefault = () => <Code {...defaultProps} />

export const withTheme = () => (
  <Themed>
    <Code {...defaultProps} />
  </Themed>
)

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

export const withLongCode = () => (
  <Code
    {...defaultProps}
    code={`$oauth = Invoke-RestMethod -Method Post -Uri $loginURL/$TenantDomain/oauth2/token?api-version=1.0 -Body $body Invoke-RestMethod -Method Post -Uri $loginURL/$TenantDomain/oauth2/token?api-version=1.0 -Body $body`}
  />
)
