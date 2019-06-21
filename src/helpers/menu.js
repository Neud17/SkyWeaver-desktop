import { app, shell, BrowserWindow, BrowserView } from 'electron'

const pkgJson = require('../../package.json')

function buildMenu(mainWindow) {
  let menu = []

  if (process.platform === 'darwin') {
    menu.push({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })
  } else {
    menu.push({
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    })
  }

  menu.push(...[
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          click: () => {
            const win = BrowserWindow.getFocusedWindow()
            if (win === null) {
              if (mainWindow.isDevToolsFocused()) {
                mainWindow.closeDevTools()
              }
            } else {
              if (process.platform === 'darwin') {
                app.hide()
              } else {
                win.close()
              }
            }
          }
        }
      ]
    },
    {
      label: 'Inspector',
      submenu: [
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+CmdOrCtrl+I',
          click: () => {
            BrowserWindow.getFocusedWindow().toggleDevTools();
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: () => {
            shell.openExternal('https://www.skyweaver.net')
          }
        }
      ]
    }
  ])

  return menu
}

export { buildMenu }
