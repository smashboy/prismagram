import { Stack } from '@mantine/core'
import { settingsRoutesArray } from '../constants'
import { AppThemeSwitch } from './AppThemeSwitch'
import { SettingsNavItem } from './SettingsNavItem'

export const SettingsSidebar = () => {
  return (
    <Stack w={300} h="100%">
      <Stack h="100%">
        {settingsRoutesArray.map(([id, { label, icon, color }]) => (
          <SettingsNavItem key={id} id={id} label={label} icon={icon} color={color} />
        ))}
      </Stack>
      <AppThemeSwitch />
    </Stack>
  )
}
