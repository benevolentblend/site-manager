const electron = require('electron')
const {app,BrowserWindow} = electron

console.log(`${__dirname}/public`)

app.on('ready', () => {
  let win = new BrowserWindow({width: 500, height: 300, resizable: false})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools();
})

app.on('window-all-closed', () => {
  app.quit();
})
