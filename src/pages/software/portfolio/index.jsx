import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/Layout'
import Sidebar from '../../../components/Sidebar'
import PortfolioItem from '../../../components/PortfolioItem'

export default props => {
  let projects = props.data.allMarkdownRemark.edges

  return (
    <Layout {...props}>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <h1 className='page__title'>Portfolio</h1>
          <div className='columns is-multiline'>
            {projects.map(project => (
              <div className='column is-half' key={project.node.frontmatter.title}>
                <PortfolioItem project={project.node.frontmatter} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "portfolio"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            url
            stack
            pic {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
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
  }
  
`
