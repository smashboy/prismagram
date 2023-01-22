import { createStore } from 'effector'
import { loadEditorDataEffect } from '@renderer/modules/editor'

export const $schemaPath = createStore('').on(
  loadEditorDataEffect.doneData,
  (_, data) => data?.schemaPath ?? ''
)
