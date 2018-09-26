import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'

export default props => {
  const { title, subtitle } = props.data.site.siteMetadata

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name='description' content={subtitle} />
        </Helmet>
        <Sidebar {...props} />
        <div className='content'>
          <div className='content__inner' />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
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
  }
`
