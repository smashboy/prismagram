import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      __dirname: string
    }
    constants: {
      ctrlOrCmdKey: string
      appVersion: string
      appName: string
    }
  }
}
