import { useStore } from 'effector-react'
import { Accordion, Badge, Group, Select, Stack, Text, TextInput } from '@mantine/core'
import { ScalarFieldColor, scalarOptionsArray } from '@renderer/modules/editor/config'
import { $nodesColors, $nodesIds } from '@renderer/modules/editor/stores'
import { ModelField } from '@shared/common/models/Diagram'
import { combine } from 'effector'

interface ModelFieldSettingsProps {
  name: string
  field: ModelField
}

const $store = combine({
  modelsIds: $nodesIds,
  nodesColors: $nodesColors
})

export const ModelFieldSettings: React.FC<ModelFieldSettingsProps> = ({
  name,
  field: { type, isList, isRequired }
}) => {
  const { modelsIds, nodesColors } = useStore($store)

  const displayType = type.concat(isList ? '[]' : '').concat(isRequired ? '' : '?')
  const typeOptions = [...scalarOptionsArray, ...modelsIds]

  const typeColor = ScalarFieldColor[type] || nodesColors[type]

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
      <Accordion.Control>
        <Group>
          <Text>{name}</Text>
          <Badge sx={{ color: typeColor, textTransform: 'none' }}>{displayType}</Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="Name" value={name} readOnly />
          <Select label="Type" value={type} data={typeOptions} readOnly />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
