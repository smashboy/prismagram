import { Box, Divider, Group, Modal } from '@mantine/core'
import { $isOpenSettingsModal, toggleSettingsModalEvent } from '@renderer/stores/ui/modals'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { SettingsRoute } from '../constants'
import { $selectedSettingsSection } from '../stores'
import { GeneralSettings } from './GeneralSettings'
import { ProjectSettings } from './ProjectSettings'
import { SettingsSidebar } from './SettingsSidebar'
import { ShortcutsSettings } from './ShortcutsSettings/ShortcutsSettings'

const $store = combine({
  isOpen: $isOpenSettingsModal,
  selectedSection: $selectedSettingsSection
})

const settingsRoutesComponents = new Map<SettingsRoute, React.FC>([
  [SettingsRoute.GENERAL, GeneralSettings],
  [SettingsRoute.SHORTCUTS, ShortcutsSettings],
  [SettingsRoute.PROJECT, ProjectSettings]
  // [SettingsRoute.ABOUT, null]
])

export const SettingsModal = () => {
  const { isOpen, selectedSection } = useStore($store)

  const handleCloseDialog = () => toggleSettingsModalEvent(false)

  const SelectedSection = settingsRoutesComponents.get(selectedSection)

  return (
    <Modal
      opened={isOpen}
      onClose={handleCloseDialog}
      title="Settings"
      size="95vw"
      sx={{
        '& .mantine-Modal-modal': {
          height: '90vh'
        },
        '& .mantine-Modal-body': {
          height: 'calc(100% - 35px)'
        }
      }}
    >
      <Group h="100%" noWrap>
        <SettingsSidebar />
        <Divider orientation="vertical" />
        <Box w="100%" h="100%">
          {SelectedSection && <SelectedSection />}
        </Box>
      </Group>
    </Modal>
  )
}
