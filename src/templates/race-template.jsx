import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import RaceTemplateDetails from '../components/RaceTemplateDetails'

export default props => {
  const { title } = props.data.site.siteMetadata
  const page = props.data.markdownRemark
  const pageTitle = page.frontmatter.title
  const excerpt = page.excerpt

  return (
    <Layout {...props}>
      <Helmet>
        <title>{`${pageTitle} - ${title}`}</title>
        <meta name='description' content={excerpt} />
      </Helmet>
      <RaceTemplateDetails {...props} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
          subs {
            path
            label
            external
          }
        }
        author {
          name
          gravatar
          email
          github
          linkedin
          instagram
          medium
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        garmin
        results
        distance
        place
      }
      excerpt
    }
  }
`
