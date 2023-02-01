import { Switch } from '@mantine/core'
import { cloneSchemaState } from '@renderer/core/utils'
import { PrismaSchemaState } from 'prisma-state'
import { RelationAttribute } from 'prisma-state/attributes'
import { Model } from 'prisma-state/blocks'

interface ModelRelationFieldOptionalSwitchProps {
  name: string
  model: Model
  state: PrismaSchemaState
  onChange: (state: PrismaSchemaState) => void
}

export const ModelRelationFieldOptionalSwitch: React.FC<ModelRelationFieldOptionalSwitchProps> = ({
  name,
  model,
  state,
  onChange
}) => {
  const field = model?.field(name)
  const attr = (field?.attributes.get('relation') as RelationAttribute) || undefined

  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!field) return

    const modifier = event.currentTarget.checked ? 'optional' : null

    field.setModifier(modifier)

    if (attr) attr.fields.map((field) => model.field(field)?.setModifier(modifier))

    const updatedState = await cloneSchemaState(state)
    onChange(updatedState)
  }

  return (
    <Switch
      label="Optional"
      checked={field?.modifier === 'optional'}
      onChange={handleSwitchChange}
      disabled={!field}
    />
  )
}
