import { SegmentedControl, Stack, Text } from '@mantine/core'
import { $schemaState, setPrismaSchemaEvent } from '@renderer/modules/editor/stores'
import { useStore } from 'effector-react'
import { EnumModelField, RelationField, ScalarField } from 'prisma-state/_new/fields'

const modifierOptions = ['none', 'optional', 'list']

interface FieldModifierSelectorProps {
  field: ScalarField | EnumModelField | RelationField
}

export const FieldModifierSelector: React.FC<FieldModifierSelectorProps> = ({ field }) => {
  const schemaState = useStore($schemaState)

  const handleModifierChange = (modifier: 'none' | 'optional' | 'list') => {
    if (modifier === 'none') {
      field.setModifier(null)
      setPrismaSchemaEvent(schemaState._clone())
      return
    }

    field.setModifier(modifier)
    setPrismaSchemaEvent(schemaState._clone())
  }

  return (
    <Stack spacing={0}>
      <Text fw={500} size="sm">
        Modifier
      </Text>
      <SegmentedControl
        value={!field.modifier ? modifierOptions[0] : field.modifier}
        onChange={handleModifierChange}
        data={modifierOptions}
        disabled={field.isRelation}
      />
    </Stack>
  )
}
