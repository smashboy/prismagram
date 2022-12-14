import { NavLink } from '@mantine/core'
import { useStore } from 'effector-react'
import { SettingsRoute } from '../constants'
import { $selectedSettingsSection, changeSettingsSectionEvent } from '../stores'

interface SettingsNavItemProps {
  id: SettingsRoute
  label: string
  icon: React.ReactNode
}

export const SettingsNavItem: React.FC<SettingsNavItemProps> = ({ id, label, icon: Icon }) => {
  const selectedSettingsSection = useStore($selectedSettingsSection)

  const isSelected = selectedSettingsSection === id

  const handleChangeSettingsSection = () => changeSettingsSectionEvent(id)

  return (
    <NavLink
      label={label}
      variant="filled"
      active={isSelected}
      onClick={handleChangeSettingsSection}
      icon={<Icon size={16} />}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: isSelected ? theme.shadows.xs : void 0
      })}
    />
  )
}
