const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');
const path = require('path');

let mainWindow, resourceMonitor;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    mainWindow.loadFile('./views/bios.html');
});

// enable global security settings
app.enableSandbox();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
