import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import WindowsManager from '../windowsManager'

export default class AppManager extends WindowsManager {
  initApp() {
    app.whenReady().then(() => {
      electronApp.setAppUserModelId('com.electron')

      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      this.createAppWindow()

      this.appWindow!.show()

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (this.allWindowsCount === 0) this.appWindow!.show()
      })

      app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit()
        }
      })
    })
  }
}
