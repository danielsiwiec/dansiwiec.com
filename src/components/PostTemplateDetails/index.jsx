import {kebabCase} from 'lodash'
import React from 'react'
import {Link} from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus/Disqus'
import TagList from '../TagList'
import './style.scss'

export default props => {
  const post = props.data.markdownRemark
  const tagSlugs = post.fields.tagSlugs
  const tags = post.frontmatter.tags
  const category = post.frontmatter.category

  const homeBlock = (
    <div>
      <Link className='post-single__home-button' to={`/categories/${kebabCase(category)}`}>All {category}</Link>
    </div>
  )

  const commentsBlock = (
    <div>
      <Disqus postNode={post} siteMetadata={props.data.site.siteMetadata} />
    </div>
  )

  return (
    <div>
      {homeBlock}
      <div className='post-single'>
        <div className='post-single__inner'>
          <h1 className='post-single__title'>{post.frontmatter.title}</h1>
          <div className='post-single__body' dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className='post-single__date'>
            <em>Published {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
          </div>
        </div>
        <div className='post-single__footer'>
          <TagList tags={tags} tagSlugs={tagSlugs} />
          <hr />
          {commentsBlock}
        </div>
      </div>
    </div>
  )
}
