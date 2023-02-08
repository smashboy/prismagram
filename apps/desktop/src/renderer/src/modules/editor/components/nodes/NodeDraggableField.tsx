import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Group } from '@mantine/core'
import { DragHandle } from '../DragHandle'

interface NodeDraggableFieldProps {
  fieldId: string
  children?: React.ReactNode
}

export const NodeDraggableField: React.FC<NodeDraggableFieldProps> = ({
  fieldId,

  children
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: fieldId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Group ref={setNodeRef} style={style} {...attributes}>
      <DragHandle ref={setActivatorNodeRef} {...listeners} />
      {children}
    </Group>
  )
}
