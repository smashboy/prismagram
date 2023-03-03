import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import { Group, NavLink } from '@mantine/core'
import { CSS } from '@dnd-kit/utilities'
import { IconAdjustments, IconBorderAll, IconDatabase, IconLayoutList } from '@tabler/icons'
import { $nodesColors, $schemaState, $selectedNodeId, selectNodeEvent } from '../../stores'
import { NodeType } from '@shared/common/configs/diagrams'
import { useSortable } from '@dnd-kit/sortable'
import { DragHandle } from '../DragHandle'

interface SchemaNavItemProps {
  blockId: string
}

const $store = combine({
  selectedNodeId: $selectedNodeId,
  nodesColors: $nodesColors
})

const iconsMap = {
  model: IconBorderAll,
  enum: IconLayoutList,
  datasource: IconDatabase,
  generator: IconAdjustments
}
export const SchemaNavItem: React.FC<SchemaNavItemProps> = ({ blockId }) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: blockId
    })

  const { selectedNodeId, nodesColors } = useStore($store)

  const { name, type } = useStoreMap({
    store: $schemaState,
    keys: [blockId],
    fn: (state, [id]) => state.block(id)
  })

  const isSelected = selectedNodeId?.nodeId === blockId

  const Icon = iconsMap[type]

  const label = type === 'datasource' || type === 'generator' ? `${type}:${name}` : name

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handleSelectMode = () =>
    selectNodeEvent({
      nodeId: blockId,
      type: type as NodeType
    })

  return (
    <NavLink
      label={label}
      active={isSelected}
      ref={setNodeRef}
      onClick={handleSelectMode}
      variant="filled"
      icon={
        <Group spacing={3}>
          <DragHandle
            size="sm"
            ref={setActivatorNodeRef}
            color={isSelected ? 'gray.0' : void 0}
            sx={
              isSelected
                ? {
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }
                : void 0
            }
            {...listeners}
          />
          {Icon && (
            <Icon size={16} color={isSelected ? void 0 : nodesColors[blockId]} stroke={1.5} />
          )}
        </Group>
      }
      sx={(theme) => ({
        borderRadius: theme.radius.sm,
        boxShadow: isSelected ? theme.shadows.xs : void 0,
        '& .mantine-NavLink-label': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }
      })}
      style={style}
      {...attributes}
    />
  )
}
