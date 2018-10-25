import React from 'react'
import { SketchPicker } from 'react-color'
import { canvasSizeData } from '../../constants'

import './Control.css'

const defaultText = 'enter your words'


class Control extends React.Component {

  constructor(props) {
    super(props)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleCanvasSizeChange = this.handleCanvasSizeChange.bind(this)
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

  handleCanvasSizeChange(e) {
    const { dataUpdate } = this.props
    const _value = e.currentTarget.value
    const { data } = canvasSizeData.find(el => el.value === _value)
    dataUpdate('size', data)
  }

  render() {
    const { onSave, data } = this.props

    return (
      <div className='control-container'>
        <section>
          <h1> Canvas </h1>
          <div>
            <span> Size </span>
            <select defaultValue={1} onChange={this.handleCanvasSizeChange}>
              {
                canvasSizeData.map(option => (
                  <option value="1" key={option.value} value={option.value}>{option.label}</option>
                ))
              }
            </select>
          </div>
          <div>
            <span> Background Color </span>
            <SketchPicker color={data.bgColor} onChange={this.handleColorChange} />
          </div>

        </section>
        <section>
          <h1> Words </h1>
          <div>
            <span> Content </span>
            <textarea
              rows="4"
              cols="35"
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
            <span>Font Size</span>
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
            <span>Letter Spacing</span>
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
            <span>Text Color</span>
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