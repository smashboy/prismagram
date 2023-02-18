import { Stack, Switch, TextInput, TextInputProps } from '@mantine/core'
import { updatePrismaSchemaEvent } from '@renderer/modules/editor'
import { EnvFieldData } from 'prisma-state/_new/types'
import { Datasource, Generator } from 'prisma-state/_new/blocks'
import { EnvField } from 'prisma-state/_new/fields'

interface EnvInputProps extends TextInputProps {
  name: string
  block: Datasource | Generator
}

export const EnvInput: React.FC<EnvInputProps> = ({ block, name, ...props }) => {
  const fieldData = block.field<EnvFieldData>(name)

  const field = new EnvField(name, block.name, fieldData)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (!value) {
      block.removeField(name)
    } else {
      field.setValue(value)
      block.addField(name, field._data())
    }

    updatePrismaSchemaEvent()
  }

  const handleEnvSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldData) {
      field.toggleIsEnv(event.currentTarget.checked)
      block.addField(name, field._data())
      updatePrismaSchemaEvent()
    }
  }

  return (
    <Stack spacing={0}>
      <TextInput onChange={handleInput} value={field?.value || ''} {...props} />
      <Switch
        label="Is environment variable"
        description="If the field is marked as an environment variable, you must specify its name instead of the actual value."
        onChange={handleEnvSwitch}
        disabled={!fieldData}
        checked={field?.isEnv || false}
      />
    </Stack>
  )
}
