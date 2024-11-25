const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    onResourceUsage: (callback) => ipcRenderer.on('resource-usage', (_, data) => callback(data))
});
