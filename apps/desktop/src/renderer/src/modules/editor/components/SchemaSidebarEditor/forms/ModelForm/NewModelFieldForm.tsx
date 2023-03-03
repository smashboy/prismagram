import { useState } from 'react'
import { useStore } from 'effector-react'
import { Button, Collapse, Divider, Group, Select, Stack, TextInput } from '@mantine/core'
import { scalarOptionsArray, ScalarTypeOption } from 'prisma-state/constants'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { PaperSection } from '../PaperSection'
import { EnumModelField, ScalarField } from 'prisma-state/_new/fields'
import { Model } from 'prisma-state/_new/blocks'

interface NewModelFieldFormProps {
  isOpen: boolean
  onClose: () => void
  model: Model
}

const initialState = {
  name: '',
  type: ''
}

export const NewModelFieldForm: React.FC<NewModelFieldFormProps> = ({ isOpen, model, onClose }) => {
  const schemaState = useStore($schemaState)

  const [{ name, type }, setData] = useState(initialState)

  const handleCloseForm = () => {
    setData(initialState)
    onClose()
  }

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData({ type, name: event.target.value })

  const handleTypeSelect = (value: string | null) => {
    if (!value) return
    setData({ name, type: value })
  }

  const handleCreateNewField = () => {
    const field = schemaState.isEnum(type)
      ? new EnumModelField(name, type, model.name)
      : new ScalarField(name, type as ScalarTypeOption, model.name)
    model.addField(field.name, field._data())
    setPrismaSchemaEvent(schemaState._clone())
    handleCloseForm()
  }

  return (
    <Collapse in={isOpen} mr="md">
      <Stack>
        <PaperSection>
          <Stack>
            <TextInput label="Name" value={name} onChange={handleNameInput} />
            <Select
              value={type}
              label="Type"
              onChange={handleTypeSelect}
              data={[...scalarOptionsArray, ...schemaState.enumIds]}
            />
            <Group position="right">
              <Button onClick={handleCloseForm} variant="subtle" color="gray">
                Cancel
              </Button>
              <Button variant="subtle" onClick={handleCreateNewField} disabled={!name || !type}>
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
