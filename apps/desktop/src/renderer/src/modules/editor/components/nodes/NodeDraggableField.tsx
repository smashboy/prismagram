import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Group, Transition } from '@mantine/core'
import { DragHandle } from '../DragHandle'

interface NodeDraggableFieldProps {
  fieldId: string
  isNodeSelected?: boolean
  children?: React.ReactNode
  leftItem?: React.ReactNode
}

export const NodeDraggableField: React.FC<NodeDraggableFieldProps> = ({
  fieldId,
  isNodeSelected = false,
  leftItem,
  children
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({ id: fieldId, disabled: !isNodeSelected })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Box ref={setNodeRef} style={style} component="tr" {...attributes}>
      <td>{leftItem}</td>
      <td>
        <Group>
          <Transition mounted={isNodeSelected} transition="fade">
            {(style) => (
              <span style={style}>
                <DragHandle ref={setActivatorNodeRef} {...listeners} />
              </span>
            )}
          </Transition>
          <span>{fieldId}</span>
        </Group>
      </td>
      {children}
    </Box>
  )
}
