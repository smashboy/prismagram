import { ActionIcon, Tooltip } from '@mantine/core'
import { removeSelectedNodeEffect } from '@renderer/modules/editor/stores'
import { IconPlus, IconTrash } from '@tabler/icons'
import { NodeToolbar } from '../NodeToolbar'

interface EnumNodeToolbarProps {
  isSelected: boolean
  selectedNodeId?: string | null
  onOpenNewOptionInput: () => void
}

export const EnumNodeToolbar: React.FC<EnumNodeToolbarProps> = ({
  isSelected,
  onOpenNewOptionInput
}) => {
  const handleRemoveNode = () => removeSelectedNodeEffect()

  return (
    <NodeToolbar isSelected={isSelected}>
      <Tooltip label="Remove" withinPortal>
        <ActionIcon onClick={handleRemoveNode}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="New option" withinPortal>
        <ActionIcon onClick={onOpenNewOptionInput}>
          <IconPlus />
        </ActionIcon>
      </Tooltip>
    </NodeToolbar>
  )
}
