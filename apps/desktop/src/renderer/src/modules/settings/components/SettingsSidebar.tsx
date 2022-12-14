import { Stack } from '@mantine/core'
import { settingsRoutesArray } from '../constants'
import { SettingsNavItem } from './SettingsNavItem'

export const SettingsSidebar = () => {
  return (
    <Stack w={300} h="100%">
      {settingsRoutesArray.map(([id, { label, icon }]) => (
        <SettingsNavItem key={id} id={id} label={label} icon={icon} />
      ))}
    </Stack>
  )
}
