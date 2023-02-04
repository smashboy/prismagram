import { ActionIcon, Divider, Group, Tooltip } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent,
  toggleSettingsModalEvent
} from '@renderer/stores/ui/modals'
import { IconBulb, IconList, IconPlus, IconSettings } from '@tabler/icons'
import { ICON_SIZE } from './constants'

export const GeneralOptionsSection = () => {
  const handleOpenSettingsModal = () => toggleSettingsModalEvent(true)
  const handleOpenCreateProjectModal = () => toggleCreateProjectModalEvent(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModalEvent(true)
  const handleOpenSpotlight = () => openSpotlight()

  return (
    <Group pr={100}>
      <Tooltip label="Open settings">
        <ActionIcon onClick={handleOpenSettingsModal}>
          <IconSettings size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Open spotlight">
        <ActionIcon onClick={handleOpenSpotlight}>
          <IconBulb size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Select project">
        <ActionIcon onClick={handleOpenSelectProjectModal}>
          <IconList size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Create new project">
        <ActionIcon onClick={handleOpenCreateProjectModal}>
          <IconPlus size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Divider orientation="vertical" />
    </Group>
  )
}