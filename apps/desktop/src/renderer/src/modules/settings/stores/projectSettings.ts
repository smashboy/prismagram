import { createEvent, createStore } from 'effector'
import { selectProjectEvent } from '@renderer/modules/projects'
import { ProjectSettings } from '@shared/common/models/Project'
import { PrismaDatasource, PrismaGenerator } from '@shared/common/models/Prisma'

export const setProjectSettingsEvent = createEvent<ProjectSettings>()

export const $projectSettings = createStore<ProjectSettings | null>(null)
  .on(setProjectSettingsEvent, (_, settings) => settings)
  .reset(selectProjectEvent)

export const $projectPrismaDatasourceSettings = $projectSettings.map((settings) => {
  const map = new Map<string, PrismaDatasource>()

  if (!settings) return map

  for (const [id, source] of Object.entries(settings.prisma.datasources)) {
    map.set(id, source)
  }

  return map
})

export const $projectPrismaDatasourceSettingsArray = $projectPrismaDatasourceSettings.map(
  (settings) => [...settings.keys()]
)

export const $projectPrismaGeneratorSettings = $projectSettings.map((settings) => {
  const map = new Map<string, PrismaGenerator>()

  if (!settings) return map

  for (const [id, generator] of Object.entries(settings.prisma.generators)) {
    map.set(id, generator)
  }

  return map
})

export const $projectPrismaGeneratorSettingsArray = $projectPrismaGeneratorSettings.map(
  (settings) => [...settings.keys()]
)
