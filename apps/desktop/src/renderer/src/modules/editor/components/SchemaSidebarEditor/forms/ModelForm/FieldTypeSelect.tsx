import { Select } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { scalarOptionsArray } from 'prisma-state/constants'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'

interface FieldTypeSelectProps {
  field: ScalarField | RelationField | EnumModelField
}

export const FieldTypeSelect: React.FC<FieldTypeSelectProps> = ({ field }) => {
  const state = useStore($schemaState)

  const { enumIds, modelIds } = state

  const options = field.isRelation ? modelIds : [...scalarOptionsArray, ...enumIds]

  const handleSelect = (value: string | null) => {
    if (!value) return

    field.setType(value)
    setPrismaSchemaEvent(state._clone())
  }

  return (
    <Select
      label="Type"
      value={field.type}
      data={options}
      onChange={handleSelect}
      sx={{ flex: 1 }}
      readOnly={field.isRelation}
      searchable
    />
  )
}
