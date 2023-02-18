import { combine } from 'effector'
import { useStore } from 'effector-react'
import { useReactFlow } from 'reactflow'
import { RelationType, RelationTypeOption } from 'prisma-state/constants'
import { ActionIcon, Group, Menu, Tooltip } from '@mantine/core'
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBoxMargin,
  IconRelationManyToMany,
  IconRelationOneToMany,
  IconRelationOneToOne,
  IconZoomIn,
  IconZoomInArea,
  IconZoomOut
} from '@tabler/icons'
import {
  $isEditorEnabled,
  $selectedRelationType,
  layoutDiagramEffect,
  schemaStateHistoryApiEvents,
  setSelectedRelationTypeEvent
} from '../../stores'
import { ICON_SIZE } from './constants'

const relationIconsMap = {
  [RelationType.ONE_TO_ONE]: IconRelationOneToOne,
  [RelationType.ONE_TO_MANY]: IconRelationOneToMany,
  [RelationType.MANY_TO_MANY]: IconRelationManyToMany
}

const $store = combine({
  isEditorEnabled: $isEditorEnabled,
  selectedRelationType: $selectedRelationType
})

export const DiagramOptionsSection = () => {
  const flow = useReactFlow()

  const { isEditorEnabled, selectedRelationType } = useStore($store)

  const handleDiagramLayout = () => layoutDiagramEffect()
  const handleFitIntoView = () => flow.fitView()

  const handleSelectRelationType = (type: RelationTypeOption) => () =>
    setSelectedRelationTypeEvent(type)

  const RelationIcon = relationIconsMap[selectedRelationType]

  const handleUndoChanges = () => schemaStateHistoryApiEvents.undo()
  const handleRedoChanges = () => schemaStateHistoryApiEvents.redo()

  return (
    <Group>
      <Tooltip label="Zoom out">
        <ActionIcon disabled={!isEditorEnabled}>
          <IconZoomOut size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Zoom in">
        <ActionIcon disabled={!isEditorEnabled}>
          <IconZoomIn size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Undo">
        <ActionIcon onClick={handleUndoChanges} disabled={!isEditorEnabled}>
          <IconArrowBackUp size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Redo">
        <ActionIcon onClick={handleRedoChanges} disabled={!isEditorEnabled}>
          <IconArrowForwardUp size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Menu withinPortal>
        <Menu.Target>
          <Tooltip label="Relation connection type">
            <ActionIcon disabled={!isEditorEnabled}>
              <RelationIcon />
            </ActionIcon>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={handleSelectRelationType(RelationType.ONE_TO_ONE)}
            icon={<IconRelationOneToOne size={14} />}
          >
            One-to-one
          </Menu.Item>
          <Menu.Item
            onClick={handleSelectRelationType(RelationType.ONE_TO_MANY)}
            icon={<IconRelationOneToMany size={14} />}
          >
            One-to-many
          </Menu.Item>
          <Menu.Item
            onClick={handleSelectRelationType(RelationType.MANY_TO_MANY)}
            icon={<IconRelationManyToMany size={14} />}
          >
            Many-to-many
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Tooltip label="Fit diagram into view">
        <ActionIcon onClick={handleFitIntoView} disabled={!isEditorEnabled}>
          <IconZoomInArea size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Diagram auto layout">
        <ActionIcon onClick={handleDiagramLayout} disabled={!isEditorEnabled}>
          <IconBoxMargin size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
    </Group>
  )
}
