import { Select } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'
import { FieldModifier } from 'prisma-state/_new/types'

interface FieldModifierSelectProps {
  field: ScalarField | RelationField | EnumModelField
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
  const state = useStore($schemaState)

  const handleSelect = (value: FieldModifier | null) => {
    field.setModifier(value)
    setPrismaSchemaEvent(state._clone())
  }

  return (
    <Select
      label="Modifier"
      value={field.modifier}
      onChange={handleSelect}
      sx={{ flex: 1 }}
      data={options as unknown as string[]}
      readOnly={field.isRelation}
    />
  )
}
