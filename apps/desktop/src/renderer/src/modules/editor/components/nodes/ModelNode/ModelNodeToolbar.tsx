import { ActionIcon, Tooltip } from '@mantine/core'
import {
  removeSelectedNodeEffect,
  setCreateRelationModalData,
  toggleCreateRelationModalEvent
} from '@renderer/modules/editor/stores'
import { IconPlugConnected, IconRowInsertBottom, IconTrash } from '@tabler/icons'
import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'
import { NodeToolbar } from '../NodeToolbar'

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
    <NodeToolbar isSelected={isSelected}>
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
    </NodeToolbar>
  )
}
