import { MantineColor, NavLink, ThemeIcon } from '@mantine/core'
import { $selectedProjectId } from '@renderer/modules/projects'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { SettingsRoute } from '../constants'
import { $selectedSettingsSection, changeSettingsSectionEvent } from '../stores'

interface SettingsNavItemProps {
  id: SettingsRoute
  label: string
  icon: React.ReactNode
  color?: MantineColor
}
const $store = combine({
  selectedProjectId: $selectedProjectId,
  selectedSection: $selectedSettingsSection
})

export const SettingsNavItem: React.FC<SettingsNavItemProps> = ({
  id,
  label,
  icon: Icon,
  color
}) => {
  const { selectedProjectId, selectedSection } = useStore($store)

  const isSelected = selectedSection === id
  const disableNavigation = !selectedProjectId && id === SettingsRoute.PROJECT

  const handleChangeSettingsSection = () => changeSettingsSectionEvent(id)

  return (
    <NavLink
      label={label}
      variant="light"
      active={isSelected}
      onClick={handleChangeSettingsSection}
      disabled={disableNavigation}
      color={color}
      icon={
        <ThemeIcon size="xl" color={color}>
          <Icon />
        </ThemeIcon>
      }
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: isSelected ? theme.shadows.xs : void 0
      })}
    />
  )
}
