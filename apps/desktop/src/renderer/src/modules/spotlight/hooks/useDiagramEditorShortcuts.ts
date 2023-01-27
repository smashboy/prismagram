import { useHotkeys } from '@mantine/hooks'
import { diagramEditorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useDiagramEditorShortcuts = () =>
  useHotkeys(
    diagramEditorShortcuts.map((shortcut) => [createShortcutString(shortcut), shortcut.onExecute])
  )
