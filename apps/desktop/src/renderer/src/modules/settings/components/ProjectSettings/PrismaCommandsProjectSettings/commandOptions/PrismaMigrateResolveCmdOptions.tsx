import { Stack, TextInput } from '@mantine/core'
import { PrismaMigrateResolveCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

export const PrismaMigrateResolveCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaMigrateResolveCommand, 'rolledBack' | 'applied'>>
> = ({ value: options = {}, onChange }) => {
  const { applied = '', rolledBack = '' } = options

  const handleTextInput = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, [key]: event.target.value })

  return (
    <Stack>
      <TextInput
        label="Applied"
        value={applied}
        onChange={handleTextInput('applied')}
        description='Record a specific migration as applied - for example --applied "20201231000000_add_users_table"'
      />
      <TextInput
        label="Rolled back"
        value={rolledBack}
        onChange={handleTextInput('rolledBack')}
        description='Record a specific migration as rolled back - for example --rolled-back "20201231000000_add_users_table"'
      />
    </Stack>
  )
}
