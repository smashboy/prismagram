import { useStore } from 'effector-react'
import { IconFileOff } from '@tabler/icons'
import { Message } from '@renderer/core/components'
import { Button, Group } from '@mantine/core'
import { DiagramEditor } from './DiagramEditor'
import { $selectedProjectId } from '@renderer/modules/projects'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent
} from '@renderer/stores/ui/modals'
import { combine } from 'effector'

import { useEditorShortcuts } from '@renderer/modules/spotlight'

const $store = combine({
  projectId: $selectedProjectId
})

export const Editor = () => {
  const { projectId } = useStore($store)

  useEditorShortcuts()

  const handleOpenCreateProjectModal = () => toggleCreateProjectModalEvent(true)
  const handleOpenSelectProjectModal = () => toggleSelectProjectModalEvent(true)

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
