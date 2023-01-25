import { useState } from 'react'
import { useStore } from 'effector-react'
import { Button, Group, Paper, Stack, Transition } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/blocks'
import { IntField } from 'prisma-state/fields'
import { FieldForm } from './FieldForm'

interface NewFieldFormProps {
  model: Model
}

export const NewFieldForm: React.FC<NewFieldFormProps> = ({ model }) => {
  const schemaState = useStore($schemaState)

  const [isOpen, setIsOpen] = useState(false)

  const [field, setField] = useState(new IntField('', model))

  const isCreateButtonDisabled = !field.name || !!model.field(field.name)

  const handleCreateField = () => {
    model.addField(field.name, field)
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
              <FieldForm field={field} onChange={setField} model={model} />
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
