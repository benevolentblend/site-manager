const electron = require('electron')
const {app,BrowserWindow} = electron

console.log(`${__dirname}/public`)

app.on('ready', () => {
  let win = new BrowserWindow({width: 800, height: 600})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools();
})
