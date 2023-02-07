import { ActionIcon, Tooltip } from '@mantine/core'
import { removeSelectedNodeEffect } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { NodeToolbar } from '../NodeToolbar'

interface EnumNodeToolbarProps {
  isSelected: boolean
  selectedNodeId?: string | null
}

export const EnumNodeToolbar: React.FC<EnumNodeToolbarProps> = ({ isSelected }) => {
  const handleRemoveNode = () => removeSelectedNodeEffect()

  return (
    <NodeToolbar isSelected={isSelected}>
      <Tooltip label="Remove" withinPortal>
        <ActionIcon onClick={handleRemoveNode}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    </NodeToolbar>
  )
}
