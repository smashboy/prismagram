import { BrowserWindow } from 'electron'
import { autoUpdater, UpdateCheckResult } from 'electron-updater'
import {
  APP_UPDATE_AVAILABLE,
  APP_UPDATE_DOWNLOADED,
  APP_UPDATE_DOWNLOADING,
  APP_UPDATE_ERROR,
  APP_UPDATE_NOT_AVAILABLE
} from '@shared/common/configs/api'

// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false

export class UpdatedManager {
  private readonly appWindow: BrowserWindow
  private newUpdate: UpdateCheckResult | null = null

  constructor(appWindow: BrowserWindow) {
    this.appWindow = appWindow
  }

  initUpdateListeners() {
    autoUpdater.on('update-available', (info) =>
      this.appWindow.webContents.send(APP_UPDATE_AVAILABLE, info)
    )
    autoUpdater.on('update-not-available', () =>
      this.appWindow.webContents.send(APP_UPDATE_NOT_AVAILABLE)
    )
    autoUpdater.on('error', () => this.appWindow.webContents.send(APP_UPDATE_ERROR))
    autoUpdater.on('update-downloaded', () =>
      this.appWindow.webContents.send(APP_UPDATE_DOWNLOADED)
    )
    autoUpdater.on('download-progress', (info) =>
      this.appWindow.webContents.send(APP_UPDATE_DOWNLOADING, info.percent)
    )
  }

  async startDownloadingUpdate() {
    if (this.newUpdate) {
      autoUpdater.downloadUpdate()
    }
  }

  async checkForUpdates() {
    const newUpdate = await autoUpdater.checkForUpdates()

    this.newUpdate = newUpdate
  }
}
