import React, { Component } from 'react';
import Canvas from './components/Canvas/Canvas.js'
import Control from './components/Control/Control.js'

import './App.css';

function base64Img2Blob(code) {
  var parts = code.split(';base64,');
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

function downloadFile(fileName, content){
  var aLink = document.createElement('a');
  var blob = base64Img2Blob(content); //new Blob([content]);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click()
}

class App extends Component {
  state = {
    canvasWidth: 500,
    canvasHeight: 500,
    currentBgColor: '#feda46',
    imgUrl: ''
  }

  handleColorChange(res) {
    this.setState({
      currentBgColor: res.hex
    })
  }

  handleCanvasUpdate(res) {
    this.imgUrl = res
  }

  handleSave() {
    const { imgUrl } = this
    downloadFile('test', imgUrl)
  }

  render() {
    const { canvasWidth, canvasHeight, currentBgColor } = this.state
    return (
      <div className="App">
        <Canvas update={(res) => { this.handleCanvasUpdate(res) }} width={canvasWidth} height={canvasHeight} bgColor={currentBgColor} />
        <Control onSave={() => { this.handleSave() }} color={currentBgColor} onChange={(res) => { this.handleColorChange(res) }} />
      </div>
    );
  }

}

export default App;
