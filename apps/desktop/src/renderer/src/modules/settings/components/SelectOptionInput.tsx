import { Block } from 'prisma-state/blocks'
import { OptionField } from 'prisma-state/fields'
import { Select, SelectProps } from '@mantine/core'
import { updatePrismaStateEffect } from '@renderer/modules/editor'

interface SelectOptionInputProps extends SelectProps {
  name: string
  block: Block
}

export const SelectOptionInput: React.FC<SelectOptionInputProps> = ({ name, block, ...props }) => {
  const field = block.field<OptionField>(name)

  const handleChange = async (value: string | null) => {
    if (!value) {
      block.removeField(name)
    } else if (!field) {
      const newField = block.addField(name, new OptionField(name)) as OptionField
      newField.setValue(value)
    } else {
      field.setValue(value)
    }

    await updatePrismaStateEffect()
  }

  return <Select value={field?.value || ''} onChange={handleChange} {...props} />
}
