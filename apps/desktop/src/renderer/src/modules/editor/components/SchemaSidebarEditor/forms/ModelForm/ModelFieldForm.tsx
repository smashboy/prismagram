import { useStore } from 'effector-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, Badge, Group, Text } from '@mantine/core'
import { ScalarFieldColor } from '@renderer/modules/editor/config'
import { $nodesColors } from '@renderer/modules/editor/stores'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { DragHandle } from '../../../DragHandle'

interface ModelFieldFormProps {
  field: ScalarFieldData | EnumModelFieldData | RelationFieldData
}

export const ModelFieldForm: React.FC<ModelFieldFormProps> = ({ field: fieldData }) => {
  const { name, type } = fieldData

  const nodeColors = useStore($nodesColors)

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: name
    })

  const typeColor = ScalarFieldColor[type] || nodeColors[type]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Accordion.Item value={name} ref={setNodeRef} style={style} {...attributes}>
      <Accordion.Control>
        <Group>
          <DragHandle size="sm" ref={setActivatorNodeRef} {...listeners} />
          <Text>{name}</Text>
          <Badge sx={{ color: typeColor, textTransform: 'none' }}>{type}</Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        Colors, fonts, shadows and many other parts are customizable to fit your design needs
      </Accordion.Panel>
    </Accordion.Item>
  )
}
