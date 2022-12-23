import { useStore } from 'effector-react'
import { $selectedSchemaModel } from '@renderer/modules/editor/stores'
import { Accordion, Button, ScrollArea, Stack, TextInput } from '@mantine/core'
import { ModelFieldSettings } from './ModelFieldSettings'
import { IconPlus } from '@tabler/icons'
import { Field } from '@mrleebo/prisma-ast'

export const SelectedModelNodeSettings = () => {
  const model = useStore($selectedSchemaModel)

  if (!model) return null

  const { name, properties } = model

  const fields = properties.filter((prop) => prop.type === 'field') as Field[]

  return (
    <ScrollArea h="100%" type="scroll" offsetScrollbars>
      <Stack>
        <TextInput label="Model name" value={name} readOnly />
        <Button variant="subtle" rightIcon={<IconPlus size={16} />}>
          New field
        </Button>
        <Accordion defaultValue="customization">
          {fields.map((field) => (
            <ModelFieldSettings key={field.name} field={field} />
          ))}
        </Accordion>
      </Stack>
    </ScrollArea>
  )
}
