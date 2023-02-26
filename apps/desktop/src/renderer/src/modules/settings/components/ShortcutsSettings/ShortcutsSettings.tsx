import { Stack } from '@mantine/core'
import { $schemaState } from '@renderer/modules/editor'
import {
  diagramEditorShortcuts,
  editorShortcuts,
  generalShortcuts
} from '@renderer/modules/spotlight'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import { SettingsSection } from '../SettingsSection'
import { ShortcutsList } from './ShortcutsList'

export const ShortcutsSettings = () => {
  const schemaState = useStore($schemaState)

  const flow = useReactFlow()

  return (
    <SettingsSection>
      <Stack pr="md">
        <ShortcutsList category="General" shortcuts={generalShortcuts} />
        <ShortcutsList
          category="Editor"
          shortcuts={[
            ...editorShortcuts({ undo: () => {}, redo: () => {} }),
            ...diagramEditorShortcuts(flow, schemaState)
          ]}
        />
      </Stack>
    </SettingsSection>
  )
}
