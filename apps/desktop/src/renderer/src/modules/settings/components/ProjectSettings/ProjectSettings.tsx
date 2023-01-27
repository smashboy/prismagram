import { Stack } from '@mantine/core'
import { useStore } from 'effector-react'
import { ProjectSettingsRoute } from '../../constants'
import { $selectedProjectSettingsSection } from '../../stores'
import { SettingsSection } from '../SettingsSection'
import { PrismaCommandsProjectSettings } from './PrismaCommandsProjectSettings'
import { PrismaSchemaProjectSettings } from './PrismaSchemaProjectSettings'
import { ProjectGeneralSettings } from './ProjectGeneralSettings'
import { ProjectSettingsNavigation } from './ProjectSettingsNavigation'

const settingsRoutesComponents = new Map<ProjectSettingsRoute, React.FC>([
  [ProjectSettingsRoute.PRISMA, PrismaSchemaProjectSettings],
  [ProjectSettingsRoute.GENERAL, ProjectGeneralSettings],
  [ProjectSettingsRoute.COMMANDS, PrismaCommandsProjectSettings]
])

export const ProjectSettings = () => {
  const selectedSection = useStore($selectedProjectSettingsSection)

  const SelectedSection = settingsRoutesComponents.get(selectedSection)

  return (
    <Stack h="100%" sx={{ overflow: 'hidden' }}>
      <ProjectSettingsNavigation />
      <SettingsSection>{SelectedSection && <SelectedSection />}</SettingsSection>
    </Stack>
  )
}
