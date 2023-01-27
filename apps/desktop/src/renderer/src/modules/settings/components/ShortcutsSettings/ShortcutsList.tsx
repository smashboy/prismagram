import { Stack, Text } from '@mantine/core'
import { Shortcut } from '@renderer/modules/spotlight'
import { SettingsSection } from '../SettingsSection'
import { SettingsSectionPaper } from '../SettingsSectionPaper'
import { ShortcutItem } from './ShortcutItem'

interface ShortcutsListProps {
  category: string
  shortcuts: Shortcut[]
}

export const ShortcutsList: React.FC<ShortcutsListProps> = ({ category, shortcuts }) => {
  return (
    <SettingsSectionPaper title={category}>
      <Stack>
        {shortcuts.map((shortcut) => (
          <ShortcutItem key={shortcut.name} shortcut={shortcut} />
        ))}
      </Stack>
    </SettingsSectionPaper>
  )
}
