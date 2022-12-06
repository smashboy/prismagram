import fs from 'fs/promises'
import { BrowserWindow, dialog, FileFilter, OpenDialogOptions } from 'electron'

interface OpenReadOptions {
  title: string
  buttonLabel: string
  filters?: FileFilter[]
}

const openReadDialog = async (window: BrowserWindow, options: OpenDialogOptions) => {
  const { properties = [], filters = [] } = options

  const response = await dialog.showOpenDialog(window, {
    ...options,
    filters,
    properties: Array.from(new Set([...properties, 'showHiddenFiles']))
  })

  if (response.canceled) return null

  return response
}

export const readFile = async (window: BrowserWindow, options: OpenReadOptions) => {
  const response = await openReadDialog(window, { ...options, properties: ['openFile'] })

  if (!response || !response.filePaths[0]) return null

  const filePath = response.filePaths[0]

  const res = await fs.readFile(filePath, { encoding: 'utf-8' })

  return res
}
