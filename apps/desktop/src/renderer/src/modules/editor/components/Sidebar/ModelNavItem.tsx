import { NavLink } from '@mantine/core'
import { toggleModelNodeSidebarEvent } from '@renderer/stores/ui/modals'
import { IconBorderAll } from '@tabler/icons'
import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { $nodesColors, $schemaModels, $selectedNodeId, selectNodeEvent } from '../../stores'

interface ModelNavItemProps {
  modelId: string
}

const $store = combine({
  selectedNodeId: $selectedNodeId,
  nodesColors: $nodesColors
})

export const ModelNavItem: React.FC<ModelNavItemProps> = ({ modelId }) => {
  const { name } = useStoreMap({
    store: $schemaModels,
    keys: [modelId],
    fn: (models, [id]) => models.get(id)!
  })

  const { selectedNodeId, nodesColors } = useStore($store)

  const isSelected = selectedNodeId === modelId

  const handleSelectModel = () => {
    toggleModelNodeSidebarEvent(true)
    selectNodeEvent(modelId)
  }

  return (
    <NavLink
      label={name}
      variant="filled"
      active={isSelected}
      onClick={handleSelectModel}
      icon={
        <IconBorderAll size={16} color={isSelected ? void 0 : nodesColors[modelId]} stroke={1.5} />
      }
      sx={(theme) => ({
        borderRadius: theme.radius.sm
      })}
    />
  )
}
