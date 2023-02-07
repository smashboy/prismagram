import { EnumField } from 'prisma-state/fields'
import { NodeDraggableField } from '../NodeDraggableField'

interface EnumNodeFieldProps {
  field: EnumField
  isSelected: boolean
}

export const EnumNodeField: React.FC<EnumNodeFieldProps> = ({ field, isSelected }) => {
  const { name } = field

  return <NodeDraggableField fieldId={name} isNodeSelected={isSelected} />
}
