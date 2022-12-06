import ReactFlow, { Background } from 'reactflow'
import { Message } from '@renderer/core/components'
import './editor.css'
import { IconFileOff } from '@tabler/icons'
import { Button, Group } from '@mantine/core'
import { toggleCreateProjectModal } from '@renderer/stores/ui'

export const DiagramEditor = () => {
  if (true)
    return (
      <Message
        icon={<IconFileOff size={32} />}
        title="Project is not selected"
        description="Create new project or open existing one."
      >
        <Group spacing="xs">
          <Button onClick={toggleCreateProjectModal}>Create new project</Button>
          <Button color="pink">Open project</Button>
        </Group>
      </Message>
    )

  return (
    <ReactFlow snapToGrid>
      <Background />
    </ReactFlow>
  )
}
