import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const component = props => {
  const { title, subtitle } = props.data.site.siteMetadata

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={subtitle} />
      </Helmet>
    </Layout>
  )
}

export const pageQuery = graphql`
  fragment SiteInformation on Site {
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
        strava
      }
    }
  }
  query {
    site {
      ...SiteInformation
    }
  }
`

export default component
