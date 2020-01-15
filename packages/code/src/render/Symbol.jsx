/** @jsx jsx */
import { jsx } from 'theme-ui'

const Symbol = ({ symbol, style }) => (
  <span
    sx={{
      fontSize: 1,
      ...style,
    }}
  >
    {symbol}&nbsp;
  </span>
)

export default Symbol