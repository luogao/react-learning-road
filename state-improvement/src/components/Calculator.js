import React, { Component } from 'react'
import BoilingVerdict from './BoilingVerdict'
import TemperatureInput from './TemperatureInput'

const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9

const toFahrenheit = celsius => (celsius * 9 / 5) + 32

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return ''
  }
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    this.state = {
      temperature: '',
      scale: 'c'
    }
  }

  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature
    })
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature
    })
  }

  render() {
    const { temperature, scale } = this.state
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div style={{textAlign: 'left'}}>
        <TemperatureInput temperature={celsius} scale="c" onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput temperature={fahrenheit} scale="f" onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div >
    )
  }
}

export default Calculator