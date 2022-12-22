import { Stack, TextInput } from '@mantine/core'

export const PrismaMigrateResolveCmdOptions = () => {
  return (
    <Stack>
      <TextInput
        label="Applied"
        description='Record a specific migration as applied - for example --applied "20201231000000_add_users_table"'
      />
      <TextInput
        label="Rolled back"
        description='Record a specific migration as rolled back - for example --rolled-back "20201231000000_add_users_table"'
      />
    </Stack>
  )
}
