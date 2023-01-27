import { useHotkeys } from '@mantine/hooks'
import { editorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useEditorShortcuts = () =>
  useHotkeys(
    editorShortcuts.map((shortcut) => [createShortcutString(shortcut), shortcut.onExecute])
  )
