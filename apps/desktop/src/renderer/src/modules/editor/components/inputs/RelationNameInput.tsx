import { TextInput } from '@mantine/core'
import { cloneSchemaState } from '@renderer/core/utils'
import { PrismaSchemaState } from 'prisma-state'
import { RelationAttribute } from 'prisma-state/attributes'
import { Model } from 'prisma-state/blocks'
import { RelationField } from 'prisma-state/fields'

interface RelationNameInputProps {
  name: string
  model: Model
  state: PrismaSchemaState
  onChange: (state: PrismaSchemaState) => void
}

export const RelationNameInput: React.FC<RelationNameInputProps> = ({
  name,
  model,
  state,
  onChange
}) => {
  const field = model?.field(name) as RelationField | undefined

  const attr = (field?.attributes.get('relation') as RelationAttribute) || undefined

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const relatedFieldAttr = field!.relatedField?.attributes.get('relation') as
      | RelationAttribute
      | undefined

    if (!attr || !relatedFieldAttr) return

    const value = event.target.value

    if (!value) {
      attr.removeArgument('name')
      relatedFieldAttr.removeArgument('name')
    } else {
      attr.setName(value)
      relatedFieldAttr.setName(value)
    }

    const updatedState = await cloneSchemaState(state)

    onChange(updatedState)
  }

  return (
    <TextInput
      label="Relation name"
      description="Defines the name of the relationship. In an m-n-relation, it also determines the name of the underlying relation table."
      value={attr?.name || ''}
      onChange={handleInputChange}
      disabled={!attr}
    />
  )
}
