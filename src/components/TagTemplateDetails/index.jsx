import React from 'react'
import Post from '../Post'

export default props => {
  const items = []
  const tagTitle = props.pathContext.tag
  const posts = (props.data.allMarkdownRemark && props.data.allMarkdownRemark.edges) || []
  posts.forEach((post) => {
    items.push(<Post data={post} key={post.node.fields.slug} />)
  })

  return (
    <div className='content'>
      <div className='content__inner'>
        <div className='page'>
          <h1 className='page__title'>
              All Posts tagged as #{tagTitle}
          </h1>
          <div className='page__body'>
            {items}
          </div>
        </div>
      </div>
    </div>
  )
}
