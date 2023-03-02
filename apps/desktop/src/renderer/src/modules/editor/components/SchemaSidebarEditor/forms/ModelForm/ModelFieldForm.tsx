import { Accordion, Badge, Group, Text } from '@mantine/core'
import { ScalarFieldColor } from '@renderer/modules/editor/config'
import { $nodesColors } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { EnumModelFieldData, RelationFieldData, ScalarFieldData } from 'prisma-state/_new/types'
import { DragHandle } from '../../../DragHandle'

interface ModelFieldFormProps {
  field: ScalarFieldData | EnumModelFieldData | RelationFieldData
}

export const ModelFieldForm: React.FC<ModelFieldFormProps> = ({ field: fieldData }) => {
  const { name, type } = fieldData

  const nodeColors = useStore($nodesColors)

  const typeColor = ScalarFieldColor[type] || nodeColors[type]

  return (
    <Accordion.Item value={name}>
      <Accordion.Control>
        <Group>
          <DragHandle size="sm" />
          <Text>{name}</Text>
          <Badge sx={{ color: typeColor, textTransform: 'none' }}>{type}</Badge>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        Colors, fonts, shadows and many other parts are customizable to fit your design needs
      </Accordion.Panel>
    </Accordion.Item>
  )
}
