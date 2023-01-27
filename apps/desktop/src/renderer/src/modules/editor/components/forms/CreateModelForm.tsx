import { useState } from 'react'
import { useStore } from 'effector-react'
import { Button, Group, Paper, Stack, TextInput, Transition } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import {
  $isEditorEnabled,
  $schemaState,
  selectModelEvent,
  setPrismaSchemaEvent
} from '../../stores'
import { toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'

export const CreateModelForm = () => {
  const schemaState = useStore($schemaState)

  const [name, setName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const isEditorEnabled = useStore($isEditorEnabled)

  const isCreateButtonDisabled = !name || schemaState.modelIds.includes(name)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const handleCreateSchemaState = () => {
    schemaState.addModel(name)
    setPrismaSchemaEvent(schemaState.toString())
    toggleModelNodeSidebarEvent(true)
    selectModelEvent(name)
  }

  return (
    <>
      <Transition mounted={!isOpen} transition="fade">
        {(style) => (
          <Button
            variant="subtle"
            color="dark"
            rightIcon={<IconPlus size={16} />}
            disabled={!isEditorEnabled}
            style={style}
            onClick={() => setIsOpen(true)}
          >
            New model
          </Button>
        )}
      </Transition>
      <Transition mounted={isOpen} transition="slide-down">
        {(style) => (
          <Paper
            shadow="none"
            style={style}
            p="xs"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
            })}
            withBorder
          >
            <Stack>
              <TextInput value={name} onChange={handleInput} label="Model name" />
              <Group position="right" sx={{ alignItems: 'flex-end' }}>
                <Button color="gray" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSchemaState} disabled={isCreateButtonDisabled}>
                  Create
                </Button>
              </Group>
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  )
}
