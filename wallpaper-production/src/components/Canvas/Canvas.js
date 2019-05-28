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
