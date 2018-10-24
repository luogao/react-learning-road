import React from 'react'
import './Canvas.css'

class Canvas extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.ctx = null
  }

  initData() {
    const canvas = this.canvasRef.current
    this.ctx = canvas.getContext('2d')
  }

  draw() {
    const { ctx } = this
    const { bgColor, width, height } = this.props
    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()
  }

  componentDidMount() {
    this.initData()
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { width, height } = this.props
    return (
      <div className="render">
        <canvas ref={this.canvasRef} width={width} height={height}></canvas>
      </div>
    )
  }
}

export default Canvas