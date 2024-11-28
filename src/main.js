const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');
const path = require('path');
const v8 = require('v8');

let mainWindow, monitorWindow, isMonWinActive;
isMonWinActive = false;

const sizeInGB = 4;
let sizeInBytes = sizeInGB * 1024
app.commandLine.appendSwitch('js-flags', '--max-old-space-size=' + sizeInBytes);

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            nodeIntegrationInWorker: true,
            contextIsolation: true,
            experimentalFeatures: false,
            webSecurity: true,
            allowRunningInsecureContent: false,
        },
        icon: path.join(__dirname, 'assets/icon.png'),
    });
    mainWindow.loadFile('./views/bios.html');

    monitorWindow = new BrowserWindow({ webPreferences: { preload: __dirname + '/preload.js', nodeIntegration: false, contextIsolation: true } });
    isMonWinActive = true;

    // kill monitor when main window is closed
    mainWindow.on('closed', () => {
        if (monitorWindow && !monitorWindow.isDestroyed()) {
            monitorWindow.close();
        }
    });

    monitorWindow.on('closed', () => {
        isMonWinActive = false;
    });

    monitorWindow.loadFile('./views/monitor.html');
    setInterval(() => {
        if (!isMonWinActive) return;

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
