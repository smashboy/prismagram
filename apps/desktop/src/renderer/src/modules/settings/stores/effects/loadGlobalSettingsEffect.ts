import { invoke } from '@renderer/core/electron'
import { GET_GLOBAL_SETTINGS_ENDPOINT } from '@shared/common/configs/api'
import { GlobalSettings } from '@shared/common/models/Project'
import { createEffect } from 'effector'

export const loadGlobalSettingsEffect = createEffect<() => Promise<GlobalSettings>>(() =>
  invoke(GET_GLOBAL_SETTINGS_ENDPOINT)
)

export const $isLoadingGlobalSettings = loadGlobalSettingsEffect.pending
