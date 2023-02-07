import { openSpotlight } from '@mantine/spotlight'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import {
  IconDeviceFloppy,
  IconList,
  IconPlus,
  IconPower,
  IconSettings,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconDatabase,
  IconCode,
  IconSchema,
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
  changeEditorViewEvent,
  layoutDiagramEffect,
  removeSelectedNodeEffect,
  resetSelectedNodeEvent,
  setSelectedRelationTypeEvent
} from '../editor'
import { EditorView } from '../editor/config'
import { Shortcut } from './types'

export const generalShortcuts: Shortcut[] = [
  {
    keys: ['K'],
    isCtrlOrCmd: true,
    name: 'Toggle spotlight',
    onExecute: () => openSpotlight()
  },
  {
    keys: ['Alt', 'N'],
    isCtrlOrCmd: true,
    name: 'New project',
    onExecute: () => toggleCreateProjectModalEvent(true),
    icon: IconPlus
  },
  {
    keys: ['Shift', 'P'],
    isCtrlOrCmd: true,
    name: 'Select project',
    onExecute: () => toggleSelectProjectModalEvent(true),
    icon: IconList
  },
  {
    keys: [','],
    isCtrlOrCmd: true,
    name: 'Open settings',
    onExecute: () => toggleSettingsModalEvent(true),
    icon: IconSettings
  },
  {
    keys: ['Shift', 'X'],
    isCtrlOrCmd: true,
    name: 'Close application',
    onExecute: () => {},
    icon: IconPower
  }
]

export const editorShortcuts: Shortcut[] = [
  {
    keys: ['S'],
    isCtrlOrCmd: true,
    name: 'Save changes',
    description: 'Works only when auto saving is disabled',
    onExecute: () => {},
    icon: IconDeviceFloppy
  },
  {
    keys: ['Z'],
    isCtrlOrCmd: true,
    name: 'Undo',
    onExecute: () => {},
    icon: IconArrowBackUp
  },
  {
    keys: ['Y'],
    isCtrlOrCmd: true,
    name: 'Redo',
    onExecute: () => {},
    icon: IconArrowForwardUp
  },
  // {
  //   keys: ['F'],
  //   isCtrlOrCmd: true,
  //   name: 'Find',
  //   description: 'Search for models and fields in your schema',
  //   onExecute: () => {},
  //   icon: IconSearch
  // },
  {
    keys: ['D'],
    isCtrlOrCmd: true,
    name: 'Open diagram editor',
    onExecute: () => changeEditorViewEvent(EditorView.DIAGRAM),
    icon: IconSchema
  },
  {
    keys: ['T'],
    isCtrlOrCmd: true,
    name: 'Open schema editor',
    onExecute: () => changeEditorViewEvent(EditorView.SCHEMA),
    icon: IconCode
  },
  {
    keys: ['P'],
    isCtrlOrCmd: true,
    name: 'Open prisma studio',
    onExecute: () => changeEditorViewEvent(EditorView.PRISMA_STUDIO),
    icon: IconDatabase
  }
]

export const diagramEditorShortcuts = (flow: ReactFlowInstance): Shortcut[] => [
  {
    keys: ['N'],
    isCtrlOrCmd: true,
    name: 'New Model',
    onExecute: () => {},
    icon: IconBorderAll
  },
  {
    keys: ['N'],
    isCtrlOrCmd: true,
    name: 'New Enum',
    onExecute: () => {},
    icon: IconLayoutList
  },
  {
    keys: ['L'],
    isCtrlOrCmd: true,
    name: 'Auto layout diagram',
    onExecute: () => layoutDiagramEffect(),
    icon: IconBoxMargin
  },
  {
    keys: ['V'],
    isCtrlOrCmd: true,
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
    keys: ['O'],
    isCtrlOrCmd: true,
    name: 'One-to-one relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_ONE),
    icon: IconRelationOneToOne
  },
  {
    keys: ['N'],
    isCtrlOrCmd: true,
    name: 'One-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_MANY),
    icon: IconRelationOneToMany
  },
  {
    keys: ['M'],
    isCtrlOrCmd: true,
    name: 'Many-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.MANY_TO_MANY),
    icon: IconRelationManyToMany
  },
  {
    keys: ['='],
    isCtrlOrCmd: true,
    name: 'Zoom in',
    onExecute: () => {},
    icon: IconZoomIn
  },
  {
    keys: ['-'],
    isCtrlOrCmd: true,
    name: 'Zoom out',
    onExecute: () => {},
    icon: IconZoomOut
  }
]
