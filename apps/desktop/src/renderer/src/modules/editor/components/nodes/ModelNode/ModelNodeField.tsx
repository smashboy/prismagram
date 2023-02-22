import { combine } from 'effector'
import { Handle, Position } from 'reactflow'
import { useStore } from 'effector-react'
import { Box, Text } from '@mantine/core'
import { ModelHandler, EnumHandler } from '@shared/common/models/Diagram'
import { ScalarFieldColor } from '../../../config'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { createFieldFromType } from 'prisma-state/_new/utils/field'
import { $schemaModelIds, $schemaEnumIds } from '@renderer/modules/editor/stores'
import { ModelFieldBase } from 'prisma-state/_new/fields'

interface ModelNodeFieldProps {
  fieldId: string
  field: ScalarFieldData | RelationFieldData | EnumModelFieldData
  nodesColors: Record<string, string>
  sourceHandlers: Record<string, ModelHandler | EnumHandler>
  targetHandlers: Record<string, ModelHandler | EnumHandler>
  maxAttribuesCount: number
  isSelected: boolean
}

const $store = combine({
  enumIds: $schemaEnumIds,
  modelIds: $schemaModelIds
})

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({
  fieldId,
  field: fieldData,
  nodesColors,
  sourceHandlers,
  targetHandlers,
  maxAttribuesCount
}) => {
  const { enumIds, modelIds } = useStore($store)

  const field = createFieldFromType(
    fieldData.name,
    fieldData.type,
    fieldData.blockId,
    enumIds,
    modelIds,
    fieldData
  )

  const { type, attributes, displayType } = field

  const textColor = ScalarFieldColor[type] || nodesColors[type]

  const sourceHandler = sourceHandlers[fieldId]
  const targetHandler = targetHandlers[fieldId]

  const attributesList = [...attributes.values()]

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
      </td>
      <td>{fieldId}</td>
      <td style={{ color: textColor, width: '100%', display: 'flex' }}>
        <span style={{ flex: 1 }}>{displayType}</span>
      </td>
      {Array.from({ length: maxAttribuesCount }).map((_, index) => {
        const attributeData = attributesList[index]
        if (!attributeData) return <td key={index} />

        const Attr = ModelFieldBase.fieldAttributeMap[attributeData.type]

        const attr = new Attr(attributeData)

        return (
          <Text key={attr.type} color="blue" component="td">
            {attr.displayType}
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
