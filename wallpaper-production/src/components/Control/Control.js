import React from 'react'
import { SketchPicker } from 'react-color'

import './Control.css'

const defaultText = 'enter your words'

class Control extends React.Component {

  constructor(props) {
    super(props)
    this.handleColorChange = this.handleColorChange.bind(this)
  }

  handleWordsDataChange(key, value) {
    const { dataUpdate, data } = this.props
    const _words = Object.assign({}, data.words)
    _words[key] = value
    dataUpdate('words', _words)
  }

  handleColorChange(res) {
    const { dataUpdate } = this.props
    dataUpdate('bgColor', res.hex)
  }

  render() {
    const { onSave, data } = this.props
    
    return (
      <div className='control-container'>
        <section>
          <span> Background Color </span>
          <SketchPicker color={data.bgColor} onChange={this.handleColorChange} />
        </section>
        <section>
          <span> Words </span>
          <div>
            <label>Text</label>
            <input
              placeholder={defaultText}
              value={data.words.text}
              type="text"
              onChange={
                (e) => {
                  let value = e.currentTarget.value
                  this.handleWordsDataChange('text', value)
                }
              }
            />
          </div>
          <div>
            <label>Font Size</label>
            <input
              placeholder='change font size'
              value={data.words.fontSize}
              type="number"
              onChange={
                (e) => { this.handleWordsDataChange('fontSize', e.currentTarget.value) }
              }
            />
          </div>
          <div>
            <label>Letter Spacing</label>
            <input
              placeholder='change the letter spacing'
              value={data.words.letterSpacing}
              type="number"
              onChange={
                (e) => { this.handleWordsDataChange('letterSpacing', e.currentTarget.value) }
              }
            />
          </div>
          <div>
            <label>Text Color</label>
            <SketchPicker
              color={data.words.color}
              onChange={
                (res) => { this.handleWordsDataChange('color', res.hex) }
              }
            />
          </div>
        </section>
        <section>
          <span> Save </span>
          <button onClick={onSave}>Download</button>
        </section>
      </div>
    )
  }
}

export default Control