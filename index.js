const s3connect = require('./s3connect.js')
const storage = require('electron-json-storage')
const {dialog, shell} = require('electron').remote

var uploadButton = document.getElementById('upload-button')
var downloadButton = document.getElementById('download-button')
var previewButton = document.getElementById('preview-button')
var pathButton = document.getElementById('path-button')
var pathInput = document.getElementById('path-input')

var path = "";

pathButton.addEventListener('click', () => {
  dialog.showOpenDialog({properties:['openDirectory', 'createDirectory']}, (dirname) => {
    if(dirname && dirname.length > 0) {
      path = dirname[0]
      pathInput.value = path
      storage.set('site-path', {'path': path})
    }
  })
})

storage.get('site-path', (err, data) => {
  if (err) throw err
  if(data && data.path) {
    pathInput.value = data.path
    path = data.path
  }

  uploadButton.addEventListener('click', () => {
    if(path) {
          s3connect.upload(path);
    }
  })
  downloadButton.addEventListener('click', () => {
    if(path) {
          s3connect.download(path);
    }
  })
  previewButton.addEventListener('click', function() {
    if(path) {
      shell.openExternal("file://" + path + '/index.html')
    }
  })

})
