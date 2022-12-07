import { ModelField } from '@shared/common/models/Diagram'

interface ModelNodeFieldProps {
  fieldId: string
  field: ModelField
}

export const ModelNodeField: React.FC<ModelNodeFieldProps> = ({ fieldId, field }) => {
  const { type, isList, isRequired } = field

  const displayType = type.concat(isList ? '[]' : '').concat(isRequired ? '' : '?')

  return (
    <tr>
      <td>{fieldId}</td>
      <td>{displayType}</td>
    </tr>
  )
}
