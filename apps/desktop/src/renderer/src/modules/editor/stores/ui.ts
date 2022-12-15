import { $selectedProjectId } from '@renderer/modules/projects'
import { createEvent, createStore } from 'effector'
import { EditorView } from '../config'

export const changeEditorViewEvent = createEvent<EditorView>()
export const selectModelNodeEvent = createEvent<string>()
export const resetSelectedModelEvent = createEvent()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)

export const $selectedModelId = createStore<string | null>(null)
  .on(selectModelNodeEvent, (_, id) => id)
  .reset(resetSelectedModelEvent)

export const $isEditorEnabled = $selectedProjectId.map((id) => !!id)
