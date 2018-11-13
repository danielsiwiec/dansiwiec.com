import React, { Component } from 'react'
import { DiscussionEmbed } from 'disqus-react'

class Disqus extends Component {
  render () {
    const { postNode, siteMetadata } = this.props
    const disqusShortname = siteMetadata.disqusShortname
    const disqusConfig = {
      identifier: postNode.id,
      title: postNode.frontmatter.title
    }

    return (
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    )
  }
}

export default Disqus
