'use strict';

// Import parts of electron to use
const {app, BrowserWindow, globalShortcut, ipcMain, Menu} = require('electron');
const path = require('path');
const url = require('url');


// Define shortcut accelerators here.
const shortcutCombos = ['Command+\\', 'Command+Shift+E'];

// const configurationCombos = ['Command+S'];

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let configurationWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 75,
    transparent: true,
    frame: false,
    type:"toolbar",
  });

  // mainWindow.removeMenu();
  // Menu.setApplicationMenu(null);

  // TODO: Get the correct position to place the window given the user's screen size.
  mainWindow.setPosition(440, 212);

  // and load the index.html of the app.
  let indexPath = url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, 'dist', 'index.html'),
    slashes: true,
    search: "?App"
  });
  // if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
  //   indexPath = url.format({
  //     protocol: 'http:',
  //     host: 'localhost:8080',
  //     pathname: 'index.html',
  //     slashes: true,
  //     search: "?App"
  //   });
  // } else {
  //   indexPath = url.format({
  //     protocol: 'file:',
  //     pathname: path.join(__dirname, 'dist', 'index.html'),
  //     slashes: true,
  //     search: "?App"
  //   });
  // }

  app.dock.hide();
  mainWindow.setAlwaysOnTop(true, "floating");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  mainWindow.loadURL( indexPath );
  // mainWindow.loadURL("http://localhost:8080/index.html?App");

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
    console.log("Blurred, and thus hiding");
    // Menu.sendActionToFirstResponder('hide:');
    mainWindow.hide();
  });

  mainWindow.on("focus", function() {
    console.log("Focussed, and thus focusing");
    mainWindow.webContents.send("focused")
  });

  ipcMain.on("resize", function(event, height) {
    console.log("Resizing");
    if ( dev ) {
      mainWindow.setSize(800, height + 30);
      mainWindow.setPosition(440, 212);
    } else {
      mainWindow.setSize(800, height + 30);
      mainWindow.setPosition(440, 212);
    }

  });

  mainWindow.hide();
}

function createConfigurationWindow() {
  configurationWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: false,
    frame: true,
    // type:"toolbar",
  })

  let configurationPath;
  //  = configurationPath = url.format({
  //   protocol: 'file:',
  //   pathname: path.join(__dirname, 'dist', 'index.html'),
  //   slashes: true,
  //   search: "?ConfigScreen",
  // });
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    configurationPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
      search: "?ConfigScreen",
    });
  } else {
    configurationPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
      search: "?ConfigScreen",
    });
  }

  // configurationWindow.loadURL( configurationPath );
  // configurationWindow.loadURL( __dirname, 'test.html' );
}
// handles the global keyboard shortcuts
function activationHandler() {
  console.log(mainWindow.isVisible())
  if (mainWindow.isVisible()) {

    // if (configurationWindow.isVisible()) {
    //   mainWindow.hide();
    //   configurationWindow.hide();
    // } else {
    console.log("Sending Hide Function");
    Menu.sendActionToFirstResponder('hide:');
    mainWindow.hide();
    // }
  } else {
    console.log("Show function")
    mainWindow.setVisibleOnAllWorkspaces(true); // put the window on all screens
    // mainWindow.focus(); // focus the window up front on the active screen
    mainWindow.show()
    mainWindow.setVisibleOnAllWorkspaces(false); // disable all screen behavior
    mainWindow.webContents.send("focused");
  }
}

function configurationHandler() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
    configurationWindow.show();
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
  // configurationCombos.map(function(combo) {
  //   globalShortcut.register(combo, () => {
  //     configurationHandler();
  //   })
  // });
  createMainWindow();
  // createConfigurationWindow();
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
    createMainWindow();
    // createConfigurationWindow();
  }
});
