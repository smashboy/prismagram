import { useEffect, useRef } from 'react'
import { TextInput } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { useStore } from 'effector-react'
import { Model } from 'prisma-state/_new/blocks'

interface FieldNameInputProps {
  block: Model
  field: ScalarField | RelationField | EnumModelField
}

export const FieldNameInput: React.FC<FieldNameInputProps> = ({ block, field }) => {
  const state = useStore($schemaState)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (field.name.length < 2) inputRef.current?.select()
  }, [field.name])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return

    const prevName = field.name

    field.setName(newValue)

    const updatedField = field._data()

    block.removeField(prevName)
    block.addField(newValue, updatedField)

    setPrismaSchemaEvent(state._clone())
  }

  return <TextInput ref={inputRef} label="Name" value={field.name} onChange={handleInput} />
}
