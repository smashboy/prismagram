import { Stack, Switch } from '@mantine/core'

export const PrismaDbPushCmdOptions = () => {
  return (
    <Stack>
      <Switch
        label="Skip generate"
        description="Skip generation of artifacts such as Prisma Client."
      />
      <Switch
        label="Force reset"
        description="Resets the database and then updates the schema - useful if you need to start from scratch due to unexecutable migrations."
      />
      <Switch
        label="Accept data loss"
        description="	Ignore data loss warnings. This option is required if as a result of making the schema changes, data may be lost."
      />
    </Stack>
  )
}
