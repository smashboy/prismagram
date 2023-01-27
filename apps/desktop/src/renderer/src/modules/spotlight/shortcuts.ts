import { RelationType } from 'prisma-state/constants'
import { setSelectedRelationTypeEvent } from '../editor'
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
    onExecute: () => {}
  },
  {
    keys: ['Shift', 'N'],
    isCtrlOrCmd: true,
    name: 'New project',
    onExecute: () => {}
  },
  {
    keys: ['Shift', 'P'],
    isCtrlOrCmd: true,
    name: 'Open project',
    onExecute: () => {}
  }
]

export const editorShortcuts: Shortcut[] = [
  {
    keys: ['S'],
    isCtrlOrCmd: true,
    name: 'Save changes',
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
    onExecute: () => {}
  },
  {
    keys: ['D'],
    isCtrlOrCmd: true,
    name: 'Open diagram editor',
    onExecute: () => {}
  },
  {
    keys: ['T'],
    isCtrlOrCmd: true,
    name: 'Open schema editor',
    onExecute: () => {}
  },
  {
    keys: ['P'],
    isCtrlOrCmd: true,
    name: 'Open prisma studio',
    onExecute: () => {}
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
