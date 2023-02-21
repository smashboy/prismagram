import { Select } from '@mantine/core'
import { $schemaState } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { scalarOptionsArray } from 'prisma-state/constants'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'

interface FieldTypeSelectProps {
  field: ScalarField | RelationField | EnumModelField
}

export const FieldTypeSelect: React.FC<FieldTypeSelectProps> = ({ field }) => {
  const { enumIds, modelIds } = useStore($schemaState)

  const handleSelect = (value: string | null) => {
    if (!value) return
  }

  return (
    <Select
      label="Type"
      value={field.type}
      data={[...scalarOptionsArray, ...modelIds, ...enumIds]}
      onChange={handleSelect}
      sx={{ flex: 1 }}
      readOnly={field.isRelation}
      searchable
    />
  )
}
