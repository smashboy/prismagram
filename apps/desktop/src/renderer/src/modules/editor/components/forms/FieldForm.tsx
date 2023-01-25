import { SegmentedControl, Select, Stack, Text, TextInput } from '@mantine/core'
import { useStore } from 'effector-react'
import { Model } from 'prisma-state/blocks'
import { ModelField } from 'prisma-state/fields'
import { scalarOptionsArray } from 'prisma-state/constants'
import { createFieldFromType } from 'prisma-state/utils/field'
import { $schemaState } from '@renderer/modules/editor/stores'
import { NewFieldAttributeForm } from './NewFieldAttributeForm'

interface FieldFormProps {
  model: Model
  field: ModelField
  onChange: (field: ModelField) => void
}

const modifierOptions = ['none', 'optional', 'list']

export const FieldForm: React.FC<FieldFormProps> = ({ model, field, onChange }) => {
  const schemaState = useStore($schemaState)

  const { modelIds, enumIds } = schemaState

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.setName(event.target.value)
    onChange(field._clone())
  }

  const handleModifierChange = (modifier: 'none' | 'optional' | 'list') => {
    if (modifier === 'none') {
      field.setModifier(null)
      return onChange(field._clone())
    }

    field.setModifier(modifier)
    onChange(field._clone())
  }

  const handleChangeType = (type: string | null) => {
    if (!type) return

    const newField = createFieldFromType(field.name, type, model, enumIds, modelIds)

    if (newField) onChange(newField)
  }

  const selectOptions = [
    ...scalarOptionsArray,
    ...modelIds.filter((id) => id !== model.name),
    ...enumIds
  ]

  return (
    <Stack>
      <TextInput label="Name" value={field.name} onChange={handleNameInput} />
      <Select
        label="Type"
        value={field.type}
        onChange={handleChangeType}
        data={selectOptions}
        searchable
      />
      <Text>Modifier</Text>
      <SegmentedControl
        value={!field.modifier ? modifierOptions[0] : field.modifier}
        onChange={handleModifierChange}
        data={modifierOptions}
      />
      <NewFieldAttributeForm />
    </Stack>
  )
}
