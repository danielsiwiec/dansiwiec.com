import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PageTemplateDetails from '../components/PageTemplateDetails'
import Layout from '../components/layout'

export default props => {
  const { title } = props.data.site.siteMetadata
  const page = props.data.markdownRemark
  const pageTitle = page.frontmatter.title
  const excerpt = page.excerpt

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${pageTitle} - ${title}`}</title>
          <meta name='description' content={excerpt} />
        </Helmet>
        <PageTemplateDetails {...props} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          gravatar
          email
          github
          linkedin
          instagram
        }
      }
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
