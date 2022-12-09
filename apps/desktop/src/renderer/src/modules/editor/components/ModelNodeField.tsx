import { Box } from '@mantine/core'
import { string2Color } from '@renderer/core/utils'
import { ModelField } from '@shared/common/models/Diagram'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({ fieldId, field }) => {
  const { type, isList, isRequired } = field

  const displayType = type.concat(isList ? '[]' : '').concat(isRequired ? '' : '?')

  return (
    <Box component="tr">
      <td>{fieldId}</td>
      <td style={{ color: string2Color(type) }}>{displayType}</td>
    </Box>
  )
}
