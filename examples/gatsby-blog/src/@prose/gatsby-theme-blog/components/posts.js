/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Themed } from 'theme-ui'

const isDevelopment = () => process.env.NODE_ENV !== 'production'

const BlogPosts = ({ data }) => {
  let posts = data.allBlogPost.edges
    .map((e) => e.node)
    .map((p) => ({
      id: p.id,
      excerpt: p.excerpt,
      date: p.date,
      slug: p.slug,
      title: p.title,
      draft: p.draft,
    }))

  if (!isDevelopment()) {
    posts = posts.filter((p) => !p.draft)
  }

  return (
    <ul>
      {posts.map((p, i) => (
        <Themed.li key={i}>
          <Themed.a as={Link} to={p.slug}>
            {p.title}
          </Themed.a>
          {p.draft && <span sx={{ ml: 1 }}>[Draft]</span>}
        </Themed.li>
      ))}
    </ul>
  )
}

export default BlogPosts
