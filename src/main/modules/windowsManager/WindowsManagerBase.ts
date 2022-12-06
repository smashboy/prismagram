import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { is } from '@electron-toolkit/utils'
import { APP_ICON_PNG_PATH, PRELOAD_SCRIPT_PATH, RENDERER_HTML_PATH } from '../../constants'
import { WindowManager } from './models'

export default class WindowsManagerBase {
  protected createWindow(options: BrowserWindowConstructorOptions): WindowManager {
    const window = new BrowserWindow({
      ...options,
      ...(process.platform === 'linux'
        ? {
            icon: APP_ICON_PNG_PATH
          }
        : {}),
      webPreferences: {
        preload: PRELOAD_SCRIPT_PATH,
        sandbox: false
      }
    })

    window.on('ready-to-show', () => {
      window.show()
    })

    const show = () => {
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        window.loadURL(process.env['ELECTRON_RENDERER_URL'])
      } else {
        window.loadFile(RENDERER_HTML_PATH)
      }
    }

    return { show }
  }
}
