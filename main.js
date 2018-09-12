'use strict';

// Import parts of electron to use
const {app, BrowserWindow, globalShortcut, ipcMain, Menu} = require('electron');
const path = require('path');
const url = require('url');

// Define shortcut accelerators here.
const shortcutCombos = ['Command+\\', 'Command+Shift+E']

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 75,
    transparent: true,
    frame: false,
    type:"toolbar",
  })
  // var currentWindowPosition = mainWindow.getPosition();
  // console.log(currentWindowPosition);
  // // currentWindowPosition[x] += 20;
  mainWindow.setPosition(440, 212);


  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }

  app.dock.hide();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  mainWindow.loadURL( indexPath );

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if ( dev ) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.on("blur", function() {
    Menu.sendActionToFirstResponder('hide:');
    mainWindow.hide();
  });

  mainWindow.on("focus", function() {
    mainWindow.webContents.send("focused")
  });

  ipcMain.on("resize", function(event, height) {
    if ( dev ) {
      mainWindow.setSize(800, 800);
    } else {
      mainWindow.setSize(800, height + 30);
    }

  });

  mainWindow.hide();
}

function activationHandler() {
  if (mainWindow.isVisible()) {
    Menu.sendActionToFirstResponder('hide:');
    mainWindow.hide();
  } else {
    mainWindow.setVisibleOnAllWorkspaces(true); // put the window on all screens
    // mainWindow.focus(); // focus the window up front on the active screen
    mainWindow.show()
    mainWindow.setVisibleOnAllWorkspaces(false); // disable all screen behavior
    mainWindow.webContents.send("focused");
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  shortcutCombos.map(function(combo) {
    globalShortcut.register(combo, () => {
      activationHandler();
    })
  });
  createWindow();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
  globalShortcut.unregisterAll()
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
