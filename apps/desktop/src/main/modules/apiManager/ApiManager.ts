import { ipcMain } from 'electron'

export default class ApiManager {
  createRoute<T, R>(endpoint: string, callback: (args: T) => Promise<R>) {
    ipcMain.handle(endpoint, async (_, args) => {
      console.log(`API REQUEST -> ${endpoint}`, args)

      const res = await callback(args || {})

      console.log(`API RESPONSE -> ${endpoint}`, res)

      return res
    })
  }
}
