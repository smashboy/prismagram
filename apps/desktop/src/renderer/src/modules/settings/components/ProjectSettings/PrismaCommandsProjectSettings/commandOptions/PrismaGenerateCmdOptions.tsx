import { Stack, Switch } from '@mantine/core'
import { PrismaGenerateCommand } from '@shared/common/models/Prisma'
import { PrismaCmdOptionsProps } from './types'

export const PrismaGenerateCmdOptions: React.FC<
  PrismaCmdOptionsProps<Pick<PrismaGenerateCommand, 'dataProxy' | 'watch'>>
> = ({ value: options = {}, onChange }) => {
  const { dataProxy = false, watch = false } = options

  const handleSwitch = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...options, [key]: event.currentTarget.checked })

  return (
    <Stack>
      <Switch
        label="Data proxy"
        checked={dataProxy}
        onChange={handleSwitch('dataProxy')}
        description="The generate command will generate Prisma Client for use with the Data Proxy."
      />
      <Switch
        label="Watch"
        checked={watch}
        onChange={handleSwitch('watch')}
        description="The generate command will continue to watch the schema.prisma file and re-generate Prisma Client on file changes."
      />
    </Stack>
  )
}
