import { openSpotlight } from '@mantine/spotlight'
import { ctrlOrCmdKey } from '@renderer/core/electron'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import {
  IconList,
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
  IconBorderAll,
  IconLayoutList,
  IconTrash
} from '@tabler/icons'
import { RelationType } from 'prisma-state/constants'
import { ReactFlowInstance } from 'reactflow'
import {
  layoutDiagramEffect,
  removeSelectedNodeEffect,
  resetSelectedNodeEvent,
  setSelectedRelationTypeEvent
} from '../editor'
import { Shortcut } from './types'

export const generalShortcuts: Shortcut[] = [
  {
    keys: [ctrlOrCmdKey, 'K'],
    name: 'Toggle spotlight',
    onExecute: openSpotlight
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
    icon: IconList
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
    onExecute: () => {},
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

export const diagramEditorShortcuts = (flow: ReactFlowInstance): Shortcut[] => [
  {
    keys: [ctrlOrCmdKey, 'N'],
    name: 'New Model',
    onExecute: () => {},
    icon: IconBorderAll
  },
  {
    keys: [ctrlOrCmdKey, 'N'],
    name: 'New Enum',
    onExecute: () => {},
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
    keys: [ctrlOrCmdKey, 'N'],
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
