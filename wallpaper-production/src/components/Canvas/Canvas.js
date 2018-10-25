import React from 'react'
import './Canvas.css'

function _drawText(options) {
  const { canvas, ctx, text, position, color = "#000", fontSize = 16, letterSpacing = 10 } = options
  const { x, y } = position
  canvas.style.letterSpacing = `${letterSpacing}px`

  ctx.save()
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${fontSize}px system-ui`
  ctx.fillText(text, x + (letterSpacing / 2), y)
  ctx.restore()
}


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
    const { ctx, canvas } = this
    const { data } = this.props
    const { width, height, bgColor, words } = data
    const { color: textColor, fontSize, text, letterSpacing } = words

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()
    _drawText({
      canvas,
      ctx,
      text,
      position: { x: width / 2, y: height / 2 },
      fontSize: fontSize,
      color: textColor,
      letterSpacing
    })
    this.getImgSrc(canvas)
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
    const { width, height } = data
    return (
      <div className="render">
        <canvas ref={this.canvasRef} width={width} height={height}></canvas>
      </div>
    )
  }
}

export default Canvas