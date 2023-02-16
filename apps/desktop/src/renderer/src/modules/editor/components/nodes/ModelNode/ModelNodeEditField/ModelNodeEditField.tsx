import { ActionIcon, Group } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { Model } from 'prisma-state/blocks'
import { ModelField, RelationField } from 'prisma-state/fields'
import { NodeDraggableField } from '../../NodeDraggableField'
import { FieldModifierSelect } from './FieldModifierSelect'
import { FieldNameInput } from './FieldNameInput'
import { FieldTypeSelect } from './FieldTypeSelect'

interface ModelNodeEditFieldProps {
  field: ModelField
  block: Model
}

export const ModelNodeEditField: React.FC<ModelNodeEditFieldProps> = ({ block, field }) => {
  const { name } = field

  const handleDeleteField = () => {
    if (field instanceof RelationField) {
      field.remove()
    }

    block.removeField(field.name)

    updatePrismaSchemaEvent()
  }

  return (
    <NodeDraggableField fieldId={name}>
      <Group align="flex-end">
        <FieldNameInput field={field} />
        <FieldTypeSelect field={field} />
        <FieldModifierSelect field={field} />
        <ActionIcon mb={5} onClick={handleDeleteField}>
          <IconTrash size={16} />
        </ActionIcon>
      </Group>
    </NodeDraggableField>
  )
}
