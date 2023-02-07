import { Handle, Position } from 'reactflow'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Group, Text, Transition } from '@mantine/core'
import { ModelHandler, EnumHandler } from '@shared/common/models/Diagram'
import { ModelField } from 'prisma-state/fields'
import { ScalarFieldColor } from '../../../config'
import { DragHandle } from '../../DragHandle'
import { NodeDraggableField } from '../NodeDraggableField'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
  nodesColors: Record<string, string>
  sourceHandlers: Record<string, ModelHandler | EnumHandler>
  targetHandlers: Record<string, ModelHandler | EnumHandler>
  maxAttribuesCount: number
  isSelected: boolean
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({
  fieldId,
  field,
  nodesColors,
  sourceHandlers,
  targetHandlers,
  maxAttribuesCount,
  isSelected
}) => {
  const { type, displayType, attributes } = field

  const textColor = ScalarFieldColor[type] || nodesColors[type]

  const sourceHandler = sourceHandlers[fieldId]
  const targetHandler = targetHandlers[fieldId]

  const attributesList = [...attributes.values()]

  return (
    <NodeDraggableField
      fieldId={fieldId}
      isNodeSelected={isSelected}
      leftItem={
        targetHandler && (
          <Box
            key={targetHandler.id}
            sx={{
              position: 'relative',
              left: -25
            }}
            component="span"
          >
            <Handle
              id={targetHandler.id}
              type="target"
              position={Position.Left}
              isConnectable={false}
              style={{
                borderColor: 'white',
                marginLeft: -6,
                borderWidth: 3,
                boxSizing: 'unset'
              }}
            />
          </Box>
        )
      }
    >
      <td style={{ color: textColor, width: '100%', display: 'flex' }}>
        <span style={{ flex: 1 }}>{displayType}</span>
      </td>
      {Array.from({ length: maxAttribuesCount }).map((_, index) => {
        const attribute = attributesList[index]
        if (!attribute) return <td key={index} />
        return (
          <Text key={attribute.type} color="blue" component="td">
            {attribute.displayAttributeType}
          </Text>
        )
      })}
      {sourceHandler && (
        <Box
          key={sourceHandler.id}
          sx={{
            position: 'relative',
            right: -14
          }}
          component="td"
        >
          <Handle
            id={sourceHandler.id}
            type="source"
            position={Position.Right}
            isConnectable={false}
            style={{
              borderColor: 'white',
              marginRight: -6,
              borderWidth: 3,
              boxSizing: 'unset'
            }}
          />
        </Box>
      )}
    </NodeDraggableField>
  )
}
