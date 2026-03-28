const {app,BrowserWindow} = require("electron");
const path = require('path');

function createWindow(){
   const window = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
    }
});
    window.loadFile('renderer.html')
}

app.whenReady().then(() => {createWindow()})