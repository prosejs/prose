import { isNumeric } from '@utilz/types'

const addNumber = (lineNumber, value, map) => {
  if (map.hasOwnProperty(lineNumber)) {
    throw new Error(`Line number ${lineNumber} already has a value.`)
  }

  map[lineNumber] = value
  return map
}

// Gets range from string
// E.g. 1-5
// => { isValid: true, start: 1, end: 5 }
const getRange = value => {
  const invalid = () => ({ isValid: false })

  if (!value) {
    return invalid()
  }

  const matches = value.match(/(?<start>\d+)-(?<end>\d+)/)
  if (!matches || !matches.groups) {
    return invalid()
  }

  const { start, end } = matches.groups
  if (!start || !end) {
    return invalid()
  }

  const startNumber = parseFloat(start)
  const endNumber = parseFloat(end)

  if (startNumber >= endNumber) {
    throw new Error(
      `End range number ${endNumber} must be greater than start range number ${startNumber}.`
    )
  }

  return {
    isValid: true,
    start: startNumber,
    end: endNumber,
  }
}

const createRange = (start, end) =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx)

// Converts array to line map
// e.g. ['1+', '2-', '3-6']
// => { 1: '+', 2: '-', 3: true, 4: true, 5: true, 6: true }
const lineMap = lines => {
  if (lines === undefined || lines === null) {
    return {}
  }

  if (!Array.isArray(lines)) {
    throw new Error('Value must be an array.')
  }

  let map = {}

  const stripLast = value => value.substring(0, value.length - 1)

  for (let i = 0; i < lines.length; i++) {
    let value = true

    const originalLine = `${lines[i]}`
    let line = originalLine

    if (line[line.length - 1] === '+' || line[line.length - 1] === '-') {
      value = line[line.length - 1]
      line = stripLast(line)
    }

    if (isNumeric(line)) {
      map = addNumber(line, value, map)
      continue
    }

    const { isValid, start, end } = getRange(line)
    if (isValid) {
      createRange(start, end).forEach(i => {
        map = addNumber(i, value, map)
      })
      continue
    }

    throw new Error(`Line number '${originalLine}' is not a valid number.`)
  }

  return map
}

export default lineMap
