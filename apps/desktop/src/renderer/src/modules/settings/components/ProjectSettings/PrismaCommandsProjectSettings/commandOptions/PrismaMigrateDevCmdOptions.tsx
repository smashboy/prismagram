import { Stack, Switch } from '@mantine/core'
import { PrismaMigrateDevCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

export const PrismaMigrateDevCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaMigrateDevCommand, 'createOnly' | 'skipSeed' | 'skipGenerate'>>
> = ({ value: options = {}, onChange }) => {
  const { createOnly = false, skipSeed = false, skipGenerate = false } = options

  const handleSwitch = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, [key]: event.currentTarget.checked })

  return (
    <Stack>
      <Switch
        label="Create only"
        checked={createOnly}
        onChange={handleSwitch('createOnly')}
        description="Creates a new migration based on the changes in the schema but does not apply that migration."
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
