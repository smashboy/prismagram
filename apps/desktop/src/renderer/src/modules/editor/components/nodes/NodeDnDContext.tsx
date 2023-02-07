import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

interface NodeDnDContextProps {
  children: React.ReactNode
  onDragEnd: (event: DragEndEvent) => void
  fieldNames: string[]
}

export const NodeDnDContext: React.FC<NodeDnDContextProps> = ({
  children,
  onDragEnd,
  fieldNames
}) => {
  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={fieldNames} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}
