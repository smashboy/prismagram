import { Stack, Switch } from '@mantine/core'
import { PrismaMigrateResetCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

export const PrismaMigrateResetCommandOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaMigrateResetCommand, 'force' | 'skipSeed' | 'skipGenerate'>>
> = ({ value: options = {}, onChange }) => {
  const { force = false, skipSeed = false, skipGenerate = false } = options

  const handleSwitch = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, [key]: event.currentTarget.checked })

  return (
    <Stack>
      <Switch
        label="Force"
        checked={force}
        onChange={handleSwitch('force')}
        description="Skip the confirmation prompt"
      />
      <Switch
        label="Skip seed"
        checked={skipSeed}
        onChange={handleSwitch('skipSeed')}
        description="Skip triggering seed."
      />
      <Switch
        label="Skip generate"
        checked={skipGenerate}
        onChange={handleSwitch('skipGenerate')}
        description="Skip triggering generators (for example, Prisma Client)"
      />
    </Stack>
  )
}
