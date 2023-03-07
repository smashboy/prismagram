import { useEffect, useRef, useState } from 'react'
import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {
  Accordion,
  ActionIcon,
  Box,
  Divider,
  Group,
  ScrollArea,
  Stack,
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
import { Enum, Model } from 'prisma-state/_new/blocks'
import { BlockNameInput } from './BlockNameInput'

const $store = combine({
  selectedNodeId: $selectedNodeId,
  schemaState: $schemaState
})

interface BlockBaseFormProps {
  block: Model | Enum
  children: React.ReactNode
  actions?: React.ReactNode
  form?: React.ReactNode
  fieldIds: string[]
}

export const BlockBaseForm: React.FC<BlockBaseFormProps> = ({
  block,
  children,
  actions = null,
  form = null,
  fieldIds
}) => {
  const flow = useReactFlow()

  const { schemaState, selectedNodeId } = useStore($store)

  const fieldsCache = useRef<string[]>([])

  const [selectedFields, setSelectedFields] = useState(fieldIds)

  useEffect(() => {
    if (selectedNodeId) {
      setSelectedFields(fieldIds)
    }
  }, [selectedNodeId])

  const handleRemoveNode = () => removeSelectedNodeEffect()

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setSelectedFields(fieldsCache.current)

    if (!over || active.id === over.id) return

    const oldIndex = fieldIds.indexOf(active.id as string)
    const newIndex = fieldIds.indexOf(over.id as string)

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
          <Box sx={{ flex: 1 }}>
            <BlockNameInput block={block} />
          </Box>
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

      {form}
      <ScrollArea h="100%" offsetScrollbars>
        <Stack w="100%" h="100%">
          <DndContext
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
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
