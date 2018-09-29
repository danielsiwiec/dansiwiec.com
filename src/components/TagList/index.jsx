import React from 'react'
import {Link} from 'gatsby'
import './style.scss'

export default ({tags, tagSlugs}) => {
  return (
    <div className='tag-list'>
      <ul className='tag-list__list'>
        {tagSlugs && tagSlugs.map((slug, i) => (
          <li className='tag-list__list-item' key={slug}>
            <Link to={slug} className='tag-list__list-item-link'>
              #{tags[i]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
