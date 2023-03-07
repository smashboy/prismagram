import { string2Color } from '@renderer/core/utils'
import {
  $schemaState,
  schemaStateHistoryApiEvents,
  selectNodeEvent,
  setCreateEnumFieldModalDataEvent,
  setCreateRelationModalDataEvent,
  setPrismaSchemaEvent,
  toggleCreateEnumFieldModalEvent,
  toggleCreateRelationModalEvent
} from '@renderer/modules/editor'
import { zoomToNode } from '@renderer/modules/editor/utils'
import { $projects, $selectedProjectId, selectProjectEvent } from '@renderer/modules/projects'
import { NodeType } from '@shared/common/configs/diagrams'
import {
  IconBorderAll,
  IconBriefcase,
  IconLayoutList,
  IconPlugConnected,
  IconPointer,
  IconRowInsertBottom,
  IconTrash
} from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { ReactFlowInstance, useReactFlow } from 'reactflow'
import { diagramEditorShortcuts, editorShortcuts, generalShortcuts } from '../shortcuts'
import { SpotlightAction } from '../types'
import { shortcut2SpotlightAction } from '../utils'
import { SpotlightGroup } from './SpotlightGroup'
import { SpotlightItem } from './SpotlightItem'

const $store = combine({
  projects: $projects,
  schemaState: $schemaState,
  selectedProjectId: $selectedProjectId
})

const generateModelActions = (
  modelId: string,
  flow: ReactFlowInstance,
  state: PrismaSchemaStateInstance
): SpotlightAction[] => [
  {
    title: 'Select',
    icon: <IconPointer size={18} />,

    onTrigger: () => {
      const node = flow.getNode(modelId)

      if (node) {
        zoomToNode(flow, node)
        selectNodeEvent({ nodeId: node.id, type: node.type! as NodeType })
      }
    }
  },
  {
    title: 'Create relation',
    icon: <IconPlugConnected size={18} />,
    onTrigger: () => {
      toggleCreateRelationModalEvent(true)
      setCreateRelationModalDataEvent({
        source: modelId,
        target: '',
        name: '',
        onDelete: null,
        onUpdate: null,
        isOptional: false,
        isExplicit: false
      })
    }
  },
  {
    title: 'Delete',
    icon: <IconTrash size={18} />,
    shortcut: ['Delete'],
    onTrigger: () => {
      state.removeModel(modelId)
      setPrismaSchemaEvent(state._clone() as ReturnType<typeof createPrismaSchemaState>)
    }
  }
]

const generateEnumActions = (
  enumId: string,
  flow: ReactFlowInstance,
  state: PrismaSchemaStateInstance
): SpotlightAction[] => [
  {
    title: 'Select',
    icon: <IconPointer size={18} />,
    onTrigger: () => {
      const node = flow.getNode(enumId)

      if (node) {
        zoomToNode(flow, node)
        selectNodeEvent({ nodeId: node.id, type: node.type! as NodeType })
      }
    }
  },
  {
    title: 'Create new model field',
    icon: <IconRowInsertBottom size={18} />,
    onTrigger: () => {
      toggleCreateEnumFieldModalEvent(true)
      setCreateEnumFieldModalDataEvent({
        model: '',
        fieldName: '',
        enum: enumId
      })
    }
  },
  {
    title: 'Delete',
    shortcut: ['Delete'],
    icon: <IconTrash size={18} />,
    onTrigger: () => {
      state.removeEnum(enumId)
      setPrismaSchemaEvent(state._clone() as ReturnType<typeof createPrismaSchemaState>)
    }
  }
]

export const SpotlightMainActions = () => {
  const flow = useReactFlow()

  const { schemaState, projects, selectedProjectId } = useStore($store)

  const generalSpotlightAction = generalShortcuts
    .filter((shortcut) => shortcut.name !== 'Toggle spotlight')
    .map((shortcut) => (
      <SpotlightItem
        key={shortcut.name}
        action={
          shortcut.name === 'Select project'
            ? {
                ...shortcut2SpotlightAction({
                  name: shortcut.name,
                  icon: shortcut.icon,
                  keys: shortcut.keys,
                  onExecute: () => {}
                }),
                actions: [...projects.values()].map(({ name, id }) => ({
                  title: name,
                  group: 'Projects',
                  icon: <IconBriefcase size={18} color={string2Color(name)} />,
                  onTrigger: () => selectProjectEvent(id)
                }))
              }
            : shortcut2SpotlightAction(shortcut)
        }
      />
    ))

  const modelActions = [...schemaState.models.values()].map(({ name }) => (
    <SpotlightItem
      key={name}
      action={{
        title: name,
        icon: <IconBorderAll size={18} color={string2Color(name)} />,
        actions: generateModelActions(name, flow, schemaState)
      }}
    />
  ))

  const enumActions = [...schemaState.enums.values()].map(({ name }) => (
    <SpotlightItem
      key={name}
      action={{
        title: name,
        icon: <IconLayoutList size={18} color={string2Color(name)} />,
        actions: generateEnumActions(name, flow, schemaState)
      }}
    />
  ))

  const editorActions = selectedProjectId
    ? [
        ...diagramEditorShortcuts(flow, schemaState).filter(
          (shortcut) => shortcut.name !== 'Delete selected node'
        ),
        ...editorShortcuts({
          undo: schemaStateHistoryApiEvents.undo,
          redo: schemaStateHistoryApiEvents.redo
        })
      ].map((shortcut) => (
        <SpotlightItem key={shortcut.name} action={shortcut2SpotlightAction(shortcut)} />
      ))
    : []

  return (
    <>
      <SpotlightGroup label="General">{generalSpotlightAction}</SpotlightGroup>
      {editorActions.length > 0 && <SpotlightGroup label="Editor">{editorActions}</SpotlightGroup>}
      {modelActions.length > 0 && <SpotlightGroup label="Models">{modelActions}</SpotlightGroup>}
      {enumActions.length > 0 && <SpotlightGroup label="Enums">{enumActions}</SpotlightGroup>}
    </>
  )
}
