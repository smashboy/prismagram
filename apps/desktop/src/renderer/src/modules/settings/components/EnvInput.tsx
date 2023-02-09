import { Block } from 'prisma-state/blocks'
import { EnvField } from 'prisma-state/fields'
import { Stack, Switch, TextInput, TextInputProps } from '@mantine/core'
import { updatePrismaStateEffect } from '@renderer/modules/editor'

interface EnvInputProps extends TextInputProps {
  name: string
  block: Block
}

export const EnvInput: React.FC<EnvInputProps> = ({ block, name, ...props }) => {
  const field = block.field<EnvField>(name)

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (!value) {
      block.removeField(name)
    } else if (!field) {
      const newField = block.addField(name, new EnvField(name)) as EnvField
      newField.setValue(value)
    } else {
      field.setValue(value)
    }

    await updatePrismaStateEffect()
  }

  const handleEnvSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field) {
      field.toggleIsEnv(event.currentTarget.checked)
      await updatePrismaStateEffect()
    }
  }

  return (
    <Stack spacing={0}>
      <TextInput onChange={handleInput} value={field?.value || ''} {...props} />
      <Switch
        label="Is environment variable"
        description="If the field is marked as an environment variable, you must specify its name instead of the actual value."
        onChange={handleEnvSwitch}
        disabled={!field}
        checked={field?.isEnv || false}
      />
    </Stack>
  )
}
