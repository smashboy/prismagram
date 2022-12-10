import { ModelField } from '@shared/common/models/Diagram'
import { ScalarFieldColor } from '../config'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
  nodesColors: Record<string, string>
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({ fieldId, field, nodesColors }) => {
  const { type, isList, isRequired } = field

  const displayType = type.concat(isList ? '[]' : '').concat(isRequired ? '' : '?')
  const textColor = ScalarFieldColor[type] || nodesColors[type]

  return (
    <tr>
      <td>{fieldId}</td>
      <td style={{ color: textColor }}>{displayType}</td>
    </tr>
  )
}
