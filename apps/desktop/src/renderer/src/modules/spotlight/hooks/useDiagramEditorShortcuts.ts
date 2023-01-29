import { useHotkeys } from '@mantine/hooks'
import { useReactFlow } from 'reactflow'
import { diagramEditorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useDiagramEditorShortcuts = () => {
  const flow = useReactFlow()

  useHotkeys(
    diagramEditorShortcuts.map((shortcut) => [
      createShortcutString(shortcut),
      shortcut.name === 'Fit into view' ? () => flow.fitView() : shortcut.onExecute
    ])
  )
}
