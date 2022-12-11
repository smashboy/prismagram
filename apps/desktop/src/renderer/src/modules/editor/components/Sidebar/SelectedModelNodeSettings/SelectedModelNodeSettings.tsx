import { useStore } from 'effector-react'
import { $selectedModelNode } from '@renderer/modules/editor/stores'
import { Accordion, Button, Paper, ScrollArea, Stack, TextInput } from '@mantine/core'
import { ModelFieldSettings } from './ModelFieldSettings'
import { IconPlus } from '@tabler/icons'

export const SelectedModelNodeSettings = () => {
  const model = useStore($selectedModelNode)

  if (!model) return null

  const {
    data: { name, fields }
  } = model

  return (
    <ScrollArea h="100%" offsetScrollbars>
      <Stack>
        <Paper p="xs" shadow="sm">
          <TextInput label="Model name" value={name} readOnly />
        </Paper>
        <Button variant="subtle" rightIcon={<IconPlus size={16} />}>
          New field
        </Button>
        <Accordion
          variant="separated"
          radius="md"
          chevronPosition="left"
          defaultValue="customization"
        >
          {Object.entries(fields).map(([name, field]) => (
            <ModelFieldSettings key={name} name={name} field={field} />
          ))}
        </Accordion>
      </Stack>
    </ScrollArea>
  )
}
