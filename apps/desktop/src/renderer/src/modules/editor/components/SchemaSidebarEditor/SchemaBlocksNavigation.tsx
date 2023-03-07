import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { ScrollArea, Stack } from '@mantine/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useList, useStore } from 'effector-react'
import { $schemaBlockIds, $schemaState, setPrismaSchemaEvent } from '../../stores'
import { SchemaNavItem } from './SchemaNavItem'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { PrismaSchemaStateData } from 'prisma-state/_new/types'
import { createPrismaSchemaState } from 'prisma-state/_new/state'

export const SchemaBlocksNavigation = () => {
  const schemaState = useStore($schemaState)
  const blocks = useList($schemaBlockIds, (id) => <SchemaNavItem blockId={id} />)

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = schemaState.blockIds.indexOf(active.id as string)
    const newIndex = schemaState.blockIds.indexOf(over.id as string)

    const schemaData = schemaState._data() as PrismaSchemaStateData

    setPrismaSchemaEvent(
      createPrismaSchemaState(new Map(arrayMove([...schemaData.entries()], oldIndex, newIndex)))
    )
  }

  return (
    <ScrollArea miw="35%" h="100%" offsetScrollbars>
      <Stack h="100%">
        <DndContext
          onDragEnd={handleOnDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={schemaState.blockIds} strategy={verticalListSortingStrategy}>
            {blocks}
          </SortableContext>
        </DndContext>
      </Stack>
    </ScrollArea>
  )
}
