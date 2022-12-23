import { Stack, Switch } from '@mantine/core'
import { PrismaDbPullCommand } from '@shared/common/models/Prisma'

import { PrismaCmdOptionsProps } from './types'

export const PrismaDbPullCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaDbPullCommand, 'force'>>
> = ({ value: options = {}, onChange }) => {
  const { force = false } = options

  const handleForceSwitch = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ force: event.currentTarget.checked })

  return (
    <Stack>
      <Switch
        label="Force"
        checked={force}
        onChange={handleForceSwitch}
        description="Force overwrite of manual changes made to schema. The generated schema will be based on the introspected schema only."
      />
    </Stack>
  )
}
