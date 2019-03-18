import React from 'react'
import { Link } from 'gatsby'
import Collapsing from '../Collapsing'
import './style.scss'
import { FaExternalLinkAlt } from 'react-icons/fa'

const link = item => {
  return item.external
    ? (<a
      href={item.path}
      target='_blank'
      rel='noopener noreferrer'
      className='menu__list-item-link'
    >
      {item.label} <FaExternalLinkAlt />
    </a>)
    : (<Link
      to={item.path}
      className='menu__list-item-link'
      activeClassName='menu__list-item-link menu__list-item-link--active'
    >
      {item.label}
    </Link>)
}

const collapsingSubmenu = item => {
  return (
    <Collapsing className='menu__list-item-link' activeClassName='menu__list-item-link menu__list-item-link--active'
      label={item.label} path={item.path}>
      <ul className='menu__list'>
        {item.subs.map(sub => (
          <li className='menu__list-item' key={sub.path}>
            {link(sub)}
          </li>
        ))}
      </ul>
    </Collapsing>)
}

export default props => {
  const menu = props.data

  const menuBlock = (
    <ul className='menu__list'>
      {menu.map(item => (
        <li className='menu__list-item' key={item.path}>
          {item.subs ? collapsingSubmenu(item) : link(item)}
        </li>
      ))}
    </ul>
  )

  return (
    <nav className='menu'>
      {menuBlock}
    </nav>
  )
}
