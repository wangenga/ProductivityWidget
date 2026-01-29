const { app, BrowserWindow } = require('electron');
const path = require('path');

try {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });
}catch (_) {}

function createWindow() {
    const win = new BrowserWindow({
        width: 300, height: 400, frame: false, transparent: true,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    });
    win.loadFile('index.html');
}
app.whenReady().then(createWindow);