import { useHotkeys } from '@mantine/hooks'
import { generalShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useGeneralShortcuts = () =>
  useHotkeys(
    generalShortcuts.map((shortcut) => [createShortcutString(shortcut), shortcut.onExecute])
  )
