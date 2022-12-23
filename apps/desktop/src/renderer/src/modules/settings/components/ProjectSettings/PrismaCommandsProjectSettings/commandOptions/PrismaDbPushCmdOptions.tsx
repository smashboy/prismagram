import { Stack, Switch } from '@mantine/core'
import { PrismaDbPushCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

export const PrismaDbPushCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaDbPushCommand, 'skipGenerate' | 'forceReset' | 'acceptDataLoss'>>
> = ({ value: options = {}, onChange }) => {
  const { skipGenerate = false, forceReset = false, acceptDataLoss = false } = options

  const handleSwitch = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, [key]: event.currentTarget.checked })

  return (
    <Stack>
      <Switch
        label="Skip generate"
        description="Skip generation of artifacts such as Prisma Client."
        checked={skipGenerate}
        onChange={handleSwitch('skipGenerate')}
      />
      <Switch
        label="Force reset"
        description="Resets the database and then updates the schema - useful if you need to start from scratch due to unexecutable migrations."
        checked={forceReset}
        onChange={handleSwitch('forceReset')}
      />
      <Switch
        label="Accept data loss"
        description="	Ignore data loss warnings. This option is required if as a result of making the schema changes, data may be lost."
        checked={acceptDataLoss}
        onChange={handleSwitch('acceptDataLoss')}
      />
    </Stack>
  )
}
