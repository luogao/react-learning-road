class Text {
  constructor(options) {
    console.clear()
    this.initData(options)
    this.draw()
    this.bindEvent()
    console.log(3)
  }

  initData(props) {
    for (const key in props) {
      this[key] = props[key]
    }
    const computWidth = parseInt(getComputedStyle(this.canvas).width.slice(0, -2), 10)
    const attrWidth = this.canvas.width
    const _scale = computWidth / attrWidth
    this._scale = _scale
    this.isHold = false
    this.isInPath = false
  }

  draw() {
    const { canvas, ctx, text, position, color = "#000", fontSize = 16, letterSpacing = 10 } = this
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

  inPath(x, y) {
    const self = this
    const { ctx, position, text, fontSize } = self
    ctx.save()
    ctx.font = `${fontSize}px system-ui`
    const fontWidth = ctx.measureText(text).width

    const padding = 10
    const rectLeft = position.x - padding - fontWidth / 2
    const rectTop = position.y - padding - fontSize / 2
    const rectWidth = fontWidth + padding * 2
    const rectHeight = fontSize + padding * 2

    ctx.beginPath()
    ctx.moveTo(position.x, position.y)
    ctx.rect(rectLeft, rectTop, rectWidth, rectHeight)
    const ret = ctx.isPointInPath(x, y)
    ctx.closePath()
    ctx.restore()
    return ret
  }

  handleMousemove(x, y) {
    const self = this
    // const { ctx, position, text, fontSize, _scale, isHold } = self
    const _x = x / self._scale
    const _y = y / self._scale
    if (self.inPath(_x, _y)) {
      document.body.style.cursor = '-webkit-grab'
      self.isInPath = true
    } else {
      self.isInPath = false
      document.body.style.cursor = 'default'
    }
  }

  handleHold(x, y) {
    typeof this.onHold === 'function' && this.onHold(x, y)
  }

  handleMouseleave() {

  }


  bindEvent() {
    const self = this
    const { canvas } = self
    canvas.addEventListener('mousemove', function (e) {
      self.handleMousemove(e.offsetX, e.offsetY)
    })

    canvas.addEventListener('mousedown', function (e) {
      self.isHold = true
      if (self.isInPath) { document.body.style.cursor = '-webkit-grabbing' }
    })

    canvas.addEventListener('mouseup', function (e) {
      const _x = e.offsetX / self._scale
      const _y = e.offsetY / self._scale
      self.isHold = false
      document.body.style.cursor = 'default'
      if (self.isInPath) {
        self.handleHold(_x, _y)
      }
    })
  }


}

export default Text