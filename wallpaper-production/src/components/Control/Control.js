import React from 'react'
import { SketchPicker } from 'react-color'

import './Control.css'

class Control extends React.Component {
  render() {
    const { onChange, color } = this.props
    return (
      <div className='control-container'>
        <SketchPicker color={color} onChange={onChange} />
      </div>
    )
  }
}

export default Control