import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('system', {
    getStats: () => ipcRenderer.send('get-system-stats'),
    onStats: (callback) => ipcRenderer.on('system-stats', (_, data) => callback(data)),
});
