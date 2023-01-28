import { Stack } from '@mantine/core'
import { useStore } from 'effector-react'
import { GeneralSettingsRoute } from '../../constants'
import { $selectedGeneralSettingsSection } from '../../stores'
import { SettingsSection } from '../SettingsSection'
import { CustomizationSettings } from './CustomizationSettings'
import { GeneralSettingsNavigation } from './GeneralSettingsNavigation'

const settingsRoutesComponents = new Map<GeneralSettingsRoute, React.FC>([
  [GeneralSettingsRoute.CUSTOMIZATION, CustomizationSettings]
])

export const GeneralSettings = () => {
  const selectedSection = useStore($selectedGeneralSettingsSection)

  const SelectedSection = settingsRoutesComponents.get(selectedSection)

  return (
    <Stack>
      <GeneralSettingsNavigation />
      <SettingsSection>{SelectedSection && <SelectedSection />}</SettingsSection>
    </Stack>
  )
}
