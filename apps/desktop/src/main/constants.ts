import { app } from 'electron'
import { DiagramLayout } from '@shared/common/configs/diagrams'
import * as path from 'path'

export const APP_NAME = app.getName()
export const APP_VERSION = app.getVersion()

export const DOCUMENTS_FOLDER_PATH = path.join(app.getPath('documents'), APP_NAME)
export const APP_ICON_PNG_PATH = path.join(__dirname, '../../build/icon.png')
export const PRELOAD_SCRIPT_PATH = path.join(__dirname, '../preload/index.js')
export const RENDERER_HTML_PATH = path.join(__dirname, '../renderer/index.html')

export const PROJECTS_FOLDER_PATH = path.join(DOCUMENTS_FOLDER_PATH, 'projects')

export const graphDirectionOption = {
  [DiagramLayout.HORIZONTAL]: 'LR',
  [DiagramLayout.VERTICAL]: 'TB'
}
