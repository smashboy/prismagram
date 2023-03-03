import { useStore } from 'effector-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, ActionIcon, Group, Text, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Enum } from 'prisma-state/_new/blocks'
import { EnumFieldData } from 'prisma-state/_new/types'
import { EnumField } from 'prisma-state/_new/fields'
import { DragHandle } from '../../../DragHandle'

interface EnumFieldFormProps {
  field: EnumFieldData
  enum: Enum
}

export const EnumFieldForm: React.FC<EnumFieldFormProps> = ({
  field: fieldData,
  enum: enumItem
}) => {
  const schemaState = useStore($schemaState)

  const field = new EnumField(fieldData.name, enumItem.name, fieldData)

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: field.name
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleDeleteField = () => {
    enumItem.removeField(field.name)
    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Accordion.Item value={field.name} ref={setNodeRef} style={style} {...attributes}>
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
    </Accordion.Item>
  )
}
