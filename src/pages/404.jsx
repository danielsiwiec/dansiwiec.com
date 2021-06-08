import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

const component = props => {
  return (
    <Layout {...props}>
      <div className='page'>
        <h1 className='page__title'>NOT FOUND</h1>
        <div className='page__body'>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...SiteInformation
    }
  }
`

export default component