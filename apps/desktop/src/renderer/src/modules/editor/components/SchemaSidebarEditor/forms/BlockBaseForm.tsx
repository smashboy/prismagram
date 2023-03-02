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
  TextInput,
  Tooltip
} from '@mantine/core'
import {
  $schemaState,
  $selectedNodeId,
  removeSelectedNodeEffect,
  setPrismaSchemaEvent
} from '@renderer/modules/editor/stores'
import { zoomToNode } from '@renderer/modules/editor/utils'
import { IconEye, IconTrash } from '@tabler/icons'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { Enum, Model } from 'prisma-state/_new/blocks'
import { useEffect, useRef, useState } from 'react'
import { useReactFlow } from 'reactflow'
import { PaperSection } from './PaperSection'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  schemaState: $schemaState
})

interface BlockBaseFormProps {
  block: Model | Enum
  children: React.ReactNode
  actions?: React.ReactNode
}

export const BlockBaseForm: React.FC<BlockBaseFormProps> = ({
  block,
  children,
  actions = null
}) => {
  const flow = useReactFlow()

  const { schemaState, selectedNodeId } = useStore($store)

  const fieldsCache = useRef<string[]>([])

  const [selectedFields, setSelectedFields] = useState(block.fieldNames)

  useEffect(() => {
    if (selectedNodeId) {
      setSelectedFields(block.fieldNames)
    }
  }, [selectedNodeId])

  const handleRemoveNode = () => removeSelectedNodeEffect()

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setSelectedFields(fieldsCache.current)

    if (!over || active.id === over.id) return

    const oldIndex = block.fieldNames.indexOf(active.id as string)
    const newIndex = block.fieldNames.indexOf(over.id as string)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    block._setFromArray(arrayMove(block.fieldsArray, oldIndex, newIndex))

    setPrismaSchemaEvent(schemaState._clone())
  }

  const handleOnDragStart = () => {
    fieldsCache.current = selectedFields
    setSelectedFields([])
  }

  const handleFocusNode = () => {
    const node = flow.getNode(block.name)

    if (node) {
      zoomToNode(flow, node)
    }
  }

  return (
    <Stack w="100%" h="100%">
      <Stack pr="md">
        <Group w="100%" noWrap>
          <Text sx={{ flex: 1 }} fw={500}>
            {block.name}
          </Text>
          <Group>
            <Tooltip label="Remove">
              <ActionIcon onClick={handleRemoveNode} size="sm">
                <IconTrash />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Focus in diagram">
              <ActionIcon onClick={handleFocusNode} size="sm">
                <IconEye />
              </ActionIcon>
            </Tooltip>
            {actions}
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
            onDragStart={handleOnDragStart}
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
