import { getDMMF, formatSchema } from '@prisma/internals'
import { BrowserWindow } from 'electron'
import { readFile } from './filesManager'

export const getPrismaDocument = (src: string) => getDMMF({ datamodel: src })
export const formatPrismaSchema = (src: string) => formatSchema({ schema: src })

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
