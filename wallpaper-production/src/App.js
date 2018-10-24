import React, { Component } from 'react';
import Canvas from './components/Canvas/Canvas.js'
import Control from './components/Control/Control.js'

import './App.css';


class App extends Component {


  state = {
    canvasWidth: 500,
    canvasHeight: 500,
    currentBgColor: '#feda46'
  }

  handleColorChange(res) {
    this.setState({
      currentBgColor: res.hex
    })
  }

  render() {
    const { canvasWidth, canvasHeight, currentBgColor } = this.state
    return (
      <div className="App">
        <Canvas width={canvasWidth} height={canvasHeight} bgColor={currentBgColor} />
        <Control color={currentBgColor} onChange={(res) => { this.handleColorChange(res) }} />
      </div>
    );
  }

}

export default App;
