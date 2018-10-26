import React from 'react'
import './Canvas.css'
import GRender from '../../GRender'




// function _drawText(options) {
//   const { canvas, ctx, text, position, color = "#000", fontSize = 16, letterSpacing = 10 } = options
//   const { x, y } = position
//   canvas.style.letterSpacing = `${letterSpacing}px`

//   ctx.save()
//   ctx.fillStyle = color
//   ctx.textAlign = 'center'
//   ctx.textBaseline = 'middle'
//   ctx.font = `${fontSize}px system-ui`
//   ctx.fillText(text, x + (letterSpacing / 2), y)
//   ctx.restore()
// }


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
    const { data, dataUpdate } = self.props
    const { size, bgColor, words } = data
    const { color: textColor, fontSize, text, letterSpacing, position } = words
    const { width, height } = size
    const _words = Object.assign({}, words)

    ctx.clearRect(0, 0, width, height)
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = bgColor
    ctx.fill()

    const Gtext = new GRender.Text({
      canvas,
      ctx,
      text,
      position: { x: position.x, y: position.y },
      fontSize: fontSize,
      color: textColor,
      letterSpacing,
      onHold(x, y) {
        console.log(x, y)
        _words.position = { x, y }
        dataUpdate('words', _words)
      }
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
    const { size: { width, height } } = data


    return (
      <div className="render">
        <canvas style={{ maxWidth: '90%' }} ref={this.canvasRef} width={width} height={height}></canvas>
        <div className="size-label">{width + '*' + height}</div>
      </div>
    )
  }
}

export default Canvas