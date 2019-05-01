import React from 'react'
import './Canvas.css'
import GRender from '../../GRender'

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.ctx = null
  }

  initData() {
    const canvas = this.canvasRef.current
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  draw() {
    const self = this
    const { ctx, canvas } = self
    const { data } = self.props
    const { size, bgColor, words } = data
    const { color: textColor, fontSize, text, letterSpacing, position } = words
    const { width, height } = size

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()
    
    new GRender.Text({
      canvas,
      ctx,
      text,
      position: { x: position.x, y: position.y },
      fontSize: fontSize,
      color: textColor,
      letterSpacing
    })
    self.getImgSrc(canvas)
  }

  getImgSrc(canvas) {
    const { update } = this.props
    const dataUrl = canvas.toDataURL('image/png')
    update(dataUrl)
    return dataUrl
  }

  componentDidMount() {
    this.initData()
    this.draw()
  }

  componentDidUpdate() {
    this.draw()
  }

  render() {
    const { data } = this.props
    const {
      size: { width, height }
    } = data

    return (
      <div className="render">
        <canvas style={{ maxWidth: '90%' }} ref={this.canvasRef} width={width} height={height} />
        <div className="size-label">{width + '*' + height}</div>
      </div>
    )
  }
}

export default Canvas
