import { graphql } from 'gatsby'
export { default } from '../components/report'

export const query = graphql`
  query($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
      }
    }
    report(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      subTitle
      draft
      tags
      keywords
      date(formatString: "MMMM DD, YYYY")
    }
    previous: report(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
    next: report(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      subTitle
      draft
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
