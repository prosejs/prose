/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'

const Title = ({ children, borderColor }) => (
  <Themed.pre
    as="div"
    sx={{
      padding: '0.8rem',
      borderBottom: borderColor ? `1px solid ${borderColor}` : null,
      variant: 'components.code.title.container',
    }}
  >
    <Themed.p
      sx={{
        fontSize: 1,
        color: '#866c5b',
        margin: 0,
        fontFamily: 'body',
        variant: 'components.code.title.text',
      }}
    >
      {children}
    </Themed.p>
  </Themed.pre>
)

export default Title
