import { Stack, Switch } from '@mantine/core'

export const PrismaMigrateDevCmdOptions = () => {
  return (
    <Stack>
      <Switch
        label="Create only"
        description="Creates a new migration based on the changes in the schema but does not apply that migration."
      />
      <Switch label="Skip seed" description="Skip triggering seed." />
      <Switch
        label="Skip generate"
        description="Skip triggering generators (for example, Prisma Client)"
      />
    </Stack>
  )
}
