import { ActionIcon, Group, Tooltip, Transition } from '@mantine/core'
import {
  removeSelectedNodeEffect,
  setCreateRelationModalData,
  toggleCreateRelationModalEvent
} from '@renderer/modules/editor/stores'
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

  const openCreateRelationModal = () => {
    toggleCreateRelationModalEvent(true)
    setCreateRelationModalData({ source: selectedNodeId!, target: '' })
  }

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
            <Tooltip label="Remove" withinPortal>
              <ActionIcon onClick={handleRemoveNode}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="New relation" withinPortal>
              <ActionIcon onClick={openCreateRelationModal}>
                <IconPlugConnected />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="New field" withinPortal>
              <ActionIcon>
                <IconRowInsertBottom />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      )}
    </Transition>
  )
}
