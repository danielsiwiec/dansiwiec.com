import React from 'react'
import { graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'

export default props => {
  return (
    <div>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className='page__title'>NOT FOUND</h1>
            <div className='page__body'>
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query NotFoundQuery {
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
