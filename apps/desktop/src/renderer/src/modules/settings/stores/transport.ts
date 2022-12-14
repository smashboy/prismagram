import { sample } from 'effector'
import { loadEditorDataEffect } from '@renderer/modules/editor'
import { setProjectSettingsEvent } from './projectSettings'

sample({
  source: loadEditorDataEffect.doneData,
  fn: (data) => data.settings,
  target: setProjectSettingsEvent
})
