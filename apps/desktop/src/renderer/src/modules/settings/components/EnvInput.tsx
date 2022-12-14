import { Stack, Switch, TextInput, TextInputProps } from '@mantine/core'

interface EnvInputProps extends TextInputProps {
  isEnv: boolean
}
export const EnvInput: React.FC<EnvInputProps> = ({ isEnv, ...props }) => {
  return (
    <Stack spacing={0}>
      <TextInput {...props} />
      <Switch
        label="Is environment variable"
        description="If the field is marked as an environment variable, you must specify its name instead of the actual value."
        checked={isEnv}
        sx={{
          '& .mantine-Switch-body': {
            width: '100%',
            alignItems: 'center'
          },
          '& .mantine-Switch-labelWrapper': {
            flex: 1
          }
        }}
      />
    </Stack>
  )
}
