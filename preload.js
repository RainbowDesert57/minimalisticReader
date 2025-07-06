const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isLinux: process.platform === 'linux'
});
