import { BrowserWindow } from 'electron'

export interface WindowManager {
  show: () => void
  createApiRoute: <T, R>(endpoint: string, callback: (args: T) => Promise<R>) => void
  getWindow: () => BrowserWindow
}
