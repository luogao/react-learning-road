import React, { Component } from 'react'
import Control from './components/Control/Control.js'
import GRender from './GRender'
import { generate, downloadFile } from './utils'
import { defaultText, DEFAULT_WIDTH, DEFAULT_HEIGHT } from './constants'
import './App.css'

class App extends Component {
  state = {
    imgUrl: '',
    canvasData: {
      size: {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
      },
      bgColor: '#feda46',
      words: {
        text: defaultText,
        fontSize: 36,
        color: '#000',
        letterSpacing: 0
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
    console.log(' ??? ?? ?? ? ', canvasData)
    const self = this
    const { ctx } = self
    const { size, bgColor, words } = canvasData
    const { color: textColor, fontSize, text, letterSpacing, position } = words
    const { width, height } = size
    const elementPosition = !position
      ? {
          x: width / 2,
          y: height / 2
        }
      : position

    console.log(elementPosition)
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()

    this.GText.draw({
      text,
      position: elementPosition,
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
    // this.initCanvasData()
    // this.draw(this.state.canvasData)
  }

  handleDataUpdate = (key, value) => {
    const _canvasData = Object.assign({}, this.state.canvasData)
    _canvasData[key] = value
    console.log(_canvasData)
    this.setState({
      canvasData: _canvasData
    })
  }

  componentDidUpdate() {
    this.draw(this.state.canvasData)
  }

  handleSave = () => {
    const { canvas } = this
    downloadFile(generate(), this.getImgSrc(canvas))
  }

  render() {
    const { canvasData } = this.state
    const { width, height } = canvasData.size

    return (
      <div className="App">
        <div className='under-construction'>
          UNDER  construction, COME  tomorrow
        </div>
        {/* <div className="render">
          <canvas style={{ maxWidth: '90%' }} ref={ref => (this.canvasRef = ref)} width={width} height={height} />
          <div className="size-label">{width + '*' + height}</div>
        </div>
        <Control dataUpdate={this.handleDataUpdate} data={canvasData} onSave={this.handleSave} /> */}
      </div>
    )
  }
}

export default App
