import { toggleSpotlight } from '@mantine/spotlight'
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
  IconSearch,
  IconDatabase,
  IconCode,
  IconSchema
} from '@tabler/icons'
import { RelationType } from 'prisma-state/constants'
import { changeEditorViewEvent, setSelectedRelationTypeEvent } from '../editor'
import { EditorView } from '../editor/config'
import { Shortcut } from './types'

export const generalShortcuts: Shortcut[] = [
  {
    keys: ['K'],
    isCtrlOrCmd: true,
    name: 'Toggle spotlight',
    onExecute: () => toggleSpotlight()
  },
  {
    keys: ['Shift', 'N'],
    isCtrlOrCmd: true,
    name: 'New project',
    onExecute: () => toggleCreateProjectModalEvent(true),
    icon: IconPlus
  },
  {
    keys: ['Shift', 'P'],
    isCtrlOrCmd: true,
    name: 'Open project',
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
  {
    keys: ['F'],
    isCtrlOrCmd: true,
    name: 'Find',
    description: 'Search for models and fields in your schema',
    onExecute: () => {},
    icon: IconSearch
  },
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

export const diagramEditorShortcuts: Shortcut[] = [
  {
    keys: ['O'],
    isCtrlOrCmd: true,
    name: 'Select one-to-one relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_ONE)
  },
  {
    keys: ['M'],
    isCtrlOrCmd: true,
    name: 'Select many-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.MANY_TO_MANY)
  },
  {
    keys: ['N'],
    isCtrlOrCmd: true,
    name: 'Select one-to-many relation',
    onExecute: () => setSelectedRelationTypeEvent(RelationType.ONE_TO_MANY)
  }
]
