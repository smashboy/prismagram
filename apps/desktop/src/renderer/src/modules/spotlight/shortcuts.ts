import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import { RelationType } from 'prisma-state/constants'
import { changeEditorViewEvent, setSelectedRelationTypeEvent } from '../editor'
import { EditorView } from '../editor/config'
import { Shortcut } from './types'

export const generalShortcuts: Shortcut[] = [
  {
    keys: ['K'],
    isCtrlOrCmd: true,
    name: 'Open spotlight',
    onExecute: () => {}
  },
  {
    keys: [','],
    isCtrlOrCmd: true,
    name: 'Open settings',
    onExecute: () => toggleSettingsModalEvent(true)
  },
  {
    keys: ['Shift', 'N'],
    isCtrlOrCmd: true,
    name: 'New project',
    onExecute: () => toggleCreateProjectModalEvent(true)
  },
  {
    keys: ['Shift', 'P'],
    isCtrlOrCmd: true,
    name: 'Open project',
    onExecute: () => toggleSelectProjectModalEvent(true)
  }
]

export const editorShortcuts: Shortcut[] = [
  {
    keys: ['S'],
    isCtrlOrCmd: true,
    name: 'Save changes',
    description: 'Works only when auto saving is disabled',
    onExecute: () => {}
  },
  {
    keys: ['Z'],
    isCtrlOrCmd: true,
    name: 'Undo',
    onExecute: () => {}
  },
  {
    keys: ['Y'],
    isCtrlOrCmd: true,
    name: 'Redo',
    onExecute: () => {}
  },
  {
    keys: ['F'],
    isCtrlOrCmd: true,
    name: 'Find',
    description: 'Search for models and fields in your schema',
    onExecute: () => {}
  },
  {
    keys: ['D'],
    isCtrlOrCmd: true,
    name: 'Open diagram editor',
    onExecute: () => changeEditorViewEvent(EditorView.DIAGRAM)
  },
  {
    keys: ['T'],
    isCtrlOrCmd: true,
    name: 'Open schema editor',
    onExecute: () => changeEditorViewEvent(EditorView.SCHEMA)
  },
  {
    keys: ['P'],
    isCtrlOrCmd: true,
    name: 'Open prisma studio',
    onExecute: () => changeEditorViewEvent(EditorView.PRISMA_STUDIO)
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
