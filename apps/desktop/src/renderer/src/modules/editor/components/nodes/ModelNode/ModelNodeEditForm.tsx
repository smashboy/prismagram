import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Stack } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/blocks'
import { NodeDnDContext } from '../NodeDnDContext'
import { ModelNodeEditField } from './ModelNodeEditField'

interface ModelNodeEditFormProps {
  block: Model
  // isOpenNewField: boolean
  // onCloseNewField: () => void
}

export const ModelNodeEditForm: React.FC<ModelNodeEditFormProps> = ({ block }) => {
  const { fieldNames, fields } = block

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = fieldNames.indexOf(active.id as string)
    const newIndex = fieldNames.indexOf(over.id as string)

    block._setFromArray(arrayMove(fields, oldIndex, newIndex))

    updatePrismaSchemaEvent()
  }

  return (
    <Stack>
      <NodeDnDContext fieldNames={fieldNames} onDragEnd={onDragEnd}>
        {fields.map((field) => (
          <ModelNodeEditField key={field.name} block={block} field={field} />
        ))}
      </NodeDnDContext>
    </Stack>
  )
}
