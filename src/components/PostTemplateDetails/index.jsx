import React from 'react'
import moment from 'moment'
import Img from 'gatsby-image'
import {FaClock} from 'react-icons/fa'
import Disqus from '../Disqus/Disqus'
import TagList from '../TagList'
import CategoryLink from '../CategoryLink'
import './style.scss'

export default props => {
  const post = props.data.markdownRemark
  const tagSlugs = post.fields.tagSlugs
  const tags = post.frontmatter.tags
  const category = post.frontmatter.category
  const categorySlug = post.fields.categorySlug

  const commentsBlock = (
    <div>
      <Disqus postNode={post} siteMetadata={props.data.site.siteMetadata} />
    </div>
  )

  const cover = post.frontmatter.cover
  const coverBlock = cover
    ? <Img fluid={cover.image.childImageSharp.fluid} title={cover.text} />
    : undefined

  return (
    <div>
      <div className='post-single'>
        {coverBlock}
        <div className='post-single__inner'>
          <h1 className='post-single__title'>{post.frontmatter.title}</h1>
          <div className='post-single__category-link'>
            <CategoryLink category={category} slug={categorySlug} />
          </div>
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
