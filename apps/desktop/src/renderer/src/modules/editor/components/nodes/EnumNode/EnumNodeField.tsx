import { EnumField } from 'prisma-state/fields'

interface EnumNodeFieldProps {
  field: EnumField
  isSelected: boolean
}

export const EnumNodeField: React.FC<EnumNodeFieldProps> = ({ field, isSelected }) => {
  const { name } = field

  return (
    <tr>
      <td>{name}</td>
    </tr>
  )
}
