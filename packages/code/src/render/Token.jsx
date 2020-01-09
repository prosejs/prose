/** @jsx jsx */
import { jsx } from 'theme-ui'

const Token = ({ token, tokenStyle, ...props }) => {
  return (
    <span
      {...props}
      sx={{
        fontSize: 1,
        ...tokenStyle,
      }}
    />
  )
}

export default Token
