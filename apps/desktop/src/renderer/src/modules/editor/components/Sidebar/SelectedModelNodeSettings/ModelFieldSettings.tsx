import { useStore } from 'effector-react'
import { Accordion, Badge, Group, Select, Stack, Text, TextInput } from '@mantine/core'
import { ScalarFieldColor } from '@renderer/modules/editor/config'
import { $modelsIds, $nodesColors } from '@renderer/modules/editor/stores'
import { combine } from 'effector'
import { scalarOptionsArray } from '@shared/common/configs/prisma'
import { ModelField } from '@renderer/core/prisma/fields/ModelField'

interface ModelFieldSettingsProps {
  field: ModelField
}

const $store = combine({
  modelsIds: $modelsIds,
  nodesColors: $nodesColors
})

export const ModelFieldSettings: React.FC<ModelFieldSettingsProps> = ({
  field: { type, displayType, name }
}) => {
  const { modelsIds, nodesColors } = useStore($store)

  const typeOptions = [...scalarOptionsArray, ...modelsIds]

  const typeColor = ScalarFieldColor[type as string] || nodesColors[type as string]

  return (
    <Accordion.Item
      value={name}
      sx={(theme) => ({
        boxShadow: theme.shadows.sm,
        ['&:not(:first-child)']: {
          marginTop: theme.spacing.xs
        },
        ['&:last-child']: {
          marginBottom: theme.spacing.xl
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
          <Select label="Type" value={type as string} data={typeOptions} readOnly />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
