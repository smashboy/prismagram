import { Stack, Switch, TextInput, TextInputProps } from '@mantine/core'
import { EnvField } from 'prisma-state/fields'

interface EnvInputProps extends TextInputProps {
  onEnvChange?: (flag: boolean) => void
  field: EnvField
}
export const EnvInput: React.FC<EnvInputProps> = ({ onEnvChange, field, ...props }) => {
  const handleEnvSwitch = (event: React.ChangeEvent<HTMLInputElement>) =>
    onEnvChange?.(event.currentTarget.checked)

  return (
    <Stack spacing={0}>
      <TextInput value={field?.value || ''} {...props} />
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
