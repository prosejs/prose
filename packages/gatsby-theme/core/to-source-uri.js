const toSourceUri = ({ prefix, uri, postfix = '' }) => ({
  fileAbsolutePath,
}) => {
  if (!prefix) {
    throw new Error(`No prefix specified.`)
  }

  if (!uri) {
    throw new Error(`No uri specified.`)
  }

  if (!fileAbsolutePath) {
    throw new Error(`No file absolute path.`)
  }

  const index = fileAbsolutePath.indexOf(prefix)
  if (index === -1) {
    throw new Error(
      `Prefix '${prefix} not found in file path '${fileAbsolutePath}'.`
    )
  }

  const fileSubstring = fileAbsolutePath.substring(index)
  return `${uri}${fileSubstring}${postfix}`
}

module.exports = {
  toSourceUri,
}
