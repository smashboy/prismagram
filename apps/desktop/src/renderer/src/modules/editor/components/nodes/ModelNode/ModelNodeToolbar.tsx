import { ActionIcon, Group, Tooltip, Transition } from '@mantine/core'
import { removeSelectedNodeEffect } from '@renderer/modules/editor/stores'
import { IconGripVertical, IconPlugConnected, IconRowInsertBottom, IconTrash } from '@tabler/icons'
import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'

interface ModelNodeToolbarProps {
  isSelected: boolean
  selectedNodeId: string | null
}

export const ModelNodeToolbar: React.FC<ModelNodeToolbarProps> = ({
  isSelected,
  selectedNodeId
}) => {
  const flow = useReactFlow()

  const handleRemoveNode = () => removeSelectedNodeEffect()

  useEffect(() => {
    flow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, dragHandle: '.custom-drag-handle' }
          : { ...node, dragHandle: void 0 }
      )
    )
  }, [selectedNodeId])

  return (
    <Transition mounted={isSelected} transition="slide-up">
      {(style) => (
        <Group spacing={0} style={style}>
          <Group sx={{ flex: 1 }}>
            <ActionIcon size="xl" className="custom-drag-handle" sx={{ cursor: 'grab' }}>
              <IconGripVertical />
            </ActionIcon>
          </Group>
          <Group position="right">
            <ActionIcon onClick={handleRemoveNode}>
              <IconTrash />
            </ActionIcon>
            <ActionIcon>
              <IconPlugConnected />
            </ActionIcon>
            <ActionIcon>
              <IconRowInsertBottom />
            </ActionIcon>
          </Group>
        </Group>
      )}
    </Transition>
  )
}
