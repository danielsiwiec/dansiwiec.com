import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PageTemplateDetails from '../components/PageTemplateDetails'

const component = props => {
  const { title } = props.data.site.siteMetadata
  const page = props.data.markdownRemark
  const pageTitle = page.frontmatter.title
  const excerpt = page.excerpt

  return (
    <div>
      <Helmet>
        <title>{`${pageTitle} - ${title}`}</title>
        <meta name='description' content={excerpt} />
      </Helmet>
      <PageTemplateDetails {...props} />
    </div>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      ...SiteInformation
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
      }
      excerpt
    }
  }
`

export default component