/** @jsxImportSource theme-ui */
import { Link } from 'gatsby'
import { Themed } from 'theme-ui'

const Pages = ({ data }) => {
  const pages = data.allPage.edges
    .map((e) => e.node)
    .map((p) => ({
      id: p.id,
      excerpt: p.excerpt,
      slug: p.slug,
      title: p.title,
      date: p.date,
      draft: p.draft,
    }))

  return (
    <ul>
      {pages.map((w, i) => (
        <Themed.li key={i}>
          <Themed.a as={Link} to={w.slug}>
            {w.title}
          </Themed.a>
          {w.draft && <span sx={{ ml: 1 }}>[Draft]</span>}
        </Themed.li>
      ))}
    </ul>
  )
}

export default Pages
