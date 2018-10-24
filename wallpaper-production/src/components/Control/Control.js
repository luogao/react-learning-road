import React from 'react'
import { SketchPicker } from 'react-color'

import './Control.css'

class Control extends React.Component {
  render() {
    const { onChange, color, onSave } = this.props
    return (
      <div className='control-container'>
        <section>
          <span> Background Color </span>
          <SketchPicker color={color} onChange={onChange} />
        </section>
        <section>
          <button onClick={onSave}>Download</button>
        </section>
      </div>
    )
  }
}

export default Control