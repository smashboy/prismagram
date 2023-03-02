import { useStore } from 'effector-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, Badge, Group, Stack, Text } from '@mantine/core'
import { ScalarFieldColor } from '@renderer/modules/editor/config'
import { $nodesColors } from '@renderer/modules/editor/stores'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { DragHandle } from '../../../DragHandle'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { ScalarTypeOption } from 'prisma-state/constants'
import { Model } from 'prisma-state/_new/blocks'
import { FieldNameInput } from './FieldNameInput'
import { FieldModifierSelector } from './FieldModifierSelector'
import { FieldTypeSelect } from './FieldTypeSelect'

interface ModelFieldFormProps {
  field: ScalarFieldData | EnumModelFieldData | RelationFieldData
  model: Model
}

const fieldHelperSelector = (data: RelationFieldData | ScalarFieldData | EnumModelFieldData) => {
  if ((data as RelationFieldData)?.isRelationField) {
    return new RelationField(data.name, data.type, data.blockId, data as RelationFieldData)
  }

  if ((data as EnumModelFieldData)?.isEnumField) {
    return new EnumModelField(data.name, data.type, data.blockId, data as EnumModelFieldData)
  }

  return new ScalarField(
    data.name,
    data.type as ScalarTypeOption,
    data.blockId,
    data as ScalarFieldData
  )
}

export const ModelFieldForm: React.FC<ModelFieldFormProps> = ({ model, field: fieldData }) => {
  const nodeColors = useStore($nodesColors)

  const field = fieldHelperSelector(fieldData)

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: field.name
    })

  const typeColor = ScalarFieldColor[field.type] || nodeColors[field.type]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Accordion.Item value={field.name} ref={setNodeRef} style={style} {...attributes}>
      <Accordion.Control>
        <Group>
          <DragHandle size="sm" ref={setActivatorNodeRef} {...listeners} />
          <Text>{field.name}</Text>
          <Badge sx={{ color: typeColor, textTransform: 'none' }}>{field.displayType}</Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <FieldNameInput model={model} field={field} />
          <FieldTypeSelect field={field} />
          <FieldModifierSelector field={field} />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
