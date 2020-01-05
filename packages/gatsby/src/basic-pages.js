export const listNodesBasic = ({ entityName }) => async ({ graphql }) => {
  const listQuery = `{
          all${entityName}(sort: { fields: [date, title], order: DESC }, limit: 1000) {
            edges {
              node {
                id
                slug
              }
            }
          }
        }`

  const result = await graphql(listQuery)

  //   if (result.errors) {
  //     reporter.panic(result.errors)  // TODO: pass reporter in each function
  //   }

  const allNode = result.data[`all${entityName}`]
  return allNode.edges
}

export const listBasic = ({ path, listComponent }) => async () => {
  return {
    path,
    component: listComponent,
    context: {},
  }
}

export const detailNextPrevious = ({ detailComponent }) => async ({
  nodes,
  node,
  index,
}) => {
  const previous = index === nodes.length - 1 ? null : nodes[index + 1]
  const next = index === 0 ? null : nodes[index - 1]
  const { slug } = node

  return {
    path: slug,
    component: detailComponent,
    context: {
      id: node.id,
      previousId: previous ? previous.node.id : undefined,
      nextId: next ? next.node.id : undefined,
    },
  }
}
