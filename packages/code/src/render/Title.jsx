/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Title = ({ children, borderColor }) => (
  <Styled.pre
    as="div"
    sx={{ backgroundColor: 'pre.backgroundColor' }}
    sx={{
      padding: '0.8rem',
      borderBottom: borderColor ? `1px solid ${borderColor}` : null,
    }}
  >
    <p
      sx={{
        fontSize: 1,
        color: '#866c5b',
        margin: 0,
        fontFamily: 'body',
      }}
    >
      {children}
    </p>
  </Styled.pre>
)

export default Title
