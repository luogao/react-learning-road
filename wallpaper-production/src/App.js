import React, { Component } from 'react'
import nanoid from 'nanoid'
import Control from './components/Control/Control.js'
import GRender from './GRender'

import './App.css'

const defaultText = '...'

function base64Img2Blob(code) {
  var parts = code.split(';base64,')
  var contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1])
  var rawLength = raw.length

  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

function generate() {
  const logoMarker = 'GWP'
  const date = new Date().toLocaleDateString()
  return `${logoMarker}-${date}-${nanoid(6)}`
}

function downloadFile(fileName, content) {
  var aLink = document.createElement('a')
  var blob = base64Img2Blob(content) //new Blob([content]);
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

class App extends Component {
  state = {
    imgUrl: '',
    canvasData: {
      size: {
        width: 1366,
        height: 768
      },
      bgColor: '#feda46',
      words: {
        text: defaultText,
        fontSize: 36,
        color: '#000',
        letterSpacing: 0,
        position: {
          x: 1366 / 2,
          y: 768 / 2
        }
      }
    }
  }

  initCanvasData() {
    const canvas = this.canvasRef
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.GText = new GRender.Text({
      canvas,
      ctx: this.ctx
    })
  }

  draw(canvasData) {
    const self = this
    const { ctx } = self
    const { size, bgColor, words } = canvasData
    const { color: textColor, fontSize, text, letterSpacing, position } = words
    const { width, height } = size

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()

    this.GText.draw({
      text,
      position: { x: position.x, y: position.y },
      fontSize: fontSize,
      color: textColor,
      letterSpacing
    })
  }

  getImgSrc(canvas) {
    const dataUrl = canvas.toDataURL('image/png')
    return dataUrl
  }

  componentDidMount() {
    this.initCanvasData()
    this.draw(this.state.canvasData)
  }

  handleDataUpdate(key, value) {
    const _canvasData = Object.assign({}, this.state.canvasData)
    _canvasData[key] = value
    this.setState({
      canvasData: _canvasData
    })
    this.draw(_canvasData)
  }

  handleSave() {
    const { canvas } = this
    downloadFile(generate(), this.getImgSrc(canvas))
  }

  render() {
    const { canvasData } = this.state
    const { width, height } = canvasData.size

    console.log('render')
    return (
      <div className="App">
        <div className="render">
          <canvas
            style={{ maxWidth: '90%' }}
            ref={ref => (this.canvasRef = ref)}
            width={width}
            height={height}
          />
          <div className="size-label">{width + '*' + height}</div>
        </div>
        <Control
          dataUpdate={(key, value) => {
            this.handleDataUpdate(key, value)
          }}
          data={canvasData}
          onSave={() => {
            this.handleSave()
          }}
        />
      </div>
    )
  }
}

export default App
