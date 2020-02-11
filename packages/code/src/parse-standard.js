import { deepmerge } from '@utilz/deepmerge'
import getLineMap from './line-map'
import normalise from './normalise'

const parse = ({ options, meta, code, lines }) => {
  const combinedOptions = deepmerge(options, meta)
  const emLineMap = getLineMap(combinedOptions.em)
  const demLineMap = getLineMap(combinedOptions.dem)

  const startLine =
    combinedOptions && combinedOptions.lines ? combinedOptions.lines.start : 1

  return {
    options: combinedOptions,
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
