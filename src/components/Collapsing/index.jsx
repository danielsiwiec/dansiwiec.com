import React from 'react'
import Collapsible from 'react-collapsible'
import './style.scss'

export default class Collapsing extends React.Component {
  constructor (props) {
    super(props)
    let open = false
    if (typeof window !== 'undefined') {
      open = window.location.pathname.includes(props.path)
    }
    this.state = { open }
  }

  render () {
    return (
      <Collapsible
        trigger={<span className='menu__list-item-link like-anchor'>{this.props.label}</span>}
        open={this.state.open}
        transitionTime={200}
      >
        <div className='collapsing-children'>
          {this.props.children}
        </div>
      </Collapsible>
    )
  }
}
