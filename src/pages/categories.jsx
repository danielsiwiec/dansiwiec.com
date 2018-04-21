import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import Sidebar from '../components/Sidebar'

export default props => {
  const { title } = props.data.site.siteMetadata
  const categories = props.data.allMarkdownRemark.group

  return (
    <div>
      <Helmet title={`All Categories - ${title}`} />
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <div className='page'>
            <h1 className='page__title'>Categories</h1>
            <div className='page__body'>
              <div className='categories'>
                <ul className='categories__list'>
                  {categories.map(category => (
                    <li key={category.fieldValue} className='categories__list-item'>
                      <Link to={`/categories/${kebabCase(category.fieldValue)}/`} className='categories__list-item-link'>
                        {category.fieldValue} ({category.totalCount})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query CategoryesQuery {
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
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
