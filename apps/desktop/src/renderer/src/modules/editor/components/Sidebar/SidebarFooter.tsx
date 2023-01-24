import { ActionIcon, Group } from '@mantine/core'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import { IconList, IconPlus, IconSettings } from '@tabler/icons'

const ICON_SIZE = 20
const ICON_COLOR = 'black'

export const SidebarFooter = () => {
  const handleOpenSettingsModal = () => toggleSettingsModalEvent(true)
  const handleOpenCreateProjectModal = () => toggleCreateProjectModalEvent(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModalEvent(true)

  return (
    <Group position="center">
      <ActionIcon onClick={handleOpenSettingsModal}>
        <IconSettings size={ICON_SIZE} color={ICON_COLOR} />
      </ActionIcon>
      <ActionIcon onClick={handleOpenSelectProjectModal}>
        <IconList size={ICON_SIZE} color={ICON_COLOR} />
      </ActionIcon>
      <ActionIcon onClick={handleOpenCreateProjectModal}>
        <IconPlus size={ICON_SIZE} color={ICON_COLOR} />
      </ActionIcon>
    </Group>
  )
}
