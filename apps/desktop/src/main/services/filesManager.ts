import fs from 'fs/promises'
import fsSync from 'fs'
import * as path from 'path'
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

export const readFilePath = async (window: BrowserWindow, options: OpenReadOptions) => {
  const response = await openReadDialog(window, { ...options, properties: ['openFile'] })

  return response?.filePaths[0] || null
}

export const readDirectoryPath = async (window: BrowserWindow, options: OpenReadOptions) => {
  const response = await openReadDialog(window, { ...options, properties: ['openDirectory'] })

  return response?.filePaths[0] || null
}

export const readFile = async (window: BrowserWindow, options: OpenReadOptions) => {
  const filePath = await readFilePath(window, options)

  if (!filePath) return filePath

  const res = await fs.readFile(filePath, { encoding: 'utf-8' })

  return res
}

export const createFile = async (filePath: string, filename: string, content: string) => {
  if (!fsSync.existsSync(filePath)) fsSync.mkdirSync(filePath, { recursive: true })

  fs.writeFile(path.join(filePath, filename), content)
}

export const readDirectoryFiles = async (directoryPath: string) => {
  const list = await fs.readdir(directoryPath, { withFileTypes: true })

  const files2read: Array<Promise<string>> = []

  for (const { name } of list) {
    const filePath = path.normalize(`${directoryPath}${path.sep}${name}`)

    files2read.push(fs.readFile(filePath, { encoding: 'utf-8' }))
  }

  return Promise.all(files2read)
}
