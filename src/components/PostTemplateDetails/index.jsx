import {kebabCase} from 'lodash'
import React from 'react'
import {Link} from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus/Disqus'
import TagList from '../TagList'
import './style.scss'
import {FaClock} from 'react-icons/fa'

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
          <div className='post-single__readingtime'>
            <em>Reading time {post.timeToRead} minutes</em>
          </div>
          <div className='post-single__tags'>
            <TagList tags={tags} tagSlugs={tagSlugs} />
          </div>
          <div className='post-single__date'>
            <em><FaClock /> {moment(post.frontmatter.date).format('MMMM D, YYYY')}</em>
          </div>
          <hr />
          <div className='post-single__body' dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className='post-single__footer'>

          {commentsBlock}
        </div>
      </div>
    </div>
  )
}
