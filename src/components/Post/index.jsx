import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'
import TagList from '../TagList'
import CategoryLink from '../CategoryLink'

export default props => {
  const { title, date, category, tags } = props.data.node.frontmatter
  const excerpt = props.data.node.frontmatter.excerpt || props.data.node.excerpt
  const { slug, categorySlug, tagSlugs } = props.data.node.fields

  return (
    <div className='post'>
      <div className='post__meta'>
        <time className='post__meta-time' dateTime={moment(date).format('MMMM D, YYYY')}>
          {moment(date).format('MMMM YYYY')}
        </time>
        <span className='post__meta-divider' />
        <CategoryLink category={category} slug={categorySlug} />
      </div>
      <h2 className='post__title'>
        <Link className='post__title-link' to={slug}>{title}</Link>
      </h2>
      <TagList tags={tags} tagSlugs={tagSlugs} />
      <p className='post__description'>{excerpt}</p>
    </div>
  )
}
