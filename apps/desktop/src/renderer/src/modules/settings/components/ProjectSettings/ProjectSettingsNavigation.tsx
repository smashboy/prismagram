import { Box, Center, SegmentedControl } from '@mantine/core'
import { useStore } from 'effector-react'
import { ProjectSettingsRoute, projectSettingsRoutesArray } from '../../constants'
import { $selectedProjectSettingsSection, changeProjectSettingsSectionEvent } from '../../stores'

export const ProjectSettingsNavigation = () => {
  const selectedSection = useStore($selectedProjectSettingsSection)

  const handleChangeSection = (section: ProjectSettingsRoute) =>
    changeProjectSettingsSectionEvent(section)

  return (
    <SegmentedControl
      w="fit-content"
      value={selectedSection}
      onChange={handleChangeSection}
      data={projectSettingsRoutesArray.map(([id, { label, icon: Icon }]) => ({
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
