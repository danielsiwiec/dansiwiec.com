import React from 'react'
import {Link} from 'gatsby'
import Menu from '../Menu'
import Links from '../Links'
import './style.scss'

export default props => {
  const { author, subtitle, copyright, menu } = props.data.site.siteMetadata

  const authorBlock = (
    <div>
      <Link to='/'>
        <img
          src={`https://gravatar.com/avatar/${author.gravatar}`}
          className='sidebar__author-photo'
          width='75'
          height='75'
          alt={author.name}
        />
      </Link>
      <h1 className='sidebar__author-title'>
        <Link className='sidebar__author-title-link' to='/'>{author.name}</Link>
      </h1>
      <p className='sidebar__author-subtitle'>{subtitle}</p>
    </div>
  )

  return (
    <div className='sidebar'>
      <div className='sidebar__inner'>
        <div className='sidebar__author'>
          {authorBlock}
        </div>
        <div>
          <Menu data={menu} />
          <Links data={author} />
          <p className='sidebar__copyright'>
            {copyright}
          </p>
        </div>
      </div>
    </div>
  )
}
