import { createBooleanStore } from '@renderer/core/effector'
import { $selectedProjectId } from '@renderer/modules/projects'
import { NodeType } from '@shared/common/configs/diagrams'
import { createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'
import { ReferentialActionOption } from 'prisma-state/constants'
import { EditorView } from '../config'

interface CreateRelationModalData {
  target: string
  source: string
  name: string
  onUpdate: ReferentialActionOption | null
  onDelete: ReferentialActionOption | null
  isOptional: boolean
  isExplicit: boolean
}

interface CreateEnumFieldModalData {
  enum: string
  model: string
  fieldName: string
}

export interface SelectedNodeData {
  nodeId: string
  type: NodeType
}

export const changeEditorViewEvent = createEvent<EditorView>()

export const selectNodeEvent = createEvent<SelectedNodeData>()
export const resetSelectedNodeEvent = createEvent()

export const setCreateRelationModalDataEvent = createEvent<CreateRelationModalData>()
export const resetCreateRelationModalDataEvent = createEvent()

export const setCreateEnumFieldModalDataEvent = createEvent<CreateEnumFieldModalData>()
export const resetCreateEnumFieldModalDataEvent = createEvent()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)

export const $createRelationModalData = createStore<CreateRelationModalData>({
  target: '',
  source: '',
  name: '',
  onDelete: null,
  onUpdate: null,
  isOptional: false,
  isExplicit: false
})
  .on(setCreateRelationModalDataEvent, (_, data) => data)
  .reset(resetCreateRelationModalDataEvent)

export const $createEnumFieldModalData = createStore<CreateEnumFieldModalData>({
  model: '',
  enum: '',
  fieldName: ''
})
  .on(setCreateEnumFieldModalDataEvent, (_, data) => data)
  .reset(resetCreateEnumFieldModalDataEvent)

export const [$isOpenCreateRelationModal, toggleCreateRelationModalEvent] = createBooleanStore()
export const [$isOpenCreateEnumFieldModal, toggleCreateEnumFieldModalEvent] = createBooleanStore()

export const $selectedNodeId = createStore<SelectedNodeData | null>(null)
  .on(selectNodeEvent, (_, id) => id)
  .reset(resetSelectedNodeEvent)

export const $isEditorEnabled = $selectedProjectId.map((id) => !!id)

export const PrismaStudioGate = createGate<string | null>()
