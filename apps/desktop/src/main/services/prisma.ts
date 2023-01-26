import { getDMMF, formatSchema, getConfig } from '@prisma/internals'
import { prismaFmt } from '@prisma/internals/dist/wasm'
import { BrowserWindow } from 'electron'
import { readFile, readFilePath } from './filesManager'

export const getPrismaDocument = (src: string) => getDMMF({ datamodel: src })

export const getPrismaConfig = (src: string) =>
  getConfig({ datamodel: src, ignoreEnvVarErrors: true })

export const formatPrismaSchema = (src: string) => formatSchema({ schema: src })

export const getPrismaPreviewFeaturesList = () =>
  JSON.parse(prismaFmt.preview_features()) as string[]

export const readPrismaSchemaFilePath = (window: BrowserWindow) =>
  readFilePath(window, {
    title: 'Open prisma schema',
    buttonLabel: 'Open',
    filters: [
      {
        name: 'Prisma schema',
        extensions: ['prisma']
      }
    ]
  })

export const readPrismaSchemaFile = (window: BrowserWindow) =>
  readFile(window, {
    title: 'Open prisma schema',
    buttonLabel: 'Open',
    filters: [
      {
        name: 'Prisma schema',
        extensions: ['prisma']
      }
    ]
  })
