import { BrowserWindow, BrowserWindowConstructorOptions, shell } from 'electron'
import { is } from '@electron-toolkit/utils'
import {
  APP_ICON_PNG_PATH,
  APP_NAME,
  PRELOAD_SCRIPT_PATH,
  RENDERER_HTML_PATH
} from '../../constants'
import { WindowManager } from './models'
import ApiManager from '../apiManager/ApiManager'

export default class WindowsManagerBase extends ApiManager {
  protected createWindow(options: BrowserWindowConstructorOptions): WindowManager {
    const window = new BrowserWindow({
      ...options,
      ...(process.platform === 'linux'
        ? {
            icon: APP_ICON_PNG_PATH
          }
        : {}),
      title: APP_NAME,
      webPreferences: {
        preload: PRELOAD_SCRIPT_PATH,
        sandbox: false,
        webviewTag: true
        // webSecurity: false,
        // allowRunningInsecureContent: true
      }
    })

    window.on('ready-to-show', () => {
      window.show()
      if (is.dev) window.webContents.openDevTools({ mode: 'detach' })
    })

    window.webContents.setWindowOpenHandler(({ url }) => {
      // config.fileProtocol is my custom file protocol
      // if (url.startsWith(config.fileProtocol)) {
      //     return { action: 'allow' };
      // }
      // open url in a browser and prevent default
      shell.openExternal(url)
      return { action: 'deny' }
    })

    const show = () => {
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        window.loadURL(process.env['ELECTRON_RENDERER_URL'])
      } else {
        window.loadFile(RENDERER_HTML_PATH)
      }
    }

    const createApiRoute = <T, R>(endpoint: string, callback: (args: T) => Promise<R>) =>
      this.createRoute<T, R>(endpoint, callback)

    const getWindow = () => window

    return { show, createApiRoute, getWindow }
  }
}
