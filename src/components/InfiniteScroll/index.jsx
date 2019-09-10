import React from 'react'
import chunk from 'lodash/chunk'

const INITIAL_COUNT = 2

// This would normally be in a Redux store or some other global data store.
if (typeof window !== 'undefined') {
  window.itemsToShow = INITIAL_COUNT
}

export default class InfitniteScroll extends React.Component {
  constructor (props) {
    super(props)
    let itemsToShow = INITIAL_COUNT
    if (typeof window !== 'undefined') {
      itemsToShow = window.itemsToShow
    }

    this.state = { itemsToShow }
  }

  update () {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < 100) {
      this.setState({ itemsToShow: this.state.itemsToShow + 1 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update()) // eslint-disable-line no-undef
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
    window.itemsToShow = this.state.itemsToShow
  }

  render () {
    return (
      <div>
        {chunk(this.props.items.slice(0, this.state.itemsToShow), 3).map((chunk, c) => (
          <div key={c}>
            {chunk.map(this.props.sectionFactory)}
          </div>
        ))}
      </div>
    )
  }
}
