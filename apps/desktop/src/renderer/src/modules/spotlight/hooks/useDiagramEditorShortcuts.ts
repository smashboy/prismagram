import { useHotkeys } from '@mantine/hooks'
import { $schemaState } from '@renderer/modules/editor'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import { diagramEditorShortcuts } from '../shortcuts'
import { createShortcutString } from '../utils'

export const useDiagramEditorShortcuts = () => {
  const schemaState = useStore($schemaState)

  const flow = useReactFlow()

  useHotkeys(
    diagramEditorShortcuts(flow, schemaState).map((shortcut) => [
      createShortcutString(shortcut),
      shortcut.onExecute
    ])
  )
}
