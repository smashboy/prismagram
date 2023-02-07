import { createBooleanStore } from '@renderer/core/effector'
import { $selectedProjectId } from '@renderer/modules/projects'
import { NodeType } from '@shared/common/configs/diagrams'
import { createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'
import { EditorView } from '../config'

interface CreateRelationModalData {
  target: string
  source: string
}

export interface SelectedNodeData {
  nodeId: string
  type: NodeType
}

export const changeEditorViewEvent = createEvent<EditorView>()
export const selectNodeEvent = createEvent<SelectedNodeData>()
export const resetSelectedNodeEvent = createEvent()
export const setCreateRelationModalData = createEvent<CreateRelationModalData>()
export const resetCreateRelationModalData = createEvent()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)

export const $createRelationModalData = createStore<CreateRelationModalData>({
  target: '',
  source: ''
})
  .on(setCreateRelationModalData, (_, data) => data)
  .reset(resetCreateRelationModalData)

export const [$isOpenCreateRelationModal, toggleCreateRelationModalEvent] = createBooleanStore()

export const $selectedNodeId = createStore<SelectedNodeData | null>(null)
  .on(selectNodeEvent, (_, id) => id)
  .reset(resetSelectedNodeEvent)

export const $isEditorEnabled = $selectedProjectId.map((id) => !!id)

export const PrismaStudioGate = createGate<string | null>()
