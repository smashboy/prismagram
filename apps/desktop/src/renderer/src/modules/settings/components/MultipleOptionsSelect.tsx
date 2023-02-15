import { MultiSelect, MultiSelectProps } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor'
import { Block } from 'prisma-state/blocks'
import { OptionsListField } from 'prisma-state/fields'

interface MultipleOptionsSelectProps extends MultiSelectProps {
  name: string
  block: Block
}

export const MultipleOptionsSelect: React.FC<MultipleOptionsSelectProps> = ({
  name,
  block,
  ...props
}) => {
  const field = block.field<OptionsListField>(name)

  const handleChange = (values: string[]) => {
    if (values.length === 0) {
      block.removeField(name)
    } else if (!field) {
      const newField = block.addField(name, new OptionsListField(name)) as OptionsListField
      newField.reset()
      newField.addValues(values)
    } else {
      field.reset()
      field.addValues(values)
    }

    updatePrismaSchemaEvent()
  }

  return <MultiSelect value={field?.values || []} onChange={handleChange} {...props} />
}
