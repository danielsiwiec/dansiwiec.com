import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

export default props => {
  return (
    <Link to={props.slug} className='category-link'>
      {props.category}
    </Link>
  )
}
