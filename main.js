const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
const path = require('path');
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    // transparent: true,
    vibrancy: 'blur',
    backgroundMaterial: 'acrylic',
    visualEffectState: 'active',
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
    case 'close':
      mainWindow.close();
      break;
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      mainWindow.maximize();
      break;
    case 'restore':
      mainWindow.restore();
      break;
  }
});
