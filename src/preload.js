import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onResourceUpdate: (callback) => ipcRenderer.on('update-resource', callback),

});