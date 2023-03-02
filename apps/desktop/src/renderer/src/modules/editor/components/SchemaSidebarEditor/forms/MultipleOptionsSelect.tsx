import { MultiSelect, MultiSelectProps } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor'
import { PaperSection } from '@renderer/modules/editor/components/SchemaSidebarEditor/forms/PaperSection'
import { useStore } from 'effector-react'
import { Datasource, Generator } from 'prisma-state/_new/blocks'
import { OptionsListField } from 'prisma-state/_new/fields'
import { OptionsListFieldData } from 'prisma-state/_new/types'

interface MultipleOptionsSelectProps extends MultiSelectProps {
  name: string
  block: Datasource | Generator
}

export const MultipleOptionsSelect: React.FC<MultipleOptionsSelectProps> = ({
  name,
  block,
  ...props
}) => {
  const state = useStore($schemaState)

  const fieldData = block.field<OptionsListFieldData>(name)

  const field = new OptionsListField(name, block.name, fieldData)

  const handleChange = (values: string[]) => {
    if (values.length === 0) {
      block.removeField(name)
    } else {
      field.reset()
      field.addValues(values)
      block.addField(name, field._data())
    }

    setPrismaSchemaEvent(state._clone())
  }

  return (
    <PaperSection>
      {' '}
      <MultiSelect value={field?.values || []} onChange={handleChange} {...props} />
    </PaperSection>
  )
}
