import { jsx, InitializeColorMode } from 'theme-ui'

export { wrapRootElement } from './theme/provider'

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([jsx(InitializeColorMode, { key: 'theme-ui-no-flash' })])
}
