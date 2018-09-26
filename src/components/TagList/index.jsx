import React from 'react'
import {Link} from 'gatsby'
import './style.scss'

export default ({tags, tagSlugs}) => {
  return (
    <div className='post-single__tags'>
      <ul className='post-single__tags-list'>
        {tagSlugs && tagSlugs.map((slug, i) => (
          <li className='post-single__tags-list-item' key={slug}>
            <Link to={slug} className='post-single__tags-list-item-link'>
              {tags[i]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
