import ReactFlow, { Background } from 'reactflow'
import { Message } from '@renderer/core/components'
import './editor.css'
import { IconFileOff } from '@tabler/icons'
import { Button, Group } from '@mantine/core'
import { toggleCreateProjectModal, toggleSelectProjectModal } from '@renderer/stores/ui'

export const DiagramEditor = () => {
  const handleOpenCreateProjectModal = () => toggleCreateProjectModal(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModal(true)

  if (true)
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

  return (
    <ReactFlow snapToGrid>
      <Background />
    </ReactFlow>
  )
}
