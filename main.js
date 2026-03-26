const {app,BrowserWindow} = require("electron");
const path = require('path');

function createWindow(){
    let window = new BrowserWindow({});
    window.loadFile('renderer.html')
}

app.whenReady().then(() => {createWindow()})