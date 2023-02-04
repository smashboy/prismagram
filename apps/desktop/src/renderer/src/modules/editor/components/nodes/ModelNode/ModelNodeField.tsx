import { Handle, Position } from 'reactflow'
import { Box, Text } from '@mantine/core'
import { Handler } from '@shared/common/models/Diagram'
import { ModelField } from 'prisma-state/fields'
import { ScalarFieldColor } from '../../../config'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
  nodesColors: Record<string, string>
  sourceHandlers: Record<string, Handler>
  targetHandlers: Record<string, Handler>
  maxAttribuesCount: number
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({
  fieldId,
  field,
  nodesColors,
  sourceHandlers,
  targetHandlers,
  maxAttribuesCount
}) => {
  const { type, displayType, attributes } = field

  const textColor = ScalarFieldColor[type] || nodesColors[type]

  const sourceHandler = sourceHandlers[fieldId]
  const targetHandler = targetHandlers[fieldId]

  const attributesList = [...attributes.values()]

  return (
    <tr style={{ width: '100%' }}>
      <td>
        {targetHandler && (
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
        )}
        {fieldId}
      </td>

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
    </tr>
  )
}