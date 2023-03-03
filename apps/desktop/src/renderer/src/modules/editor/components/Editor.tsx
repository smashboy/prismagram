import { useStore } from 'effector-react'
import { IconFileOff } from '@tabler/icons'
import { Message } from '@renderer/core/components'
import { Box, Button, Group, Stack, Text } from '@mantine/core'
import { DiagramEditor } from './DiagramEditor'
import { $selectedProjectId } from '@renderer/modules/projects'
import {
  toggleCreateProjectModalEvent,
  toggleSelectProjectModalEvent
} from '@renderer/stores/ui/modals'
import { combine } from 'effector'

import { KbdShortcut, useEditorShortcuts } from '@renderer/modules/spotlight'
import { ctrlOrCmdKey } from '@renderer/core/electron'

const $store = combine({
  projectId: $selectedProjectId
})

const options = [
  { title: 'Spotlight', shortcut: [ctrlOrCmdKey, 'K'] },
  { title: 'Open project', shortcut: [ctrlOrCmdKey, 'Alt', 'P'] },
  { title: 'Create new project', shortcut: [ctrlOrCmdKey, 'Alt', 'N'] }
]

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
        <Stack align="center">
          <Group>
            <Button onClick={handleOpenCreateProjectModal}>Create new project</Button>
            <Button onClick={handleOpenSelectProjectModal} color="pink">
              Open project
            </Button>
          </Group>
          <Stack mt="xl">
            {options.map(({ title, shortcut }) => (
              <Group key={title} noWrap>
                <Text color="dimmed" sx={{ flex: 1 }}>
                  {title}
                </Text>
                <KbdShortcut keys={shortcut} />
              </Group>
            ))}
          </Stack>
        </Stack>
      </Message>
    )

  return <DiagramEditor />
}
