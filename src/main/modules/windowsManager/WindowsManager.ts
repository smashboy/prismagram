import { BrowserWindow } from 'electron'
import { GET_PRISMA_DOCUMENT_ENDPOINT } from '../../constants'
import { getPrismaDocument, readPrismaSchemaFile } from '../../services/prisma'
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

    this.appWindow.createApiRoute(GET_PRISMA_DOCUMENT_ENDPOINT, async () => {
      const schemaSrc = await readPrismaSchemaFile(this.appWindow!.getWindow())

      if (!schemaSrc) return schemaSrc

      return getPrismaDocument(schemaSrc)
    })
  }

  protected get allWindowsCount() {
    return BrowserWindow.getAllWindows().length
  }
}
