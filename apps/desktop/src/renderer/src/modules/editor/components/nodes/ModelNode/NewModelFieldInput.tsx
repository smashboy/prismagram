import { useState } from 'react'
import { Select } from '@mantine/core'
import { ConfirmInput } from '@renderer/core/components'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { scalarOptionsArray, ScalarTypeOption } from 'prisma-state/constants'
import { Model } from 'prisma-state/_new/blocks'
import { EnumModelField, ScalarField } from 'prisma-state/_new/fields'

interface NewModelFieldInputProps {
  onClose: () => void
  block: Model
}

export const NewModelFieldInput: React.FC<NewModelFieldInputProps> = ({ block, onClose }) => {
  const schemaState = useStore($schemaState)

  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value)
  const handleTypeSelect = (value: string | null) => {
    if (!value) return
    setType(value)
  }

  const handleCreateNewField = () => {
    const field = schemaState.isEnum(type)
      ? new EnumModelField(name, type, block.name)
      : new ScalarField(name, type as ScalarTypeOption, block.name)
    block.addField(field.name, field._data())
    setPrismaSchemaEvent(schemaState._clone())
    onClose()
  }

  return (
    <ConfirmInput
      label="Name"
      value={name}
      onChange={handleNameInput}
      onConfirm={handleCreateNewField}
      onCancel={onClose}
      disableConfirm={!name || !type}
    >
      <Select
        label="Type"
        onChange={handleTypeSelect}
        data={[...scalarOptionsArray, ...schemaState.enumIds]}
      />
    </ConfirmInput>
  )
}
