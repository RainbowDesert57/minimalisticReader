const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const platform = require('os').platform(); // ✅ FIXED HERE
  const isLinux = platform === 'linux';
  const isWindows = platform === 'win32';
  const isMac = platform === 'darwin';

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    transparent: isLinux,
    vibrancy: isMac ? 'under-window' : isWindows ? 'blur' : undefined,
    backgroundMaterial: isWindows ? 'acrylic' : undefined,
    visualEffectState: isWindows ? 'active' : undefined,
    backgroundColor: isLinux ? '#00000000' : undefined,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'readerAppIcon256.ico'),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('window-control', (event, action) => {
  switch(action) {
    case 'close': mainWindow.close(); break;
    case 'minimize': mainWindow.minimize(); break;
    case 'maximize': mainWindow.maximize(); break;
    case 'restore': mainWindow.restore(); break;
  }
});
