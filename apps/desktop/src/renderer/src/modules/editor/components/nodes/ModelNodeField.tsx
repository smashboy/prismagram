import { Box } from '@mantine/core'
import { ModelField, Handler } from '@shared/common/models/Diagram'
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
  const { type, displayType } = field

  const textColor = ScalarFieldColor[type] || nodesColors[type]

  const sourceHandler = sourceHandlers[fieldId]
  const targetHandler = targetHandlers[fieldId]

  return (
    <tr>
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
        {sourceHandler && (
          <Box
            key={sourceHandler.id}
            sx={{
              position: 'relative',
              right: -25
            }}
            component="span"
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
      </td>
    </tr>
  )
}
