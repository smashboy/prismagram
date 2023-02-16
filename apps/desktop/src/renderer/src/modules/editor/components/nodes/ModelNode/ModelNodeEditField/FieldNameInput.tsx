import { useEffect, useRef } from 'react'
import { TextInput } from '@mantine/core'
import { ModelField } from 'prisma-state/fields'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor/stores'

interface FieldNameInputProps {
  field: ModelField
}

export const FieldNameInput: React.FC<FieldNameInputProps> = ({ field }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { name } = field

  useEffect(() => {
    if (name.length < 2) inputRef.current?.select()
  }, [name])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return
    field.setName(newValue)
    updatePrismaSchemaEvent()
  }

  return <TextInput ref={inputRef} label="Name" value={name} onChange={handleInput} />
}
