import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const WikiPage = ({
  data: {
    wikiPage,
    site: {
      siteMetadata: { title },
    },
  },
  location,
  previous,
  next,
}) => {
  return (
    <>
      <MDXRenderer>{wikiPage.body}</MDXRenderer>
    </>
  )
}

export default WikiPage
