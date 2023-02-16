import { useHotkeys } from '@mantine/hooks'
import { schemaStateHistoryApi } from '@renderer/modules/editor'
import { editorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useEditorShortcuts = () =>
  useHotkeys(
    editorShortcuts({ undo: schemaStateHistoryApi.undo, redo: schemaStateHistoryApi.redo }).map(
      (shortcut) => [createShortcutString(shortcut), shortcut.onExecute]
    )
  )
