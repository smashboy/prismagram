import { Stack, Switch } from '@mantine/core'

export const PrismaDbPullCmdOptions = () => {
  return (
    <Stack>
      <Switch
        label="Force"
        description="Force overwrite of manual changes made to schema. The generated schema will be based on the introspected schema only."
      />
    </Stack>
  )
}
