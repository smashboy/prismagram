import { useEffect, useRef } from 'react'
import { ActionIcon, Group, TextInput } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { NodeDraggableField } from '../NodeDraggableField'
import { EnumFieldData } from 'prisma-state/_new/types'
import { Enum } from 'prisma-state/_new/blocks'
import { EnumField } from 'prisma-state/_new/fields'
import { useStore } from 'effector-react'

interface EnumNodeEditFieldProps {
  field: EnumFieldData
  block: Enum
}

export const EnumNodeEditField: React.FC<EnumNodeEditFieldProps> = ({
  block,
  field: fieldData
}) => {
  const state = useStore($schemaState)

  const inputRef = useRef<HTMLInputElement>(null)

  const field = new EnumField(fieldData.name, fieldData.blockId, fieldData)

  useEffect(() => {
    if (field.value.length < 2) inputRef.current?.select()
  }, [field.value])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return
    field.setValue(newValue)
    setPrismaSchemaEvent(state._clone())
  }

  const handleDeleteOption = () => {
    block.removeField(field.name)
    setPrismaSchemaEvent(state._clone())
  }

  return (
    <NodeDraggableField fieldId={field.name}>
      <Group>
        <TextInput ref={inputRef} value={field.value} onChange={handleInput} />
        <ActionIcon onClick={handleDeleteOption}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </NodeDraggableField>
  )
}
