import React from 'react'
import Collapsible from 'react-collapsible'
import './style.scss'

export default class Collapsing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
  }

  componentDidMount () {
    this.setState({open: window.location.pathname.includes(this.props.path)})
  }

  render () {
    return (
      <Collapsible trigger={<button className='menu__list-item-link like-anchor'>{this.props.label}</button>}
        open={this.state.open}
        transitionTime={200}>
        <div className='collapsing-children'>
          {this.props.children}
        </div>
      </Collapsible>
    )
  }
}
