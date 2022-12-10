import { NavLink } from '@mantine/core'
import { IconBorderAll } from '@tabler/icons'
import { useStore, useStoreMap } from 'effector-react'
import { $diagram, $selectedModelNode, selectModelNodeEvent } from '../../stores'

interface ModelNavItemProps {
  nodeId: string
}

export const ModelNavItem: React.FC<ModelNavItemProps> = ({ nodeId }) => {
  const {
    data: { name }
  } = useStoreMap({
    store: $diagram,
    keys: [nodeId],
    fn: (diagram, [id]) => diagram!.nodes[id]
  })

  const selectedNodeId = useStore($selectedModelNode)

  const isSelected = selectedNodeId === nodeId

  const handleSelectMode = () => selectModelNodeEvent(nodeId)

  return (
    <NavLink
      label={name}
      variant="filled"
      active={isSelected}
      onClick={handleSelectMode}
      icon={<IconBorderAll size={16} stroke={1.5} />}
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: isSelected ? theme.shadows.xs : void 0
      })}
    />
  )
}
