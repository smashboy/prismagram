import { $selectedProjectId } from '@renderer/modules/projects'
import { createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'
import { EditorView } from '../config'

export const changeEditorViewEvent = createEvent<EditorView>()
export const selectModelEvent = createEvent<string>()
export const resetSelectedModelEvent = createEvent()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)

export const $selectedModelId = createStore<string | null>(null)
  .on(selectModelEvent, (_, id) => id)
  .reset(resetSelectedModelEvent)

export const $isEditorEnabled = $selectedProjectId.map((id) => !!id)

export const PrismaStudioGate = createGate<string | null>()
