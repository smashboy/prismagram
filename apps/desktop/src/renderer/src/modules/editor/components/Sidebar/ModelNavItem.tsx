import { NavLink } from '@mantine/core'
import { toggleModelNodeSidebar } from '@renderer/stores/ui/modals'
import { IconBorderAll } from '@tabler/icons'
import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { $nodesColors, $schemaModels, $selectedModelId, selectModelNodeEvent } from '../../stores'

interface ModelNavItemProps {
  nodeId: string
}

const $store = combine({
  selectedNodeId: $selectedModelId,
  nodesColors: $nodesColors
})

export const ModelNavItem: React.FC<ModelNavItemProps> = ({ nodeId }) => {
  const { name } = useStoreMap({
    store: $schemaModels,
    keys: [nodeId],
    fn: (models, [id]) => models.get(id)!
  })

  const { selectedNodeId, nodesColors } = useStore($store)

  const isSelected = selectedNodeId === nodeId

  const handleSelectMode = () => {
    toggleModelNodeSidebar(true)
    selectModelNodeEvent(nodeId)
  }

  return (
    <NavLink
      label={name}
      variant="filled"
      active={isSelected}
      onClick={handleSelectMode}
      icon={
        <IconBorderAll size={16} color={isSelected ? void 0 : nodesColors[nodeId]} stroke={1.5} />
      }
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: isSelected ? theme.shadows.xs : void 0
      })}
    />
  )
}
