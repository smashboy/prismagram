import { closestCenter, DndContext } from '@dnd-kit/core'
import { ScrollArea, Stack } from '@mantine/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useList, useStore } from 'effector-react'
import { $schemaBlockIds } from '../../stores'
import { SchemaNavItem } from './SchemaNavItem'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

export const SchemaBlocksNavigation = () => {
  const blockIds = useStore($schemaBlockIds)
  const blocks = useList($schemaBlockIds, (id) => <SchemaNavItem blockId={id} />)

  const handleOnDragEnd = () => {}

  return (
    <ScrollArea w="30%" h="100%" offsetScrollbars>
      <Stack h="100%">
        <DndContext
          onDragEnd={handleOnDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
            {blocks}
          </SortableContext>
        </DndContext>
      </Stack>
    </ScrollArea>
  )
}
