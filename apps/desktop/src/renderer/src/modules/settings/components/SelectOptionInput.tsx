import { useStore } from 'effector-react'
import { Block } from 'prisma-state/blocks'
import { OptionField } from 'prisma-state/fields'
import { Select, SelectProps } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor'

interface SelectOptionInputProps extends SelectProps {
  name: string
  block: Block
}

export const SelectOptionInput: React.FC<SelectOptionInputProps> = ({ name, block, ...props }) => {
  const state = useStore($schemaState)

  const field = block.field<OptionField>(name)

  const handleChange = (value: string | null) => {
    if (!value) {
      block.removeField(name)
    } else if (!field) {
      const newField = block.addField(name, new OptionField(name)) as OptionField
      newField.setValue(value)
    } else {
      field.setValue(value)
    }

    setPrismaSchemaEvent(state.toString())
  }

  return <Select value={field?.value || ''} onChange={handleChange} {...props} />
}
