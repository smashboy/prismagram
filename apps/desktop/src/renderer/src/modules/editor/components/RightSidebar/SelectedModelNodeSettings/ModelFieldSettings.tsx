import { useStore } from 'effector-react'
import { Accordion, Select, Stack, TextInput } from '@mantine/core'
import { scalarOptionsArray } from '@renderer/modules/editor/config'
import { $nodesIds } from '@renderer/modules/editor/stores'
import { ModelField } from '@shared/common/models/Diagram'

interface ModelFieldSettingsProps {
  name: string
  field: ModelField
}

export const ModelFieldSettings: React.FC<ModelFieldSettingsProps> = ({
  name,
  field: { type }
}) => {
  const modelsIds = useStore($nodesIds)

  const typeOptions = [...scalarOptionsArray, ...modelsIds]

  return (
    <Accordion.Item
      value={name}
      sx={(theme) => ({
        boxShadow: theme.shadows.sm,
        ['&:not(:first-child) ']: {
          marginTop: theme.spacing.xs
        }
      })}
    >
      <Accordion.Control>{name}</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="Name" value={name} readOnly />
          <Select label="Type" value={type} data={typeOptions} />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
