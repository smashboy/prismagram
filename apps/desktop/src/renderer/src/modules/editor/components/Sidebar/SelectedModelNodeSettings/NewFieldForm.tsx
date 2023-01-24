import { useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Button, Group, Paper, Select, Stack, TextInput, Transition } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { scalarOptionsArray } from 'prisma-state/constants'
import { Model } from 'prisma-state/blocks'
import { IntField } from 'prisma-state/fields'

interface NewFieldFormProps {
  model: Model
}

export const NewFieldForm: React.FC<NewFieldFormProps> = ({ model }) => {
  const schemaState = useStore($schemaState)

  const { modelIds, enumIds } = schemaState

  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState('')

  const isCreateButtonDisabled = !name || !!model.field(name)

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)

  const selectOptions = [...scalarOptionsArray, ...modelIds, ...enumIds]

  const handleCreateField = () => {
    model.addField(name, new IntField(name, model))
    console.log('NEW FIELD', schemaState.state)
    setPrismaSchemaEvent(schemaState.toString())
    setIsOpen(false)
  }

  return (
    <>
      <Transition mounted={!isOpen} transition="fade">
        {(style) => (
          <Button
            variant="subtle"
            style={style}
            onClick={() => setIsOpen(true)}
            rightIcon={<IconPlus size={16} />}
          >
            New field
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
              <TextInput label="Name" value={name} onChange={handleNameInput} />
              <Select label="Type" data={selectOptions} />
              <Group position="right" sx={{ alignItems: 'flex-end' }}>
                <Button color="gray" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateField} disabled={isCreateButtonDisabled}>
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
