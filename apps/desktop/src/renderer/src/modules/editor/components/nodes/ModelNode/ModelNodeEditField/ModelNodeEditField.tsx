import { ActionIcon, Group } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { useStore } from 'effector-react'
import { ScalarTypeOption } from 'prisma-state/constants'
import { Model } from 'prisma-state/_new/blocks'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { NodeDraggableField } from '../../NodeDraggableField'
import { FieldModifierSelect } from './FieldModifierSelect'
import { FieldNameInput } from './FieldNameInput'
import { FieldTypeSelect } from './FieldTypeSelect'

interface ModelNodeEditFieldProps {
  field: RelationFieldData | ScalarFieldData | EnumModelFieldData
  block: Model
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

export const ModelNodeEditField: React.FC<ModelNodeEditFieldProps> = ({
  block,
  field: fieldData
}) => {
  const state = useStore($schemaState)

  const field = fieldHelperSelector(fieldData)

  const handleDeleteField = () => {
    if ((fieldData as RelationFieldData)?.isRelationField) {
      state.relations.remove(
        block.name,
        field.type,
        field.attributes.get('relation')?.arguments.get('name') as string | undefined
      )
    }

    block.removeField(field.name)

    setPrismaSchemaEvent(state._clone())
  }

  return (
    <NodeDraggableField fieldId={field.name}>
      <Group align="flex-end" sx={{ flex: 1 }}>
        <FieldNameInput block={block} field={field} />
        <FieldTypeSelect field={field} />
        <FieldModifierSelect field={field} />
        <ActionIcon mb={5} onClick={handleDeleteField}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </NodeDraggableField>
  )
}
