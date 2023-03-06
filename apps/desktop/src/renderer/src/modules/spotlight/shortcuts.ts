import { ctrlOrCmdKey } from '@renderer/core/electron'
import {
  toggleCloseAppModalEvent,
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import { NodeType } from '@shared/common/configs/diagrams'
import {
  IconPlus,
  IconPower,
  IconSettings,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBoxMargin,
  IconRelationOneToOne,
  IconRelationManyToMany,
  IconRelationOneToMany,
  IconZoomInArea,
  IconZoomOut,
  IconZoomIn,
  IconTrash,
  IconBorderNone,
  IconBorderAll,
  IconLayoutList,
  IconBriefcase
} from '@tabler/icons'
import { RelationType } from 'prisma-state/constants'
import { createPrismaSchemaState } from 'prisma-state/_new/state'
import { PrismaSchemaStateInstance } from 'prisma-state/_new/types'
import { Node, ReactFlowInstance } from 'reactflow'
import {
  addNodeEvent,
  layoutDiagramEffect,
  removeSelectedNodeEffect,
  resetSelectedNodeEvent,
  selectNodeEvent,
  setPrismaSchemaEvent,
  setSelectedRelationTypeEvent
} from '../editor'
import { zoomToNode } from '../editor/utils'
import { toggleOpenSpotlightEvent } from './stores'
import { Shortcut } from './types'

export const generalShortcuts: Shortcut[] = [
  {
    keys: [ctrlOrCmdKey, 'K'],
    name: 'Toggle spotlight',
    onExecute: () => toggleOpenSpotlightEvent()
  },
  {
    keys: [ctrlOrCmdKey, 'Alt', 'N'],
    name: 'New project',
    onExecute: () => toggleCreateProjectModalEvent(true),
    icon: IconPlus
  },
  {
    keys: [ctrlOrCmdKey, 'Alt', 'P'],
    name: 'Select project',
    onExecute: () => toggleSelectProjectModalEvent(true),
    icon: IconBriefcase
  },
  {
    keys: [ctrlOrCmdKey, ','],
    name: 'Open settings',
    onExecute: () => toggleSettingsModalEvent(true),
    icon: IconSettings
  },
  {
    keys: [ctrlOrCmdKey, 'Shift', 'X'],
    name: 'Close application',
    onExecute: () => toggleCloseAppModalEvent(true),
    icon: IconPower
  }
]

interface EditorShortcutsProps {
  undo: () => void
  redo: () => void
}

export const editorShortcuts = ({ undo, redo }: EditorShortcutsProps): Shortcut[] => [
  // {
  //   keys: ['S'],
  //   isCtrlOrCmd: true,
  //   name: 'Save changes',
  //   description: 'Works only when auto saving is disabled',
  //   onExecute: () => {},
  //   icon: IconDeviceFloppy
  // },
  {
    keys: [ctrlOrCmdKey, 'Z'],
    name: 'Undo',
    onExecute: undo,
    icon: IconArrowBackUp
  },
  {
    keys: [ctrlOrCmdKey, 'Y'],
    name: 'Redo',
    onExecute: redo,
    icon: IconArrowForwardUp
  }
  // {
  //   keys: ['F'],
  //   isCtrlOrCmd: true,
  //   name: 'Find',
  //   description: 'Search for models and fields in your schema',
  //   onExecute: () => {},
  //   icon: IconSearch
  // },
  // {
  //   keys: ['D'],
  //   isCtrlOrCmd: true,
  //   name: 'Open diagram editor',
  //   onExecute: () => changeEditorViewEvent(EditorView.DIAGRAM),
  //   icon: IconSchema
  // },
  // {
  //   keys: ['T'],
  //   isCtrlOrCmd: true,
  //   name: 'Open schema editor',
  //   onExecute: () => changeEditorViewEvent(EditorView.SCHEMA),
  //   icon: IconCode
  // },
  // {
  //   keys: ['P'],
  //   isCtrlOrCmd: true,
  //   name: 'Open prisma studio',
  //   onExecute: () => changeEditorViewEvent(EditorView.PRISMA_STUDIO),
  //   icon: IconDatabase
  // }
]

export const diagramEditorShortcuts = (
  flow: ReactFlowInstance,
  state: PrismaSchemaStateInstance
): Shortcut[] => [
  {
    keys: [ctrlOrCmdKey, 'N'],
    name: 'New Model',
    onExecute: () => {
      const type = NodeType.MODEL
      const id = `New${type}`

      const node: Node = {
        id,
        type,
        position: { x: 0, y: 0 },
        data: {}
      }

      state.createModel(id)
      setPrismaSchemaEvent(state._clone() as ReturnType<typeof createPrismaSchemaState>)
      addNodeEvent(node)
      selectNodeEvent({ nodeId: id, type: type as NodeType })
      zoomToNode(flow, node)
    },
    icon: IconBorderAll
  },
  {
    keys: [ctrlOrCmdKey, 'Shift', 'N'],
    name: 'New Enum',
    onExecute: () => {
      const type = NodeType.ENUM
      const id = `New${type}`

      const node: Node = {
        id,
        type,
        position: { x: 0, y: 0 },
        data: {}
      }

      state.createEnum(id)
      setPrismaSchemaEvent(state._clone() as ReturnType<typeof createPrismaSchemaState>)
      addNodeEvent(node)
      selectNodeEvent({ nodeId: id, type: type as NodeType })
      zoomToNode(flow, node)
    },
    icon: IconLayoutList
  },
  {
    keys: [ctrlOrCmdKey, 'L'],
    name: 'Auto layout diagram',
    onExecute: () => layoutDiagramEffect(),
    icon: IconBoxMargin
  },
  {
    keys: [ctrlOrCmdKey, 'V'],
    name: 'Fit into view',
    onExecute: () => flow.fitView(),
    icon: IconZoomInArea
  },
  {
    keys: ['Escape'],
    name: 'Deselect node',
    icon: IconBorderNone,
    onExecute: () => resetSelectedNodeEvent()
  },
  {
    keys: ['Delete'],
    name: 'Delete selected node',
    onExecute: () => removeSelectedNodeEffect(),
    icon: IconTrash
  },
  {
    keys: [ctrlOrCmdKey, 'O'],
    name: 'One-to-one relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_ONE),
    icon: IconRelationOneToOne
  },
  {
    keys: [ctrlOrCmdKey, 'U'],
    name: 'One-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_MANY),
    icon: IconRelationOneToMany
  },
  {
    keys: [ctrlOrCmdKey, 'M'],
    name: 'Many-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.MANY_TO_MANY),
    icon: IconRelationManyToMany
  },
  {
    keys: [ctrlOrCmdKey, '='],
    name: 'Zoom in',
    onExecute: () => flow.zoomIn(),
    icon: IconZoomIn
  },
  {
    keys: [ctrlOrCmdKey, '-'],
    name: 'Zoom out',
    onExecute: () => flow.zoomOut(),
    icon: IconZoomOut
  }
]
