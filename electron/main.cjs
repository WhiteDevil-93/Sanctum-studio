/**
 * Sanctum Studio - Standalone Desktop Electron Application Shell
 * Wraps Sanctum Studio in a native desktop window with native OS menus
 */

const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
let mainWindow = null;
let serverInstance = null;
const PORT = 4180;

async function startEmbeddedServer() {
  const { createStudioServer } = await import('../src/server/appServer.js');
  const server = createStudioServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => {
      server.removeListener('error', reject);
      console.log(`[Sanctum Electron] Embedded studio server running on port ${PORT}`);
      resolve();
    });
  });
  return server;
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#0B0C10',
    title: 'Sanctum Studio',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  buildAppMenu();
  await mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
}

function buildAppMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Blank Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow && mainWindow.webContents.executeJavaScript('window.createNewBlankCanvas?.()')
        },
        {
          label: 'Save Project...',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow && mainWindow.webContents.executeJavaScript('document.getElementById("btn-save-project")?.click()')
        },
        {
          label: 'Open Project...',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow && mainWindow.webContents.executeJavaScript('document.getElementById("btn-open-project")?.click()')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'UX Handbook Specification',
          click: () => shell.openExternal('https://github.com')
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(async () => {
  try {
    serverInstance = await startEmbeddedServer();
    await createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  } catch (error) {
    console.error('[Sanctum Electron] Unable to start the Studio:', error);
    dialog.showErrorBox('Sanctum Studio failed to start', error.message);
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (serverInstance) serverInstance.close();
    app.quit();
  }
});
