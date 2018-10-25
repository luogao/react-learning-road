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

function downloadFile(fileName, content) {
  var aLink = document.createElement('a');
  var blob = base64Img2Blob(content); //new Blob([content]);
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click()
}

class App extends Component {
  state = {
    imgUrl: '',
    canvasData: {
      width: 500,
      height: 500,
      bgColor: '#feda46',
      words: {
        text: '',
        fontSize: 20,
        color: '#000',
        letterSpacing: 10
      }
    }
  }

  handleDataUpdate(key, value) {
    const _canvasData = Object.assign({}, this.state.canvasData)
    _canvasData[key] = value
    this.setState({
      canvasData: _canvasData
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
    const { canvasData } = this.state
    return (
      <div className="App">
        <Canvas update={(res) => { this.handleCanvasUpdate(res) }} data={canvasData} />
        <Control dataUpdate={(key, value) => { this.handleDataUpdate(key, value) }} data={canvasData} onSave={() => { this.handleSave() }} />
      </div>
    );
  }

}

export default App;
