/** @jsxImportSource theme-ui */
import styled from '@emotion/styled'
import CodeLine from './CodeLine'

export default { title: 'render/CodeLine' }

const token = {
  id: 'foo',
  data: {
    types: ['string'],
    content: 'foo',
  },
}

const Pre = styled.pre({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
})

export const withDefault = () => (
  <Pre>
    <CodeLine tokens={[token]} />
  </Pre>
)
