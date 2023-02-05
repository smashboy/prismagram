import { useHotkeys } from '@mantine/hooks'
import { useReactFlow } from 'reactflow'
import { diagramEditorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useDiagramEditorShortcuts = () => {
  const flow = useReactFlow()

  useHotkeys(
    diagramEditorShortcuts(flow).map((shortcut) => [
      createShortcutString(shortcut),
      shortcut.onExecute
    ])
  )
}
