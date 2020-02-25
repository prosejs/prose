/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import { Styled } from 'theme-ui'

const ReportsPage = ({ data }) => {
  const reports = data.allReport.edges
    .map(e => e.node)
    .map(p => ({
      id: p.id,
      excerpt: p.excerpt,
      slug: p.slug,
      title: p.title,
      date: p.date,
      draft: p.draft,
    }))

  return (
    <ul>
      {reports.map((r, i) => (
        <Styled.li key={i}>
          <Styled.a as={Link} to={r.slug}>
            {r.title}
          </Styled.a>
          {r.draft && <span sx={{ ml: 1 }}>[Draft]</span>}
        </Styled.li>
      ))}
    </ul>
  )
}

export default ReportsPage
