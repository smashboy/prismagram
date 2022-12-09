import { createEvent, createStore } from 'effector'
import { EditorView } from '../config'

export const changeEditorViewEvent = createEvent<EditorView>()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)
