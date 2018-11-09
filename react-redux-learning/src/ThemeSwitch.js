import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ThemeSwitch extends Component {

  static propTypes = {
    themeColor: PropTypes.string
  }

  handleSwitchColor(color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color)
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSwitchColor.bind(this, 'red')} style={{ color: this.props.themeColor }}>Red</button>
        <button onClick={this.handleSwitchColor.bind(this, 'blue')} style={{ color: this.props.themeColor }}>Blue</button>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    themeColor: state.themeColor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)