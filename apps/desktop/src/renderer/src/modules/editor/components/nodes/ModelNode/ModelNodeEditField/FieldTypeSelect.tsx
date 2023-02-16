import { Select } from '@mantine/core'
import { $schemaState } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { scalarOptionsArray } from 'prisma-state/constants'
import { ModelField } from 'prisma-state/fields'

interface FieldTypeSelectProps {
  field: ModelField
}

export const FieldTypeSelect: React.FC<FieldTypeSelectProps> = ({ field }) => {
  const { type } = field

  const { enumIds, modelIds } = useStore($schemaState)

  const handleSelect = (value: string | null) => {
    if (!value) return
  }

  return (
    <Select
      label="Type"
      value={type}
      data={[...scalarOptionsArray, ...modelIds, ...enumIds]}
      onChange={handleSelect}
      searchable
    />
  )
}
