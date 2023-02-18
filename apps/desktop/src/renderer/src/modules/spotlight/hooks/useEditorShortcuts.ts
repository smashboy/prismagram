import { useHotkeys } from '@mantine/hooks'
import { schemaStateHistoryApiEvents } from '@renderer/modules/editor'
import { editorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useEditorShortcuts = () =>
  useHotkeys(
    editorShortcuts({
      undo: schemaStateHistoryApiEvents.undo,
      redo: schemaStateHistoryApiEvents.redo
    }).map((shortcut) => [createShortcutString(shortcut), shortcut.onExecute])
  )
