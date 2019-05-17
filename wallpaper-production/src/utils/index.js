import nanoid from 'nanoid'

function base64Img2Blob(code) {
  var parts = code.split(';base64,')
  var contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1])
  var rawLength = raw.length

  var uInt8Array = new Uint8Array(rawLength)

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}

function generate() {
  const logoMarker = 'GWP'
  const date = new Date().toLocaleDateString()
  return `${logoMarker}-${date}-${nanoid(6)}`
}

function downloadFile(fileName, content) {
  var aLink = document.createElement('a')
  var blob = base64Img2Blob(content) //new Blob([content]);
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
  aLink.click()
}

export { base64Img2Blob, generate, downloadFile }
