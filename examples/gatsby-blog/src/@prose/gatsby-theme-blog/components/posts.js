/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'

const isDevelopment = () => process.env.NODE_ENV !== 'production'

const BlogPosts = ({ data }) => {
  console.log(data)

  let posts = data.allBlogPost.edges
    .map(e => e.node)
    .map(p => ({
      id: p.id,
      excerpt: p.excerpt,
      date: p.date,
      slug: p.slug,
      title: p.title,
      draft: p.draft,
    }))

  if (!isDevelopment()) {
    posts = posts.filter(p => !p.draft)
  }

  return (
    <ul>
      {posts.map((p, i) => (
        <Styled.li key={i}>
          <Styled.a as={Link} to={p.slug}>
            {p.title}
          </Styled.a>
          {p.draft && <span sx={{ ml: 1 }}>[Draft]</span>}
        </Styled.li>
      ))}
    </ul>
  )
}

export default BlogPosts
