import { ScrollArea, Stack } from '@mantine/core'
import {
  diagramEditorShortcuts,
  editorShortcuts,
  generalShortcuts
} from '@renderer/modules/spotlight'
import { SettingsSection } from '../SettingsSection'
import { ShortcutsList } from './ShortcutsList'

export const ShortcutsSettings = () => {
  return (
    <ScrollArea h="100%">
      <SettingsSection>
        <Stack pr="md">
          <ShortcutsList category="General" shortcuts={generalShortcuts} />
          <ShortcutsList category="Editor" shortcuts={editorShortcuts} />
          <ShortcutsList category="Diagram editor" shortcuts={diagramEditorShortcuts} />
        </Stack>
      </SettingsSection>
    </ScrollArea>
  )
}
