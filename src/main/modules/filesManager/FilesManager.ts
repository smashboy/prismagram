import { BrowserWindow, dialog, FileFilter, OpenDialogOptions } from 'electron'

interface OpenReadOptions {
  title: string
  buttonLabel: string
  filters?: FileFilter[]
}

export default class FilesManager {
  private async openReadDialog(window: BrowserWindow, options: OpenDialogOptions) {
    const { properties = [] } = options

    const response = await dialog.showOpenDialog(window, {
      ...options,
      properties: Array.from(new Set([...properties, 'showHiddenFiles']))
    })

    if (response.canceled) return null

    return response
  }

  protected async readFile(window: BrowserWindow, options: OpenReadOptions) {
    const response = await this.openReadDialog(window, { ...options, properties: ['openFile'] })

    if (!response) return response

    return response.filePaths[0] || null
  }

  // TODO
  // protected async readDirectory(window: BrowserWindow, options: OpenReadOptions) {}
}
