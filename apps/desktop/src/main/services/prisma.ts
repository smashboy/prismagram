import { getDMMF, formatSchema, getConfig } from '@prisma/internals'
import { ProjectPrismaSettings } from '@shared/common/models/Project'
import { BrowserWindow } from 'electron'
import { readFile, readFilePath } from './filesManager'

export const getPrismaDocument = (src: string) => getDMMF({ datamodel: src })
export const getPrismaConfig = (src: string) =>
  getConfig({ datamodel: src, ignoreEnvVarErrors: true })
export const formatPrismaSchema = (src: string) => formatSchema({ schema: src })

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

export const getPrismaSchemaSettings = async (src: string): Promise<ProjectPrismaSettings> => {
  const { datasources, generators } = await getPrismaConfig(src)

  const settings: ProjectPrismaSettings = {
    datasources: {},
    generators: {}
  }

  for (const { name, provider, url } of datasources) {
    settings.datasources[name] = {
      provider: provider,
      url: {
        isEnv: !!url.fromEnvVar,
        value: url.fromEnvVar || url.value
      }
    }
  }

  for (const { name, provider, output, previewFeatures } of generators) {
    settings.generators[name] = {
      provider: {
        isEnv: !!provider.fromEnvVar,
        value: provider.fromEnvVar || provider.value
      },
      previewFeatures,
      output: output
        ? {
            isEnv: !!output.fromEnvVar,
            value: output.fromEnvVar || output.value
          }
        : void 0
    }
  }

  return settings
}
