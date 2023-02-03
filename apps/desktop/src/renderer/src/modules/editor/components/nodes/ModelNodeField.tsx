import { Box } from '@mantine/core'
import { Handler } from '@shared/common/models/Diagram'
import { ModelField } from 'prisma-state/fields'
import { Handle, Position } from 'reactflow'
import { ScalarFieldColor } from '../../config'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
  nodesColors: Record<string, string>
  sourceHandlers: Record<string, Handler>
  targetHandlers: Record<string, Handler>
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({
  fieldId,
  field,
  nodesColors,
  sourceHandlers,
  targetHandlers
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
      {attributesList.map((attribute) => (
        <td key={attribute.type}>{attribute.displayAttributeType}</td>
      ))}
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
