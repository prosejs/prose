import { deepmerge } from '@utilz/deepmerge'
import getLineMap from './line-map'
import normalise from './normalise'

const parse = parseOptions => ({ language, options, meta, code, lines }) => {
  const defaultParseOptions = {
    unnumberedLanguages: ['none', 'bash'],
  }

  const combinedParseOptions = deepmerge(defaultParseOptions, parseOptions)
  const combinedOptions = deepmerge(options, meta)
  const emLineMap = getLineMap(combinedOptions.em)
  const demLineMap = getLineMap(combinedOptions.dem)

  const startLine =
    combinedOptions && combinedOptions.lines ? combinedOptions.lines.start : 1

  // If the language is in the unnumbered languages, then disable line numbers,
  // unless they have been enabled in the meta
  let lineNumbersEnabled = combinedOptions.lines
    ? combinedOptions.lines.enabled
    : false

  if (combinedParseOptions.unnumberedLanguages.includes(language)) {
    lineNumbersEnabled = false

    if (meta && meta.lines && meta.lines.enabled) {
      lineNumbersEnabled = true
    }
  }

  const resolvedOptions = deepmerge(combinedOptions, {
    lines: {
      enabled: lineNumbersEnabled || false,
    },
  })

  return {
    options: resolvedOptions,
    code: {
      raw: code || null,
      normalised: code ? normalise(code) : null,
    },
    lines: lines
      ? lines.map((l, i) => {
          const lineNumber = startLine + i
          const hasEm = emLineMap.hasOwnProperty(lineNumber)
          const hasDem = demLineMap.hasOwnProperty(lineNumber)

          return {
            meta: {
              em: hasEm ? emLineMap[lineNumber] : false,
              dem: hasDem ? demLineMap[lineNumber] : false,
            },
            data: {
              ...l,
            },
          }
        })
      : [],
  }
}

export default parse
