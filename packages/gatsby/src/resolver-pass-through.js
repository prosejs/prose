export const resolverPassthrough = typeName => fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(typeName)
  const node = context.nodeModel.getNodeById({
    id: source.parent,
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(node, args, context, {
    fieldName,
  })

  return result
}
