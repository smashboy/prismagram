import { useStore } from 'effector-react'
import { IconFileOff } from '@tabler/icons'
import { Message } from '@renderer/core/components'
import { Button, Group } from '@mantine/core'
import { DiagramEditor } from './DiagramEditor'
import { $selectedProject } from '@renderer/modules/projects'
import { toggleCreateProjectModal, toggleSelectProjectModal } from '@renderer/stores/ui/modals'

export const Editor = () => {
  const projectId = useStore($selectedProject)

  const handleOpenCreateProjectModal = () => toggleCreateProjectModal(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModal(true)

  if (!projectId)
    return (
      <Message
        icon={<IconFileOff size={64} color="gray" />}
        title="Project is not selected"
        description="Create new project or open existing one."
      >
        <Group>
          <Button onClick={handleOpenCreateProjectModal}>Create new project</Button>
          <Button onClick={handleOpenSelectProjectModal} color="pink">
            Open project
          </Button>
        </Group>
      </Message>
    )

  return <DiagramEditor />
}
