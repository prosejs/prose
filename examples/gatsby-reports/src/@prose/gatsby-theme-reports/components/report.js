import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const ReportPage = ({
  data: {
    report,
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
      <MDXRenderer>{report.body}</MDXRenderer>
    </>
  )
}

export default ReportPage
