import React from 'react'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'

const BlogPosts = ({ data }) => {
  const posts = data.allBlogPost.edges
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
      {posts.map((p, i) => (
        <Styled.li key={i}>
          <Styled.a as={Link} to={p.slug}>
            {p.title}
          </Styled.a>
        </Styled.li>
      ))}
    </ul>
  )
}

export default BlogPosts
