import { ActionIcon, Tooltip } from '@mantine/core'
import {
  removeSelectedNodeEffect,
  setCreateRelationModalDataEvent,
  toggleCreateRelationModalEvent
} from '@renderer/modules/editor/stores'
import { IconPlugConnected, IconTrash } from '@tabler/icons'
import { NodeToolbar } from '../NodeToolbar'

interface ModelNodeToolbarProps {
  isSelected: boolean
  selectedNodeId?: string | null
}

export const ModelNodeToolbar: React.FC<ModelNodeToolbarProps> = ({
  isSelected,
  selectedNodeId
}) => {
  const handleRemoveNode = () => removeSelectedNodeEffect()

  const openCreateRelationModal = () => {
    toggleCreateRelationModalEvent(true)
    setCreateRelationModalDataEvent({
      source: selectedNodeId!,
      target: '',
      name: '',
      onDelete: null,
      onUpdate: null,
      isOptional: false,
      isExplicit: false
    })
  }

  // useEffect(() => {
  //   flow.setNodes((nodes) =>
  //     nodes.map((node) =>
  //       node.id === selectedNodeId
  //         ? { ...node, dragHandle: '.custom-drag-handle' }
  //         : { ...node, dragHandle: void 0 }
  //     )
  //   )
  // }, [selectedNodeId])

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
      {/* <Tooltip onClick={onOpenNewFieldInput} label="New field" withinPortal>
        <ActionIcon>
          <IconRowInsertBottom />
        </ActionIcon>
      </Tooltip> */}
    </NodeToolbar>
  )
}
