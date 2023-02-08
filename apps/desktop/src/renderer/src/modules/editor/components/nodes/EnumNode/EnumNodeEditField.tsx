import { useEffect, useRef } from 'react'
import { ActionIcon, Group, TextInput } from '@mantine/core'
import { updatePrismaStateEffect } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { Enum } from 'prisma-state/blocks'
import { EnumField } from 'prisma-state/fields'
import { NodeDraggableField } from '../NodeDraggableField'

interface EnumNodeEditFieldProps {
  field: EnumField
  block: Enum
}

export const EnumNodeEditField: React.FC<EnumNodeEditFieldProps> = ({ block, field }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { name, value } = field

  useEffect(() => {
    if (value.length < 2) inputRef.current?.select()
  }, [value])

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return
    field.setValue(newValue)
    await updatePrismaStateEffect()
  }

  const handleDeleteOption = async () => {
    block.removeField(name)
    await updatePrismaStateEffect()
  }

  return (
    <NodeDraggableField fieldId={name}>
      <Group>
        <TextInput ref={inputRef} value={value} onChange={handleInput} />
        <ActionIcon onClick={handleDeleteOption}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </NodeDraggableField>
  )
}
