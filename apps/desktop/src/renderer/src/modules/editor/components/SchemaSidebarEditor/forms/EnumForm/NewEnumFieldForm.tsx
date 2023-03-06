import { useState } from 'react'
import { useStore } from 'effector-react'
import { Button, Collapse, Divider, Group, Stack, TextInput } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Enum } from 'prisma-state/_new/blocks'
import { PaperSection } from '../PaperSection'
import { EnumField } from 'prisma-state/_new/fields'

interface NewEnumFieldFormProps {
  isOpen: boolean
  onClose: () => void
  enum: Enum
}

export const NewEnumFieldForm: React.FC<NewEnumFieldFormProps> = ({
  isOpen,
  onClose,
  enum: enumItem
}) => {
  const schemaState = useStore($schemaState)

  const [value, setValue] = useState('')

  const handleCloseForm = () => {
    setValue('')
    onClose()
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  const handleCreateNewField = () => {
    const field = new EnumField(value, enumItem.name)
    enumItem.addField(field.name, field._data())
    setPrismaSchemaEvent(schemaState._clone())
    handleCloseForm()
  }

  return (
    <Collapse in={isOpen} mr="md">
      <Stack>
        <PaperSection>
          <Stack>
            <TextInput label="Name" value={value} onChange={handleInput} />
            <Group position="right">
              <Button onClick={handleCloseForm} variant="subtle" color="gray">
                Cancel
              </Button>
              <Button variant="subtle" onClick={handleCreateNewField} disabled={!value}>
                Create
              </Button>
            </Group>
          </Stack>
        </PaperSection>
        <Divider />
      </Stack>
    </Collapse>
  )
}
