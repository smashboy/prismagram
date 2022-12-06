import { BrowserWindow } from 'electron'
import { WindowManager } from './models'
import WindowsManagerBase from './WindowsManagerBase'

export default class WindowsManager extends WindowsManagerBase {
  protected appWindow: WindowManager | undefined

  protected createAppWindow() {
    this.appWindow = this.createWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true
    })
  }

  protected get allWindowsCount() {
    return BrowserWindow.getAllWindows().length
  }
}
