/** @jsx jsx */
import { jsx } from 'theme-ui'
import Highlight, { defaultProps } from 'prism-react-renderer'
import deepmerge from '@utilz/deepmerge'
import shortid from 'shortid'
import parseStandard from './parse-standard'
import renderStandard from './render/RenderStandard.jsx'

const defaultOptions = {
  classPrefix: 'language-',
  aliases: {},
  lines: {
    enabled: true,
    start: 1,
  },
  prompt: {
    enabled: false,
    host: 'localhost',
    user: 'root',
  },
}

const Code = ({
  code,
  language,
  meta,
  options,
  parse,
  render,
  prism,
  ...props
}) => {
  const combinedOptions = deepmerge(defaultOptions, options)
  const resolvedLanguage =
    combinedOptions.aliases[language] || language || 'none'
  const resolvedParser = parse || parseStandard
  const ResolvedRenderer = render || renderStandard

  return (
    <Highlight
      {...defaultProps}
      {...props}
      theme={undefined}
      {...(prism ? { Prism: prism } : {})}
      language={resolvedLanguage}
      code={code}
    >
      {({ style, tokens: prismLines, getLineProps, getTokenProps }) => {
        const preProps = () => {
          return {
            className: `${combinedOptions.classPrefix}${resolvedLanguage}`,
            style,
          }
        }

        // Remove key option from prop getters
        const lineProps = ({ className, style, line }) => {
          const { key, ...rest } = getLineProps({
            className,
            style,
            line: line.tokens,
          })
          return { ...rest }
        }

        // prism react renderer
        // line is an array of token
        // token is { content: string, types: arrayOf(string) }

        // domain line is
        // { id: string, tokens, highlighted: '+', '-', true, hidden: true }
        // domain token is
        // { id: string, data: { content: string, types: arrayOf(string) }  }
        const tokenProps = ({ className, style, token }) => {
          const { key, ...rest } = getTokenProps({
            className,
            style,
            token: token.data,
          })
          return { ...rest }
        }

        const toDomainTokens = prismTokens => {
          return prismTokens.map(t => ({
            id: shortid.generate(),
            data: t,
          }))
        }

        const toDomainLines = prismLines => {
          return prismLines.map(l => {
            return {
              id: shortid.generate(),
              tokens: toDomainTokens(l),
            }
          })
        }

        const { lines } = combinedOptions
        const parsed = resolvedParser({
          options: { lines },
          meta,
          language: resolvedLanguage,
          code,
          lines: toDomainLines(prismLines),
        })

        return (
          <ResolvedRenderer
            parsed={parsed}
            language={resolvedLanguage}
            getPreProps={preProps}
            getLineProps={lineProps}
            getTokenProps={tokenProps}
          />
        )
      }}
    </Highlight>
  )
}

Code.defaultProps = {
  aliases: {},
  code: null,
}

export default Code
