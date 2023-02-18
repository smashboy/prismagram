import { Select, SelectProps } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor'
import { Datasource, Generator } from 'prisma-state/_new/blocks'
import { OptionField } from 'prisma-state/_new/fields'
import { OptionFieldData } from 'prisma-state/_new/types'

interface SelectOptionInputProps extends SelectProps {
  name: string
  block: Datasource | Generator
}

export const SelectOptionInput: React.FC<SelectOptionInputProps> = ({ name, block, ...props }) => {
  const fieldData = block.field<OptionFieldData>(name)

  const field = new OptionField(name, block.name, fieldData)

  const handleChange = (value: string | null) => {
    if (!value) {
      block.removeField(name)
    } else {
      field.setValue(value)
      block.addField(name, field._data())
    }

    updatePrismaSchemaEvent()
  }

  return <Select value={field?.value || ''} onChange={handleChange} {...props} />
}
