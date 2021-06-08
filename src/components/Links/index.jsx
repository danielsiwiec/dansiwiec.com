import React from 'react'
import './style.scss'
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope, FaMedium } from 'react-icons/fa'

const component = props => {
  const author = props.data
  const links = {
    github: author.github,
    linkedin: author.linkedin,
    instagram: author.instagram,
    email: author.email,
    medium: author.medium
  }

  return (
    <div className='links'>
      <ul className='links__list'>
        <li className='links__list-item'>
          <a href={`https://www.github.com/${links.github}`} target='_blank' rel='noopener noreferrer'>
            <FaGithub />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://medium.com/${links.medium}`} target='_blank' rel='noopener noreferrer'>
            <FaMedium />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.linkedin.com/in/${links.linkedin}`} target='_blank' rel='noopener noreferrer'>
            <FaLinkedinIn />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`https://www.instagram.com/${links.instagram}`} target='_blank' rel='noopener noreferrer'>
            <FaInstagram />
          </a>
        </li>
        <li className='links__list-item'>
          <a href={`mailto:${links.email}`}>
            <FaEnvelope />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default component