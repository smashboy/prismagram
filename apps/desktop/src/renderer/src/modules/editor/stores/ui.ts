import { createBooleanStore } from '@renderer/core/effector'
import { $selectedProjectId } from '@renderer/modules/projects'
import { createEvent, createStore } from 'effector'
import { createGate } from 'effector-react'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { EditorView } from '../config'

interface CreateRelationModalData {
  target: string
  source: string
  relation: RelationTypeOption
}

export const changeEditorViewEvent = createEvent<EditorView>()
export const selectModelEvent = createEvent<string>()
export const resetSelectedModelEvent = createEvent()
export const setCreateRelationModalData = createEvent<CreateRelationModalData>()
export const resetCreateRelationModalData = createEvent()

export const $selectedEditorView = createStore(EditorView.DIAGRAM).on(
  changeEditorViewEvent,
  (_, view) => view
)

export const $createRelationModalData = createStore<CreateRelationModalData>({
  target: '',
  source: '',
  relation: RelationType.ONE_TO_ONE
})
  .on(setCreateRelationModalData, (_, data) => data)
  .reset(resetCreateRelationModalData)

export const [$isOpenCreateRelationModal, toggleCreateRelationModal] = createBooleanStore()

export const $selectedModelId = createStore<string | null>(null)
  .on(selectModelEvent, (_, id) => id)
  .reset(resetSelectedModelEvent)

export const $isEditorEnabled = $selectedProjectId.map((id) => !!id)

export const PrismaStudioGate = createGate<string | null>()
