import { useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, ActionIcon, Group, Text, TextInput, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Enum } from 'prisma-state/_new/blocks'
import { EnumFieldData } from 'prisma-state/_new/types'
import { EnumField } from 'prisma-state/_new/fields'
import { DragHandle } from '../../../DragHandle'

interface EnumFieldFormProps {
  stableId: string
  field: EnumFieldData
  enum: Enum
  setStableFieldName: (id: string, name: string) => void
}

export const EnumFieldForm: React.FC<EnumFieldFormProps> = ({
  field: fieldData,
  enum: enumItem,
  stableId,
  setStableFieldName
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const schemaState = useStore($schemaState)

  const field = new EnumField(fieldData.name, enumItem.name, fieldData)

  useEffect(() => {
    if (field.value.length < 2) inputRef.current?.select()
  }, [field.value])

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: stableId
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleDeleteField = () => {
    enumItem.removeField(field.name)
    setPrismaSchemaEvent(schemaState._clone())
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    if (!newValue) return

    const prevName = field.name
    const newIndex = enumItem.fieldNames.indexOf(prevName)

    setStableFieldName(stableId, newValue)

    field.setValue(newValue)
    const updatedField = field._data()

    const oldIndex = enumItem.fieldNames.indexOf(newValue)

    enumItem.removeField(prevName)
    enumItem.addField(newValue, updatedField)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    enumItem._setFromArray(arrayMove(enumItem.fieldsArray, oldIndex, newIndex))

    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Accordion.Item value={stableId} ref={setNodeRef} style={style} {...attributes}>
      <Accordion.Control>
        <Group>
          <Group sx={{ flex: 1 }}>
            <DragHandle size="sm" ref={setActivatorNodeRef} {...listeners} />
            <Text>{field.name}</Text>
          </Group>
          <Tooltip label="Remove field">
            <ActionIcon onClick={handleDeleteField} size="xs">
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <TextInput ref={inputRef} value={field.value} onChange={handleInput} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
