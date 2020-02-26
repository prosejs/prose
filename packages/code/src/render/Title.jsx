/** @jsx jsx */
import { jsx, Box, Styled } from 'theme-ui'

const Title = ({ children, borderColor }) => (
  <Styled.pre
    as="div"
    sx={{
      padding: '0.8rem',
      borderBottom: borderColor ? `1px solid ${borderColor}` : null,
      variant: 'components.code.title.container',
    }}
  >
    <Styled.p
      sx={{
        fontSize: 1,
        color: '#866c5b',
        margin: 0,
        fontFamily: 'body',
        variant: 'components.code.title.text',
      }}
    >
      {children}
    </Styled.p>
  </Styled.pre>
)

export default Title
