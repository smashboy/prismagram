import { TextInput } from '@mantine/core'
import { cloneSchemaState } from '@renderer/core/utils'
import { PrismaSchemaState } from 'prisma-state'
import { Model } from 'prisma-state/blocks'

interface ModelFieldNameInputProps {
  name: string
  model: Model
  state: PrismaSchemaState
  onChange: (state: PrismaSchemaState) => void
}

export const ModelFieldNameInput: React.FC<ModelFieldNameInputProps> = ({
  name,
  model,
  state,
  onChange
}) => {
  const field = model?.field(name)

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!field) return

    const value = event.target.value

    field.setName(value)

    const updatedState = await cloneSchemaState(state)

    onChange(updatedState)
  }

  return <TextInput value={field?.name || ''} onChange={handleInputChange} disabled={!field} />
}
