import { closestCenter, DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
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
import { IconEye, IconTrash } from '@tabler/icons'
import { Enum, Model } from 'prisma-state/_new/blocks'
import { useEffect, useState } from 'react'
import { PaperSection } from './PaperSection'

interface BlockBaseFormProps {
  block: Model | Enum
  children: React.ReactNode
}

export const BlockBaseForm: React.FC<BlockBaseFormProps> = ({ block, children }) => {
  const [selectedFields, setSelectedFields] = useState(block.fieldNames)

  useEffect(() => {
    setSelectedFields(block.fieldNames)
  }, [block])

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
            onDragEnd={() => {}}
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
