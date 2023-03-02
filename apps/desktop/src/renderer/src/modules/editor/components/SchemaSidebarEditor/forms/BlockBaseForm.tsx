import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  Accordion,
  ActionIcon,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import {
  $schemaState,
  $selectedNodeId,
  setPrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { IconEye, IconTrash } from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Enum, Model } from 'prisma-state/_new/blocks'
import { useEffect, useState } from 'react'
import { PaperSection } from './PaperSection'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  schemaState: $schemaState
})

interface BlockBaseFormProps {
  block: Model | Enum
  children: React.ReactNode
}

export const BlockBaseForm: React.FC<BlockBaseFormProps> = ({ block, children }) => {
  const { schemaState, selectedNodeId } = useStore($store)

  const [selectedFields, setSelectedFields] = useState(block.fieldNames)

  useEffect(() => {
    if (selectedNodeId) {
      setSelectedFields(block.fieldNames)
    }
  }, [selectedNodeId])

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = block.fieldNames.indexOf(active.id as string)
    const newIndex = block.fieldNames.indexOf(over.id as string)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    block._setFromArray(arrayMove(block.fieldsArray, oldIndex, newIndex))

    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Stack w="100%" h="100%">
      <Stack pr="md">
        <Group w="100%" noWrap>
          <Text sx={{ flex: 1 }} fw={500}>
            {block.name}
          </Text>
          <Group>
            <ActionIcon size="sm">
              <IconEye />
            </ActionIcon>
            <ActionIcon size="sm">
              <IconTrash />
            </ActionIcon>
          </Group>
        </Group>
        <Divider />
      </Stack>
      <ScrollArea h="100%" offsetScrollbars>
        <Stack w="100%" h="100%">
          <PaperSection>
            <TextInput label="Name" value={block.name} />
          </PaperSection>
          <Divider />
          <DndContext
            onDragEnd={handleOnDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={block.fieldNames} strategy={verticalListSortingStrategy}>
              <Accordion
                variant="separated"
                value={selectedFields}
                onChange={setSelectedFields}
                multiple
              >
                {children}
              </Accordion>
            </SortableContext>
          </DndContext>
        </Stack>
      </ScrollArea>
    </Stack>
  )
}
