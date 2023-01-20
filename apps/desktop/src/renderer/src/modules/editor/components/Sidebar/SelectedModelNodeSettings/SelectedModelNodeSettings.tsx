import { useStore } from 'effector-react'
import { $selectedSchemaModel } from '@renderer/modules/editor/stores'
import { Accordion, Button, ScrollArea, Stack, TextInput } from '@mantine/core'
import { ModelFieldSettings } from './ModelFieldSettings'
import { IconPlus } from '@tabler/icons'
import { AttributeSettings } from './AttributeSettings'

export const SelectedModelNodeSettings = () => {
  const model = useStore($selectedSchemaModel)

  if (!model) return null

  const { name, fields, attributes } = model

  return (
    <ScrollArea h="100%" type="scroll" offsetScrollbars>
      <Stack>
        <TextInput label="Model name" value={name} readOnly />
        <Button variant="subtle" rightIcon={<IconPlus size={16} />}>
          New field
        </Button>
        <Accordion defaultValue="customization">
          {[...fields.values()].map((field) => (
            <ModelFieldSettings key={field.name} field={field} />
          ))}
          {[...attributes.values()].map((attr, index) => (
            <AttributeSettings key={index} attribute={attr} isBlock />
          ))}
        </Accordion>
      </Stack>
    </ScrollArea>
  )
}
