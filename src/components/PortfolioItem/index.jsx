import React from 'react'
import Img from 'gatsby-image'
import './style.scss'
import { FaDatabase } from 'react-icons/fa'

const component = ({ project }) => {
  return (
    <div className='project-item'>
      <h4 className='project-title'>{project.title}</h4>
      <a href={project.url} target='_blank' rel='noopener noreferrer'>
        <Img fluid={project.pic.childImageSharp.fluid} title={project.title} />
      </a>
      <div className='project-description'>{project.description}</div>
      <ul className='stack-list'>
        {project.stack.map(stack => (
          <li key={stack} className='stack'>
            <FaDatabase /> {stack}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default component
