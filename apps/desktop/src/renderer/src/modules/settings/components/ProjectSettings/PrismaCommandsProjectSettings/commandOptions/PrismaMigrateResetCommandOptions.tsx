import { Stack, Switch } from '@mantine/core'

export const PrismaMigrateResetCommandOptions = () => {
  return (
    <Stack>
      <Switch label="Force" description="Skip the confirmation prompt" />
      <Switch label="Skip seed" description="Skip triggering seed." />
      <Switch
        label="Skip generate"
        description="Skip triggering generators (for example, Prisma Client)"
      />
    </Stack>
  )
}
