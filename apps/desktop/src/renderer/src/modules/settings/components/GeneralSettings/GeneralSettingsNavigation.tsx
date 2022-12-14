import { Box, Center, SegmentedControl } from '@mantine/core'
import { useStore } from 'effector-react'
import { GeneralSettingsRoute, generalSettingsRoutesArray } from '../../constants'
import { $selectedGeneralSettingsSection, changeGeneralSettingsSectionEvent } from '../../stores'

export const GeneralSettingsNavigation = () => {
  const selectedSection = useStore($selectedGeneralSettingsSection)

  const handleChangeSection = (section: GeneralSettingsRoute) =>
    changeGeneralSettingsSectionEvent(section)

  return (
    <SegmentedControl
      w="fit-content"
      value={selectedSection}
      onChange={handleChangeSection}
      data={generalSettingsRoutesArray.map(([id, { label, icon: Icon }]) => ({
        value: id,
        label: (
          <Center>
            <Icon size={16} />
            <Box ml={10}>{label}</Box>
          </Center>
        )
      }))}
    />
  )
}
