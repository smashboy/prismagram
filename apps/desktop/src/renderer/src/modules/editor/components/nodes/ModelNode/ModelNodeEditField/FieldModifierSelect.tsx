import { Select } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { ModelField } from 'prisma-state/fields'

interface FieldModifierSelectProps {
  field: ModelField
}

const options = [
  {
    value: 'optional',
    label: 'Optional'
  },
  {
    value: 'list',
    label: 'List'
  },
  {
    value: null,
    label: 'None'
  }
]

export const FieldModifierSelect: React.FC<FieldModifierSelectProps> = ({ field }) => {
  const { modifier } = field

  const handleSelect = (value: string | null) => {
    field.setModifier(value as 'optional' | 'list')
    updatePrismaSchemaEvent()
  }

  return (
    <Select
      label="Modifier"
      value={modifier}
      onChange={handleSelect}
      data={options as unknown as string[]}
    />
  )
}
