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
import { $selectedEditorView } from '../stores'
import { EditorView } from '../config'
import { SchemaEditor } from './SchemaEditor'
import { PrismaStudioView } from './PrismaStudioView'
import { useEditorShortcuts } from '@renderer/modules/spotlight'

const $store = combine({
  projectId: $selectedProjectId,
  selectedView: $selectedEditorView
})

export const Editor = () => {
  const { projectId, selectedView } = useStore($store)

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

  if (selectedView === EditorView.DIAGRAM) return <DiagramEditor />

  if (selectedView === EditorView.PRISMA_STUDIO) return <PrismaStudioView />

  return <SchemaEditor />
}
