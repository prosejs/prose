import React from 'react'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'

const WikisPage = ({ data }) => {
  const wikis = data.allWikiPage.edges
    .map(e => e.node)
    .map(p => ({
      id: p.id,
      excerpt: p.excerpt,
      slug: p.slug,
      title: p.title,
      date: p.date,
    }))

  return (
    <ul>
      {wikis.map((p, i) => (
        <Styled.a key={i} as={Link} to={p.slug}>
          {p.title}
        </Styled.a>
      ))}
    </ul>
  )
}

export default WikisPage
