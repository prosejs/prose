// interfaces [{ name, schema }]
exports.createInterfaces = interfaces => api => {
  const { actions } = api
  const { createTypes } = actions

  interfaces.forEach(i => {
    const interfaceSchema = Object.entries(i.schema)
      .map(entry => `${entry[0]}: ${entry[1]}`)
      .join('\n')

    const typeDefinition = `interface ${i.name} @nodeInterface {\n${interfaceSchema}\n}`
    createTypes(typeDefinition)
  })
}

exports.createTypes = types => api => {
  const { actions, schema } = api
  const { createTypes } = actions

  createTypes(types.map(t => schema.buildObjectType(t)))
}
