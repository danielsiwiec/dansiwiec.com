import React from 'react'
import moment from 'moment'
import chunk from 'lodash/chunk'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Sidebar from '../../../components/Sidebar'

const INITIAL_COUNT = 3

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.adventuresToShow = INITIAL_COUNT
}

class Adventuregram extends React.Component {
  constructor (props) {
    super(props)
    let adventuresToShow = INITIAL_COUNT
    if (typeof window !== `undefined`) {
      adventuresToShow = window.adventuresToShow
    }

    this.state = { adventuresToShow }
  }

  update () {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < 100) {
      this.setState({ adventuresToShow: this.state.adventuresToShow + INITIAL_COUNT })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update()) // eslint-disable-line no-undef
    }
  }

  componentDidMount () {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.adventuresToShow = this.state.adventuresToShow
  }

  render () {
    let adventures = this.props.data.allMarkdownRemark.edges.map(e => e.node)

    return (
      <div>
        <Sidebar {...this.props} />
        <div className='content'>
          <div className='content__inner'>
            {chunk(adventures.slice(0, this.state.adventuresToShow), 3).map((chunk, c) => (
              <div key={c}>
                {chunk.map((node, n) => (
                  <div key={n}>
                    <h2>{node.frontmatter.title} {moment(node.frontmatter.date).format('MMM YYYY')}</h2>
                    {node.frontmatter.pics.map((pic, p) => (
                      <Img key={p} fluid={pic.childImageSharp.fluid} title='blah' />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Adventuregram

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
