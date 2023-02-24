import { useStore } from 'effector-react'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Stack } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { Model } from 'prisma-state/_new/blocks'
import { NodeDnDContext } from '../NodeDnDContext'
import { ModelNodeEditField } from './ModelNodeEditField'
import { NewModelFieldInput } from './NewModelFieldInput'

interface ModelNodeEditFormProps {
  block: Model
  isOpenNewField: boolean
  onCloseNewField: () => void
}

export const ModelNodeEditForm: React.FC<ModelNodeEditFormProps> = ({
  block,
  isOpenNewField,
  onCloseNewField
}) => {
  const state = useStore($schemaState)

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = block.fieldNames.indexOf(active.id as string)
    const newIndex = block.fieldNames.indexOf(over.id as string)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    block._setFromArray(arrayMove(block.fieldsArray, oldIndex, newIndex))

    setPrismaSchemaEvent(state._clone())
  }

  return (
    <Stack>
      <NodeDnDContext fieldNames={block.fieldNames} onDragEnd={onDragEnd}>
        {isOpenNewField && <NewModelFieldInput block={block} onClose={onCloseNewField} />}
        {block.fieldsArray.map((field) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ModelNodeEditField key={field.name} block={block} field={field} />
        ))}
      </NodeDnDContext>
    </Stack>
  )
}
