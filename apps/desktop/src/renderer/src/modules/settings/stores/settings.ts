import { PackageManager } from '@shared/common/configs/projects'
import { GlobalSettings } from '@shared/common/models/Project'
import { createStore } from 'effector'
import { loadGlobalSettingsEffect } from './effects'

export const $settings = createStore<GlobalSettings>({
  prisma: {
    previewFeaturesList: [],
    packageManager: PackageManager.NPM
  }
}).on(loadGlobalSettingsEffect.doneData, (_, settings) => settings)

export const $prismaSettings = $settings.map((settings) => settings.prisma)
