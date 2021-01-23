/** @jsxImportSource theme-ui */

const LineNumber = ({ lineNumber }) => (
  <div
    sx={{
      display: 'flex',
      alignItems: 'center',
      fontSize: 1,
      variant: 'components.code.lineNumber',
      paddingRight: '0.5rem',
    }}
  >
    <span>{lineNumber}</span>
  </div>
)

export default LineNumber
