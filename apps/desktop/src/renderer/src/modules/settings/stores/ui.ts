import { createBooleanStore } from '@renderer/core/effector'
import { toggleSettingsModalEvent } from '@renderer/stores/ui/modals'
import { createEvent, createStore } from 'effector'
import { GeneralSettingsRoute, ProjectSettingsRoute, SettingsRoute } from '../constants'

export const changeSettingsSectionEvent = createEvent<SettingsRoute>()
export const changeGeneralSettingsSectionEvent = createEvent<GeneralSettingsRoute>()
export const changeProjectSettingsSectionEvent = createEvent<ProjectSettingsRoute>()

export const [$isOpenCreateNewCommand, toggleOpenCreateNewCommandEvent] = createBooleanStore()

export const $selectedSettingsSection = createStore(SettingsRoute.SHORTCUTS)
  .on(changeSettingsSectionEvent, (_, section) => section)
  .reset(toggleSettingsModalEvent)

export const $selectedGeneralSettingsSection = createStore(GeneralSettingsRoute.CUSTOMIZATION)
  .on(changeGeneralSettingsSectionEvent, (_, section) => section)
  .reset(toggleSettingsModalEvent)

export const $selectedProjectSettingsSection = createStore(ProjectSettingsRoute.GENERAL)
  .on(changeProjectSettingsSectionEvent, (_, section) => section)
  .reset(toggleSettingsModalEvent)
