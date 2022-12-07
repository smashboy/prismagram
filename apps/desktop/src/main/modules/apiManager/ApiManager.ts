import { ipcMain } from 'electron'

export default class ApiManager {
  createRoute<T, R>(endpoint: string, callback: (args: T) => R) {
    ipcMain.handle(endpoint, (_, args) => callback(args || {}))
  }
}
