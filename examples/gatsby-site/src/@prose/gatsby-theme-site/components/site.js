import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Page = ({
  data: {
    page,
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
      <MDXRenderer>{page.body}</MDXRenderer>
    </>
  )
}

export default Page
