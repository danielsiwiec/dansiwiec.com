import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../../components/Layout'
import Sidebar from '../../../components/Sidebar'
import Adventure from '../../../components/Adventure'
import InfiniteScroll from '../../../components/InfiniteScroll'

export default props => {
  let adventures = props.data.allMarkdownRemark.edges

  return (
    <Layout {...props}>
      <Sidebar {...props} />
      <div className='content'>
        <div className='content__inner'>
          <h1 className='page__title'>Adventures</h1>
            Bushwacking, world trotting, hiking, trouble making - you name it!
          <InfiniteScroll items={adventures} sectionFactory={section} />
        </div>
      </div>
    </Layout>
  )
}

const section = (item, index) => {
  return <Adventure key={index} adventure={item.node.frontmatter} />
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {category: {eq: "adventures"}}}, sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          frontmatter {
            title
            date
            pics {
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
