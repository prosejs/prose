/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Themed } from 'theme-ui'

const WikisPage = ({ data }) => {
  const wikis = data.allWikiPage.edges
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
      {wikis.map((w, i) => (
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

export default WikisPage
