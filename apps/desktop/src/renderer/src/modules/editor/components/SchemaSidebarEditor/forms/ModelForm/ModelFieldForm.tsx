import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Accordion, ActionIcon, Badge, Group, Stack, Text, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { ScalarFieldColor } from '@renderer/modules/editor/config'
import { $nodesColors, $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { DragHandle } from '../../../DragHandle'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { ScalarTypeOption } from 'prisma-state/constants'
import { Model } from 'prisma-state/_new/blocks'
import { FieldNameInput } from './FieldNameInput'
import { FieldModifierSelector } from './FieldModifierSelector'
import { FieldTypeSelect } from './FieldTypeSelect'

const $store = combine({
  nodeColors: $nodesColors,
  schemaState: $schemaState
})

interface ModelFieldFormProps {
  stableId: string
  field: ScalarFieldData | EnumModelFieldData | RelationFieldData
  model: Model
  setStableFieldName: (id: string, name: string) => void
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

export const ModelFieldForm: React.FC<ModelFieldFormProps> = ({
  stableId,
  model,
  field: fieldData,
  setStableFieldName
}) => {
  const { nodeColors, schemaState } = useStore($store)

  const field = fieldHelperSelector(fieldData)

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: stableId
    })

  const typeColor = ScalarFieldColor[field.type] || nodeColors[field.type]

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleDeleteField = () => {
    if ((fieldData as RelationFieldData)?.isRelationField) {
      schemaState.relations.remove(
        model.name,
        field.type,
        field.attributes.get('relation')?.arguments.get('name') as string | undefined
      )
    }

    model.removeField(field.name)

    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Accordion.Item value={stableId} ref={setNodeRef} style={style} {...attributes}>
      <Accordion.Control>
        <Group>
          <Group sx={{ flex: 1 }}>
            <DragHandle size="sm" ref={setActivatorNodeRef} {...listeners} />
            <Text>{field.name}</Text>
            <Badge sx={{ color: typeColor, textTransform: 'none' }}>{field.displayType}</Badge>
          </Group>
          <Tooltip label="Remove field">
            <ActionIcon onClick={handleDeleteField} size="xs">
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <FieldNameInput
            stableId={stableId}
            model={model}
            field={field}
            setStableFieldName={setStableFieldName}
          />
          <FieldTypeSelect field={field} />
          <FieldModifierSelector field={field} />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
