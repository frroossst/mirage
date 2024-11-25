const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');
const path = require('path');
const v8 = require('v8');

let mainWindow;

app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        icon: path.join(__dirname, 'assets/icon.png'),
    });
    mainWindow.loadFile('./views/bios.html');

    monitorWindow = new BrowserWindow({ webPreferences: { preload: __dirname + '/preload.js' } });
    monitorWindow.loadFile('./views/monitor.html');
    setInterval(() => {
        const memoryUsage = process.memoryUsage();
        const cpuUsage = process.cpuUsage();
        const heapStats = v8.getHeapStatistics();
        monitorWindow.webContents.send('resource-usage', { memoryUsage, cpuUsage, heapStats });
    }, 250);

});

// enable global security settings
app.enableSandbox();

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
