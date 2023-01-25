import { useStore } from 'effector-react'
import { $selectedSchemaModel } from '@renderer/modules/editor/stores'
import { IconTrash } from '@tabler/icons'
import { Accordion, ActionIcon, Group, ScrollArea, Stack, TextInput } from '@mantine/core'
import { ModelFieldSettings } from './ModelFieldSettings'
import { AttributeSettings } from './AttributeSettings'
import { NewFieldForm } from './NewFieldForm'

export const ModelSettings = () => {
  const model = useStore($selectedSchemaModel)

  if (!model) return null

  const { name, fields, attributes } = model

  return (
    <ScrollArea h="100%" type="scroll" offsetScrollbars>
      <Stack>
        <TextInput label="Model name" value={name} readOnly />
        <Group position="right">
          <ActionIcon>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
        <NewFieldForm model={model} />
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
