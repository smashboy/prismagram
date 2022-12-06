import { useStore } from 'effector-react'
import { Modal, Stack, TextInput } from '@mantine/core'
import { $isOpenCreateProjectModal, toggleCreateProjectModal } from '@renderer/stores/ui'
import { IconFile } from '@tabler/icons'

export const CreateProjectDialog = () => {
  const isOpen = useStore($isOpenCreateProjectModal)

  return (
    <Modal opened={isOpen} onClose={() => toggleCreateProjectModal(false)} title="Create project">
      <Stack spacing="xs">
        <TextInput label="Project name" withAsterisk />
        <TextInput label="Schema file" withAsterisk icon={<IconFile size={14} />} readOnly />
      </Stack>
    </Modal>
  )
}
