import { Stack, Switch } from '@mantine/core'

export const PrismaGenerateCmdOptions = () => {
  return (
    <Stack>
      <Switch
        label="Data proxy"
        description="The generate command will generate Prisma Client for use with the Data Proxy."
      />
      <Switch
        label="Watch"
        description="The generate command will continue to watch the schema.prisma file and re-generate Prisma Client on file changes."
      />
    </Stack>
  )
}
